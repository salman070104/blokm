import glob

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace ID and EN with flags
    content = content.replace('<button class="lang-btn id active" data-lang="id">ID</button>', '<button class="lang-btn id active" data-lang="id">🇮🇩</button>')
    content = content.replace('<button class="lang-btn id" data-lang="id">ID</button>', '<button class="lang-btn id" data-lang="id">🇮🇩</button>')
    
    content = content.replace('<button class="lang-btn en" data-lang="en">EN</button>', '<button class="lang-btn en" data-lang="en">🇬🇧</button>')
    content = content.replace('<button class="lang-btn en active" data-lang="en">EN</button>', '<button class="lang-btn en active" data-lang="en">🇬🇧</button>')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated language switcher in {f}")
