// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add home class to body
    document.body.classList.add('home');
    
    // Initialize header change on scroll
    initHeaderScroll();
    
    // Initialize slideshow
    initSlideshow();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for links that don't have actual destinations
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
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

    // Navigation link scaling effect for solid header (transparent header is handled by CSS)
    const header = document.querySelector('header');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (header.classList.contains('solid')) {
                this.style.transition = 'all 0.3s';
                this.style.transform = 'scale(1.1)';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (header.classList.contains('solid')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
});

// Function to handle header change on scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // pixels to scroll before changing header
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
            header.classList.add('transparent');
        }
    });
    
    // Set initial state
    if (window.scrollY > scrollThreshold) {
        header.classList.remove('transparent');
        header.classList.add('solid');
    } else {
        header.classList.remove('solid');
        header.classList.add('transparent');
    }
}

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



//MEMBER REGISTRATION--------------------------------------------------------------------------------

// Update the register.html script to handle form transitions
document.addEventListener('DOMContentLoaded', function() {
    // Original tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const registrationCategories = document.querySelectorAll('.registration-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            registrationCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Registration button hover animation
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
        });
        
        // Add click event to the Member category register button
        if (button.parentElement.querySelector('h3').textContent === 'Member') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'member-registration.html';
            });
        }
    });

    // Registration option animation on scroll
    const options = document.querySelectorAll('.registration-option');
    
    if ('IntersectionObserver' in window) {
        const optionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-feature');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        options.forEach(option => {
            optionObserver.observe(option);
        });
    }
    
    // Handle transitions for math symbols on the registration page
    const mathSymbols = document.querySelectorAll('.math-symbol');
    if (mathSymbols.length > 0) {
        mathSymbols.forEach((symbol, index) => {
            symbol.style.animationDelay = `${index * 1.5}s`;
        });
    }
});