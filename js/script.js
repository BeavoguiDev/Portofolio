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

const certifications = [
    {
        title: "Développeur Fullstack",
        institution: "Dakar Institute of Technology",
        date: "Avril – Septembre 2025",
        description: "Certification intensive en développement web moderne (Frontend & Backend).",
        file: "certificats/fullstack.pdf",
        highlight: true
    },
    {
        title: "Initiation à l’Intelligence Artificielle",
        institution: "OpenClassroom",
        description: "Introduction aux concepts fondamentaux de l’IA et du Machine Learning.",
        file: "certificats/ia.pdf"
    },
    {
        title: "Fondamentaux d’Excel",
        institution: "OpenClassroom",
        description: "Maîtrise des bases d’Excel pour l’analyse et la gestion de données.",
        file: "certificats/excel.pdf"
    }
];

const certContainer = document.querySelector(".certifications");

certifications.forEach(cert => {
    const div = document.createElement("div");
    div.className = "certification" + (cert.highlight ? " highlight" : "");
    div.innerHTML = `
        <h3>${cert.title}</h3>
        <span>${cert.date || ""} ${cert.institution}</span>
        <p>${cert.description}</p>
        <a href="${cert.file}" target="_blank" class="btn-certif">
            <i class="fa-solid fa-eye"></i> Voir
        </a>
    `;
    certContainer.appendChild(div);
});


// PROJETS
const projects = [
    {
        title: "Portfolio Personnel",
        image: "images/portofolio.png",
        alt: "Aperçu du projet Portfolio",
        description: "Portfolio personnel développé en HTML, CSS et JavaScript.",
        details: ["HTML5 sémantique", "CSS moderne (Flexbox, Grid)", "JavaScript (DOM, events)"],
        link: "https://github.com/BeavoguiDev/Portofolio"
    },
    {
        title: "App Gestion de stock",
        image: "images/stock.png",
        alt: "Aperçu Gestion de stock",
        description: "Appli de gestion de stock, gère les commandes, les fournisseurs, les magasins, Tableau de bord etc...",
        details: ["Angular", "APIrest", "Laravel","Mysql"],
        link: "https://github.com/BeavoguiDev/stock-backend"
    }
];

const projContainer = document.querySelector(".projects");

projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
        <div class="project-header">
            <h3>${proj.title}</h3>
            <button class="toggle-btn" aria-expanded="false">+</button>
        </div>
        <div class="project-details">
            <img src="${proj.image}" alt="${proj.alt}" class="project-image">
            <p>${proj.description}</p>
            <ul>${proj.details.map(d => `<li>${d}</li>`).join("")}</ul>
            <a href="${proj.link}" target="_blank" class="project-link">
                <i class="fa-brands fa-github"></i> Voir le code sur GitHub
            </a>
        </div>
    `;
    projContainer.appendChild(card);
});

// EXPERIENCES
const experiences = [
    {
        title: "Bot Trainer – Stagiaire Orange Guinée",
        date: "15/08/2023 – 15/08/2024",
        tasks: [
            "Mise en place des parcours clients",
            "Enrichissement des données d’entraînement",
            "Analyse et amélioration des performances du bot",
            "Apport de correctifs sur les lacunes identifiées"
        ]
    },
    {
        title: "Bot Trainer – Orange Guinée / Cawa-group (intérim)",
        date: "16/09/2024 – 15/09/2025",
        tasks: [
            "Enrichir les données d’entraînement et améliorer la compréhension du bot",
            "Mise en place d’un système de machine learning pour améliorer le bot",
            "Implémentation de solutions ML et RAG"
        ]
    }
];

const expContainer = document.querySelector(".experience-list");

experiences.forEach(exp => {
    const div = document.createElement("div");
    div.className = "experience-item";
    div.innerHTML = `
        <h3>${exp.title}</h3>
        <span>${exp.date}</span>
        <ul>
            ${exp.tasks.map(task => `<li>${task}</li>`).join("")}
        </ul>
    `;
    expContainer.appendChild(div);
});

// COMPETANCE
const competences = [
    {
        icon: "fa-solid fa-code",
        title: "Développement Web",
        description: "HTML, CSS, JavaScript, Angular, Laravel"
    },
    {
        icon: "fa-solid fa-server",
        title: "Backend & API",
        description: "Python, API REST, Git/GitHub"
    },
    {
        icon: "fa-solid fa-robot",
        title: "IA & Chatbot",
        description: "Bot Training, Machine Learning, RAG, Knowledge Base"
    }
];

const skillsContainer = document.querySelector(".skills");

competences.forEach(skill => {
    const div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `
        <h3><i class="${skill.icon}"></i> ${skill.title}</h3>
        <p>${skill.description}</p>
    `;
    skillsContainer.appendChild(div);
});

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
const hamburger = document.getElementById("menu");
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