/* =====================================================================
   TRANSITIONS MODULE — Persona 5 Screen Wipe
   Multi-pane skewed slash screen wipe with mid-swap & completion hooks.
   ===================================================================== */

export const Transitions = {
  wipeEl: null,
  reducedMotion: false,

  init() {
    this.wipeEl = document.getElementById("wipe");
    this.reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  wipe(swapCallback, doneCallback) {
    if (this.reducedMotion || !this.wipeEl) {
      if (typeof swapCallback === "function") swapCallback();
      if (typeof doneCallback === "function") doneCallback();
      return;
    }

    const el = this.wipeEl;
    el.classList.remove("go");
    // Trigger reflow to restart CSS keyframe animation
    void el.offsetWidth;
    el.classList.add("go");

    const isMobile = window.innerWidth <= 768;
    const swapDelay = isMobile ? 260 : 340;
    const doneDelay = isMobile ? 540 : 720;

    // Mid-wipe: screen is fully covered by red/black/white panes
    setTimeout(() => {
      if (typeof swapCallback === "function") swapCallback();
    }, swapDelay);

    // End of wipe: screen fully unveiled
    setTimeout(() => {
      if (typeof doneCallback === "function") doneCallback();
    }, doneDelay);
  },
};

export default Transitions;
