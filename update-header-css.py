import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make navbar smaller
css = css.replace('padding: 1.5rem 5%;\n    z-index: 1000;', 'padding: 1rem 5%;\n    z-index: 1000;')
css = css.replace('padding: 1rem 5%;\n    box-shadow:', 'padding: 0.6rem 5%;\n    box-shadow:')

# Reduce logo size a bit to match smaller navbar
css = css.replace('height: 22px;\n    width: auto;', 'height: 18px;\n    width: auto;')

# Group nav elements tighter to the right
css = css.replace('gap: 3rem;\n}', 'gap: 1.5rem;\n}')
css = css.replace('gap: 2.5rem;\n}', 'gap: 1.5rem;\n}')

# Reduce nav link font size
css = css.replace('font-size: 0.82rem;\n    font-weight: 500;', 'font-size: 0.75rem;\n    font-weight: 500;')

# Update language switcher font size for emoji flags
css = css.replace('font-size: 0.72rem;\n    font-weight: 800;', 'font-size: 1.1rem;\n    font-weight: 800;')

# Increase the lang-slider translation to match if needed?
# .lang-switcher width is 92px, padding is 3px. Buttons are flex:1 (43px).
# slider width is 41px.
# This part is probably fine as is since we didn't change the container width.

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated successfully.")
