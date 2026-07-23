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
});
