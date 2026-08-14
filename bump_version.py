import glob

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = content.replace('style.css?v=4', 'style.css?v=5')
    content = content.replace('style.css?v=3', 'style.css?v=5')
    content = content.replace('style.css?v=2', 'style.css?v=5')
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Version bumped successfully.")
