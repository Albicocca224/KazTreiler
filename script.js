// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = nav.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
        spans[1].style.opacity = nav.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = nav.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Shadow on Scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('КазТрейлер - страница загружена');
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and stats
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .stat-item, .contact-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    // Check if target is a decimal number
    const isDecimal = target.toString().includes('.');
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            // Display final value with proper formatting
            if (isDecimal) {
                element.textContent = target.toFixed(1) + (element.dataset.suffix || '');
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
            clearInterval(timer);
        } else {
            // Display current value with proper formatting
            if (isDecimal) {
                element.textContent = current.toFixed(1) + (element.dataset.suffix || '');
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }
    }, stepDuration);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Extract number (including decimals) and suffix
                const numberMatch = text.match(/[\d.]+/);
                const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
                const suffix = text.replace(/[\d.]/g, '');
                stat.dataset.suffix = suffix;
                stat.textContent = '0' + suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('КазТрейлер - страница загружена');
});