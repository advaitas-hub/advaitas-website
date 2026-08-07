import sys
from PIL import Image

try:
    img = Image.open('logo.jpeg')
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
except Exception as e:
    print(f"Error: {e}")
