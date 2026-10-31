/* =====================================================================
   CURSOR MODULE — Persona 5 Interactive Cursor
   30-frame sprite-strip animated cursor with hover detection & fallbacks.
   ===================================================================== */

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "label",
  ".card",
  ".menu-item",
  ".back-hint",
  ".contact-chip",
  "#big-name",
  ".cv-btn",
  ".form-send",
  "[data-back]",
  "[data-target]",
].join(",");

export const Cursor = {
  el: null,
  active: false,
  visible: false,
  x: -100,
  y: -100,
  frame: 0,
  lastFrameTime: 0,
  rafId: null,

  init() {
    this.el = document.getElementById("cursor");
    if (!this.el) return;

    // Completely disable custom cursor on mobile / touch screens to prevent RAF loop and lag
    const isMobile =
      window.innerWidth <= 768 ||
      (window.matchMedia &&
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(pointer: fine)").matches);

    if (isMobile) {
      if (this.el) this.el.style.display = "none";
      return;
    }

    // Detect mouse/trackpad pointer (including Windows touchscreen laptops in Edge)
    const hasFinePointer =
      window.matchMedia &&
      (window.matchMedia("(pointer: fine)").matches ||
        window.matchMedia("(any-pointer: fine)").matches);

    if (!hasFinePointer) {
      if (this.el) this.el.style.display = "none";
      return;
    }

    // Preload sprite images so there is zero flash when switching states
    const imgNormal = new Image();
    imgNormal.src = "assets/cursors/normal.png";
    const imgLink = new Image();
    imgLink.src = "assets/cursors/link.png";

    this.active = true;
    this.bindEvents();
    this.startLoop();
  },

  bindEvents() {
    const onMove = (e) => {
      if (typeof e.clientX !== "number") return;
      this.x = e.clientX;
      this.y = e.clientY;

      if (!this.visible) {
        this.visible = true;
        this.el.classList.add("visible");
        document.body.classList.add("cursor-active");
      }

      this.updateHoverFromTarget(e.target);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
      this.visible = false;
      this.el.classList.remove("visible");
      document.body.classList.remove("cursor-active");
    });

    document.documentElement.addEventListener("mouseenter", (e) => {
      if (typeof e.clientX === "number") {
        this.x = e.clientX;
        this.y = e.clientY;
      }
      this.visible = true;
      this.el.classList.add("visible");
      document.body.classList.add("cursor-active");
      this.checkHover();
    });

    window.addEventListener("blur", () => {
      this.visible = false;
      this.el.classList.remove("visible");
      document.body.classList.remove("cursor-active");
    });

    window.addEventListener("focus", () => {
      this.checkHover();
    });

    // Update hover state when scrolling without moving mouse
    window.addEventListener("scroll", () => this.checkHover(), {
      passive: true,
      capture: true,
    });
  },

  updateHoverFromTarget(target) {
    if (!target) return;
    const el = target.nodeType === 3 ? target.parentElement : target;
    const isInteractive = Boolean(
      el &&
      typeof el.closest === "function" &&
      el.closest(INTERACTIVE_SELECTOR),
    );
    this.el.classList.toggle("link", isInteractive);
  },

  checkHover() {
    if (!this.active || this.x < 0 || this.y < 0) return;
    try {
      const elAtPoint = document.elementFromPoint(this.x, this.y);
      if (elAtPoint) {
        this.updateHoverFromTarget(elAtPoint);
      }
    } catch {}
  },

  startLoop() {
    const tick = (timestamp) => {
      // 50ms per frame = 20 fps matching original Persona 5 cursor .ani rate
      if (timestamp - this.lastFrameTime >= 50) {
        this.frame = (this.frame + 1) % 30;
        this.lastFrameTime = timestamp;
        this.el.style.setProperty(
          "background-position",
          `-${this.frame * 48}px 0`,
          "important",
        );
      }

      if (this.visible) {
        this.el.style.setProperty(
          "transform",
          `translate3d(${this.x}px, ${this.y}px, 0)`,
          "important",
        );
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  },
};

export default Cursor;
