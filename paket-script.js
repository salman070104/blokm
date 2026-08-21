document.addEventListener("DOMContentLoaded", async () => {
    const packagesGrid = document.querySelector(".packages-grid");
    if (!packagesGrid) return;

    // Mapping icons from iconKey to SVG
    const icons = {
        file: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
        camera: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
        image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
        video: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
        star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    };

    try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Gagal memuat data paket');
        const data = await response.json();
        
        const services = data.services || [];
        packagesGrid.innerHTML = ''; // clear grid

        if (services.length === 0) {
            packagesGrid.innerHTML = '<p style="text-align:center;width:100%;"><span lang="id">Belum ada paket yang tersedia.</span><span lang="en">No packages available yet.</span></p>';
            return;
        }

        services.forEach(svc => {
            const isFeatured = svc.badge && svc.badge.trim() !== '';
            let cardHtml = `<div class="package-card ${isFeatured ? 'featured' : ''}">`;
            
            if (isFeatured) {
                cardHtml += `<span class="package-badge">${svc.badge}</span>`;
            }

            const iconSvg = icons[svc.iconKey] || icons['camera'];
            cardHtml += `<div class="package-icon">${iconSvg}</div>`;
            cardHtml += `<h3 class="package-name">${svc.name}</h3>`;
            cardHtml += `<div class="package-price">${svc.price}</div>`;

            if (svc.features && svc.features.length > 0) {
                cardHtml += `<ul class="package-features">`;
                svc.features.forEach(feat => {
                    cardHtml += `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>${feat}</li>`;
                });
                cardHtml += `</ul>`;
            }

            // WhatsApp link
            const phone = "6287858231341";
            const waMsg = svc.waMsg ? encodeURIComponent("Hello BLOK M Studio, saya tertarik dengan " + svc.waMsg) : encodeURIComponent("Hello BLOK M Studio, saya tertarik dengan " + svc.name);
            const waLink = `https://wa.me/${phone}?text=${waMsg}`;

            cardHtml += `<a href="${waLink}" target="_blank" class="package-cta ${isFeatured ? 'package-cta-primary' : 'package-cta-secondary'}">
                <span lang="id">BOOKING SEKARANG</span><span lang="en">BOOK NOW</span>
            </a>`;
            
            cardHtml += `</div>`;
            packagesGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
        
        // Trigger language switcher if exists
        if (typeof switchLang === 'function') {
            const currentLang = localStorage.getItem('lang') || 'id';
            switchLang(currentLang);
        }

    } catch (e) {
        console.error(e);
        packagesGrid.innerHTML = '<p style="text-align:center;color:red;width:100%;">Gagal memuat data paket. Silakan muat ulang halaman.</p>';
    }
});
