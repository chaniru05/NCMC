// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    initSlideshow();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default behavior for now (will be updated when implementing other pages)
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const featureObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-feature');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        features.forEach(feature => {
            featureObserver.observe(feature);
        });
    }

    // Create dynamic floating math equations
    createFloatingEquations();

    // Add hover animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
        });
    }

    // Navigation link scaling effect
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
            this.style.transform = 'scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Function to handle slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Function to create floating math equations
function createFloatingEquations() {
    const mathSymbols = document.querySelector('.math-symbols');
    if (!mathSymbols) return;

    // Create additional math symbols dynamically
    const additionalSymbols = [
        { text: "∇", top: "45%", left: "70%", size: "4rem", duration: "17s", delay: "1s" },
        { text: "θ", top: "15%", left: "60%", size: "3.5rem", duration: "19s", delay: "2s" },
        { text: "λ", top: "65%", left: "85%", size: "5rem", duration: "16s", delay: "0s" },
        { text: "∂", top: "75%", left: "10%", size: "4.2rem", duration: "21s", delay: "3s" }
    ];

    additionalSymbols.forEach((symbol, index) => {
        const symbolElement = document.createElement('div');
        symbolElement.classList.add('symbol');
        symbolElement.id = 'dynamic-symbol-' + (index + 1);
        symbolElement.textContent = symbol.text;
        symbolElement.style.top = symbol.top;
        symbolElement.style.left = symbol.left;
        symbolElement.style.fontSize = symbol.size;
        symbolElement.style.animationDuration = symbol.duration;
        symbolElement.style.animationDelay = symbol.delay;
        mathSymbols.appendChild(symbolElement);
    });
}

// Parallax effect for the hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (hero && scrollPosition < hero.offsetHeight) {
        const mathSymbols = document.querySelectorAll('.symbol');
        mathSymbols.forEach(symbol => {
            const speed = 0.1;
            symbol.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});

// Function to handle page navigation (to be expanded)
function navigateTo(page) {
    console.log(`Navigating to ${page} page`);
    // Will be implemented when creating other pages
}

// Animation for event cards
const eventCards = document.querySelectorAll('.event-card');
eventCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s, box-shadow 0.3s';
    });
});