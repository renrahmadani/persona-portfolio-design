/* =====================================================================
   ROUTER & NAVIGATION MODULE — Persona 5 Flow
   Handles screen routing, keyboard navigation, and transition dispatch.
   ===================================================================== */

import { Model } from "./model.js";
import { Screens } from "./screens.js";
import { Transitions } from "./transitions.js";
import { AudioPlayer } from "./audio.js";
import { Cursor } from "./cursor.js";

const VALID_SCREENS = ["home", "projects", "skills", "about", "contact"];

export const Router = {
  init() {
    this.bindPopState();
    this.bindKeyboard();

    // Determine initial screen from hash or pathname
    const initialScreen = this.getScreenFromUrl() || "home";
    Model.state.screen = initialScreen;

    Screens.showScreen(initialScreen);
    this.loadScreenData(initialScreen);
    this.syncMenuWithScreen(initialScreen);
  },

  getScreenFromUrl() {
    const hash = (location.hash || "").replace(/^#\/?/, "").toLowerCase();
    if (VALID_SCREENS.includes(hash)) return hash;

    const path = location.pathname
      .replace(/\\/g, "/")
      .replace(/index\.html$/, "");
    const cleanPath = path.replace(/\/+$/, "").split("/").pop();
    if (VALID_SCREENS.includes(cleanPath)) return cleanPath;

    return "home";
  },

  syncMenuWithScreen(screenName) {
    const idx = VALID_SCREENS.slice(1).indexOf(screenName);
    if (idx !== -1) {
      Model.state.menuIndex = idx;
      Screens.setMenuSelection(idx);
    }
  },

  go(screenName) {
    if (!VALID_SCREENS.includes(screenName)) return;
    if (Model.state.transitioning || screenName === Model.state.screen) return;

    Model.state.transitioning = true;
    AudioPlayer.play();

    // Update URL hash safely across file://, GitHub Pages, and local servers
    try {
      if (screenName === "home") {
        history.pushState(
          { screen: "home" },
          "",
          location.pathname + location.search,
        );
      } else {
        location.hash = `#${screenName}`;
      }
    } catch {}

    Model.state.screen = screenName;

    Transitions.wipe(
      () => {
        Screens.showScreen(screenName);
        this.loadScreenData(screenName);
        this.syncMenuWithScreen(screenName);
        // Immediately re-evaluate cursor hover for elements on the new screen
        Cursor.checkHover();
      },
      () => {
        Model.state.transitioning = false;
        Cursor.checkHover();
      },
    );
  },

  loadScreenData(screenName) {
    if (screenName === "projects") {
      Screens.renderFeatured(Model.featured);
      if (!Model.state.projectsLoaded) {
        Screens.renderGraphicProjects(Model.graphicProjects);
        Model.state.projectsLoaded = true;
      }
    } else if (screenName === "skills") {
      if (!Model.state.skillsBuilt) {
        Screens.renderSkills(Model.skills);
        Model.state.skillsBuilt = true;
      }
      Screens.animateSkillBars();
    }
  },

  selectMenuItem(index) {
    const items = Screens.menuItems;
    if (!items.length) return;

    const nextIndex = (index + items.length) % items.length;
    if (nextIndex !== Model.state.menuIndex) {
      AudioPlayer.play();
    }
    Model.state.menuIndex = nextIndex;
    Screens.setMenuSelection(nextIndex);
  },

  bindKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (Model.state.screen === "home") {
        const items = Screens.menuItems;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.selectMenuItem(Model.state.menuIndex + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.selectMenuItem(Model.state.menuIndex - 1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const target = items[Model.state.menuIndex]?.dataset.target;
          if (target) this.go(target);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        this.go("home");
      }
    });
  },

  bindPopState() {
    window.addEventListener("popstate", () => {
      const targetScreen = this.getScreenFromUrl();
      if (targetScreen !== Model.state.screen && !Model.state.transitioning) {
        this.go(targetScreen);
      }
    });

    window.addEventListener("hashchange", () => {
      const targetScreen = this.getScreenFromUrl();
      if (targetScreen !== Model.state.screen && !Model.state.transitioning) {
        this.go(targetScreen);
      }
    });
  },
};

export default Router;
