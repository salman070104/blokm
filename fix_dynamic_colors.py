import glob

# 1. Update style.css root and light-theme definitions
with open('style.css', 'r') as f:
    css = f.read()

# Restore dark mode to gold
css = css.replace('--color-gold: #2563eb;', '--color-gold: #c9a84c;')
css = css.replace('--color-gold-light: #60a5fa;', '--color-gold-light: #dfc06e;')
css = css.replace('--color-gold-dark: #1d4ed8;', '--color-gold-dark: #a88a3a;')
css = css.replace('--color-gold-rgb: 37, 99, 235;', '--color-gold-rgb: 201, 168, 76;')

# Replace light mode colors to blue
css = css.replace('--color-gold: #b8942f;', '--color-gold: #2563eb;')
css = css.replace('--color-gold-light: #d4af4c;', '--color-gold-light: #60a5fa;')
css = css.replace('--color-gold-dark: #9a7a20;', '--color-gold-dark: #1d4ed8;')

# Make all hardcoded rgbs dynamic in CSS and HTML
files = glob.glob('*.html') + ['style.css']
for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace all remaining hardcoded rgb to use variable
    content = content.replace('rgba(37, 99, 235,', 'rgba(var(--color-gold-rgb),')
    content = content.replace('rgba(201, 168, 76,', 'rgba(var(--color-gold-rgb),')
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Dynamic colors fixed.")
