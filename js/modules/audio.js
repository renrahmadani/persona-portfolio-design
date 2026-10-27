/* =====================================================================
   AUDIO MODULE — Persona 5 Sound Effects
   Manages SFX playback, audio context unlock, and volume.
   ===================================================================== */

export const AudioPlayer = {
  sfx: null,
  unlocked: false,

  init() {
    this.sfx = document.getElementById("sfx-select");
    if (this.sfx) {
      this.sfx.volume = 0.5;
    }
    this.bindUnlock();
  },

  bindUnlock() {
    const unlock = () => {
      this.unlocked = true;
      if (this.sfx) {
        this.sfx.muted = false;
        try {
          // Silent unlock probe
          const p = this.sfx.play();
          if (p && p.then) {
            p.then(() => {
              this.sfx.pause();
              this.sfx.currentTime = 0;
            }).catch(() => {});
          }
        } catch {}
      }
    };

    const unlockEvents = ["pointerdown", "keydown", "touchstart", "click"];
    unlockEvents.forEach((ev) => {
      window.addEventListener(ev, unlock, {
        once: true,
        capture: true,
        passive: true,
      });
    });
  },

  play() {
    if (!this.sfx) return;
    try {
      this.sfx.currentTime = 0;
      const playPromise = this.sfx.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    } catch {}
  },
};

export default AudioPlayer;
