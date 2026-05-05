import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons (from CDN global)
const initIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = mobileMenuToggle.querySelector('i');

const toggleMenu = () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
    
    // Toggle Icon
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenuIcon.setAttribute('data-lucide', 'menu');
    }
    initIcons();
};

mobileMenuToggle.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial Icon Init
    initIcons();

    // Hero Section Animations
    const tl = gsap.timeline();
    
    tl.from('.badge', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-content p', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.social-proof', {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-ctas', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');

    // Scroll Reveal for general elements
    const revealElements = document.querySelectorAll('.service-card, .section-title, .about-content, .about-images');
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Sketch Zig-Zag Animation
    if (document.querySelector('.transformation-card')) {
        gsap.from('.transformation-card', {
            scrollTrigger: {
                trigger: '.results-grid',
                start: 'top 95%', /* Start sooner */
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: 'all'
        });
    }
});
