document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-times'); // Change to 'X' icon when open
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.querySelector('i').classList.remove('fa-times');
                menuIcon.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // 2. Smooth Scrolling (Fallback for browsers that don't support CSS scroll-behavior)
    // Note: The CSS 'scroll-behavior: smooth;' is the primary method.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Only apply custom smooth scroll if the link is an internal section link
            if (this.getAttribute('href').length > 1) {
                 document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // 3. Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // In a real production scenario, you would use an external service (like Formspree, Netlify Forms, or a serverless function)
        // to handle the actual email submission.
        
        // Simulating a successful submission for the demo
        formStatus.style.color = 'var(--color-neon-green)';
        formStatus.textContent = 'Message Sent Successfully! (Demo Only). I will respond soon.';
        contactForm.reset();

        // Optional: Hide status message after a few seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);

        // REAL-WORLD ACTION: To make this functional, you must replace the above simulation
        // with an AJAX call to a backend service/API endpoint.
    });


    // 4. Set Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();


    // 5. Scroll-based Animations (Intersection Observer API)
    const fadeInElements = document.querySelectorAll('.section-title, .about-container, .skills-grid, .project-card, .resume-content, .contact-container');
    
    // Options for the observer
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px'
    };

    // Create the observer callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add base class to all relevant elements
                setTimeout(() => {
                     entry.target.classList.add('appear'); // Add 'appear' class to trigger animation
                }, 100); // Small delay for better visibility
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Attach observer to all target elements
    fadeInElements.forEach(element => {
        element.classList.add('fade-in'); // Add initial opacity 0 state
        observer.observe(element);
    });
});