import glob

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = content.replace('style.css?v=5', 'style.css?v=6')
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Version bumped to v6.")
