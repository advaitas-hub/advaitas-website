import glob
import os

html_files = glob.glob('*.html')
for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'href="favicon.png"' in content or 'href="logo.jpeg"' in content:
            content = content.replace('href="favicon.png"', 'href="favicon-gpt.png"')
            content = content.replace('href="logo.jpeg"', 'href="favicon-gpt.png"')
            # also replace type="image/jpeg" to type="image/png"
            content = content.replace('type="image/jpeg" href="favicon-gpt.png"', 'type="image/png" href="favicon-gpt.png"')
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file}")
    except Exception as e:
        print(f"Failed to update {file}: {e}")
