// Particle System - Enhanced Modern Design
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 200 };
let connections = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.baseOpacity = this.opacity;
        
        // Color variation
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
            this.color = { r: 8, g: 145, b: 178 }; // cyan
        } else if (colorChoice < 0.7) {
            this.color = { r: 34, g: 211, b: 238 }; // light blue
        } else {
            this.color = { r: 139, g: 92, b: 246 }; // purple accent
        }
        
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * 50 + 20;
        this.orbitSpeed = (Math.random() - 0.5) * 0.01;
        this.orbitAngle = Math.random() * Math.PI * 2;
    }

    update() {
        // Orbital motion
        this.orbitAngle += this.orbitSpeed;
        
        // Base movement with orbital influence
        this.x += this.speedX + Math.cos(this.orbitAngle) * 0.1;
        this.y += this.speedY + Math.sin(this.orbitAngle) * 0.1;
        
        // Enhanced pulse effect
        this.pulsePhase += this.pulseSpeed;
        const pulse = (Math.sin(this.pulsePhase) + 1) / 2;
        
        // Mouse interaction - attract and ripple
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                
                // Ripple effect
                const ripple = Math.sin(distance * 0.05 - Date.now() * 0.005) * force;
                
                // Push particles away in a wave pattern
                this.x -= Math.cos(angle) * force * 2 + ripple * 2;
                this.y -= Math.sin(angle) * force * 2 + ripple * 2;
                
                // Enhance size and opacity near mouse
                this.size = this.baseSize * (1 + force * 1.5);
                this.opacity = Math.min(1, this.baseOpacity + force * 0.6);
            } else {
                // Smooth return to base state
                this.size = this.size * 0.95 + this.baseSize * 0.05;
                this.opacity = this.opacity * 0.95 + this.baseOpacity * 0.05;
            }
        } else {
            // Gentle pulse when no mouse interaction
            this.size = this.baseSize * (1 + pulse * 0.2);
            this.opacity = this.baseOpacity * (0.8 + pulse * 0.4);
        }

        // Wrap around edges with smooth transition
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        
        return pulse;
    }

    draw(pulse) {
        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    const numberOfParticles = Math.min(150, (canvas.width * canvas.height) / 10000);
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.3;
                
                // Gradient line
                const gradient = ctx.createLinearGradient(
                    particles[a].x, particles[a].y,
                    particles[b].x, particles[b].y
                );
                gradient.addColorStop(0, `rgba(${particles[a].color.r}, ${particles[a].color.g}, ${particles[a].color.b}, ${opacity})`);
                gradient.addColorStop(1, `rgba(${particles[b].color.r}, ${particles[b].color.g}, ${particles[b].color.b}, ${opacity})`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // Fade effect instead of clear for trail (adjusted for white background)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        const pulse = particle.update();
        particle.draw(pulse);
    });
    
    connectParticles();
    requestAnimationFrame(animate);
}

init();
animate();

// Text Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.text-reveal').forEach(el => {
    observer.observe(el);
});

// Card Tilt Effect
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
