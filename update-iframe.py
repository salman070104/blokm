import glob
import re

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We look for the iframe src
    content = re.sub(r'src="https://www\.google\.com/maps/embed\?[^"]+"', r'src="https://maps.google.com/maps?q=-6.919691,108.825209&z=15&output=embed"', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated iframe in {f}")

