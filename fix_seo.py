import os
import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix canonical tags
    content = re.sub(r'<link rel="canonical" href="https://www\.blokmstudio\.com/([^"]+)\.html">', r'<link rel="canonical" href="https://www.blokmstudio.com/\1">', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix sitemap.xml
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    sitemap = f.read()

sitemap = sitemap.replace('.html</loc>', '</loc>')

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap)

print("SEO fixes applied.")
