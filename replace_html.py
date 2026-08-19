import re

with open('index.html', 'r') as f:
    content = f.read()

with open('slider_content.html', 'r') as f:
    slider_content = f.read()

# Replace the <div class="featured-grid"> ... </div> (the first one under id="featured-work")
# We know the structure from lines 169 to 209.
# Let's find the start and end indices manually to be safe.
start_str = '            <div class="featured-grid">'
end_str = '            </div>\n        </div>\n    </section>'

start_idx = content.find(start_str)
if start_idx != -1:
    end_idx = content.find(end_str, start_idx)
    if end_idx != -1:
        new_content = content[:start_idx] + slider_content + '\n' + content[end_idx:]
        with open('index.html', 'w') as f:
            f.write(new_content)
        print("Successfully replaced in index.html")
    else:
        print("End string not found")
else:
    print("Start string not found")

