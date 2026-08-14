with open('style.css', 'r') as f:
    text = f.read()

count = 0
for i, char in enumerate(text):
    if char == '{': count += 1
    elif char == '}': count -= 1
    
    if count < 0:
        print(f"Extra closing brace at index {i}")
        break

if count > 0:
    print(f"Missing {count} closing braces!")
elif count == 0:
    print("Braces are balanced.")
