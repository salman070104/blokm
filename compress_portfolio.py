import os
import glob
import re
import subprocess
import shutil

assets_dir = 'assets'
compressed_dir = os.path.join(assets_dir, 'compressed')

if not os.path.exists(compressed_dir):
    os.makedirs(compressed_dir)

# Get directories to process (excluding 'compressed')
subdirs = [d for d in os.listdir(assets_dir) if os.path.isdir(os.path.join(assets_dir, d)) and d != 'compressed']

portfolio_items = []

def map_category(folder_name):
    folder_upper = folder_name.upper()
    if 'WEDDING' in folder_upper:
        return "wedding", "Pernikahan", "Wedding", "Wedding"
    elif 'PREWED' in folder_upper:
        return "prewedding", "Prewedding", "Prewedding", "Prewedding"
    elif 'STUDIO' in folder_upper:
        return "portrait", "Portrait Studio", "Studio Portrait", "Portrait"
    elif 'ENGAGEMENT' in folder_upper:
        return "event", "Lamaran", "Engagement", "Event"
    elif 'WISUDA' in folder_upper:
        return "event", "Wisuda", "Graduation", "Event"
    else:
        return "event", folder_name.title(), folder_name.title(), "Event"

def get_dimensions(filepath):
    try:
        output = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', filepath]).decode('utf-8')
        w = re.search(r'pixelWidth:\s*(\d+)', output).group(1)
        h = re.search(r'pixelHeight:\s*(\d+)', output).group(1)
        return w, h
    except Exception as e:
        return 800, 1200

subdirs.sort()

total_files = sum(len(glob.glob(os.path.join(assets_dir, d, '*.*'))) for d in subdirs)
print(f"Found {total_files} files to compress. Starting...")

count = 0
for subdir in subdirs:
    source_dir_path = os.path.join(assets_dir, subdir)
    target_dir_path = os.path.join(compressed_dir, subdir)
    
    if not os.path.exists(target_dir_path):
        os.makedirs(target_dir_path)
        
    images = glob.glob(os.path.join(source_dir_path, '*.*'))
    images.sort()
    
    for img in images:
        if img.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.heic')):
            filename = os.path.basename(img)
            # Change extension to jpg for compressed version
            target_filename = os.path.splitext(filename)[0] + '.jpg'
            target_path = os.path.join(target_dir_path, target_filename)
            
            # Compress using sips (max dimension 1200px, quality 75)
            # Only compress if it doesn't exist to save time on reruns
            if not os.path.exists(target_path):
                subprocess.call(['sips', '-Z', '1200', '-s', 'format', 'jpeg', '-s', 'formatOptions', '75', img, '--out', target_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # Get new dimensions
            w, h = get_dimensions(target_path)
            
            web_path = target_path.replace('\\', '/')
            cat, titleId, titleEn, catLabel = map_category(subdir)
            portfolio_items.append(f'        {{ src: "{web_path}", category: "{cat}", titleId: "{titleId}", titleEn: "{titleEn}", catLabel: "{catLabel}", width: {w}, height: {h} }}')
            
            count += 1
            if count % 50 == 0:
                print(f"Processed {count}/{total_files} files...")

items_js = "const portfolioItems = [\n" + ",\n".join(portfolio_items) + "\n    ];"

with open('gallery-script.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(
    r'const portfolioItems = \[\s*.*?\s*\];',
    items_js.replace('\\', '\\\\'),
    content,
    flags=re.DOTALL
)

with open('gallery-script.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Success! Compressed and added {len(portfolio_items)} items to gallery-script.js.")
