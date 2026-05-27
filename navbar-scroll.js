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
