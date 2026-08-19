with open('script.js', 'a') as f:
    f.write('''
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
''')
print("Appended JS to script.js")
