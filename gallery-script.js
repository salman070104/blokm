/* ==========================================================================
   GALLERY / PORTFOLIO — Masonry Grid + Lightbox + Filter
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    let portfolioItems = [];

    async function loadPortfolioData() {
        try {
            const res = await fetch('/api/data');
            if (!res.ok) throw new Error('Gagal memuat data galeri');
            const data = await res.json();
            
            if (data.portfolioPhotos && data.portfolioPhotos.length > 0) {
                portfolioItems = data.portfolioPhotos;
            }
            
            // Apply initial filter if exists in URL
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get("category");
            
            if (categoryParam) {
                const matchingBtn = document.querySelector(`.filter-btn[data-filter="${categoryParam}"]`);
                if (matchingBtn) {
                    filterBtns.forEach(b => b.classList.remove("active"));
                    matchingBtn.classList.add("active");
                    renderItems(categoryParam);
                } else {
                    renderItems("all");
                }
            } else {
                renderItems("all");
            }

        } catch (e) {
            console.error('Error fetching portfolio data:', e);
            // Tetap render meskipun kosong / gagal
            renderItems("all");
        }
    }

    const masonryGrid = document.getElementById("masonry-grid");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryTitle = document.getElementById("gallery-title");
    const gallerySubtitle = document.getElementById("gallery-subtitle");
    const galleryDesc = document.getElementById("gallery-desc");

    // Set header text
    const lang = localStorage.getItem("blokm-lang") || "id";
    if (galleryTitle) {
        galleryTitle.innerHTML = `<span lang="id">Portfolio Kami</span><span lang="en">Our Portfolio</span>`;
    }
    if (gallerySubtitle) {
        gallerySubtitle.innerHTML = `<span lang="id">BLOK M STUDIO</span><span lang="en">BLOK M STUDIO</span>`;
    }
    if (galleryDesc) {
        galleryDesc.innerHTML = `<span lang="id">Koleksi karya fotografi terbaik kami. Setiap foto menceritakan kisah yang unik dan bermakna.</span><span lang="en">Our finest photography collection. Every photo tells a unique and meaningful story.</span>`;
    }

    // Render masonry items
    function renderItems(filter = "all") {
        if (!masonryGrid) return;
        
        masonryGrid.innerHTML = "";
        const filteredItems = filter === "all" 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);

        filteredItems.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "masonry-item";
            div.setAttribute("data-category", item.category);
            div.style.animationDelay = `${index * 0.05}s`;
            
            div.innerHTML = `
                <img src="${item.src}" alt="${item.titleEn}" width="${item.width}" height="${item.height}" loading="lazy">
                <div class="masonry-item-overlay">
                    <div class="masonry-item-info">
                        <span class="category">${item.catLabel}</span>
                        <span class="title"><span lang="id">${item.titleId}</span><span lang="en">${item.titleEn}</span></span>
                    </div>
                </div>
            `;

            // Lightbox click
            div.addEventListener("click", () => {
                if (lightboxImg && lightboxModal) {
                    lightboxImg.src = item.src;
                    lightboxModal.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });

            masonryGrid.appendChild(div);
        });

        // Re-apply language visibility
        const htmlLang = document.documentElement.classList.contains("lang-en") ? "en" : "id";
        // Language CSS rules handle visibility automatically
    }

    // Filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderItems(btn.getAttribute("data-filter"));
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }
    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    // Start fetching data
    loadPortfolioData();
});
