import os

weddings = [
    "1.jpg", "2.jpg", "BGS_7537.jpg", "BGS_7541.jpg", "BGS_7574.jpg",
    "BGS_7575.jpg", "BGS_7631.jpg", "BGS_7639.jpg", "BGS_7686.jpg", "BGS_7687.jpg",
    "BGS_9022.jpg", "BGS_9024.jpg", "BGS_9026.jpg", "BGS_9027.jpg", "BGS_9028.jpg"
]

preweds = [
    "NZ5_3379.jpg", "NZ5_7278.jpg", "NZ5_7307.jpg", "NZ5_7309.jpg", "NZ5_7321.jpg",
    "NZ5_7325.jpg", "Z5L_5264.jpg", "Z5L_5395.jpg", "Z5L_5429.jpg", "Z5L_5436.jpg",
    "Z5L_7927.jpg", "Z5L_7934.jpg", "Z5L_7936.jpg", "Z5L_7955.jpg", "Z5L_7959.jpg"
]

html = '<div class="featured-slider-wrapper" id="featuredSliderWrapper">\n'
html += '    <div class="featured-slider" id="featuredSlider">\n'

for w in weddings:
    html += f'''        <div class="featured-card">
            <img src="assets/compressed/WEDDING/{w}" alt="Wedding Photography" loading="lazy">
            <div class="featured-card-overlay">
                <span class="featured-card-category">
                    <span lang="id">PERNIKAHAN</span>
                    <span lang="en">WEDDING</span>
                </span>
            </div>
        </div>
'''

for p in preweds:
    html += f'''        <div class="featured-card">
            <img src="assets/compressed/PREWED/{p}" alt="Prewedding Photography" loading="lazy">
            <div class="featured-card-overlay">
                <span class="featured-card-category">
                    <span lang="id">PREWEDDING</span>
                    <span lang="en">PREWEDDING</span>
                </span>
            </div>
        </div>
'''

html += '    </div>\n'
html += '</div>'

with open('slider_content.html', 'w') as f:
    f.write(html)
