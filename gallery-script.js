/* ==========================================================================
   DYNAMIC PHOTO WALL GALLERY LOGIC - BLOK M STUDIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DATA DATABASE - ALBUM FOTO RESOLUSI TINGGI (UNSPLASH CURATED)
    const galleryPhotos = {
        studio: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
        ],
        wedding: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1520854221256-17451cc35953?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80"
        ],
        prewed: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1482849737880-498de71dda8d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
        ],
        school: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1535615611114-358898950c47?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&w=800&q=80"
        ],
        graduation: [
            "assets/video-kelulusan-bg.png",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1535615611114-358898950c47?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
        ],
        print: [
            "assets/cetak-foto-bg.png",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"
        ]
    };

    const galleryTexts = {
        studio: {
            subtitle: "BLOK M PORTRAITS",
            title: "STUDIO PORTRAIT ALBUMS",
            desc: "Showcasing professional studio portrait portfolios with premium lighting techniques. Ranging from individual photoshoots, professional corporate profiles, to warm moments with your beloved family."
        },
        wedding: {
            subtitle: "BLOK M WEDDING",
            title: "WEDDING ALBUMS",
            desc: "Documentation of the most historical moments in your life. This page displays samples of exclusive premium laminated wedding photo albums presented in luxurious boxes."
        },
        prewed: {
            subtitle: "BLOK M STORIES",
            title: "PREWEDDING ALBUMS",
            desc: "Your romantic love stories captured visually and artistically. Prewedding photo book printing with selected thick textured paper yields sharp details of your loving memories."
        },
        school: {
            subtitle: "YEARBOOK MEMORIES",
            title: "SCHOOL YEARBOOKS",
            desc: "A collection of laughter and friendships from school days. High-quality creative yearbook printing with exclusive spot-UV finishing so your school memories never fade."
        },
        graduation: {
            subtitle: "CINEMATIC GRADUATION",
            title: "CINEMATIC GRADUATION VIDEOS",
            desc: "Document your historic graduation moments in a premium cinematic video. Documentary style options with exclusive interviews, aerial drone visuals, and top-tier color grading for the most beautiful graduation memories."
        },
        print: {
            subtitle: "FINE ART PRINTS",
            title: "PHOTO PRINTING SERVICES",
            desc: "A gallery of museum-quality fine art photo print samples. We use premium curated papers (canvas, luster, matte, linen) and state-of-the-art printing technologies for unmatched color sharpness."
        }
    };

    // 2. PARSE URL QUERY PARAMETERS
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get("category") || "studio"; // Default to studio if null
    
    // Fallback security if category does not exist in our database
    if (!galleryPhotos[category]) {
        category = "studio";
    }

    // 3. INJECT DYNAMIC TITLE & OVERLAY TEXTS
    const activeText = galleryTexts[category];
    document.getElementById("gallery-subtitle").textContent = activeText.subtitle;
    document.getElementById("gallery-title").textContent = activeText.title;
    document.getElementById("gallery-desc").textContent = activeText.desc;
    
    // Set active title tag of page
    document.title = `${activeText.title} | BLOK M Studio Printing`;

    // 4. LOAD AND BUILD MARQUEE ROW TRACKS Dynamically
    const photosList = galleryPhotos[category];
    
    const track1 = document.getElementById("track-1");
    const track2 = document.getElementById("track-2");
    const track3 = document.getElementById("track-3");
    
    // Function to construct the HTML slide items
    function buildRowHTML(array) {
        let htmlContent = "";
        
        // Loop the items twice to ensure endless looping marquee scroll without visual breaks
        const doubleArray = [...array, ...array];
        
        doubleArray.forEach((photoUrl) => {
            htmlContent += `
                <div class="photo-card" data-fullsrc="${photoUrl}">
                    <img src="${photoUrl}" alt="Collection of ${activeText.title}" loading="lazy">
                </div>
            `;
        });
        
        return htmlContent;
    }

    // Distribute with offsets so the three rows look highly dynamic and unique
    const row1Photos = [...photosList];
    const row2Photos = [...photosList].reverse(); // Reverse row 2
    const row3Photos = [photosList[3], photosList[4], photosList[5], photosList[0], photosList[1], photosList[2]]; // Shifted row 3

    track1.innerHTML = buildRowHTML(row1Photos);
    track2.innerHTML = buildRowHTML(row2Photos);
    track3.innerHTML = buildRowHTML(row3Photos);

    // 5. LIGHTBOX PREVIEW SYSTEM MODAL CONTROL
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const btnCloseLightbox = document.getElementById("lightbox-close");
    
    // Listen to clicks on photo cards (using delegation for efficiency)
    document.querySelector(".photo-wall-section").addEventListener("click", (e) => {
        const photoCard = e.target.closest(".photo-card");
        if (!photoCard) return;
        
        const fullSrc = photoCard.getAttribute("data-fullsrc");
        
        // Set lightbox image source
        lightboxImg.src = fullSrc;
        
        // Open modal
        lightboxModal.classList.add("active");
        
        // Accessibility focus locking
        btnCloseLightbox.focus();
    });

    // Close lightbox modal function
    function closeLightbox() {
        lightboxModal.classList.remove("active");
        setTimeout(() => {
            lightboxImg.src = ""; // Clear image after transition out
        }, 400);
    }

    btnCloseLightbox.addEventListener("click", closeLightbox);
    
    // Close on clicking the dark background overlay
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.closest(".lightbox-content") === null) {
            closeLightbox();
        }
    });

    // Close on pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
            closeLightbox();
        }
    });
});
