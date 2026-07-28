import os
import re

html_files = [
    "index.html",
    "gallery.html",
    "paket.html",
    "tentang.html",
    "team.html",
    "kontak.html"
]

header_toggle = '''            <button class="theme-toggle-btn" aria-label="Toggle Theme">
                <svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            <div class="lang-switcher'''

sidebar_toggle = '''<button class="sidebar-theme-toggle theme-toggle-btn" aria-label="Toggle Theme">
                <span lang="id">TEMA</span><span lang="en">THEME</span>
                <div style="position: relative; width: 18px; height: 18px; display: inline-block; margin-left: 5px; transform: translateY(2px);">
                    <svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </div>
            </button>
            <div class="lang-switcher mobile-lang-switcher'''

for file in html_files:
    path = os.path.join('/Users/salmanmiftahurrizki/BLOK M', file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add script tag
    if 'theme-switcher.js' not in content:
        content = content.replace(
            '<script src="lang-switcher.js"></script>',
            '<script src="lang-switcher.js"></script>\n    <script src="theme-switcher.js"></script>'
        )

    # Add header toggle button
    if 'theme-toggle-btn' not in content.split('<div class="header-socials">')[0]:
        content = content.replace(
            '            <div class="lang-switcher',
            header_toggle,
            1
        )

    # Add sidebar toggle button
    if 'sidebar-theme-toggle' not in content:
        content = content.replace(
            '<div class="lang-switcher mobile-lang-switcher',
            sidebar_toggle,
            1
        )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated {file}")
