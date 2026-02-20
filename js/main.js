/* ========================================
   MAIN JAVASCRIPT - DSC WEBSITE
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupMobileMenu();
  setupActiveNavLink();
  setupFormValidation();
  setupSmoothScroll();
  setupAOS();
  setupPaymentRedirect();
}

/* ========================================
   MOBILE MENU FUNCTIONALITY
   ======================================== */

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn) return;

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
    navLinks.style.position = "absolute";
    navLinks.style.top = "60px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.flexDirection = "column";
    navLinks.style.gap = "0";
    navLinks.style.background = "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)";
    navLinks.style.padding = "1rem";
    navLinks.style.zIndex = "999";
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      }
    });
  });
}

/* ========================================
   ACTIVE NAV LINK INDICATOR
   ======================================== */

function setupActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentLocation = location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentLocation ||
      (currentLocation === "" && href === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ========================================
   FORM VALIDATION & SUBMISSION
   ======================================== */

function setupFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input[required], textarea[required]");

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Remove previous error state
  field.style.borderColor = "";
  const errorMsg = field.parentElement.querySelector(".error-message");
  if (errorMsg) errorMsg.remove();

  // Required field check
  if (!value && field.hasAttribute("required")) {
    isValid = false;
    showError(field, "This field is required");
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      showError(field, "Please enter a valid email address");
    }
  }

  // Phone validation
  if (field.type === "tel" && value) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ""))) {
      isValid = false;
      showError(field, "Please enter a valid 10-digit phone number");
    }
  }

  // Password strength
  if (field.name === "password" && value) {
    if (value.length < 8) {
      isValid = false;
      showError(field, "Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      isValid = false;
      showError(
        field,
        "Password must contain uppercase letters and numbers"
      );
    }
  }

  if (isValid) {
    field.style.borderColor = "#22c55e";
  }

  return isValid;
}

function showError(field, message) {
  field.style.borderColor = "#ef4444";
  const errorMsg = document.createElement("small");
  errorMsg.classList.add("error-message");
  errorMsg.style.color = "#ef4444";
  errorMsg.style.marginTop = "0.25rem";
  errorMsg.style.display = "block";
  errorMsg.textContent = message;
  field.parentElement.appendChild(errorMsg);
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/* ========================================
   AOS (ANIMATE ON SCROLL) INITIALIZATION
   ======================================== */

function setupAOS() {
  // Check if AOS library is loaded
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // Refresh AOS on dynamic content
    window.addEventListener("load", function () {
      AOS.refresh();
    });
  }
}

/* ========================================
   PAYMENT GATEWAY REDIRECT
   ======================================== */

function setupPaymentRedirect() {
  const paymentForm = document.getElementById("payment-form");
  if (!paymentForm) return;

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form first
    if (!validateForm(this)) {
      alert("Please fill in all required fields correctly");
      return;
    }

    // Prepare payment data
    const formData = new FormData(this);
    const paymentData = {
      email: formData.get("email"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      amount: formData.get("amount") || "membership",
      event: formData.get("event"),
    };

    // Store payment data temporarily
    sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

    // Redirect to payment gateway (secure redirect)
    redirectToPaymentGateway(paymentData);
  });
}

function redirectToPaymentGateway(paymentData) {
  // This would be replaced with actual payment gateway URL
  const paymentGatewayURL = "https://payment-gateway.example.com/checkout";

  // Create form for secure POST redirect
  const form = document.createElement("form");
  form.method = "POST";
  form.action = paymentGatewayURL;

  Object.keys(paymentData).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = paymentData[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "2000";
  notification.style.maxWidth = "400px";
  notification.style.animation = "slideInUp 0.3s ease";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInDown 0.3s ease reverse";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, duration);
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Add animation to elements as they come into view
function observeElements() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll("[data-observe]").forEach((el) => {
    observer.observe(el);
  });
}

// Format date function
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Check if page is loading data
function setLoadingState(isLoading) {
  const body = document.body;
  if (isLoading) {
    body.classList.add("loading");
  } else {
    body.classList.remove("loading");
  }
}

// Initialize on page load
window.addEventListener("load", function () {
  observeElements();
});

// Export functions for use in other scripts
window.DCSFunctions = {
  validateForm,
  validateField,
  showNotification,
  formatDate,
  getQueryParam,
  redirectToPaymentGateway,
};
