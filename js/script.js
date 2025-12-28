const texte = "Dev Fullstack Web Junior | Bot Trainer";
const titre = document.getElementById("titre");

let i = 0, j = 0;

function afficheTitre() {
    if (i < texte.length) {
        titre.innerHTML += texte.charAt(i);
        i++;
        setTimeout(afficheTitre, 100);
    }
}

afficheTitre();

// ===== SCROLL FLUIDE =====
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ===== MENU ACTIF AU SCROLL (avec throttle) =====
const sections = document.querySelectorAll("section");

let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }, 100);
});

// ===== ANIMATION APPARITION DES SECTIONS =====
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.2 }
);

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// ===== MENU HAMBURGER =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    const expanded = navLinks.classList.toggle("show-menu");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", expanded);
});

// Fermer le menu après clic sur un lien (mobile)
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show-menu");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", false);
    });
});

// ===== DARK MODE =====
const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
});

// ===== PROJETS : AFFICHER / MASQUER DETAILS (fermer les autres) =====
const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const details = btn.parentElement.nextElementSibling;

        // Fermer tous les autres projets
        document.querySelectorAll(".project-details").forEach(d => {
            if (d !== details) {
                d.classList.remove("open");
                d.previousElementSibling.querySelector(".toggle-btn").textContent = "+";
                d.previousElementSibling.querySelector(".toggle-btn").setAttribute("aria-expanded", false);
            }
        });

        // Toggle le projet cliqué
        details.classList.toggle("open");
        const isVisible = details.classList.contains("open");

        btn.textContent = isVisible ? "-" : "+";
        btn.setAttribute("aria-expanded", isVisible);
    });
});