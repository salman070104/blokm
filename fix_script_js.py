with open('script.js', 'r') as f:
    lines = f.readlines()

# Remove the '});' at line 144 (or wherever it exactly is)
new_lines = []
for line in lines:
    if line.strip() == '});' and '144' not in line: # wait, it might just be the exact line
        pass # we'll manually filter it
    
# Actually let's just do a string replace:
with open('script.js', 'r') as f:
    content = f.read()

content = content.replace('\n});\n\n    // =========================================================================\n    // 6. TYPEWRITER EFFECT', '\n\n    // =========================================================================\n    // 6. TYPEWRITER EFFECT')

content += '\n});\n'

with open('script.js', 'w') as f:
    f.write(content)

print("Fixed script.js")
