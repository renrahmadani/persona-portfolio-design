/* =====================================================================
   CONTACT MODULE — Contact Form Handler
   Asynchronous form submission via relay with mailto fallback.
   ===================================================================== */

import { Model } from "./model.js";
import { AudioPlayer } from "./audio.js";

export const Contact = {
  form: null,
  status: null,
  submitBtn: null,

  init() {
    this.form = document.getElementById("contact-form");
    if (!this.form) return;

    this.status = document.getElementById("form-status");
    this.submitBtn = this.form.querySelector(".form-send");

    this.bindSubmit();
  },

  bindSubmit() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this.form).entries());

      // Honeypot check: if filled, quietly reject bot
      if (data._honey) return;

      const name = (data.name || "").trim();
      const email = (data.email || "").trim();
      const message = (data.message || "").trim();

      if (!name || !email || !message) {
        if (this.status)
          this.status.textContent = "Fill in all three fields first.";
        return;
      }

      if (this.submitBtn) this.submitBtn.disabled = true;
      if (this.status) this.status.textContent = "Sending…";

      try {
        const res = await fetch(
          `https://formsubmit.co/ajax/${Model.contactEmail}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              message,
              _subject: `Portfolio message from ${name}`,
            }),
          },
        );

        if (!res.ok) throw new Error(String(res.status));

        if (this.status)
          this.status.textContent = "Sent! I'll get back to you soon.";
        this.form.reset();
        AudioPlayer.play();
      } catch {
        // Fallback: open visitor's native email client
        if (this.status) {
          this.status.textContent =
            "Couldn't reach the relay, opening your email app instead…";
        }
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
        location.href = `mailto:${Model.contactEmail}?subject=${subject}&body=${body}`;
      } finally {
        if (this.submitBtn) this.submitBtn.disabled = false;
      }
    });
  },
};

export default Contact;
