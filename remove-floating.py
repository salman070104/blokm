import os
import glob
import re

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Regex to remove floating-socials div and all its contents
    # Looking for: <!-- Floating Social Media Buttons --> ... <div class="floating-socials"> ... </div>
    # Because there might be newlines, we use re.DOTALL
    pattern = r'<!-- Floating Social Media Buttons -->\s*<div class="floating-socials">.*?</div>\s*'
    new_content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Also if comment is missing:
    pattern2 = r'<div class="floating-socials">.*?</div>\s*'
    new_content = re.sub(pattern2, '', new_content, flags=re.DOTALL)
    
    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Removed floating socials from {f}")
    else:
        print(f"Floating socials not found in {f}")
