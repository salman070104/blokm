/* ==========================================================================
   PREMIUM DYNAMIC LANGUAGE SWITCHER SYSTEM (INDONESIAN & ENGLISH)
   Anti-FOUC: This script MUST be loaded in <head> to apply language
   class to <html> BEFORE any content is rendered.
   ========================================================================== */

// IMMEDIATELY apply language class to <html> to prevent any flash
(function() {
    var savedLang = localStorage.getItem("blokm-lang") || "id";
    document.documentElement.classList.add("lang-" + savedLang);
    document.documentElement.setAttribute("lang", savedLang);
})();

// Full initialization after DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    var currentLang = localStorage.getItem("blokm-lang") || "id";

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("blokm-lang", lang);

        // Update classes on <html>
        document.documentElement.classList.remove("lang-id", "lang-en");
        document.documentElement.classList.add("lang-" + lang);
        document.documentElement.setAttribute("lang", lang);

        // Update all language toggle buttons on the page
        var toggleBtns = document.querySelectorAll(".lang-toggle-btn");
        toggleBtns.forEach(function(btn) {
            btn.textContent = lang === 'id' ? 'IN' : 'EN';
        });
    }

    // Apply initial language state
    applyLanguage(currentLang);

    // Event delegation for clicks on language toggle buttons
    document.body.addEventListener("click", function(e) {
        var btn = e.target.closest(".lang-toggle-btn");
        if (!btn) return;

        e.preventDefault();
        var nextLang = currentLang === 'id' ? 'en' : 'id';
        applyLanguage(nextLang);
    });
});
