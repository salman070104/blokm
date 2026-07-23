import glob

# 1. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Change footer grid to 5 columns
if 'grid-template-columns: 1.5fr 1fr 1fr 1fr;' in css:
    css = css.replace('grid-template-columns: 1.5fr 1fr 1fr 1fr;', 'grid-template-columns: 1.5fr 0.8fr 1fr 1fr 1.5fr;')
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated style.css")

# 2. Update all HTML files
html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We want to split the KONTAK div into two divs
    search_string = """            <div>
                <h4 class="footer-heading">
                    <span lang="id">KONTAK</span>
                    <span lang="en">CONTACT</span>
                </h4>
                <ul class="footer-links" style="margin-bottom: 1.5rem;">
                    <li><a href="https://wa.me/6287858231341" target="_blank">0878-5823-1341</a></li>
                    <li><a href="https://maps.app.goo.gl/Bb4P6CTxZ6FZAJbg7" target="_blank"><span lang="id">Brebes, Jawa Tengah</span><span lang="en">Brebes, Central Java</span></a></li>
                    <li><a href="https://www.instagram.com/blokm.studio" target="_blank">@blokm.studio</a></li>
                </ul>
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border); height: 140px; margin-top: 1.5rem;">
                    <iframe src="https://maps.google.com/maps?q=-6.919691,108.825209&z=15&output=embed" style="width: 100%; height: 100%; border: none; filter: grayscale(0.6) brightness(0.8);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="BLOK M Studio Location"></iframe>
                </div>
            </div>"""

    replace_string = """            <div>
                <h4 class="footer-heading">
                    <span lang="id">KONTAK</span>
                    <span lang="en">CONTACT</span>
                </h4>
                <ul class="footer-links">
                    <li><a href="https://wa.me/6287858231341" target="_blank">0878-5823-1341</a></li>
                    <li><a href="https://maps.app.goo.gl/Bb4P6CTxZ6FZAJbg7" target="_blank"><span lang="id">Brebes, Jawa Tengah</span><span lang="en">Brebes, Central Java</span></a></li>
                    <li><a href="https://www.instagram.com/blokm.studio" target="_blank">@blokm.studio</a></li>
                </ul>
            </div>
            <div>
                <h4 class="footer-heading">
                    <span lang="id">LOKASI</span>
                    <span lang="en">LOCATION</span>
                </h4>
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border); height: 140px; width: 100%;">
                    <iframe src="https://maps.google.com/maps?q=-6.919691,108.825209&z=15&output=embed" style="width: 100%; height: 100%; border: none; filter: grayscale(0.6) brightness(0.8);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="BLOK M Studio Location"></iframe>
                </div>
            </div>"""

    if search_string in content:
        content = content.replace(search_string, replace_string)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated footer HTML in {f}")

