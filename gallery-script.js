/* ==========================================================================
   GALLERY / PORTFOLIO — Masonry Grid + Lightbox + Filter
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Portfolio Data — uses existing assets
    const portfolioItems = [
        { src: "assets/wedding-album-bg.png", category: "wedding", titleId: "Momen Pernikahan", titleEn: "Wedding Moment", catLabel: "Wedding" },
        { src: "assets/prewedding-album-bg.png", category: "prewedding", titleId: "Kisah Prewedding", titleEn: "Prewedding Story", catLabel: "Prewedding" },
        { src: "assets/foto-studio-bg.png", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait" },
        { src: "assets/video-kelulusan-bg.png", category: "event", titleId: "Wisuda Sinematik", titleEn: "Cinematic Graduation", catLabel: "Event" },
        { src: "assets/cetak-foto-bg.png", category: "portrait", titleId: "Fine Art Portrait", titleEn: "Fine Art Portrait", catLabel: "Portrait" },
        { src: "assets/album-sekolah-bg.png", category: "event", titleId: "Dokumentasi Sekolah", titleEn: "School Documentation", catLabel: "Event" },
        { src: "assets/crew.jpg", category: "portrait", titleId: "Behind The Scenes", titleEn: "Behind The Scenes", catLabel: "Portrait" },
        { src: "assets/wedding-album-bg.png", category: "wedding", titleId: "Album Premium", titleEn: "Premium Album", catLabel: "Wedding" },
        { src: "assets/prewedding-album-bg.png", category: "prewedding", titleId: "Romantis di Alam", titleEn: "Romance in Nature", catLabel: "Prewedding" },
    ];

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
                <img src="${item.src}" alt="${item.titleEn}" loading="lazy">
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

    // Check URL params for initial filter
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
});
