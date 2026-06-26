/* ============================================================
   Page It Forward — re-engagement popup
   Interaction: tap a "What gave you pause?" option to expand its
   tailored response; tapping the active option again collapses it.
   Only one response is open at a time.
   ============================================================ */
(function () {
  "use strict";

  document.querySelectorAll(".pif-modal").forEach(function (modal) {
    var triggers = modal.querySelectorAll("[data-target]");

    function select(trigger) {
      var wasOpen = trigger.getAttribute("aria-expanded") === "true";

      // Reset every option + close every response.
      triggers.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-expanded", "false");
      });
      modal.querySelectorAll(".pif-response").forEach(function (r) {
        r.classList.remove("is-open");
      });

      // Open the clicked one (unless it was already open — then it just collapses).
      if (!wasOpen) {
        trigger.classList.add("is-active");
        trigger.setAttribute("aria-expanded", "true");
        var target = trigger.getAttribute("data-target");
        var response = modal.querySelector('.pif-response[data-response="' + target + '"]');
        if (response) response.classList.add("is-open");
      }
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        select(trigger);
      });
    });

    // "Something else" free-form feedback -> warm thank-you.
    modal.querySelectorAll(".pif-feedback-send").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".pif-card");
        if (!card) return;
        var form = card.querySelector(".pif-feedback-form");
        var thanks = card.querySelector(".pif-feedback-thanks");
        /* In production (e.g. a Bubble workflow) this is where you would
           save the textarea value to your database before showing thanks. */
        if (form) form.hidden = true;
        if (thanks) thanks.hidden = false;
      });
    });
  });
})();
