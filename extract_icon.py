import sys
from PIL import Image, ImageChops
import numpy as np

try:
    img = Image.open('logo.jpeg').convert('RGB')
    
    # Trim white space first
    bg = Image.new("RGB", img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    
    if not bbox:
        print("Image is entirely white.")
        sys.exit()
        
    cropped = img.crop(bbox)
    
    # Convert to numpy array of grayscale differences from white
    # (H, W, 3)
    arr = np.array(cropped)
    # distance from white (255, 255, 255)
    dist = 255 - np.mean(arr, axis=2)
    
    # Sum along rows and cols
    row_sums = np.sum(dist, axis=1)
    col_sums = np.sum(dist, axis=0)
    
    # We want to find a gap (sum close to 0) that separates the image into two parts.
    # The icon is usually the first part (top or left).
    # Let's find gaps in rows (horizontal gap -> text is below)
    # and gaps in cols (vertical gap -> text is on right)
    
    threshold = 5.0 # allow some noise
    
    # Find gaps in columns (vertical gap)
    col_gaps = np.where(col_sums < threshold)[0]
    # Find gaps in rows (horizontal gap)
    row_gaps = np.where(row_sums < threshold)[0]
    
    print(f"Cropped size: {cropped.size}")
    
    def find_largest_split(gaps, length):
        if len(gaps) == 0:
            return None
        # look for a significant gap near the middle or after the icon
        # A gap is a contiguous sequence of indices.
        # Find the longest gap, or the first major gap.
        # Let's just find the first gap that is at least 10% into the image.
        for g in gaps:
            if g > length * 0.2 and g < length * 0.8:
                return g
        return None
        
    split_col = find_largest_split(col_gaps, cropped.size[0])
    split_row = find_largest_split(row_gaps, cropped.size[1])
    
    print(f"Possible vertical split at col: {split_col}")
    print(f"Possible horizontal split at row: {split_row}")
    
    final_box = [0, 0, cropped.size[0], cropped.size[1]]
    
    if split_col and not split_row:
        final_box[2] = split_col
    elif split_row and not split_col:
        final_box[3] = split_row
    elif split_col and split_row:
        # If both exist, we might have a grid, but usually it's one or the other.
        # Just pick the one that makes the result more square.
        ratio_col = split_col / cropped.size[1]
        ratio_row = cropped.size[0] / split_row
        # square ratio is 1.0
        if abs(ratio_col - 1.0) < abs(ratio_row - 1.0):
            final_box[2] = split_col
        else:
            final_box[3] = split_row
            
    print(f"Using bounding box relative to cropped: {final_box}")
    icon = cropped.crop(final_box)
    
    # Make it a square
    w, h = icon.size
    size = max(w, h)
    square_icon = Image.new("RGB", (size, size), (255, 255, 255))
    square_icon.paste(icon, ((size - w) // 2, (size - h) // 2))
    
    square_icon.save('favicon.png')
    print("Saved favicon.png")
    
except Exception as e:
    print(f"Error: {e}")
