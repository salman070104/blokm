document.addEventListener("DOMContentLoaded", async () => {
    const featuredSlider = document.getElementById("featuredSlider");
    if (!featuredSlider) return;

    try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        
        const berandaPhotos = data.berandaPhotos || [];
        if (berandaPhotos.length > 0) {
            // Remove existing static items
            featuredSlider.innerHTML = '';
            
            // Populate new items
            berandaPhotos.forEach(photo => {
                const card = document.createElement('div');
                card.className = 'featured-card';
                card.innerHTML = `
                    <img src="${photo.src}" alt="${photo.titleEn} Photography" loading="lazy">
                    <div class="featured-card-overlay">
                        <span class="featured-card-category">
                            <span lang="id">${photo.catLabel.toUpperCase()}</span>
                            <span lang="en">${photo.catLabel.toUpperCase()}</span>
                        </span>
                    </div>
                `;
                featuredSlider.appendChild(card);
            });
            
            // Re-trigger language update
            if (typeof switchLang === 'function') {
                const currentLang = localStorage.getItem('lang') || 'id';
                switchLang(currentLang);
            }
            
            // Initialize slider logic again since we replaced DOM nodes
            initFeaturedSlider();
        }
    } catch (e) {
        console.error('Failed to load beranda photos:', e);
    }
});

function initFeaturedSlider() {
    const slider = document.getElementById("featuredSlider");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 2.0; 
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
            if (slider.scrollLeft >= (slider.scrollWidth / 2) - 5) {
                slider.scrollLeft = 0;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }

    autoScroll();

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelAnimationFrame(animationId);
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            autoScroll();
        }
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        autoScroll();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

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
}
