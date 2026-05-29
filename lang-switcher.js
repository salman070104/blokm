/* ==========================================================================
   PREMIUM DYNAMIC LANGUAGE SWITCHER SYSTEM (INDONESIAN & ENGLISH)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine initial language
    let currentLang = localStorage.getItem("blokm-lang") || "id";
    
    // Function to apply language class to body and update switchers
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("blokm-lang", lang);
        
        // Remove existing language classes
        document.body.classList.remove("lang-id", "lang-en");
        // Add active language class
        document.body.classList.add(`lang-${lang}`);
        
        // Set lang attribute of html tag for screen readers
        document.documentElement.setAttribute("lang", lang);
        
        // Update all language switcher buttons on the page
        const switchers = document.querySelectorAll(".lang-switcher");
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
    
    // Apply initial language state
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
