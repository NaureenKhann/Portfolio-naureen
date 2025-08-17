// === Typed.js Setup ===
var type = new Typed(".text", {
  strings: [
    "Frontend Developer",
    "Full Stack Web Developer",
    "Machine Learning Engineer",
    "Chatbot Developer",
    "Online Coding Tutor",
    "Digital Marketing Specialist",
    "Content Creator",
    "Tech Enthusiast"
  ],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 1000,
  loop: true
});

// === Theme Toggle ===
const toggleTheme = document.getElementById('toggle-theme');
function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    toggleTheme.checked = true;
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    toggleTheme.checked = false;
  }
}

// Toggle event
toggleTheme.addEventListener('change', () => {
  setTheme(toggleTheme.checked ? "light" : "dark");
});

// Initial theme on load
window.onload = () => {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
};

// === Skill Progress Bars Animation ===
const progressBars = document.querySelectorAll('.progress-line span');
function animateProgressBars() {
  progressBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percent') || "90"; // default
    bar.style.width = percentage + "%";
  });
}

// === Radial Circle Animation ===
const radialCircles = document.querySelectorAll('radial-bars');
function animateRadials() {
  radialCircles.forEach(circle => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    const percent = circle.getAttribute('data-percent') || 90;
    const offset = circumference - (percent / 100) * circumference;

    setTimeout(() => {
      circle.style.transition = "stroke-dashoffset 2s ease";
      circle.style.strokeDashoffset = offset;
    }, 300);
  });
}
// Set progress for each skill
document.addEventListener("DOMContentLoaded", () => {
  const circleValues = [
    { selector: ".progress-bar-1", percent: 90 },
    { selector: ".progress-bar-2", percent: 80 },
    { selector: ".progress-bar-3", percent: 75 },
    { selector: ".progress-bar-4", percent: 90 },
  ];
  const total = 2 * Math.PI * 80; // r=80

  circleValues.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) {
      const offset = total * (1 - item.percent / 100);
      el.style.setProperty("--bar-offset", offset);
      el.style.strokeDasharray = total;
      el.style.strokeDashoffset = total;
      // Remove previous animation to re-trigger
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.circle-bar').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent/100);
    bar.style.strokeDasharray = circumference;
    setTimeout(() => {
      bar.style.strokeDashoffset = offset;
    }, 300); // delay for animation
  });
});
// === Intersection Observer (trigger on scroll) ===
const observerOptions = { threshold: 0.3 };

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === "skills") {
        animateProgressBars();
      }
      if (entry.target.id === "services") {
        animateRadials();
      }
      observer.unobserve(entry.target); // only animate once per section
    }
  });
}, observerOptions);

// Observe both services & skills sections
const skillsSection = document.querySelector("#skills");
const servicesSection = document.querySelector("#services");

if (skillsSection) skillObserver.observe(skillsSection);
if (servicesSection) skillObserver.observe(servicesSection);

// === Intersection Observer (trigger on scroll) ===


