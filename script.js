// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add home class to body
    document.body.classList.add('home');
    
    // Initialize header change on scroll
    initHeaderScroll();
    
    // Initialize slideshow
    initSlideshow();
    
    // Initialize mobile menu - improved for better mobile experience
    initMobileMenu();
    
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

    // Initialize mobile dropdowns - enhanced for better mobile UX
    initMobileDropdowns();

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

    // Create dynamic floating math equations - optimized for mobile
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

// Function to initialize mobile menu - completely rewritten for mobile-friendly experience
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!menuToggle || !closeMenu || !menuOverlay) return;
    
    // Open menu with sliding animation
    menuToggle.addEventListener('click', function() {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        
        // Add animation class
        setTimeout(() => {
            document.querySelector('.mobile-menu').classList.add('slide-in');
        }, 10);
    });
    
    // Close menu with animation
    function closeMenuWithAnimation() {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.remove('slide-in');
        mobileMenu.classList.add('slide-out');
        
        // After animation completes, hide overlay and reset classes
        setTimeout(() => {
            menuOverlay.classList.remove('active');
            mobileMenu.classList.remove('slide-out');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    // Close menu when X is clicked
    closeMenu.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenuWithAnimation();
    });
    
    // Close menu when clicking outside
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenuWithAnimation();
        }
    });
}

// Function to initialize mobile dropdowns - enhanced for better UX
function initMobileDropdowns() {
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parent = this.parentElement;
            const dropdownMenu = parent.querySelector('.mobile-dropdown-menu');
            const icon = this.querySelector('i.fas'); // Get the chevron icon
            
            // Toggle active class
            parent.classList.toggle('active');
            
            // Rotate chevron icon
            if (icon) {
                if (parent.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
            
            // Toggle dropdown visibility with smooth animation
            if (dropdownMenu) {
                if (parent.classList.contains('active')) {
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                    dropdownMenu.style.opacity = '1';
                } else {
                    dropdownMenu.style.maxHeight = '0';
                    dropdownMenu.style.opacity = '0';
                }
            }
            
            // Close other open dropdowns
            const otherActiveDropdowns = document.querySelectorAll('.mobile-dropdown.active');
            otherActiveDropdowns.forEach(dropdown => {
                if (dropdown !== parent) {
                    dropdown.classList.remove('active');
                    const otherMenu = dropdown.querySelector('.mobile-dropdown-menu');
                    const otherIcon = dropdown.querySelector('.mobile-dropdown-toggle i.fas');
                    
                    if (otherMenu) {
                        otherMenu.style.maxHeight = '0';
                        otherMenu.style.opacity = '0';
                    }
                    
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    });
}

// Function to handle header change on scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = window.innerWidth <= 768 ? 50 : 100; // Lower threshold for mobile
    
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

// Function to create floating math equations - optimized for mobile
function createFloatingEquations() {
    const mathSymbols = document.querySelector('.math-symbols');
    if (!mathSymbols) return;

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Create fewer and smaller symbols for mobile
    if (isMobile) {
        // Remove existing symbols to prevent overcrowding on mobile
        const existingSymbols = document.querySelectorAll('.symbol:not(#symbol1):not(#symbol2)');
        existingSymbols.forEach(symbol => {
            if (symbol.id !== 'symbol1' && symbol.id !== 'symbol2') {
                symbol.remove();
            }
        });
        
        // Make remaining symbols smaller
        document.querySelectorAll('.symbol').forEach(symbol => {
            symbol.style.fontSize = '2rem';
        });
        
        // Create only one additional symbol for mobile
        const mobileSymbol = {
            text: "λ", top: "70%", left: "70%", size: "2rem", duration: "16s", delay: "0s"
        };
        
        const symbolElement = document.createElement('div');
        symbolElement.classList.add('symbol');
        symbolElement.id = 'mobile-symbol';
        symbolElement.textContent = mobileSymbol.text;
        symbolElement.style.top = mobileSymbol.top;
        symbolElement.style.left = mobileSymbol.left;
        symbolElement.style.fontSize = mobileSymbol.size;
        symbolElement.style.animationDuration = mobileSymbol.duration;
        symbolElement.style.animationDelay = mobileSymbol.delay;
        mathSymbols.appendChild(symbolElement);
    } else {
        // For desktop, create additional math symbols as before
        const additionalSymbols = [
            { text: "∇", top: "45%", left: "70%", size: "3rem", duration: "17s", delay: "1s" },
            { text: "λ", top: "65%", left: "85%", size: "3.5rem", duration: "16s", delay: "0s" }
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
}

// Parallax effect for the hero section - optimized for mobile
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (hero && scrollPosition < hero.offsetHeight) {
        // Only apply parallax on larger screens to improve mobile performance
        if (window.innerWidth > 768) {
            const mathSymbols = document.querySelectorAll('.symbol');
            mathSymbols.forEach(symbol => {
                const speed = 0.1;
                symbol.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    }
});

// Check for screen size changes and adjust UI accordingly
window.addEventListener('resize', function() {
    // Recalculate and recreate floating equations for current screen size
    const mathSymbols = document.querySelector('.math-symbols');
    if (mathSymbols) {
        // Remove all dynamically created symbols
        const dynamicSymbols = document.querySelectorAll('[id^="dynamic-symbol-"], #mobile-symbol');
        dynamicSymbols.forEach(symbol => symbol.remove());
        
        // Recreate appropriate symbols for current screen size
        createFloatingEquations();
    }
    
    // Adjust header scroll threshold
    initHeaderScroll();
});

// Function to handle page navigation
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



// ------------------------------- Register Now -----------------------------------------------

// Add navigation to member-registration.html for the Member registration button
const memberRegisterButton = document.querySelector('#member .registration-option:first-child .register-button');
if (memberRegisterButton) {
    memberRegisterButton.addEventListener('click', function() {
        window.location.href = 'member-registration.html';
    });
}