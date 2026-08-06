// ============================================
// FOUNDERS CIRCULAR CAROUSEL JAVASCRIPT
// ============================================

(function() {
    'use strict';

    // Founders data
    const founders = [
        {
            id: 1,
            name: "Aditya Maurya",
            designation: "CEO & Founder",
            quote: "Leading strategic vision and operations. Every great company starts with someone willing to do what needs to be done, no matter how small.",
            image: "advaita-react/public/card images/ulta.jpeg"
        },
        {
            id: 2,
            name: "Aditya B Mali",
            designation: "MD & Founder - Marketing Head",
            quote: "Driving brand strategy and innovation. Marketing isn't just about selling—it's about telling stories that connect with people's hearts and minds.",
            image: "advaita-react/public/card images/card 2.jpg"
        },
        {
            id: 3,
            name: "Ayush Singh",
            designation: "Founder & Product Manager",
            quote: "Building innovative products and leading development. Great products aren't built—they're obsessed over, refined, and perfected through countless iterations.",
            image: "advaita-react/public/card images/singh.png"
        },
        {
            id: 4,
            name: "Abhinav Sharma",
            designation: "COO & Founder",
            quote: "Overseeing operations and strategic execution. Operations is where strategy meets reality. It's about turning vision into systematic, repeatable success.",
            image: "advaita-react/public/card images/abhinav final.jpeg"
        },
        {
            id: 5,
            name: "Ayush Kumar",
            designation: "CTO & Founder",
            quote: "Driving technical innovation and architecture. Technology is our canvas, code is our paint, and innovation is the masterpiece we create every single day.",
            image: "advaita-react/public/card images/don.png"
        },
        {
            id: 6,
            name: "Disha",
            designation: "Team Lead & Founder",
            quote: "Leading teams and ensuring project excellence. Great leaders don't create followers—they create more leaders who inspire others to reach their potential.",
            image: "advaita-react/public/card images/disha 11.png"
        },
        {
            id: 7,
            name: "Aishu Parekar",
            designation: "Designer & Founder",
            quote: "Crafting beautiful user experiences and brand identity. Design is not just what it looks like—it's how it works, how it feels, and how it makes people feel.",
            image: "advaita-react/public/card images/handi.png"
        }
    ];

    // Configuration
    const CONFIG = {
        AUTO_PLAY_INTERVAL: 2000,
        GAP_MIN: 60,
        GAP_MAX: 86,
        STICK_UP_FACTOR: 0.8
    };

    // State
    let currentIndex = 0;
    let autoPlayInterval = null;
    let containerWidth = 1200;

    // Get elements
    let imagesContainer, contentContainer, dotsContainer, prevBtn, nextBtn;

    /**
     * Calculate gap based on container width
     */
    function calculateGap(width) {
        const minWidth = 1024;
        const maxWidth = 1456;
        
        if (width <= minWidth) return CONFIG.GAP_MIN;
        if (width >= maxWidth) {
            return Math.max(CONFIG.GAP_MIN, CONFIG.GAP_MAX + 0.06018 * (width - maxWidth));
        }
        
        return CONFIG.GAP_MIN + (CONFIG.GAP_MAX - CONFIG.GAP_MIN) * 
               ((width - minWidth) / (maxWidth - minWidth));
    }

    /**
     * Get image transform styles
     */
    function getImageTransform(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * CONFIG.STICK_UP_FACTOR;
        
        const isActive = index === currentIndex;
        const isLeft = (currentIndex - 1 + founders.length) % founders.length === index;
        const isRight = (currentIndex + 1) % founders.length === index;

        if (isActive) {
            return {
                transform: 'translate(-50%, -50%) scale(1) rotateY(0deg)',
                zIndex: '3',
                opacity: '1',
                pointerEvents: 'auto'
            };
        }

        if (isLeft) {
            return {
                transform: `translate(calc(-50% - ${gap}px), calc(-50% - ${maxStickUp}px)) scale(0.85) rotateY(15deg)`,
                zIndex: '2',
                opacity: '1',
                pointerEvents: 'auto'
            };
        }

        if (isRight) {
            return {
                transform: `translate(calc(-50% + ${gap}px), calc(-50% - ${maxStickUp}px)) scale(0.85) rotateY(-15deg)`,
                zIndex: '2',
                opacity: '1',
                pointerEvents: 'auto'
            };
        }

        return {
            transform: 'translate(-50%, -50%) scale(0.5)',
            zIndex: '1',
            opacity: '0',
            pointerEvents: 'none'
        };
    }

    /**
     * Animate words in quote
     */
    function animateQuote(quoteElement) {
        const words = quoteElement.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.025}s`;
            word.style.opacity = '0';
            // Trigger reflow
            void word.offsetWidth;
            word.style.opacity = '';
        });
    }

    /**
     * Update carousel display
     */
    function updateCarousel() {
        // Update images
        const images = imagesContainer.querySelectorAll('.founder-image');
        images.forEach((img, index) => {
            const styles = getImageTransform(index);
            Object.assign(img.style, styles);
        });

        // Update content
        const infos = contentContainer.querySelectorAll('.founder-info');
        infos.forEach((info, index) => {
            if (index === currentIndex) {
                info.classList.add('active');
                const quote = info.querySelector('.founder-quote');
                if (quote) {
                    setTimeout(() => animateQuote(quote), 100);
                }
            } else {
                info.classList.remove('active');
            }
        });

        // Update dots
        const dots = dotsContainer.querySelectorAll('.founder-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    /**
     * Go to next founder
     */
    function nextFounder() {
        currentIndex = (currentIndex + 1) % founders.length;
        updateCarousel();
        resetAutoPlay();
    }

    /**
     * Go to previous founder
     */
    function prevFounder() {
        currentIndex = (currentIndex - 1 + founders.length) % founders.length;
        updateCarousel();
        resetAutoPlay();
    }

    /**
     * Go to specific founder
     */
    function goToFounder(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    /**
     * Start autoplay
     */
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextFounder, CONFIG.AUTO_PLAY_INTERVAL);
    }

    /**
     * Reset autoplay
     */
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        if (imagesContainer) {
            containerWidth = imagesContainer.offsetWidth;
            updateCarousel();
        }
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboard(e) {
        if (e.key === 'ArrowLeft') prevFounder();
        if (e.key === 'ArrowRight') nextFounder();
    }

    /**
     * Render founders carousel
     */
    function renderCarousel() {
        imagesContainer = document.getElementById('foundersImagesContainer');
        contentContainer = document.getElementById('foundersContentContainer');
        dotsContainer = document.getElementById('foundersDots');
        prevBtn = document.getElementById('foundersPrevBtn');
        nextBtn = document.getElementById('foundersNextBtn');

        if (!imagesContainer || !contentContainer) return;

        // Render images
        imagesContainer.innerHTML = founders.map((founder, index) => `
            <img 
                src="${founder.image}" 
                alt="${founder.name}"
                class="founder-image"
                data-index="${index}"
                onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80'"
            />
        `).join('');

        // Render content
        contentContainer.innerHTML = founders.map((founder, index) => `
            <div class="founder-info ${index === 0 ? 'active' : ''}" data-index="${index}">
                <h3 class="founder-name">${founder.name}</h3>
                <p class="founder-designation">${founder.designation}</p>
                <p class="founder-quote">
                    ${founder.quote.split(' ').map(word => 
                        `<span class="word">${word}</span>`
                    ).join(' ')}
                </p>
            </div>
        `).join('');

        // Render dots
        dotsContainer.innerHTML = founders.map((_, index) => `
            <button 
                class="founder-dot ${index === 0 ? 'active' : ''}" 
                data-index="${index}"
                aria-label="Go to founder ${index + 1}"
            ></button>
        `).join('');

        // Add event listeners
        prevBtn.addEventListener('click', prevFounder);
        nextBtn.addEventListener('click', nextFounder);

        dotsContainer.querySelectorAll('.founder-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => goToFounder(index));
        });

        // Initial update
        containerWidth = imagesContainer.offsetWidth;
        updateCarousel();

        // Start autoplay
        startAutoPlay();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Add keyboard listener
        window.addEventListener('keydown', handleKeyboard);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCarousel);
    } else {
        renderCarousel();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyboard);
    });

})();
