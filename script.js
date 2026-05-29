/* ==========================================================================
   INTERACTIVE CAROUSEL SLIDER - LUNDEV SYSTEM (TIKTOK STYLE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SELECT DOM ELEMENTS
    const carousel = document.getElementById("main-carousel");
    const listHTML = document.getElementById("slides-list");
    const thumbnailHTML = document.getElementById("thumbnail-container");
    

    
    const lblCurrent = document.getElementById("lbl-current");
    const lblTotal = document.getElementById("lbl-total");
    const timeBarFill = document.getElementById("time-bar-fill");
    
    // 2. STATE AND SETTINGS
    let isTransitioning = false;
    const transitionTime = 650; // matching style.css (0.65s transition)
    const autoplayDuration = 8000; // 8 seconds per slide
    let autoplayTimer = null;
    
    // Total slides based on elements
    const totalSlides = listHTML.querySelectorAll(".item").length;
    lblTotal.textContent = String(totalSlides).padStart(2, "0");

    // 3. COLOR ACCENT SYNC FUNCTION
    function syncActiveSlideAccent() {
        const activeItem = listHTML.querySelector(".item");
        const activeIndex = parseInt(activeItem.getAttribute("data-index"));
        const accentColor = activeItem.getAttribute("data-accent");
        const rgbColor = activeItem.getAttribute("data-rgb");
        
        // Update CSS Variables dynamically
        document.documentElement.style.setProperty("--color-accent", accentColor);
        document.documentElement.style.setProperty("--color-accent-rgb", rgbColor);
        
        // Update Current Counter
        lblCurrent.textContent = String(activeIndex + 1).padStart(2, "0");
        
        // Update navigation active highlight links (optional matching)
        const navLinks = document.querySelectorAll(".main-nav .nav-link");
        navLinks.forEach((link, idx) => {
            if (idx === 0) { // Keep Home active or link to sections
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Helper to calculate zoom transform origin based on clicked card position
    function setZoomCoordinates(cardElement) {
        if (!cardElement) return;
        const rect = cardElement.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // Calculate scale factor: card size vs full viewport
        const scaleX = rect.width / vw;
        const scaleY = rect.height / vh;
        const scale = Math.max(scaleX, scaleY);
        // Calculate translation to card center (as percentage of full size)
        const cardCx = rect.left + rect.width / 2;
        const cardCy = rect.top + rect.height / 2;
        const dx = ((cardCx / vw) - 0.5) * (1 / scale) * 100;
        const dy = ((cardCy / vh) - 0.5) * (1 / scale) * 100;
        const transformFrom = `scale(${scale}) translate(${dx}%, ${dy}%)`;
        carousel.style.setProperty("--zoom-transform-from", transformFrom);
    }

    // 4. MAIN TRANSITION FUNCTION
    function showSlider(type) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const sliderItems = listHTML.querySelectorAll(".item");
        const thumbnailItems = thumbnailHTML.querySelectorAll(".item");
        
        // Dynamically get starting coordinates from the current first thumbnail card
        if (thumbnailItems.length > 0) {
            setZoomCoordinates(thumbnailItems[0]);
        }
        
        if (type === "next") {
            // Append first item of slider list to the end of it
            listHTML.appendChild(sliderItems[0]);
            // Append first item of thumbnail to the end of it
            thumbnailHTML.appendChild(thumbnailItems[0]);
            
            // Add next class to trigger zooming card animation in CSS
            carousel.classList.add("next");
        } else if (type === "prev") {
            const lastSliderIndex = sliderItems.length - 1;
            const lastThumbIndex = thumbnailItems.length - 1;
            
            // Prepend last item of slider to the beginning of it
            listHTML.prepend(sliderItems[lastSliderIndex]);
            // Prepend last item of thumbnail to the beginning of it
            thumbnailHTML.prepend(thumbnailItems[lastThumbIndex]);
            
            // Add prev class to trigger shrinking background card animation in CSS
            carousel.classList.add("prev");
        }
        
        // Sync the accent colors and slide counters immediately
        syncActiveSlideAccent();
        
        // Reset the linear timer progress bar animation
        resetTimeProgress();

        // Clear active animation state classes after transition finishes
        setTimeout(() => {
            carousel.classList.remove("next");
            carousel.classList.remove("prev");
            isTransitioning = false;
        }, transitionTime + 100); // 900ms lock
    }

    // 5. DIRECT THUMBNAIL CLICKS SYSTEM (SMART CLICK ROTATION)
    function setupThumbnailClicks() {
        // Re-bind listeners on click because DOM children order changes constantly
        thumbnailHTML.addEventListener("click", (e) => {
            // Find clicked card (traverse up to .item element)
            const clickedCard = e.target.closest(".item");
            if (!clickedCard || isTransitioning) return;
            
            // Immediately capture and set starting coordinates of the EXACT clicked card
            setZoomCoordinates(clickedCard);
            
            const targetSlideIndex = parseInt(clickedCard.getAttribute("data-target"));
            
            // Check position of this card in current thumbnail DOM structure
            const currentThumbs = Array.from(thumbnailHTML.querySelectorAll(".item"));
            const clickedDomIndex = currentThumbs.indexOf(clickedCard);
            
            // In LunDev slider layout, clickedDomIndex represents how many cards
            // to shift to bring it to the active screen.
            if (clickedDomIndex === 0) {
                // First card in thumbnail - standard Next transition
                showSlider("next");
            } else if (clickedDomIndex > 0) {
                // Multiple cards away - shift K times instantly, then run the K+1 next with transition
                stopAutoplay();
                
                // Shift K times instantly (K = clickedDomIndex)
                for (let i = 0; i < clickedDomIndex; i++) {
                    const sliderItems = listHTML.querySelectorAll(".item");
                    const thumbnailItems = thumbnailHTML.querySelectorAll(".item");
                    
                    listHTML.appendChild(sliderItems[0]);
                    thumbnailHTML.appendChild(thumbnailItems[0]);
                }
                
                // Run the final next transition with beautiful CSS animation
                showSlider("next");
                startAutoplay();
            }
        });
    }

    // 6. PROGRESS BAR TIMER (LINEAR CSS TRANSITIONS)
    function resetTimeProgress() {
        // Reset width to 0 and disable transitions
        timeBarFill.style.transition = "none";
        timeBarFill.style.width = "0%";
        
        // Force reflow to flush styles
        void timeBarFill.offsetWidth;
        
        // Start filling progress bar with smooth transition matching autoplay duration
        timeBarFill.style.transition = `width ${autoplayDuration}ms linear`;
        timeBarFill.style.width = "100%";
    }

    // 7. AUTOPLAY CONTROLS
    function startAutoplay() {
        resetTimeProgress();
        autoplayTimer = setInterval(() => {
            showSlider("next");
        }, autoplayDuration);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        // Pause progress bar fill visually at current state
        const computedWidth = window.getComputedStyle(timeBarFill).width;
        timeBarFill.style.transition = "none";
        timeBarFill.style.width = computedWidth;
    }

    // 8. BIND KEYBOARDS AND ACTIONS
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            showSlider("next");
            stopAutoplay();
            startAutoplay();
        } else if (e.key === "ArrowLeft") {
            showSlider("prev");
            stopAutoplay();
            startAutoplay();
        }
    });

    // Pause autoplay on mouse hover over thumbnails or WA button
    carousel.addEventListener("mouseenter", (e) => {
        // Only pause if hovering over thumbnail or WA button
        if (e.target.closest(".thumbnail") || e.target.closest(".cta-nav-btn")) {
            stopAutoplay();
        }
    });
    
    carousel.addEventListener("mouseleave", () => {
        if (!autoplayTimer) {
            startAutoplay();
        }
    });

    // 9. INITIALIZE SYSTEM
    syncActiveSlideAccent();
    setupThumbnailClicks();
    startAutoplay();
});

