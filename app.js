
/* =====================================
   LOGONG DIGITAL SOLUTIONS
   Main JavaScript
===================================== */

// Add your actual business email here.
// Example: const BUSINESS_EMAIL = "yourname@gmail.com";
const BUSINESS_EMAIL = "ivanlogong@gmail.com";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close mobile navigation after selecting a link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Automatically update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Highlight active navigation section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}

// Service buttons automatically select the requested service
document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    const requestedService = button.dataset.service;

    const matchingOption = [...serviceSelect.options].find(option => {
      return option.value === requestedService ||
        option.textContent === requestedService;
    });

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  });
});

// Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const service = formData.get("service");
  const budget = formData.get("budget");
  const message = formData.get("message").trim();

  const subject = `Project Inquiry - ${service}`;

  const emailBody = `
Hello LOGONG Digital Solutions,

I would like to inquire about your services.

CLIENT INFORMATION
Name: ${name}
Email: ${email}

PROJECT DETAILS
Service: ${service}
Estimated Budget: ${budget}

MESSAGE
${message}

Thank you!
  `.trim();

  // Use the email address configured at the top of this file.
  if (
    BUSINESS_EMAIL &&
    BUSINESS_EMAIL !== "ivanlogong@gmail.com" &&
    BUSINESS_EMAIL.includes("@")
  ) {
    const mailtoURL =
      `mailto:${BUSINESS_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    formStatus.textContent = "Opening your email application...";

    window.location.href = mailtoURL;
  } else {
    formStatus.textContent =
      "Please configure BUSINESS_EMAIL in app.js before using the inquiry form.";

    alert(
      "The contact form is ready!\n\n" +
      "To receive inquiries, open app.js and replace " +
      '"ivanlogong@gmail.com" with your actual business email.'
    );
  }
});

// Prevent accidental double-clicks on the mobile menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
