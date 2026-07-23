import os
import glob

# HTML snippet to find
find_str = """            <div>
                <h4 class="footer-heading">
                    <span lang="id">KONTAK</span>
                    <span lang="en">CONTACT</span>
                </h4>
                <ul class="footer-links">
                    <li><a href="https://wa.me/6287858231341" target="_blank">0878-5823-1341</a></li>
                    <li><a href="https://maps.app.goo.gl/jyGvkRwBWoYmsLYPA" target="_blank"><span lang="id">Brebes, Jawa Tengah</span><span lang="en">Brebes, Central Java</span></a></li>
                    <li><a href="https://www.instagram.com/blokm.studio" target="_blank">@blokm.studio</a></li>
                </ul>
            </div>"""

# HTML snippet to replace
replace_str = """            <div>
                <h4 class="footer-heading">
                    <span lang="id">KONTAK</span>
                    <span lang="en">CONTACT</span>
                </h4>
                <ul class="footer-links" style="margin-bottom: 1.5rem;">
                    <li><a href="https://wa.me/6287858231341" target="_blank">0878-5823-1341</a></li>
                    <li><a href="https://maps.app.goo.gl/jyGvkRwBWoYmsLYPA" target="_blank"><span lang="id">Brebes, Jawa Tengah</span><span lang="en">Brebes, Central Java</span></a></li>
                    <li><a href="https://www.instagram.com/blokm.studio" target="_blank">@blokm.studio</a></li>
                </ul>
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border); height: 140px; margin-top: 1.5rem;">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0!2d109.0!3d-6.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTInMTIuMCJTIDEwOcKwMDInMjQuMCJF!5e0!3m2!1sid!2sid!4v1234567890" style="width: 100%; height: 100%; border: none; filter: grayscale(0.6) brightness(0.8);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="BLOK M Studio Location"></iframe>
                </div>
            </div>"""

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if find_str in content:
        content = content.replace(find_str, replace_str)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
    else:
        print(f"Snippet not found in {f}")
