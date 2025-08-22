/**
 * Pristine & Clean Website - Interactive Features & Mobile Optimization
 * Author: Pristine & Clean Development Team
 * Version: 2.0
 * Last Updated: 2024-12-19
 * 
 * Features:
 * - Mobile-first responsive navigation
 * - Touch-optimized interactions
 * - Accessibility enhancements
 * - Performance optimizations
 * - Blog search and filtering
 * - Smooth animations and transitions
 */

// Performance optimization: Preload critical resources
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Mobile Menu Toggle with Backdrop
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    
    if (mobileMenu && navMenu && navBackdrop) {
        // Set initial ARIA state
        mobileMenu.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        
        function toggleMenu() {
            const isExpanded = mobileMenu.classList.contains('active');
            
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            navBackdrop.classList.toggle('active');
            
            // Update ARIA attributes
            mobileMenu.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded);
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        function closeMenu() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            navBackdrop.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        
        // Toggle menu on burger click
        mobileMenu.addEventListener('click', toggleMenu);
        
        // Close menu on backdrop click
        navBackdrop.addEventListener('click', closeMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target) && !navBackdrop.contains(event.target)) {
                closeMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                mobileMenu.focus();
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    });

    // Mobile-specific touch enhancements
    function addTouchFeedback() {
        const touchElements = document.querySelectorAll('.btn, .blog-read-more, .banner-cta, .nav-link, .dropdown-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.opacity = '0.9';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 150);
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.opacity = '';
            });
        });
    }

    // Mobile viewport height adjustment for iOS Safari
    function setMobileViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Mobile device detection and optimizations
    function mobileOptimizations() {
        const isMobile = window.innerWidth <= 768;
        const isTouch = 'ontouchstart' in window;
        
        if (isMobile) {
            // Add mobile class to body
            document.body.classList.add('mobile-device');
            
            // Optimize scrolling performance
            document.body.style.webkitOverflowScrolling = 'touch';
            
            // Add touch feedback
            addTouchFeedback();
            
            // Set mobile viewport height
            setMobileViewportHeight();
            
            // Prevent zoom on double tap for iOS
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
        
        if (isTouch) {
            document.body.classList.add('touch-device');
        }
    }

    // Mobile form enhancements
    function enhanceMobileForms() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Prevent zoom on focus for iOS
            if (input.type !== 'file') {
                input.addEventListener('focus', function() {
                    this.style.fontSize = '16px';
                });
                
                input.addEventListener('blur', function() {
                    this.style.fontSize = '';
                });
            }
            
            // Add better mobile keyboard support
            if (input.type === 'email') {
                input.setAttribute('inputmode', 'email');
            } else if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
            } else if (input.type === 'url') {
                input.setAttribute('inputmode', 'url');
            }
        });
    }

    // Initialize mobile optimizations
    mobileOptimizations();
    enhanceMobileForms();

    // Re-run optimizations on resize
    window.addEventListener('resize', () => {
        setMobileViewportHeight();
        mobileOptimizations();
    });

    // Re-run on orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setMobileViewportHeight();
            mobileOptimizations();
        }, 100);
    });

    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        // Desktop hover functionality (already handled by CSS)
        // Mobile click functionality
        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', (e) => {
                // On mobile devices, prevent default and toggle dropdown
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.classList.remove('active');
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdownMenu.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }
    });

    // Close dropdowns on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksForHighlight = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksForHighlight.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Basic validation
            const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'service'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#ff4757';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e9ecef';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (!emailRegex.test(formObject.email)) {
                emailInput.style.borderColor = '#ff4757';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('Thank you! Your booking request has been submitted. We\'ll contact you within 24 hours to confirm your appointment.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send this data to your server
                console.log('Form submitted with data:', formObject);
            } else {
                showFormMessage('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Show form message function
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' 
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message after form
        contactForm.insertAdjacentElement('afterend', messageElement);
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            if (messageElement) {
                messageElement.remove();
            }
        }, 5000);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Service type and frequency interaction
    const serviceSelect = document.getElementById('service');
    const frequencySelect = document.getElementById('frequency');
    
    if (serviceSelect && frequencySelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            
            // Reset frequency options
            frequencySelect.innerHTML = '<option value="">Select frequency</option>';
            
            if (selectedService === 'standard') {
                frequencySelect.innerHTML += `
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                `;
            } else if (selectedService === 'vacation') {
                frequencySelect.innerHTML += `
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="asneeded">As Needed</option>
                `;
            } else if (selectedService === 'deep' || selectedService === 'move') {
                frequencySelect.innerHTML += '<option value="onetime">One-time only</option>';
                frequencySelect.value = 'onetime';
            }
        });
    }
    
    // Animate elements on scroll
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
    
    // Observe service cards and testimonial cards
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .feature, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Set minimum date for preferred date input to today
    const preferredDateInput = document.getElementById('preferredDate');
    if (preferredDateInput) {
        const today = new Date().toISOString().split('T')[0];
        preferredDateInput.setAttribute('min', today);
    }
    
    // Auto-resize textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.type === 'submit') {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.disabled = true;
                
                // Re-enable after 3 seconds (for demo purposes)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 3000);
            });
        }
    });
});

// Utility function to handle phone number formatting
function formatPhoneNumber(input) {
    const phoneNumber = input.value.replace(/\D/g, '');
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    if (phoneNumber.length === 10) {
        input.value = formattedNumber;
    }
}

// Add phone number formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }

    // Blog Search and Filter Functionality
    const blogSearch = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const blogGrid = document.getElementById('blog-grid');
    const searchResults = document.getElementById('search-results');
    const resultsCount = document.getElementById('results-count');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (blogSearch && blogGrid) {
        let allBlogCards = Array.from(blogGrid.querySelectorAll('.blog-card'));
        
        // Search functionality
        function performSearch() {
            const searchTerm = blogSearch.value.toLowerCase().trim();
            const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
            
            let filteredCards = allBlogCards.filter(card => {
                // Category filter
                let matchesCategory = activeFilter === 'all' || 
                    card.dataset.category.split(' ').includes(activeFilter);
                
                // Text search
                let matchesSearch = true;
                if (searchTerm) {
                    const cardText = [
                        card.querySelector('h3').textContent,
                        card.querySelector('.blog-excerpt').textContent,
                        card.querySelector('.blog-category').textContent
                    ].join(' ').toLowerCase();
                    
                    matchesSearch = cardText.includes(searchTerm);
                }
                
                return matchesCategory && matchesSearch;
            });
            
            // Show/hide cards
            allBlogCards.forEach(card => {
                if (filteredCards.includes(card)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Update search results
            updateSearchResults(filteredCards.length, searchTerm, activeFilter);
        }
        
        function updateSearchResults(count, searchTerm, filter) {
            if (searchTerm || filter !== 'all') {
                searchResults.style.display = 'block';
                let message = `Found ${count} post${count !== 1 ? 's' : ''}`;
                
                if (searchTerm && filter !== 'all') {
                    message += ` for "${searchTerm}" in ${filter}`;
                } else if (searchTerm) {
                    message += ` for "${searchTerm}"`;
                } else if (filter !== 'all') {
                    message += ` in ${filter} category`;
                }
                
                resultsCount.textContent = message;
                
                // Show no results message if needed
                if (count === 0) {
                    showNoResults(searchTerm, filter);
                } else {
                    hideNoResults();
                }
            } else {
                searchResults.style.display = 'none';
                hideNoResults();
            }
        }
        
        function showNoResults(searchTerm, filter) {
            let existingNoResults = document.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }
            
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No Results Found</h3>
                <p>We couldn't find any blog posts matching your search${searchTerm ? ` for "${searchTerm}"` : ''}${filter !== 'all' ? ` in ${filter} category` : ''}.</p>
                <button class="clear-search" onclick="clearSearch()">Clear Search</button>
            `;
            
            blogGrid.appendChild(noResultsDiv);
        }
        
        function hideNoResults() {
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
        
        // Clear search function
        window.clearSearch = function() {
            blogSearch.value = '';
            document.querySelector('.filter-btn[data-category="all"]').click();
        };
        
        // Event listeners
        searchBtn.addEventListener('click', performSearch);
        blogSearch.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            } else {
                // Debounce search for real-time results
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(performSearch, 300);
            }
        });
        
        // Filter button functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Perform search with new filter
                performSearch();
            });
        });
        
        // Initialize search on page load
        performSearch();
    }

    // Enhanced Navbar Scroll Behavior
    let lastScrollTop = 0;
    let scrollTimer = null;
    let isScrolling = false;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Initially show navbar
        navbar.classList.add('navbar-visible');
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDifference = Math.abs(currentScroll - lastScrollTop);
            
            // Clear the previous timer
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            // Mark as scrolling
            isScrolling = true;
            
            // Always show navbar at the very top
            if (currentScroll <= 50) {
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-visible');
            }
            // Only hide/show if significant scroll movement (prevents jittery behavior)
            else if (scrollDifference > 5) {
                if (currentScroll > lastScrollTop && currentScroll > 150) {
                    // Scrolling down and past threshold - hide navbar
                    navbar.classList.remove('navbar-visible');
                    navbar.classList.add('navbar-hidden');
                } else if (currentScroll < lastScrollTop) {
                    // Scrolling up - show navbar
                    navbar.classList.remove('navbar-hidden');
                    navbar.classList.add('navbar-visible');
                }
            }
            
            // Show navbar when user stops scrolling (but not at very top)
            scrollTimer = setTimeout(function() {
                isScrolling = false;
                if (currentScroll > 50) {
                    navbar.classList.remove('navbar-hidden');
                    navbar.classList.add('navbar-visible');
                }
            }, 300); // Increased delay for better UX
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });
    }

    // Hero Video Background - No additional JavaScript needed
    // Video will auto-play due to HTML attributes


});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});