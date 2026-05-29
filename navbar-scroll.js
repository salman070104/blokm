/* ==========================================================================
   NAVBAR SCROLL BACKGROUND — shared across all pages
   Adds/removes `.scrolled` class on .main-header when scrollY > 60px
   ========================================================================== */
(function () {
    var header = document.querySelector('.main-header');
    if (!header) return;

    function onScroll() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run immediately in case page loaded mid-scroll
})();

/* ==========================================================================
   SERVICE WORKER REGISTRATION — handles smart caching & offline access
   ========================================================================== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('[Service Worker] Registered successfully with scope:', registration.scope);
            })
            .catch(function(error) {
                console.error('[Service Worker] Registration failed:', error);
            });
    });
}

