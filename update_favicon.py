import glob
import os

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace logo.jpeg with favicon.png for icon links
    if 'href="logo.jpeg"' in content and 'rel="icon"' in content:
        # Just simple replace
        content = content.replace('type="image/jpeg" href="logo.jpeg"', 'type="image/png" href="favicon.png"')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
