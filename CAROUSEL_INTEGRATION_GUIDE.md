# Team Carousel Integration Guide

## 📁 Files Created

1. **`team-carousel.html`** - Standalone demo page
2. **`team-carousel.css`** - Carousel styles  
3. **`team-carousel.js`** - Carousel logic

## 🚀 Integration Steps

### Step 1: Add CSS to your index.html

Add this line in the `<head>` section of your `index.html`:

```html
<link rel="stylesheet" href="team-carousel.css">
```

### Step 2: Add HTML markup

Add this HTML to your About section in `index.html`:

```html
<!-- Team Carousel Section -->
<div class="carousel-container" style="background: linear-gradient(180deg, #0a0f1e 0%, #0a1628 100%); padding: 80px 20px;">
    <div class="carousel-header">
        <h2 class="carousel-title">Meet Our Team</h2>
        <p class="carousel-subtitle">
            Passionate innovators driving ADVAITA's mission to transform businesses through technology
        </p>
    </div>

    <div class="circular-carousel">
        <div class="carousel-track" id="carouselTrack">
            <!-- Cards will be dynamically inserted here -->
        </div>

        <div class="carousel-center">
            <div class="carousel-number" id="carouselNumber">01</div>
            <div class="carousel-total" id="carouselTotal">of 06</div>
        </div>

        <div class="carousel-controls">
            <button class="carousel-btn" id="prevBtn" aria-label="Previous">
                <svg class="chevron" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div class="carousel-dots" id="carouselDots"></div>

            <button class="carousel-btn" id="nextBtn" aria-label="Next">
                <svg class="chevron" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    </div>
</div>
```

### Step 3: Add JavaScript

Add this line before the closing `</body>` tag in your `index.html`:

```html
<script src="team-carousel.js"></script>
```

## ✏️ Customization

### Update Team Members

Edit the `teamMembers` array in `team-carousel.js`:

```javascript
const teamMembers = [
    {
        id: 1,
        name: "Your Name",
        role: "Your Role - Your bio description here.",
        tag: "CEO"
    },
    // Add more team members...
];
```

### Change Colors

Edit these values in `team-carousel.css`:

```css
/* Cyan colors */
--cyan-400: #22d3ee;
--cyan-500: #0891b2;

/* Background */
background: linear-gradient(180deg, #0a0f1e 0%, #0a1628 100%);
```

### Adjust Auto-play Speed

In `team-carousel.js`, change:

```javascript
AUTO_PLAY_INTERVAL: 5000  // milliseconds (5 seconds)
```

### Modify Circular Radius

In `team-carousel.js`, adjust:

```javascript
RADIUS_X: 220,  // Horizontal spread
RADIUS_Y: 100,  // Vertical spread
```

## 🎯 Features

✅ **3D Circular Layout** - Cards orbit in a circular path
✅ **Auto-play** - Rotates every 5 seconds
✅ **Pause on Hover** - Stops when user hovers
✅ **Keyboard Navigation** - Use arrow keys
✅ **Click Navigation** - Click any card to focus it
✅ **Dot Indicators** - Visual page indicators
✅ **Smooth Animations** - CSS transitions
✅ **Responsive** - Works on mobile and desktop
✅ **ADVAITA Branding** - Cyan/blue colors

## 📱 Responsive

The carousel automatically adapts to mobile screens:
- Smaller card sizes
- Adjusted spacing
- Touch-friendly controls

## 🎨 Styling Tips

1. **Match your brand**: Update colors in CSS
2. **Adjust spacing**: Modify padding/margins
3. **Change fonts**: Update font-family in CSS
4. **Add images**: Include profile pictures in cards

## ⚡ Performance

- Lightweight vanilla JavaScript (no dependencies)
- CSS-based animations (GPU accelerated)
- Minimal DOM manipulation
- Efficient event handling

## 🔧 Troubleshooting

### Carousel not showing?
- Check if all 3 files are linked correctly
- Verify element IDs match between HTML and JS
- Check browser console for errors

### Cards not positioning correctly?
- Ensure the `.carousel-track` has proper height
- Check if CSS file loaded correctly
- Verify RADIUS values in JS

### Auto-play not working?
- Check if JavaScript file loaded
- Verify no console errors
- Ensure browser allows auto-play

## 📦 Complete Integration Example

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Your existing head content -->
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="team-carousel.css">
</head>
<body>
    
    <!-- Your existing content -->
    
    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About ADVAITA</h2>
            <p>Company description...</p>
        </div>
        
        <!-- ADD CAROUSEL HERE -->
        <div class="carousel-container" style="background: linear-gradient(180deg, #0a0f1e 0%, #0a1628 100%); padding: 80px 20px;">
            <!-- Carousel HTML here -->
        </div>
    </section>
    
    <!-- Your existing scripts -->
    <script src="script.js"></script>
    <script src="team-carousel.js"></script>
</body>
</html>
```

## 🎉 You're Done!

The team carousel should now be visible in your About section with smooth 3D animations and ADVAITA's cyan branding!

Visit: `team-carousel.html` to see the standalone demo.
