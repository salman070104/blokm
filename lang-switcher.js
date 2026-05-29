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

        // Update all language switcher buttons on the page
        var switchers = document.querySelectorAll(".lang-switcher");
        switchers.forEach(function(switcher) {
            var btns = switcher.querySelectorAll(".lang-btn");
            btns.forEach(function(btn) {
                if (btn.getAttribute("data-lang") === lang) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        });
    }

    // Apply initial language state (update buttons)
    applyLanguage(currentLang);

    // Event delegation for clicks on language options
    document.body.addEventListener("click", function(e) {
        var btn = e.target.closest(".lang-btn");
        if (!btn) return;

        var switcher = btn.closest(".lang-switcher");
        if (!switcher) return;

        e.preventDefault();
        var selectedLang = btn.getAttribute("data-lang");
        if (selectedLang && selectedLang !== currentLang) {
            applyLanguage(selectedLang);
        }
    });
});
