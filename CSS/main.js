let translations = {}; // will be loaded via fetch()

// 1. Load translations.json
async function loadTranslations() {
    try {
        const response = await fetch("../CSS/translations.json");
        translations = await response.json();
    } catch (err) {
        console.error("Error loading translations.json", err);
    }
}

// 2. Initialize everything after translations are loaded
async function init() {
    await loadTranslations();

    const burgerBtn = document.getElementById('burgerBtn');
    const navLeft = document.getElementById('nav-left');
    const languageBtn = document.getElementById('languageBtn');
    const dropdown = document.getElementById('dropdownContent');

    // Toggle burger menu
    burgerBtn.addEventListener('click', function() {
        navLeft.classList.toggle('responsive');
        this.classList.toggle('change');
    });

    // Toggle language dropdown on mobile
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        dropdown.classList.remove('show');
    });

    // Collapse language dropdown and menu on other nav buttons (mobile)
    const navButtons = document.querySelectorAll('.nav-btn:not(#languageBtn)');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            dropdown.classList.remove('show');
            if (window.innerWidth <= 600) {
                navLeft.classList.remove('responsive');
                burgerBtn.classList.remove('change');
            }
        });
    });

    // Update page language
    function setLanguage(lang) {
        localStorage.setItem("lang", lang);

        document.querySelectorAll("[data-key]").forEach(elem => {
            const key = elem.getAttribute("data-key");

            if (key === "main" || key === "legend" || key === "IANVS"|| key === "Carbon" || key === "Visite" || key === "Contatto" || key === "Contact" || key === "about" ) {
                elem.innerHTML = translations[lang][key];
            } else {
                elem.textContent = translations[lang][key];
            }
        });
    }

    // Make function available globally (for buttons in HTML)
    window.setLanguage = setLanguage;

    // Load saved language
    const saved = localStorage.getItem("lang") || "en";
    setLanguage(saved);
}

// Run everything when DOM is ready
document.addEventListener("DOMContentLoaded", init);


// Display last modified date
const modified = new Date(document.lastModified);
    document.getElementById("lastModified").textContent =
        modified.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
