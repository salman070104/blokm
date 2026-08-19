with open('style.css', 'r') as f:
    css = f.read()

# Replace .featured-grid with our new wrapper and slider styles
old_css = """.featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}"""

new_css = """.featured-slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.featured-slider {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    cursor: grab;
    padding-bottom: 10px;
}

.featured-slider::-webkit-scrollbar {
    display: none;
}

.featured-slider:active {
    cursor: grabbing;
}

.featured-slider .featured-card {
    flex: 0 0 250px; /* smaller width */
    /* the rest of .featured-card remains the same */
}"""

css = css.replace(old_css, new_css)

# Also need to check if there's a responsive media query for .featured-grid
old_media_css = """.featured-grid {
        grid-template-columns: 1fr;
    }"""
# just remove or leave it, it won't break things if it's there, but cleaner to replace
css = css.replace(old_media_css, "")

# Wait, the media query was probably for tablets/mobile. Let's do a search and replace for anything mentioning featured-grid
import re
css = re.sub(r'\.featured-grid\s*{[^}]*}', '', css)

with open('style.css', 'w') as f:
    f.write(css)

print("CSS updated")
