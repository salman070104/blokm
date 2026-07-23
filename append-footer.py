import os
import glob

# Extract footer from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
# Find start and end of footer + floating socials in index.html
footer_start = -1
footer_end = -1
for i, line in enumerate(lines):
    if '<!-- =====================================================================' in line and 'FOOTER' in lines[i+1]:
        footer_start = i
    if '<div class="floating-socials">' in line:
        pass # It's part of footer
    if '<!-- Script Links -->' in line:
        footer_end = i
        break

if footer_start != -1 and footer_end != -1:
    footer_content = "".join(lines[footer_start:footer_end])
else:
    print("Could not find footer in index.html")
    exit(1)

html_files = ['gallery.html', 'paket.html', 'team.html', 'tentang.html', 'kontak.html']
for f in html_files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '<footer class="site-footer">' in content:
        print(f"Footer already exists in {f}")
        # if it already exists, replace it? Since I only updated index.html, yes replace it.
        # But wait, earlier I checked and they didn't have it.
        continue
        
    # Append it before <script src="navbar-scroll.js"> or before </body>
    if '<script src="navbar-scroll.js"></script>' in content:
        new_content = content.replace('<script src="navbar-scroll.js"></script>', footer_content + '\n    <script src="navbar-scroll.js"></script>')
    else:
        new_content = content.replace('</body>', footer_content + '\n</body>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
    print(f"Appended footer to {f}")
