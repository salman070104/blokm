/* ==========================================================================
   GALLERY / PORTFOLIO — Masonry Grid + Lightbox + Filter
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Portfolio Data — uses existing assets
    const portfolioItems = [
        { src: "assets/compressed/ENGAGEMENT/1.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6142.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6148.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6150.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6186.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6275.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/NZ5_6288.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3481.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3499.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3507.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3604.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3607.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3609.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3741.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_3743.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_4523.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_4570.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_4589.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_5377.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_5381.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_5425.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/ENGAGEMENT/Z5L_5445.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/ENGAGEMENT/Z62_0510.jpg", category: "event", titleId: "Lamaran", titleEn: "Engagement", catLabel: "Event", width: 1200, height: 798 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7455.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7591.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7599.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7626.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7640.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7645.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7661.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7664.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/D61_7690.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1521.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1551.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1553.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1567.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1571.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1573.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1759.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z5L_1767.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8138.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8153.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8179.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8184.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8210.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8217.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8218.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8220.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8221.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8301.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8304.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8307.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8313.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/MTs ASY-SYAFI'IYAH/Z62_8316.jpg", category: "event", titleId: "Mts Asy-Syafi'Iyah", titleEn: "Mts Asy-Syafi'Iyah", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/PREWED/NZ5_3379.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/NZ5_7278.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/NZ5_7307.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/NZ5_7309.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/NZ5_7321.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/NZ5_7325.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_5264.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_5395.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_5429.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_5436.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_7927.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_7934.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_7936.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_7955.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_7959.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8188.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 1200, height: 801 },
        { src: "assets/compressed/PREWED/Z5L_8201.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 1200, height: 801 },
        { src: "assets/compressed/PREWED/Z5L_8214.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8235.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8249.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8252.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8349.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 1200, height: 801 },
        { src: "assets/compressed/PREWED/Z5L_8351.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 1200, height: 801 },
        { src: "assets/compressed/PREWED/Z5L_8353.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 801, height: 1200 },
        { src: "assets/compressed/PREWED/Z5L_8377.jpg", category: "prewedding", titleId: "Prewedding", titleEn: "Prewedding", catLabel: "Prewedding", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4692.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4694.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4695.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4709.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4710.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4711.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4712.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4723.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4738.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4780.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4811.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4814.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4849.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4852.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4882.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4883.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4884.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4885.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4886.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4887.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4889.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4914.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4920.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4924.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4945.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4947.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4951.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4976.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/NZ5_4982.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6312.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6313.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6321.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6338.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6340.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6341.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6354.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6364.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6372.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6376.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6392.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6493.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6494.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6496.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6497.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6504.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6507.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6509.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6516.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6541.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6542.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6546.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6547.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6555.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6557.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6563.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6564.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6573.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMK AL HUDA/Z5L_6575.jpg", category: "event", titleId: "Smk Al Huda", titleEn: "Smk Al Huda", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9787.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9802.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9807.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9839.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9859.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9860.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9889.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/NZ5_9893.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9523.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9528.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9614.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9615.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9781.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9835.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9849.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/SMP 01 BANJARHARJO/Z5L_9862.jpg", category: "event", titleId: "Smp 01 Banjarharjo", titleEn: "Smp 01 Banjarharjo", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/DSC_5737.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_5739.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_5740.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_5745.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_7057.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_7058.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_7059.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/DSC_7079.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/DSC_7095 copy.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_2448.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_2450.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_2455.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_2458.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_3303 copy.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_3308.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_3312.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_3313.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_3315.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_3317.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_3323.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_3328.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_4323.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4328.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4329.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4331.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4336.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4338.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4391 copy.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4391.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4424.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_4425.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 801 },
        { src: "assets/compressed/STUDIO/NZ5_4429.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4430.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/NZ5_4432.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 801, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9357.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9360.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9374.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9377.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9381.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9382.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9386.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9390.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9391.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9393.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9395.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 1200, height: 799 },
        { src: "assets/compressed/STUDIO/Z62_9398.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/STUDIO/Z62_9399.jpg", category: "portrait", titleId: "Portrait Studio", titleEn: "Studio Portrait", catLabel: "Portrait", width: 799, height: 1200 },
        { src: "assets/compressed/WEDDING/1.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/2.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7537.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7541.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7574.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7575.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7631.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7639.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7686.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_7687.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_9022.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/BGS_9024.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_9026.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_9027.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/BGS_9028.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_3590.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_3598.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_3603.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_5501.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5605.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5607.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5679.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5689.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5709.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5902.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5908.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5911.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5914.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5916.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5920.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5923.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_5971.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_5995.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6001.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6004.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6005.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6091.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6093.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6099.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6367.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_6393.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6399.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_6401.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6432.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_6433.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_6436.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_6440.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7338.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/NZ5_7355.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7356.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7357.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7371.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7381.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7410.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7427.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7436.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7542.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7548.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7559.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7583.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/NZ5_7609.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z30_0287.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 800, height: 1200 },
        { src: "assets/compressed/WEDDING/Z30_0310.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 800, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_3913.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_3919.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_3922.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_3928.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/Z5L_3973.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_3975.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/Z5L_3988.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4065.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4090.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/Z5L_4246.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 801 },
        { src: "assets/compressed/WEDDING/Z5L_4251.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4291.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4293.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4302.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4865.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4867.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4868.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4874.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4876.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4877.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4879.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4881.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4882.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4970.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4974.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4976.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4990.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_4991.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_6630.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_6721.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_6723.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_6724.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z5L_6739.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 801, height: 1200 },
        { src: "assets/compressed/WEDDING/Z62_3599.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 798, height: 1200 },
        { src: "assets/compressed/WEDDING/Z62_3681.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 798, height: 1200 },
        { src: "assets/compressed/WEDDING/Z62_3698.jpg", category: "wedding", titleId: "Pernikahan", titleEn: "Wedding", catLabel: "Wedding", width: 1200, height: 798 },
        { src: "assets/compressed/WISUDA/BLM_4011.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4012.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4014.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/WISUDA/BLM_4018.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 800, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4038.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4043.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4044.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_4050.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8165.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8170.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8171.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8201.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8245.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/BLM_8250.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_1659.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_1660.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_1663.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_1665.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_1667.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9758.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/WISUDA/NZ5_9759.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9763.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9764.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9807.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9830.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/NZ5_9831.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4746 copy.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4764.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4766.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4769.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4771.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4772.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/WISUDA/Z62_4775.jpg", category: "event", titleId: "Wisuda", titleEn: "Graduation", catLabel: "Event", width: 798, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/1.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/2,2.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/2.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/3.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/AINUN BILQIS (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ALIFIA PUTRI NOVITA SARI (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ASYAFA NIKMATUL S. (1).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ASYAFA NIKMATUL S. (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ASYAFA NIKMATUL S. (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ATIQ KHOTUL MAULA (1).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/DEWI AYU SUKMA WATI (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/DIMAS ZAKI SAPUTRA (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/DSBDBC.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/FACHRI ABIAN RAMADHAN (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/FAIZ MAULANA FIRDAUS (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/IRWANTO (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/KAMELIA DWI VERONIKA (4).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/LUTFI NOUFAL KHARIM (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NAILA AYU FATIMAH (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NUR NABILAH SAPUTRI (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5923.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5935.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5936.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5941.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5962.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5978.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5989.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_5995.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_6001.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_6002.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_6034.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_6035.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/NZ5_6037.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/RIZKI AJI SAPUTRA (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/TATI INAYAH (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/TIARA AZGA MAZAYA (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/VIANA NURUL IZZAH (3).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6655.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6656.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6661.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6669.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6686.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6692.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6694.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6703.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6706.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6716.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6719.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 800 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6723.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6734.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6737.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6761.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6844.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6850.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6852.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 801 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z5L_6856.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z62_5940.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z62_5950.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z62_5970.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 1200, height: 799 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z62_5973.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/Z62_5974.jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ZAHRA ADINDA PUTRI (2).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 801, height: 1200 },
        { src: "assets/compressed/YEARBOOK SMP NU SUNAN KALIJAGA/ZULFA AL ULYA (4).jpg", category: "event", titleId: "Yearbook Smp Nu Sunan Kalijaga", titleEn: "Yearbook Smp Nu Sunan Kalijaga", catLabel: "Event", width: 799, height: 1200 }
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
