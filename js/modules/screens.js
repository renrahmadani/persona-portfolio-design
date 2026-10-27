/* =====================================================================
   SCREENS MODULE — View Rendering
   Handles DOM rendering for screens, project cards, and skill meters.
   ===================================================================== */

import { Visuals } from "./visuals.js";

export const Screens = {
  screens: {},
  menuItems: [],
  featGrid: null,
  repoGrid: null,
  skillsBody: null,

  init() {
    this.screens = {};
    document.querySelectorAll(".screen").forEach((s) => {
      this.screens[s.id.replace("screen-", "")] = s;
    });

    this.menuItems = [...document.querySelectorAll(".menu-item")];
    this.featGrid = document.getElementById("feat-grid");
    this.repoGrid = document.getElementById("repo-grid");
    this.skillsBody = document.getElementById("skills-body");
  },

  showScreen(name) {
    Object.values(this.screens).forEach((sc) => sc.classList.remove("active"));

    const target = this.screens[name];
    if (target) {
      target.classList.add("active");
      target.scrollTop = 0;
    }

    document.body.dataset.screen = name;
    document.body.classList.remove(
      "page-home",
      "page-projects",
      "page-skills",
      "page-about",
      "page-contact",
    );
    if (name) {
      document.body.classList.add(`page-${name}`);
    }
  },

  setMenuSelection(index) {
    this.menuItems.forEach((m, j) => m.classList.toggle("sel", j === index));
  },

  splitTitle(title) {
    const parts = String(title).split(" ");
    const first = parts[0] || "";
    const rest = String(title).slice(first.length);
    return `<em>${first}</em>${rest}`;
  },

  cardThumb(src, tag) {
    return `
      <div class="thumb" data-tag="${tag || "DESIGN"}">
        <img src="${src}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'">
      </div>
    `;
  },

  renderFeatured(list) {
    if (!this.featGrid || this.featGrid.childElementCount > 0) return;

    (list || []).forEach((f, i) => {
      const a = document.createElement("a");
      a.className = "card feat";
      a.href = f.url || "#";
      if (!f.url || f.url === "#") {
        a.addEventListener("click", (e) => e.preventDefault());
      } else {
        a.target = "_blank";
        a.rel = "noopener";
      }

      const tilt = (((Visuals.hash(f.title) % 5) - 2) * 0.8).toFixed(1);
      a.style.setProperty("--tilt", `${tilt}deg`);
      a.style.setProperty("--d", `${i * 70}ms`);
      a.innerHTML = `
        ${this.cardThumb(f.img, f.tag)}
        <span class="lang" style="--lc:${f.color || "#e60012"}">${f.tag || "DESIGN"}</span>
        <h3>${this.splitTitle(f.title)}</h3>
        <p>${f.desc || ""}</p>
        <div class="meta"><span>HIGHLIGHT</span><span class="go">${f.cta || "PREVIEW"}</span></div>
      `;
      this.featGrid.appendChild(a);
    });
  },

  renderGraphicProjects(projects) {
    if (!this.repoGrid) return;
    this.repoGrid.innerHTML = "";

    (projects || []).forEach((p, i) => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = p.url || "#";
      if (!p.url || p.url === "#") {
        a.addEventListener("click", (e) => e.preventDefault());
      } else {
        a.target = "_blank";
        a.rel = "noopener";
      }

      const tilt = (((Visuals.hash(p.name || p.title) % 5) - 2) * 0.8).toFixed(
        1,
      );
      a.style.setProperty("--tilt", `${tilt}deg`);
      a.style.setProperty("--d", `${i * 70}ms`);
      a.style.setProperty("--lc", "#e60012");
      const img = p.img || `assets/projects/${p.name}.png`;

      a.innerHTML = `
        ${this.cardThumb(img, p.tag)}
        <span class="lang">${p.tag || "DESIGN"}</span>
        <h3>${this.splitTitle(p.title)}</h3>
        <p>${p.description || ""}</p>
        <div class="meta">
          <span>${p.tag || "DESIGN"}</span>
          <span class="go">VIEW DESIGN</span>
        </div>
      `;
      this.repoGrid.appendChild(a);
    });
  },

  renderSkills(groups) {
    if (!this.skillsBody) return;
    this.skillsBody.innerHTML = "";

    (groups || []).forEach((g) => {
      const div = document.createElement("div");
      div.className = "skill-group";
      div.innerHTML = `<h3>${g.group}</h3>`;

      (g.items || []).forEach(([name, value]) => {
        const row = document.createElement("div");
        row.className = "skill-row";
        row.innerHTML = `
          <span class="name">${name}</span>
          <div class="skill-bar"><div class="fill" data-v="${value}"></div></div>
          <span class="lv">${value}</span>
        `;
        div.appendChild(row);
      });

      this.skillsBody.appendChild(div);
    });
  },

  animateSkillBars() {
    if (!this.skillsBody) return;
    const fills = this.skillsBody.querySelectorAll(".fill");
    fills.forEach((f) => {
      f.style.width = "0";
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fills.forEach((f, i) => {
          setTimeout(() => {
            f.style.width = `${f.dataset.v}%`;
          }, i * 60);
        });
      });
    });
  },
};

export default Screens;
