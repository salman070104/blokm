import glob

old_link = "https://maps.app.goo.gl/jyGvkRwBWoYmsLYPA"
new_link = "https://maps.app.goo.gl/Bb4P6CTxZ6FZAJbg7"

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if old_link in content:
        content = content.replace(old_link, new_link)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated maps link in {f}")

