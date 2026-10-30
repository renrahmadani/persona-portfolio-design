/* =====================================================================
   VISUALS MODULE — Persona 5 Aesthetic Effects
   Ransom-note cutout lettering, low-overhead parallax, and HUD clock.
   ===================================================================== */

export const Visuals = {
  reducedMotion: false,
  parallaxRunning: false,
  targetX: 0,
  targetY: 0,
  currentX: 0,
  currentY: 0,

  init() {
    this.reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.initRansomText();
    this.initClock();
    if (!this.reducedMotion) {
      this.initParallax();
    }
  },

  // Deterministic 32-bit hash for stable letter rotation & styles
  hash(str) {
    let h = 9;
    for (let i = 0; i < String(str).length; i++) {
      h = Math.imul(h ^ String(str).charCodeAt(i), 387420489);
    }
    return (h ^ (h >>> 9)) >>> 0;
  },

  ransomize(el) {
    const text = el.dataset.ransom || el.textContent;
    el.textContent = "";

    [...String(text)].forEach((c, i) => {
      const span = document.createElement("span");
      span.className = "ch display";

      if (c === " ") {
        span.textContent = "\u00A0";
        span.classList.add("space");
        el.appendChild(span);
        return;
      }

      span.textContent = c;
      const h = this.hash(text + i);
      const rot = (h % 17) - 8; // -8deg to +8deg
      const scale = 0.86 + ((h >> 3) % 30) / 100; // 0.86 to 1.15
      const dy = ((h >> 5) % 9) - 4; // -4px to +4px
      const transform = `rotate(${rot}deg) scale(${scale}) translateY(${dy}px)`;

      span.style.setProperty("--t", transform);
      span.style.transform = transform;

      const variant = (h >> 7) % 10;
      if (variant === 0) span.classList.add("box");
      else if (variant === 1) span.classList.add("boxw");
      else if (variant === 2) span.classList.add("red");

      el.appendChild(span);
    });
  },

  initRansomText() {
    document
      .querySelectorAll("[data-ransom]")
      .forEach((el) => this.ransomize(el));
  },

  initClock() {
    const clockEl = document.getElementById("clock");
    if (!clockEl) return;

    const tick = () => {
      clockEl.textContent =
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) + " · TGR";
    };
    tick();
    setInterval(tick, 1000);
  },

  initParallax() {
    // Only enable mouse parallax on desktop / fine pointer devices to save mobile battery
    const isDesktop =
      window.matchMedia &&
      (window.matchMedia("(pointer: fine)").matches || window.innerWidth > 768);
    if (!isDesktop) return;

    const stripes = document.getElementById("bg-stripes");
    const halftone = document.getElementById("bg-halftone");

    window.addEventListener(
      "mousemove",
      (e) => {
        this.targetX = e.clientX / window.innerWidth - 0.5;
        this.targetY = e.clientY / window.innerHeight - 0.5;

        if (!this.parallaxRunning) {
          this.parallaxRunning = true;
          requestAnimationFrame(loop);
        }
      },
      { passive: true },
    );

    const loop = () => {
      const dx = this.targetX - this.currentX;
      const dy = this.targetY - this.currentY;

      this.currentX += dx * 0.06;
      this.currentY += dy * 0.06;

      const sx = (this.currentX * 22).toFixed(2);
      const sy = (this.currentY * 14).toFixed(2);
      if (stripes) stripes.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;

      const hx = (this.currentX * -34).toFixed(2);
      const hy = (this.currentY * -22).toFixed(2);
      if (halftone)
        halftone.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;

      const arts = document.querySelectorAll(".menu-art");
      const ax = (this.currentX * 14).toFixed(2);
      const ay = (this.currentY * 9).toFixed(2);
      arts.forEach((a) => {
        if (a.isConnected)
          a.style.transform = `translate3d(${ax}px, ${ay}px, 0) scale(1.04)`;
      });

      // Pause loop when damping settles near target to save GPU cycles & battery
      if (Math.abs(dx) > 0.0002 || Math.abs(dy) > 0.0002) {
        requestAnimationFrame(loop);
      } else {
        this.parallaxRunning = false;
      }
    };
  },
};

export default Visuals;
