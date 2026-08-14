import glob

files = glob.glob('*.html') + ['style.css']

replacements = [
    ('#c9a84c', '#2563eb'),  # Main Gold -> Royal Blue
    ('201, 168, 76', '37, 99, 235'),  # RGB Main Gold -> RGB Royal Blue
    ('#dfc06e', '#60a5fa'),  # Light Gold -> Light Blue
    ('#a88a3a', '#1d4ed8'),  # Dark Gold -> Dark Blue
    ('184, 148, 47', '37, 99, 235')  # Light Theme Gold -> RGB Royal Blue
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        # Also handle uppercase hex just in case
        content = content.replace(old.upper(), new.upper())
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Colors updated successfully.")
