/* ==========================================================================
   BLOK M STUDIO — THEME SWITCHER
   Dark/Light mode toggle with localStorage persistence
   Loaded in <head> to prevent flash of wrong theme (FOUC)
   ========================================================================== */

(function () {
    'use strict';

    var STORAGE_KEY = 'blokm-theme';

    // Determine the initial theme before first paint
    function getInitialTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        // Fallback to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }

    // Apply theme class immediately (runs before DOM is fully parsed)
    var theme = getInitialTheme();
    if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
    } else {
        document.documentElement.classList.remove('light-theme');
    }

    // After DOM is ready, wire up toggle buttons
    document.addEventListener('DOMContentLoaded', function () {
        var toggleBtns = document.querySelectorAll('.theme-toggle-btn');

        function updateIcons(isLight) {
            toggleBtns.forEach(function (btn) {
                var sunIcon = btn.querySelector('.theme-icon-sun');
                var moonIcon = btn.querySelector('.theme-icon-moon');
                if (sunIcon && moonIcon) {
                    if (isLight) {
                        sunIcon.style.opacity = '0';
                        sunIcon.style.transform = 'rotate(90deg) scale(0)';
                        moonIcon.style.opacity = '1';
                        moonIcon.style.transform = 'rotate(0deg) scale(1)';
                    } else {
                        sunIcon.style.opacity = '1';
                        sunIcon.style.transform = 'rotate(0deg) scale(1)';
                        moonIcon.style.opacity = '0';
                        moonIcon.style.transform = 'rotate(-90deg) scale(0)';
                    }
                }
            });
        }

        function toggleTheme() {
            var html = document.documentElement;
            var isCurrentlyLight = html.classList.contains('light-theme');

            if (isCurrentlyLight) {
                html.classList.remove('light-theme');
                localStorage.setItem(STORAGE_KEY, 'dark');
                updateIcons(false);
            } else {
                html.classList.add('light-theme');
                localStorage.setItem(STORAGE_KEY, 'light');
                updateIcons(true);
            }
        }

        // Set initial icon state
        var isLight = document.documentElement.classList.contains('light-theme');
        updateIcons(isLight);

        // Attach click handlers
        toggleBtns.forEach(function (btn) {
            btn.addEventListener('click', toggleTheme);
        });

        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(STORAGE_KEY)) {
                    if (e.matches) {
                        document.documentElement.classList.add('light-theme');
                    } else {
                        document.documentElement.classList.remove('light-theme');
                    }
                    updateIcons(e.matches);
                }
            });
        }
    });
})();
