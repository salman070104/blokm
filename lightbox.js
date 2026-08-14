document.addEventListener("DOMContentLoaded", function() {
    // Create lightbox HTML
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img src="" alt="Zoomed Image">
    `;
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('img');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    // Add click listeners to hero photos
    var heroPhotos = document.querySelectorAll('.hero-photo img');
    heroPhotos.forEach(function(img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Add click listeners to featured cards (handles the overlay)
    var featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(function(card) {
        card.style.cursor = 'zoom-in';
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            var img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox functions
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
});
