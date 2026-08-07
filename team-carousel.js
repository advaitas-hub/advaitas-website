// ============================================
// CIRCULAR CAROUSEL JAVASCRIPT
// ============================================

(function() {
    'use strict';

    // Team data - CUSTOMIZE THIS WITH YOUR ACTUAL TEAM
    const teamMembers = [
        {
            id: 1,
            name: "Aditya Maurya",
            role: "Peon & Founder - Managing daily operations and building the foundation.",
            tag: "Peon",
            image: "advaita-react/public/card images/ulta.jpeg"
        },
        {
            id: 2,
            name: "Aditya B Mali",
            role: "MD & Founder - Marketing Head driving brand strategy and innovation.",
            tag: "MD",
            image: "advaita-react/public/card images/aditya-b-mali.png"
        },
        {
            id: 3,
            name: "Ayush Singh",
            role: "Founder & Product Manager - Building innovative products and leading development.",
            tag: "Product",
            image: "ayush-singh.png"
        },
        {
            id: 4,
            name: "Abhinav Sharma",
            role: "Chief Operating Officer & Founder - Overseeing operations and strategic execution.",
            tag: "COO",
            image: "abhinav-sharma.png"
        },
        {
            id: 5,
            name: "Ayush Kumar",
            role: "Chief Technical Officer & Founder - Driving technical innovation and architecture.",
            tag: "CTO",
            image: "kumar.png"
        },
        {
            id: 6,
            name: "Disha",
            role: "CTO & Founder - Leading teams and ensuring project excellence.",
            tag: "CTO",
            image: "advaita-react/public/card images/disha 11.png"
        },
        {
            id: 7,
            name: "Aishu A Parekar",
            role: "CDO & Founder - Crafting beautiful user experiences and brand identity.",
            tag: "CDO",
            image: "aishu-parekar.png"
        }
    ];

    // Configuration
    const CONFIG = {
        VISIBLE_COUNT: 5,
        RADIUS_X: 220,
        RADIUS_Y: 100,
        AUTO_PLAY_INTERVAL: 5000
    };

    // State
    let currentIndex = 0;
    let autoPlayInterval = null;
    let isHovered = false;

    // Get elements
    let track, numberEl, totalEl, dotsContainer, prevBtn, nextBtn;

    /**
     * Calculate position for each card in circular orbit
     */
    function getItemPosition(index, activeIndex, total) {
        const offset = index - activeIndex;
        const half = Math.floor(CONFIG.VISIBLE_COUNT / 2);

        let adjustedOffset = offset;
        if (offset > half) adjustedOffset = offset - total;
        if (offset < -half) adjustedOffset = offset + total;
        if (Math.abs(adjustedOffset) > half * 2) return null;

        const angle = (adjustedOffset / CONFIG.VISIBLE_COUNT) * Math.PI;
        const x = Math.sin(angle) * CONFIG.RADIUS_X;
        const y = -Math.cos(angle) * CONFIG.RADIUS_Y;

        const distance = Math.abs(adjustedOffset);
        const maxDistance = half + 1;
        const scale = Math.max(0.3, 1 - (distance / maxDistance) * 0.5);
        const opacity = Math.max(0.2, 1 - (distance / maxDistance) * 0.8);
        
        // Improved z-index calculation - center card gets highest, decreases outward
        const zIndex = adjustedOffset === 0 ? 100 : (CONFIG.VISIBLE_COUNT * 2 - distance);

        return { x, y, scale, opacity, zIndex };
    }

    /**
     * Create card element
     */
    function createCard(member, index) {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${member.image}" alt="${member.name}" class="card-image" onerror="this.src='https://via.placeholder.com/150/0891b2/ffffff?text=${member.name.charAt(0)}'">
            </div>
            ${member.tag ? `<span class="card-tag">${member.tag}</span>` : ''}
            <div class="card-content">
                <h3 class="card-title">${member.name}</h3>
                <p class="card-description">${member.role}</p>
            </div>
        `;
        card.addEventListener('click', () => goToIndex(index));
        return card;
    }

    /**
     * Create dot element
     */
    function createDot(index) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToIndex(index));
        return dot;
    }

    /**
     * Initialize carousel
     */
    function init() {
        // Get DOM elements
        track = document.getElementById('carouselTrack');
        numberEl = document.getElementById('carouselNumber');
        totalEl = document.getElementById('carouselTotal');
        dotsContainer = document.getElementById('carouselDots');
        prevBtn = document.getElementById('prevBtn');
        nextBtn = document.getElementById('nextBtn');

        // Check if elements exist
        if (!track || !numberEl || !totalEl || !dotsContainer || !prevBtn || !nextBtn) {
            console.error('Carousel elements not found');
            return;
        }

        // Create cards
        teamMembers.forEach((member, index) => {
            const card = createCard(member, index);
            track.appendChild(card);
        });

        // Create dots
        teamMembers.forEach((_, index) => {
            const dot = createDot(index);
            dotsContainer.appendChild(dot);
        });

        // Set total
        totalEl.textContent = `of ${String(teamMembers.length).padStart(2, '0')}`;

        // Update positions
        updateCarousel();

        // Event listeners
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        
        track.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoPlay();
        });
        
        track.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoPlay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Start autoplay
        startAutoPlay();
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboard(e) {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }

    /**
     * Update carousel positions and states
     */
    function updateCarousel() {
        const cards = track.querySelectorAll('.carousel-card');
        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        cards.forEach((card, index) => {
            const pos = getItemPosition(index, currentIndex, teamMembers.length);
            
            if (pos) {
                card.style.display = 'flex';
                card.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
                card.style.opacity = pos.opacity;
                card.style.zIndex = pos.zIndex;
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update number
        numberEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    /**
     * Navigate to specific index
     */
    function goToIndex(index) {
        currentIndex = ((index % teamMembers.length) + teamMembers.length) % teamMembers.length;
        updateCarousel();
    }

    /**
     * Navigate to previous
     */
    function prev() {
        goToIndex(currentIndex - 1);
    }

    /**
     * Navigate to next
     */
    function next() {
        goToIndex(currentIndex + 1);
    }

    /**
     * Start auto-play
     */
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (!isHovered) {
                next();
            }
        }, CONFIG.AUTO_PLAY_INTERVAL);
    }

    /**
     * Stop auto-play
     */
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoPlay();
        document.removeEventListener('keydown', handleKeyboard);
    });

})();
