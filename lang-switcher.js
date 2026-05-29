/* ==========================================================================
   PREMIUM DYNAMIC LANGUAGE SWITCHER SYSTEM (INDONESIAN & ENGLISH)
   ========================================================================== */

// 1. Determine initial language and apply immediately to prevent FOUC (if script loaded in head)
let currentLang = localStorage.getItem("blokm-lang") || "id";

// Function to apply language class to HTML element and update switchers
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("blokm-lang", lang);
    
    // Remove existing language classes from HTML root
    document.documentElement.classList.remove("lang-id", "lang-en");
    // Add active language class to HTML root
    document.documentElement.classList.add(`lang-${lang}`);
    
    // Set lang attribute of html tag for screen readers
    document.documentElement.setAttribute("lang", lang);
    
    // Update all language switcher buttons on the page (if DOM is ready)
    const switchers = document.querySelectorAll(".lang-switcher");
    if (switchers) {
        switchers.forEach(switcher => {
            const btns = switcher.querySelectorAll(".lang-btn");
            btns.forEach(btn => {
                if (btn.getAttribute("data-lang") === lang) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        });
    }
}

// Apply initial language state immediately (will work if this script is in head)
applyLanguage(currentLang);

// Wait for DOM to attach event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    // Re-apply to ensure buttons are updated now that they exist in the DOM
    applyLanguage(currentLang);

    // 2. Event delegation for clicks on language options
    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest(".lang-btn");
        if (!btn) return;
        
        const switcher = btn.closest(".lang-switcher");
        if (!switcher) return;
        
        e.preventDefault();
        const selectedLang = btn.getAttribute("data-lang");
        if (selectedLang && selectedLang !== currentLang) {
            applyLanguage(selectedLang);
        }
    });
});
