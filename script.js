/* ==========================================================================
   BLOK M STUDIO — PROFESSIONAL PHOTOGRAPHY
   Main JavaScript: Scroll Reveal, Counter Animations, Smooth Interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. SCROLL REVEAL ANIMATION (IntersectionObserver)
    // =========================================================================
    const revealElements = document.querySelectorAll(".reveal");
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================================================
    // 2. STATS COUNTER ANIMATION
    // =========================================================================
    const statNumbers = document.querySelectorAll(".stat-number[data-count]");
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute("data-count"));
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    const suffix = "+";

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * countTo);
                        
                        target.textContent = current + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = countTo + suffix;
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // =========================================================================
    // 3. HERO PARALLAX (SUBTLE)
    // =========================================================================
    const heroBg = document.querySelector(".hero-bg");
    
    if (heroBg) {
        let ticking = false;
        
        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroHeight = window.innerHeight;
                    
                    if (scrollY < heroHeight) {
                        const parallaxOffset = scrollY * 0.3;
                        heroBg.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
                        
                        // Fade out hero content as user scrolls
                        const heroContent = document.querySelector(".hero-content");
                        if (heroContent) {
                            const opacity = 1 - (scrollY / (heroHeight * 0.6));
                            heroContent.style.opacity = Math.max(0, opacity);
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // =========================================================================
    // 4. SMOOTH ANCHOR SCROLL
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // =========================================================================
    // 5. FEATURED CARDS TILT EFFECT (DESKTOP ONLY)
    // =========================================================================
    if (window.matchMedia("(min-width: 769px)").matches) {
        const featuredCards = document.querySelectorAll(".featured-card");
        
        featuredCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            });
        });
    }

    // =========================================================================
    // 6. TYPEWRITER EFFECT FOR HERO TAGLINE
    // =========================================================================
    const heroTaglines = document.querySelectorAll(".hero-tagline span");
    heroTaglines.forEach(tagline => {
        // Save original text
        const text = tagline.textContent.trim();
        // Clear text to start typing
        tagline.textContent = "";
        
        // Setup blinking cursor using CSS variable
        tagline.style.borderRight = "2px solid var(--color-accent)";
        tagline.style.paddingRight = "4px";
        tagline.style.whiteSpace = "nowrap";
        
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Speed of typing in ms
            } else {
                // Blinking cursor after typing finished
                setInterval(() => {
                    tagline.style.borderColor = tagline.style.borderColor === "transparent" ? "var(--color-accent)" : "transparent";
                }, 600);
            }
        }
        
        // Start typing after initial fade-in animation finishes
        setTimeout(typeWriter, 800);
    });

});

// ==========================================================================
// FEATURED SLIDER AUTO-SCROLL & DRAG
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("featuredSlider");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 2.0; // faster speed
    let animationId;

    // Clone items for infinite loop
    const items = Array.from(slider.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
    });

    function autoScroll() {
        if (!isDown) {
            slider.scrollLeft += autoScrollSpeed;
            // Reset when reaching halfway since we duplicated the items
            if (slider.scrollLeft >= (slider.scrollWidth / 2) - 5) {
                slider.scrollLeft = 0;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }

    // Start auto scroll
    autoScroll();

    // Mouse events for manual drag
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelAnimationFrame(animationId); // Pause auto-scroll while dragging
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            autoScroll(); // Resume
        }
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        autoScroll(); // Resume
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelAnimationFrame(animationId);
    }, {passive: true});

    slider.addEventListener('touchend', () => {
        isDown = false;
        autoScroll();
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    }, {passive: true});
});
