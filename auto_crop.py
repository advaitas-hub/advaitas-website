import sys
from PIL import Image, ImageChops

def trim(im):
    im = im.convert("RGB")
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100) # add threshold to ignore compression artifacts
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

try:
    img = Image.open('logo.jpeg')
    cropped_img = trim(img)
    
    width, height = cropped_img.size
    size = max(width, height)
    
    # Create new square white image
    new_img = Image.new("RGB", (size, size), (255, 255, 255))
    new_img.paste(cropped_img, ((size - width) // 2, (size - height) // 2))
    
    new_img.save('favicon.png')
    print(f"Original size: {img.size}")
    print(f"Cropped content size: {cropped_img.size}")
    print(f"Final favicon size: {new_img.size}")
except Exception as e:
    print(f"Error: {e}")
