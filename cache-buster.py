import os
import glob
import re

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace style.css with style.css?v=2
    new_content = content.replace('href="style.css"', 'href="style.css?v=2"')
    
    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated CSS link in {f}")
    else:
        print(f"No update needed in {f}")
