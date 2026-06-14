// ─────────────────────────────────────────────────
// EmailJS configuration
//   → Sign up free at https://www.emailjs.com
//   → Add a Gmail service → create a template
//   → Copy your keys below
// ─────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = "DpF5jEO3Y3xiwLUf_"; // e.g. "user_abc123xyz"
const EMAILJS_SERVICE_ID = "service_a0gxnot"; // e.g. "service_gmail"
const EMAILJS_TEMPLATE_ID = "template_8e7s5rd"; // e.g. "template_contact"

(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

function sendEmail() {
  const name = document.getElementById("from_name").value.trim();
  const email = document.getElementById("from_email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const btn = document.getElementById("submitBtn");
  const msg = document.getElementById("formMsg");
  const btnText = document.getElementById("btnText");

  msg.className = "form-msg";
  msg.style.display = "none";

  if (!name || !email || !message) {
    msg.className = "form-msg error";
    msg.textContent = "Please fill in your name, email, and message.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.className = "form-msg error";
    msg.textContent = "Please enter a valid email address.";
    return;
  }

  btn.disabled = true;
  btnText.textContent = "Sending...";

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject || "Portfolio Contact Form",
    message: message,
    to_name: "Jayesh",
  };

  if (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
  ) {
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        msg.className = "form-msg success";
        msg.textContent = "Message sent — Jayesh will respond within 24 hours.";
        document.getElementById("from_name").value = "";
        document.getElementById("from_email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
      })
      .catch(() => {
        msg.className = "form-msg error";
        msg.textContent =
          "Failed to send. Please email jayeshkale052@gmail.com directly.";
      })
      .finally(() => {
        btn.disabled = false;
        btnText.textContent = "Send message →";
      });
  } else {
    // Demo fallback — shown until EmailJS keys are configured
    setTimeout(() => {
      msg.className = "form-msg success";
      msg.textContent =
        "Demo mode — add your EmailJS keys in script.js to activate sending.";
      btn.disabled = false;
      btnText.textContent = "Send message →";
    }, 900);
  }
}

// Mobile nav toggle
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}
function closeNav() {
  document.getElementById("navLinks").classList.remove("open");
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);
revealEls.forEach((el) => revealObs.observe(el));
