/**
 * REQUETERICO - Pastelería Artesanal
 * Landing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        const navLinks = mainNav.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // MENU TABS
    // ============================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('menu-tab--active'));
            this.classList.add('menu-tab--active');
            
            // Show target category with animation
            menuCategories.forEach(category => {
                category.classList.remove('menu-category--active');
                if (category.id === targetTab) {
                    // Small delay for animation
                    setTimeout(() => {
                        category.classList.add('menu-category--active');
                    }, 50);
                }
            });
        });
    });
    
    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // FORM TO WHATSAPP
    // ============================================
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const date = formData.get('date');
            const time = formData.get('time');
            const guests = formData.get('guests');
            const message = formData.get('message');
            
            // Format date for display
            let formattedDate = date;
            if (date) {
                const dateObj = new Date(date + 'T00:00:00');
                formattedDate = dateObj.toLocaleDateString('es-AR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            
            // Build WhatsApp message
            let whatsappMessage = `¡Hola! Quiero hacer una reserva en Requeterico\n\n`;
            whatsappMessage += `👤 *Nombre:* ${name}\n`;
            whatsappMessage += `📞 *Teléfono:* ${phone}\n`;
            whatsappMessage += `📅 *Fecha:* ${formattedDate}\n`;
            whatsappMessage += `🕐 *Hora:* ${time}\n`;
            whatsappMessage += `👥 *Personas:* ${guests}\n`;
            
            if (message) {
                whatsappMessage += `\n💬 *Mensaje:* ${message}`;
            }
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp URL
            const whatsappUrl = `https://wa.me/5492494242499?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Optional: Show success feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '¡Abriendo WhatsApp...!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // ============================================
    // GALLERY HOVER EFFECT ENHANCEMENT
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // ============================================
    // PARALLAX EFFECT ON HERO (subtle)
    // ============================================
    const heroImg = document.querySelector('.hero__bg-img');
    
    if (heroImg) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(1.1) translateY(${rate}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // ============================================
    // COUNTER ANIMATION FOR RATING
    // ============================================
    const ratingScore = document.querySelector('.rating-summary__score');
    
    if (ratingScore) {
        const targetScore = parseFloat(ratingScore.textContent);
        let currentScore = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        function animateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            
            currentScore = eased * targetScore;
            ratingScore.textContent = currentScore.toFixed(1);
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                ratingScore.textContent = targetScore.toFixed(1);
            }
        }
        
        // Start animation when in viewport
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateCounter);
                    ratingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        ratingObserver.observe(ratingScore);
    }
    
    // ============================================
    // SET MIN DATE FOR RESERVATION
    // ============================================
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', `${year}-${month}-${day}`);
    }
    
    // ============================================
    // WHATSAPP FLOAT ANIMATION ON SCROLL
    // ============================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        let hasAnimated = false;
        
        window.addEventListener('scroll', function() {
            if (!hasAnimated && window.pageYOffset > 300) {
                whatsappFloat.style.animation = 'none';
                setTimeout(() => {
                    whatsappFloat.style.animation = '';
                }, 10);
                hasAnimated = true;
            }
        }, { passive: true });
    }
    
    // ============================================
    // ACCESSIBILITY: ESCAPE KEY CLOSES MOBILE MENU
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
            mobileToggle.focus();
        }
    });
    
    // ============================================
    // LAZY LOADING ENHANCEMENT
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
    
    // ============================================
    // PRELOAD HERO IMAGE FOR FASTER PAINT
    // ============================================
    const heroImage = document.querySelector('.hero__bg-img');
    if (heroImage) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = heroImage.src;
        document.head.appendChild(preloadLink);
    }
});

// ============================================
// PERFORMANCE: THROTTLE SCROLL EVENTS
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll-heavy functions if needed
// Example: window.addEventListener('scroll', throttle(myFunction, 100));
