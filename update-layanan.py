import os
import glob

# 1. Update paket.html
with open('paket.html', 'r', encoding='utf-8') as f:
    paket_html = f.read()

website_card = """
            <!-- Website Creation Package -->
            <div class="package-card">
                <div class="package-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <h3 class="package-name"><span lang="id">Pembuatan Website</span><span lang="en">Website Creation</span></h3>
                <div class="package-price"><span lang="id">Mulai dari Rp 1.500K</span><span lang="en">Starts from Rp 1.500K</span></div>
                <ul class="package-features">
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span lang="id">Desain modern & responsif</span><span lang="en">Modern & responsive design</span></li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span lang="id">Optimasi SEO dasar</span><span lang="en">Basic SEO optimization</span></li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span lang="id">Integrasi media sosial</span><span lang="en">Social media integration</span></li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span lang="id">Maintenance 1 bulan gratis</span><span lang="en">1 month free maintenance</span></li>
                </ul>
                <a href="https://wa.me/6287858231341?text=Hello%20BLOK%20M%20Studio%2C%20I'm%20interested%20in%20Website%20Creation%20services." target="_blank" class="package-cta package-cta-secondary"><span lang="id">KONSULTASI GRATIS</span><span lang="en">FREE CONSULTATION</span></a>
            </div>"""

if '<!-- Website Creation Package -->' not in paket_html:
    # Insert right before the closing div of packages-grid
    paket_html = paket_html.replace('        </div>\n\n        <!-- FAQ -->', website_card + '\n        </div>\n\n        <!-- FAQ -->')
    # Change grid to repeat(auto-fit, minmax(300px, 1fr)) if it's 3, 1fr
    paket_html = paket_html.replace('grid-template-columns: repeat(3, 1fr);', 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));')
    with open('paket.html', 'w', encoding='utf-8') as f:
        f.write(paket_html)
    print("Updated paket.html")

# 2. Update footer in all HTML files
footer_service = '<li><a href="paket.html"><span lang="id">Event & Corporate</span><span lang="en">Event & Corporate</span></a></li>'
footer_website = '<li><a href="paket.html"><span lang="id">Pembuatan Website</span><span lang="en">Website Creation</span></a></li>'

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if footer_website not in content and footer_service in content:
        content = content.replace(footer_service, footer_service + '\n                    ' + footer_website)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated footer in {f}")

