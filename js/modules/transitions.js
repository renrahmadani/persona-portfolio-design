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

    // Mid-wipe: screen is fully covered by red/black/white panes
    setTimeout(() => {
      if (typeof swapCallback === "function") swapCallback();
    }, 340);

    // End of wipe: screen fully unveiled
    setTimeout(() => {
      if (typeof doneCallback === "function") doneCallback();
    }, 720);
  },
};

export default Transitions;
