// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typewriter effect for hero subtitle
class RetroTypewriter {
    constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.innerHTML = currentText.substring(0, this.currentCharIndex - 1) + '<span class="retro-cursor">█</span>';
            this.currentCharIndex--;
        } else {
            this.element.innerHTML = currentText.substring(0, this.currentCharIndex + 1) + '<span class="retro-cursor">█</span>';
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter animation
window.addEventListener('load', () => {
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const texts = [
            'Passionate Java Developer',
            '4+ years experience',
        ];
        new RetroTypewriter(typewriterElement, texts, 80, 40, 2000);
    }
});

// Active navigation link highlighting
let isUserClicking = false;

window.addEventListener('scroll', () => {
    if (isUserClicking) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 250;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'retroSlideIn 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-card',
        '.timeline-item',
        '.skill-card',
        '.project-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });
    });
});

// Mobile menu close on link click and proper active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        isUserClicking = true;
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
        
        // Reset flag after scroll animation completes
        setTimeout(() => {
            isUserClicking = false;
        }, 1000);
    });
});



// Glitch effect on hover for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const placeholder = card.querySelector('.project-placeholder');
            if (placeholder) {
                placeholder.style.animation = 'glitchText 0.5s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const placeholder = card.querySelector('.project-placeholder');
            if (placeholder) {
                placeholder.style.animation = '';
            }
        });
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Parallax effect for retro lines
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const lines = document.querySelectorAll('.line');
    
    lines.forEach((line, index) => {
        const speed = 0.1 + (index * 0.05);
        line.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS animations and effects
const style = document.createElement('style');
style.textContent = `
    .retro-cursor {
        animation: retroBlink 1s infinite;
        color: var(--lime-green);
    }
    
    @keyframes retroBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes retroSlideIn {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glitchText {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .nav-link.active {
        color: var(--neon-green) !important;
        border: 1px solid var(--neon-green) !important;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.5) !important;
        text-shadow: 0 0 5px var(--neon-green) !important;
    }
    
    .navbar-toggler {
        border: 1px solid var(--neon-green);
        background: transparent;
    }
    
    .navbar-toggler:focus {
        box-shadow: 0 0 10px var(--neon-green);
    }
    
    .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2800, 255, 65, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
    
    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--dark-bg);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--neon-green);
        border-radius: 4px;
        box-shadow: 0 0 10px var(--neon-green);
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--bright-green);
        box-shadow: 0 0 15px var(--bright-green);
    }
`;
document.head.appendChild(style);