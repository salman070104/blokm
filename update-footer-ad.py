import glob

footer_bottom_find = """        <div class="footer-bottom">
            <p class="footer-copyright">
                &copy; 2026 <a href="index.html">BLOK M Studio</a>. All rights reserved.
            </p>
        </div>"""

footer_bottom_replace = """        <div class="footer-bottom">
            <p class="footer-copyright">
                &copy; 2026 <a href="index.html">BLOK M Studio</a>. All rights reserved.
            </p>
            <p class="footer-copyright" style="text-align: right;">
                <span lang="id">Jasa Pembuatan Website Profesional: </span>
                <span lang="en">Professional Website Creation: </span>
                <a href="https://nusantaradeveloper.starconnecttanjung.com/" target="_blank" style="color: var(--color-gold); font-weight: bold;">Nusantara Developer</a>
            </p>
        </div>"""

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Change the link in the "LAYANAN" list if exists
    content = content.replace(
        '<li><a href="paket.html"><span lang="id">Pembuatan Website</span><span lang="en">Website Creation</span></a></li>',
        '<li><a href="https://nusantaradeveloper.starconnecttanjung.com/" target="_blank"><span lang="id">Pembuatan Website</span><span lang="en">Website Creation</span></a></li>'
    )
    
    # Add ad to footer-bottom
    if 'Nusantara Developer' not in content:
        content = content.replace(footer_bottom_find, footer_bottom_replace)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated footer in {f}")

