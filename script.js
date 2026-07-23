/* =============================================
   REQUETERICO - Pastelería Artesanal
   Landing Page Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
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
    handleHeaderScroll();
    
    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navMobileClose = document.querySelector('.nav-mobile-close');
    const navMobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    
    function openMobileNav() {
        navMobile.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileNav() {
        navMobile.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navMobile.classList.contains('active')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }
    
    if (navMobileClose) {
        navMobileClose.addEventListener('click', closeMobileNav);
    }
    
    navMobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // --- Menu Tabs ---
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            menuContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-category') === targetCategory) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // --- Show More Menu Items ---
    const showMoreButtons = document.querySelectorAll('.menu-show-more');
    
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const extraItems = document.querySelector(`.menu-items-extra[data-category="${category}"]`);
            
            if (extraItems) {
                extraItems.classList.toggle('visible');
                this.textContent = extraItems.classList.contains('visible') ? 'Mostrar menos' : 'Ver todo el menú';
            }
        });
    });
    
    // --- Contact Form to WhatsApp ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Format date if provided
            let formattedDate = date;
            if (date) {
                const dateObj = new Date(date + 'T00:00:00');
                formattedDate = dateObj.toLocaleDateString('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }
            
            // Build WhatsApp message
            let whatsappMessage = `Hola! Me comunico desde la web.\n\n`;
            whatsappMessage += `*Nombre:* ${name}\n`;
            if (phone) whatsappMessage += `*Teléfono:* ${phone}\n`;
            if (date) whatsappMessage += `*Fecha:* ${formattedDate}\n`;
            if (guests) whatsappMessage += `*Personas:* ${guests}\n`;
            if (message) whatsappMessage += `*Mensaje:* ${message}\n`;
            
            // Encode and open WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5492494242499?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // --- WhatsApp CTA Buttons ---
    const whatsappCtas = document.querySelectorAll('.btn-whatsapp, .header-cta');
    
    whatsappCtas.forEach(cta => {
        cta.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('https://wa.me/')) {
                // Let the default link behavior work
                return;
            }
            
            e.preventDefault();
            
            let message = 'Hola! Me comunico desde la web. Me gustaría hacer una consulta.';
            
            // Check if there's a specific data attribute for message
            if (this.dataset.message) {
                message = this.dataset.message;
            }
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5492494242499?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // --- Gallery Hover Effect (touch devices) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 300);
        });
    });
    
    // --- Parallax Effect on Hero (subtle) ---
    const heroBg = document.querySelector('.hero-bg img');
    
    if (heroBg && window.innerWidth > 991) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.15;
                heroBg.style.transform = `scale(1.05) translateY(${parallaxValue}px)`;
            }
        }, { passive: true });
    }
    
    // --- Active Navigation Link Highlight ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
    
    // --- Counter Animation ---
    const counters = document.querySelectorAll('.hero-stat-number');
    
    function animateCounter(element) {
        const target = element.getAttribute('data-target');
        if (!target) return;
        
        const isDecimal = target.includes('.');
        const numericTarget = parseFloat(target);
        const duration = 2000;
        const increment = numericTarget / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < numericTarget) {
                element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Observe hero stats for counter animation
    const heroStatsSection = document.querySelector('.hero-stats');
    if (heroStatsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStatsSection);
    }
    
    // --- Preloader (optional, for smooth initial load) ---
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // --- Keyboard Navigation Support ---
    document.addEventListener('keydown', function(e) {
        // Close mobile nav on Escape
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // --- Lazy Load Images (native support + fallback) ---
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    console.log('Requeterico - Landing Page loaded successfully!');
});