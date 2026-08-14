import os

files_to_fix = ['index.html', 'gallery.html', 'paket.html']

header_btn = '''            <button class="theme-toggle-btn" aria-label="Toggle Theme">
                <svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
'''

wrong_block = header_btn

for filename in files_to_fix:
    path = os.path.join('/Users/salmanmiftahurrizki/BLOK M', filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the position of <div class="sidebar-footer">
    sidebar_idx = content.find('<div class="sidebar-footer">')
    
    # If the wrong block is right after the CTA in the sidebar
    # We replace the first occurrence of the wrong block in the whole string
    # since it's the one in the sidebar.
    
    # Actually, we can just replace exactly what was injected wrongly
    if wrong_block in content:
        # Remove the wrong block (only the first occurrence, which is in the sidebar)
        content = content.replace(wrong_block, '', 1)
        
        # Now find the header <div class="lang-switcher"> which should be the FIRST remaining one, 
        # wait no, the first <div class="lang-switcher"> might be the sidebar one.
        # But in header, it looks like:
        #             <div class="lang-switcher">
        # Let's target the exact header one by looking around it.
        # In index.html, the header right looks like:
        #             <nav class="main-nav">
        #                 ...
        #             </nav>
        #             <div class="lang-switcher">
        
        target = '            <div class="lang-switcher">\n'
        replacement = header_btn + target
        
        content = content.replace(target, replacement, 1)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")

