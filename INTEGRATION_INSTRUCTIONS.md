# About Page Integration Instructions

## Overview
This package contains the complete About page with the founders carousel feature. Integrate these files into your current codebase.

## Package Contents

### Main Files
1. **about.html** - Complete about page with all sections
2. **founders-carousel.js** - Founder carousel functionality
3. **founders-carousel.css** - Founder carousel styling

### Images Folder
- **ulta.jpeg** - Aditya Maurya (Card 1) image
- **disha 11.png** - Disha (Card 6) image

## Integration Steps

### Step 1: Backup Your Current Files
```bash
# Create a backup of your current about.html (if it exists)
cp about.html about.html.backup
```

### Step 2: Copy Main Files
Copy these files to your project root directory:
- `about.html`
- `founders-carousel.js`
- `founders-carousel.css`

### Step 3: Copy Image Files
Copy the images to the correct location:
```bash
# Copy images to advaita-react/public/card images/
cp images/ulta.jpeg advaita-react/public/card\ images/
cp images/disha\ 11.png advaita-react/public/card\ images/
```

**Note**: Make sure the following images already exist in `advaita-react/public/card images/`:
- `card 2.jpg` (Aditya B Mali)
- `singh.png` (Ayush Singh)
- `abhinav final.jpeg` (Abhinav Sharma)
- `don.png` (Ayush Kumar)
- `handi.png` (Aishu Parekar)

### Step 4: Verify Dependencies
Make sure these files exist in your project root (these should already be there):
- `styles.css` - Main stylesheet
- `Generated_image_1-removebg-preview.png` - Logo

### Step 5: Test the Page
1. Open `about.html` in a browser
2. Verify the founder carousel displays correctly
3. Check that all 7 founder cards appear
4. Confirm the carousel auto-plays (2-second interval)
5. Test navigation arrows and dots

### Step 6: Commit and Push
```bash
git add about.html founders-carousel.js founders-carousel.css
git add advaita-react/public/card\ images/ulta.jpeg
git add advaita-react/public/card\ images/disha\ 11.png
git commit -m "Integrate about page with founders carousel"
git push origin develop
```

## Founders Carousel Configuration

### Current Setup
- **Total Founders**: 7
- **Auto-play Interval**: 2 seconds
- **Animation**: Smooth transitions with word-by-word quote reveal

### Founder Details
1. **Aditya Maurya** - CEO & Founder (ulta.jpeg)
2. **Aditya B Mali** - MD & Founder - Marketing Head (card 2.jpg)
3. **Ayush Singh** - Founder & Product Manager (singh.png)
4. **Abhinav Sharma** - COO & Founder (abhinav final.jpeg)
5. **Ayush Kumar** - CTO & Founder (don.png)
6. **Disha** - Team Lead & Founder (disha 11.png) - *scaled 1.4x*
7. **Aishu Parekar** - Designer & Founder (handi.png)

## Customization (Optional)

### Change Auto-play Speed
In `founders-carousel.js`, line 68:
```javascript
AUTO_PLAY_INTERVAL: 2000,  // Change to desired milliseconds
```

### Adjust Image Scaling
In `founders-carousel.css`, you can adjust individual card image properties:
```css
.founder-image[data-index="0"] {
    object-fit: cover;  /* Options: cover, contain, fill, scale-down */
    object-position: top;
}
```

## Troubleshooting

### Images Not Loading
- Check that image paths in `founders-carousel.js` match your folder structure
- Verify all images exist in `advaita-react/public/card images/`
- Try hard refresh (Ctrl+F5) to clear browser cache

### Carousel Not Animating
- Check browser console for JavaScript errors
- Verify that `founders-carousel.js` is loaded after the HTML elements
- Ensure no conflicts with other JavaScript libraries

### Styling Issues
- Confirm `founders-carousel.css` is loaded after `styles.css`
- Clear browser cache (Ctrl+F5)
- Check for CSS conflicts with existing styles

## Support
If you encounter any issues during integration, check:
1. Browser console for errors
2. Network tab for failed resource loads
3. Verify all file paths are correct

## Notes
- The about page is fully responsive and works on mobile devices
- All animations are CSS-based for better performance
- Keyboard navigation is supported (Left/Right arrow keys)
- The carousel is accessible with ARIA labels

---
**Version**: 1.0  
**Last Updated**: August 6, 2026  
**Branch**: develop  
**Commit**: 6681fb5
