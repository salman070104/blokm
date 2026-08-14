import re

with open('style.css', 'r') as f:
    css = f.read()

# find all occurrences of new_css_block
parts = css.split("/* ==========================================================================\n   LANGUAGE TOGGLE BUTTON\n   ========================================================================== */")

if len(parts) > 2:
    # keep the first occurrence, replace the rest
    fixed_css = parts[0] + "/* ==========================================================================\n   LANGUAGE TOGGLE BUTTON\n   ========================================================================== */" + parts[1]
    # actually parts might have more content.
    pass

# Better approach: let's just see how many times it exists and remove the second one.
block_pattern = r'/\* ==========================================================================\n   LANGUAGE TOGGLE BUTTON.*?(?=\n\n\n|\n/\*|\Z)'
matches = re.finditer(block_pattern, css, flags=re.DOTALL)
matches_list = list(matches)

if len(matches_list) > 1:
    # remove all but first
    for match in reversed(matches_list[1:]):
        css = css[:match.start()] + css[match.end():]

with open('style.css', 'w') as f:
    f.write(css)

