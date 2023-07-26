// Custom scripts

// Show menu
function showMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
}
showMenu();

// Show active link
const sections = document.querySelectorAll("section[id]");

function activeSection() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", activeSection);

// Remove menu mobile on click to any link
const link = document.querySelectorAll(".nav__menu-link");

function hiddenMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.remove("show-menu");
}
link.forEach((item) => item.addEventListener("click", hiddenMenu));

// Scroll top button
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");

  if (this.scrollY >= 560) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollTop);

// Dark Mode Theme
const darkMode = document.getElementById("theme-btn");
const darkTheme = "dark-mode";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  return document.body.classList.contains(darkTheme) ? "dark" : "light";
};
const getCurrentIcon = () => {
  return darkMode.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  darkMode.classList[selectedIcon === "bx-moon" ? "add" : "remove"](iconTheme);
}

darkMode.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  darkMode.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// scale sheet to A4 and prit it and Generate PDF resume
function scaleA4() {
  document.body.classList.add("a4ScaleResume");
}
function removeScaleA4() {
  document.body.classList.remove("a4ScaleResume");
}

const resumeCV = document.getElementById("resume-cv");
const resumeBtn = document.getElementById("resume-btn");
let options = {
  margin: 0,
  filename: "CV_eduard-tobilko.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { format: "letter", orientation: "portrait", unit: "in" },
};

function generateResumeToPDF() {
  html2pdf(resumeCV, options);
}

resumeBtn.addEventListener("click", () => {
  scaleA4();
  generateResumeToPDF();
  setTimeout(removeScaleA4, 2500);
});
