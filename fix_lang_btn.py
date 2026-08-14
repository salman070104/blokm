import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace mobile lang switcher
    content = re.sub(
        r'<div class="lang-switcher mobile-lang-switcher">.*?</div></div>|'
        r'<div class="lang-switcher mobile-lang-switcher">.*?</div>',
        r'<button class="lang-toggle-btn mobile-lang-toggle">IN</button>',
        content,
        flags=re.DOTALL
    )
    
    # Replace desktop lang switcher
    content = re.sub(
        r'<div class="lang-switcher">.*?</div></div>|'
        r'<div class="lang-switcher">.*?</div>',
        r'<button class="lang-toggle-btn">IN</button>',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w') as f:
        f.write(content)

print("Language switchers replaced.")
