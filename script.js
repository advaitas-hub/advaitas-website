// Force page to start at top (Home/Hero section) on refresh/reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
});

// Initial Entry Page Loader Controller (First Visit Only)
(function() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // Check session storage to only show loader on initial website entry
    if (sessionStorage.getItem('advaita_visited')) {
        document.documentElement.classList.add('no-loader');
        loader.classList.add('loaded');
        return;
    }

    sessionStorage.setItem('advaita_visited', 'true');

    function dismissLoader() {
        if (!loader.classList.contains('loaded')) {
            loader.style.pointerEvents = 'none';
            loader.classList.add('loaded');
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(dismissLoader, 350);
    } else {
        window.addEventListener('DOMContentLoaded', () => setTimeout(dismissLoader, 350));
        window.addEventListener('load', () => setTimeout(dismissLoader, 200));
    }

    // Safety timeout: Never hold screen for more than 500ms
    setTimeout(dismissLoader, 500);
})();

// Hero Button Actions
document.addEventListener('DOMContentLoaded', () => {
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', () => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        });
        scrollIndicator.style.cursor = 'pointer';
    }
});

// Liquid Metal Button Click Effect
document.addEventListener('DOMContentLoaded', () => {
    const liquidBtn = document.querySelector('.liquid-metal-btn');
    
    if (liquidBtn) {
        liquidBtn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated Letter Effect
document.addEventListener('DOMContentLoaded', () => {
    const animatedLinks = document.querySelectorAll('.animated-link');
    
    animatedLinks.forEach(link => {
        const text = link.getAttribute('data-text');
        link.innerHTML = '';
        
        text.split('').forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            link.appendChild(span);
        });
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission - Modern Contact Form
const contactForm = document.querySelector('.contact-form-modern');
const contactSuccessCard = document.getElementById('contactSuccessCard');
const contactErrorMessage = document.getElementById('contactErrorMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (contactErrorMessage) contactErrorMessage.style.display = 'none';

        const button = contactForm.querySelector('.submit-button');
        const buttonText = button ? button.querySelector('.button-text') : null;
        const originalText = buttonText ? buttonText.textContent : 'Send Message';
        
        if (buttonText) buttonText.textContent = 'Sending...';
        if (button) button.style.pointerEvents = 'none';
        
        const nameVal = document.getElementById('name') ? document.getElementById('name').value : '';
        const emailVal = document.getElementById('email') ? document.getElementById('email').value : '';
        const subjectVal = document.getElementById('subject') ? document.getElementById('subject').value : '';
        const messageVal = document.getElementById('message') ? document.getElementById('message').value : '';

        const formData = new URLSearchParams();
        formData.append('entry.123062433', nameVal);
        formData.append('entry.841369507', emailVal);
        formData.append('entry.794113971', subjectVal);
        formData.append('entry.477585749', messageVal);

        fetch('https://docs.google.com/forms/d/e/1FAIpQLScXbVh9dFuskOqYhTQuhTt3Zd2bBgFM4lYcDRD7OJKCORcWAA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        }).then(() => {
            if (button) {
                createSuccessParticles(button);
            }
            contactForm.style.display = 'none';
            if (contactSuccessCard) {
                contactSuccessCard.style.display = 'block';
            }
        }).catch((err) => {
            console.error('Submission error:', err);
            if (buttonText) buttonText.textContent = originalText;
            if (button) button.style.pointerEvents = '';
            if (contactErrorMessage) contactErrorMessage.style.display = 'block';
        });
    });
}

function resetContactForm() {
    const contactForm = document.querySelector('.contact-form-modern');
    const contactSuccessCard = document.getElementById('contactSuccessCard');
    const contactErrorMessage = document.getElementById('contactErrorMessage');
    if (contactForm) {
        contactForm.reset();
        const button = contactForm.querySelector('.submit-button');
        const buttonText = button ? button.querySelector('.button-text') : null;
        if (buttonText) buttonText.textContent = 'Send Message';
        if (button) button.style.pointerEvents = '';
        contactForm.style.display = 'flex';
    }
    if (contactSuccessCard) {
        contactSuccessCard.style.display = 'none';
    }
    if (contactErrorMessage) {
        contactErrorMessage.style.display = 'none';
    }
}

// Navbar scroll effect with animation
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for shadow effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}


// Hero Section - Animated Words Rotation
document.addEventListener('DOMContentLoaded', () => {
    const animatedWords = document.querySelectorAll('.animated-word');
    
    if (animatedWords.length > 0) {
        let currentIndex = 0;
        
        function rotateWords() {
            // Remove active class from current word
            animatedWords[currentIndex].classList.remove('active');
            
            // Move to next word
            currentIndex = (currentIndex + 1) % animatedWords.length;
            
            // Add active class to next word
            animatedWords[currentIndex].classList.add('active');
        }
        
        // Rotate words every 2 seconds
        setInterval(rotateWords, 2000);
    }
});




// Animated Number Counter for About Section Stats
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number-animated');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const animateNumber = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target;
                }
            };
            
            requestAnimationFrame(updateNumber);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    animateNumber(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
});

// 3D Tilt Effect for Feature Cards - DISABLED FOR STABILITY
document.addEventListener('DOMContentLoaded', () => {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    // Removed tilt effect to prevent cards from moving
});

// Progress Bar Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.stat-progress-bar');
    
    if (progressBars.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
            });
        }, observerOptions);
        
        progressBars.forEach(bar => observer.observe(bar));
    }
});


// Interactive Mouse-Following Effect for About Section
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        // Create cursor glow element
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow-effect';
        cursorGlow.style.cssText = `
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(8, 145, 178, 0.15), transparent 70%);
            pointer-events: none;
            filter: blur(40px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
        `;
        aboutSection.appendChild(cursorGlow);
        
        aboutSection.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
        
        aboutSection.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            const x = e.clientX - rect.left - 150;
            const y = e.clientY - rect.top - 150;
            
            cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// Parallax Effect for Background Elements - DISABLED FOR ABOUT SECTION
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        const orbs = document.querySelectorAll('.about-gradient-orb');
        const shapes = document.querySelectorAll('.floating-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const aboutTop = aboutSection.offsetTop;
            const aboutHeight = aboutSection.offsetHeight;
            
            // Check if about section is in viewport
            if (scrolled + window.innerHeight > aboutTop && scrolled < aboutTop + aboutHeight) {
                const relativeScroll = scrolled - aboutTop;
                
                // Parallax disabled for stability - cards won't move
                // Orbs and shapes keep their original position
            }
        });
    }
});

// Dynamic Gradient Animation based on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const aboutTop = aboutSection.offsetTop;
            const aboutHeight = aboutSection.offsetHeight;
            
            if (scrolled + window.innerHeight > aboutTop && scrolled < aboutTop + aboutHeight) {
                const progress = (scrolled - aboutTop) / aboutHeight;
                const hue1 = 190 + (progress * 20); // Shifts from cyan to blue
                const hue2 = 180 + (progress * 30);
                
                aboutSection.style.background = `linear-gradient(180deg, 
                    hsl(${hue1}, 100%, 97%) 0%, 
                    hsl(${hue2}, 85%, 95%) 50%, 
                    hsl(${hue1}, 100%, 97%) 100%)`;
            }
        });
    }
});

// Sparkle Effect on Feature Cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card-modern');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Create sparkle elements
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle-effect';
                    
                    const size = Math.random() * 8 + 4;
                    const x = Math.random() * card.offsetWidth;
                    const y = Math.random() * card.offsetHeight;
                    
                    sparkle.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        background: linear-gradient(135deg, var(--accent-blue), var(--light-blue));
                        border-radius: 50%;
                        left: ${x}px;
                        top: ${y}px;
                        pointer-events: none;
                        animation: sparkleFloat 1s ease-out forwards;
                        box-shadow: 0 0 10px rgba(8, 145, 178, 0.8);
                    `;
                    
                    card.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
        });
    });
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-30px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-60px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
});


// Services Section - Magnetic Effect on Cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card-clean');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * 5;
            const rotateY = -deltaX * 5;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-12px) 
                scale(1.03)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Services Section - Particle Burst on Card Click
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card-clean');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create particle burst
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'burst-particle';
                
                const angle = (Math.PI * 2 * i) / 12;
                const velocity = 100 + Math.random() * 50;
                const size = 4 + Math.random() * 4;
                
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: linear-gradient(135deg, var(--accent-blue), var(--light-blue));
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    box-shadow: 0 0 10px rgba(8, 145, 178, 0.8);
                `;
                
                card.appendChild(particle);
                
                const deltaX = Math.cos(angle) * velocity;
                const deltaY = Math.sin(angle) * velocity;
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                setTimeout(() => particle.remove(), 800);
            }
        });
    });
});

// Services Section - Parallax on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const servicesSection = document.querySelector('.services');
    
    if (servicesSection) {
        const orbs = document.querySelectorAll('.services-orb');
        const shapes = document.querySelectorAll('.geo-shape');
        const particles = document.querySelectorAll('.service-particle');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionTop = servicesSection.offsetTop;
            const sectionHeight = servicesSection.offsetHeight;
            
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const relativeScroll = scrolled - sectionTop;
                
                // Parallax for orbs
                orbs.forEach((orb, index) => {
                    const speed = 0.2 + (index * 0.1);
                    const yPos = relativeScroll * speed;
                    orb.style.transform = `translate(0, ${yPos}px)`;
                });
                
                // Parallax for shapes
                shapes.forEach((shape, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = relativeScroll * speed;
                    shape.style.transform = `translate(0, ${yPos}px)`;
                });
            }
        });
    }
});

// Services Section - Mouse Follower Glow
document.addEventListener('DOMContentLoaded', () => {
    const servicesSection = document.querySelector('.services');
    
    if (servicesSection) {
        const glow = document.createElement('div');
        glow.className = 'services-cursor-glow';
        glow.style.cssText = `
            position: absolute;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(8, 145, 178, 0.2), transparent 70%);
            pointer-events: none;
            filter: blur(40px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
        `;
        servicesSection.appendChild(glow);
        
        servicesSection.addEventListener('mouseenter', () => {
            glow.style.opacity = '1';
        });
        
        servicesSection.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
        
        servicesSection.addEventListener('mousemove', (e) => {
            const rect = servicesSection.getBoundingClientRect();
            const x = e.clientX - rect.left - 125;
            const y = e.clientY - rect.top - 125;
            
            glow.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// Services Section - Card Reveal on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card-clean');
    
    if (serviceCards.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'cardReveal 0.8s ease-out forwards';
                }
            });
        }, observerOptions);
        
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
    }
    
    // Add card reveal animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardReveal {
            0% {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
});

// Services Section - Icon Pulse Animation on Hover
document.addEventListener('DOMContentLoaded', () => {
    const cardIcons = document.querySelectorAll('.card-icon');
    
    cardIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'iconPulse 0.6s ease';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconPulse {
            0%, 100% {
                transform: scale(1) rotate(0deg);
            }
            25% {
                transform: scale(1.15) rotate(5deg);
            }
            50% {
                transform: scale(1.25) rotate(10deg);
            }
            75% {
                transform: scale(1.15) rotate(5deg);
            }
        }
    `;
    document.head.appendChild(style);
});


// Success Particles for Form Submission
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 150 + Math.random() * 100;
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity - 100;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Contact Form - Input Focus Animation
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const wrapper = input.closest('.input-wrapper');
            wrapper.style.animation = 'inputFocusPulse 0.4s ease';
        });
        
        input.addEventListener('animationend', () => {
            const wrapper = input.closest('.input-wrapper');
            wrapper.style.animation = '';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.animation = 'inputShake 0.4s ease';
            }
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes inputFocusPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
        
        @keyframes inputShake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-8px);
            }
            75% {
                transform: translateX(8px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Contact Section - Magnetic Info Cards
document.addEventListener('DOMContentLoaded', () => {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateY = deltaX * 5;
            const rotateX = -deltaY * 5;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateX(12px) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Contact Section - Form Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.borderColor = 'var(--accent-blue)';
                input.style.boxShadow = '0 4px 12px rgba(8, 145, 178, 0.15)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });
    });
});

// Contact Section - Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('.contact');
    
    if (contactSection) {
        const orbs = document.querySelectorAll('.contact-orb');
        const particles = document.querySelectorAll('.contact-particle');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionTop = contactSection.offsetTop;
            const sectionHeight = contactSection.offsetHeight;
            
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const relativeScroll = scrolled - sectionTop;
                
                orbs.forEach((orb, index) => {
                    const speed = 0.15 + (index * 0.05);
                    const yPos = relativeScroll * speed;
                    orb.style.transform = `translate(0, ${yPos}px)`;
                });
            }
        });
    }
});

// Contact Form - Character Counter
document.addEventListener('DOMContentLoaded', () => {
    const messageTextarea = document.querySelector('#message');
    
    if (messageTextarea) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: var(--text-gray);
            margin-top: 4px;
        `;
        
        const formGroup = messageTextarea.closest('.form-group');
        formGroup.appendChild(counter);
        
        messageTextarea.setAttribute('maxlength', maxLength);
        
        const updateCounter = () => {
            const remaining = maxLength - messageTextarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = 'var(--accent-blue)';
            } else {
                counter.style.color = 'var(--text-gray)';
            }
        };
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});

// =========================================================================
// UNIVERSAL STAGGERED SCROLL REVEAL & PAGE LINK TRANSITIONS (SERVICES STYLE)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Observe all key components for smooth staggered scroll reveal
    const targetSelectors = [
        '.service-card', '.service-card-clean', '.feature-card', '.feature-card-modern',
        '.portfolio-card', '.portfolio-item', '.info-card', '.stat-box', '.why-us-card',
        '.process-step', '.faq-item', '.get-started-main-grid', '.cta-container',
        '.contact-card', '.hero-badge-animated', '.hero-animated-title', '.hero-animated-subtext'
    ];

    const revealElements = document.querySelectorAll(targetSelectors.join(', '));

    if (revealElements.length > 0) {
        const observerOptions = {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            if (!el.classList.contains('reveal-on-scroll')) {
                el.classList.add('reveal-on-scroll');
            }

            // Stagger siblings in same parent container
            if (el.parentNode && el.parentNode.children) {
                const index = Array.from(el.parentNode.children).indexOf(el);
                el.style.transitionDelay = `${(index % 6) * 0.07}s`;
            }

            revealObserver.observe(el);
        });
    }

    // 2. Smooth Outgoing Link Transition on Internal Navigation
    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

            e.preventDefault();
            document.body.style.transition = 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(-8px)';

            setTimeout(() => {
                window.location.href = href;
            }, 260);
        });
    });

    // 3. Mobile Hamburger Navigation Controller
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});
