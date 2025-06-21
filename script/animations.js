function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

 
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}


function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}


function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.link-nav-container a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initArrowClick() {
    const arrow = document.querySelector('.arrow-container');
    if (arrow) {
        arrow.addEventListener('click', function () {
            const aboutSection = document.querySelector('#aboutMe');
            if (aboutSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}


function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(25px) saturate(200%)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
        }
    });
}

function initActiveNavHighlighting() {
    const navLinks = document.querySelectorAll('.link-nav-container a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Handle contact buttons
function initContactButtons() {
    const emailButton = document.querySelector('.send-msg button:first-child');
    const linkedinButton = document.querySelector('.send-msg button:last-child');

    if (emailButton) {
        emailButton.addEventListener('click', function () {
            // Replace with your email
            const email = "rolandotabiosjrr@gmail.com"; 
            const subject = encodeURIComponent("Let's work together");
            const body = encodeURIComponent("This is a message sent from my site!");

            const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
            window.open(gmailURL, "_blank");
        });
    }

    if (linkedinButton) {
        linkedinButton.addEventListener('click', function () {
            // Replace with your LinkedIn profile URL
            const linkedinUrl = 'https://www.linkedin.com/in/rolando-tabiosjr-67b775285/?trk=opento_sprofile_details';
            window.open(linkedinUrl, '_blank');
        });
    }
}

// Add typing effect to the main heading
function initTypingEffect() {
    const heading = document.querySelector('.profession h1');
    if (heading) {
        const originalText = heading.innerHTML;
        heading.innerHTML = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heading.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after page loads
        setTimeout(typeWriter, 1000);
    }
}

// Add parallax effect to background elements
function initParallaxEffect() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Apply parallax to background elements
        const backgroundElements = document.querySelectorAll('.first-section::before');
        backgroundElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Add intersection observer for better performance
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Add work card hover effects
function initWorkCardEffects() {
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            handleScrollAnimations();
        }, 500);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Core functionality
    createParticles();
    initSmoothScrolling();
    initArrowClick();
    initHeaderScroll();
    initActiveNavHighlighting();
    initContactButtons();
    initLoadingAnimation();

    // Enhanced effects
    initTypingEffect();
    initWorkCardEffects();

    // Performance optimized scroll handlers
    const throttledScrollHandler = throttle(handleScrollAnimations, 100);
    window.addEventListener('scroll', throttledScrollHandler);

    // Use Intersection Observer for better performance if supported
    if ('IntersectionObserver' in window) {
        initIntersectionObserver();
    } else {
        // Fallback to scroll listener
        window.addEventListener('scroll', handleScrollAnimations);
    }

    // Initial call to set up animations
    handleScrollAnimations();
});

// Handle window resize
window.addEventListener('resize', function () {
    // Recreate particles on resize for better distribution
    createParticles();
});

// Add some easter eggs
document.addEventListener('keydown', function (e) {
    // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Export functions for potential external use
window.PortfolioAnimations = {
    createParticles,
    handleScrollAnimations,
    initSmoothScrolling,
    initContactButtons
};