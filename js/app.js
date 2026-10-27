/* =====================================================================
   APP ENTRY POINT — Persona 5 Portfolio
   Bootstraps modules, binds global interactions, and manages lifecycle.
   ===================================================================== */

import { Model } from "./modules/model.js";
import { Cursor } from "./modules/cursor.js";
import { AudioPlayer } from "./modules/audio.js";
import { Visuals } from "./modules/visuals.js";
import { Transitions } from "./modules/transitions.js";
import { Screens } from "./modules/screens.js";
import { Contact } from "./modules/contact.js";
import { Router } from "./modules/router.js";

const App = {
  init() {
    // 1. Initialize presentation and audio layers
    Visuals.init();
    AudioPlayer.init();
    Transitions.init();
    Screens.init();
    Contact.init();

    // 2. Bind DOM navigation and action triggers
    this.bindInteractions();

    // 3. Initialize routing and display initial screen
    Router.init();

    // 4. Initialize Persona 5 interactive animated cursor
    Cursor.init();

    // 5. Mark page loaded for entry animations
    document.body.classList.add("loaded");
  },

  bindInteractions() {
    // Menu items
    document.querySelectorAll(".menu-item").forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        Router.selectMenuItem(index);
      });
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const target = item.dataset.target;
        if (target) Router.go(target);
      });
    });

    // Back buttons
    document.querySelectorAll("[data-back]").forEach((btn) => {
      btn.addEventListener("mouseenter", () => AudioPlayer.play());
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("home");
      });
    });

    // Action buttons & chips (audio feedback)
    document.querySelectorAll(".cv-btn, .contact-chip").forEach((el) => {
      el.addEventListener("mouseenter", () => AudioPlayer.play());
      el.addEventListener("click", () => AudioPlayer.play());
    });

    // Big Name Header: clicking always returns to home screen
    const bigName = document.getElementById("big-name");
    if (bigName) {
      bigName.addEventListener("mouseenter", () => AudioPlayer.play());
      bigName.addEventListener("click", () => {
        if (Model.state.screen !== "home") {
          Router.go("home");
        } else {
          AudioPlayer.play();
        }
      });
    }
  },
};

// Bootstrap when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}

// Global exposure for debugging / console inspection
window.PersonaApp = { Model, Router, Screens, Cursor, AudioPlayer };
