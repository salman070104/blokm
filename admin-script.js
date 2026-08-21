/* ============================================================
   BLOK M Studio — Admin Panel Script
   ============================================================ */

'use strict';

// ── Constants ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD  = 'blokmstudio2024'; // Ganti password di sini
const LS_AUTH_KEY     = 'blokm_admin_auth';
const LS_PORTFOLIO_KEY = 'blokm_portfolio_photos';
const LS_BERANDA_KEY  = 'blokm_beranda_photos';
const LS_SERVICES_KEY = 'blokm_services';

const COMPRESS_MAX_PX = 1200; // Sisi panjang maks setelah kompresi
const COMPRESS_QUALITY = 0.80; // JPEG quality 0–1

const DEFAULT_SERVICES = [
  {
    "id": "svc_default_0",
    "name": "Paket File Only",
    "price": "Rp 500.000",
    "category": "wedding",
    "badge": "",
    "iconKey": "file",
    "waMsg": "Paket File Only",
    "features": [
      "1 Roll (40 File Edit)",
      "File Google Drive"
    ]
  },
  {
    "id": "svc_default_1",
    "name": "Paket A",
    "price": "Rp 700.000",
    "category": "wedding",
    "badge": "",
    "iconKey": "camera",
    "waMsg": "Paket A",
    "features": [
      "1 Roll Photo (40 Lembar)",
      "1 Album Costum Kulit",
      "File Google Drive"
    ]
  },
  {
    "id": "svc_default_2",
    "name": "Paket B",
    "price": "Rp 1.300.000",
    "category": "wedding",
    "badge": "",
    "iconKey": "image",
    "waMsg": "Paket B",
    "features": [
      "2 Roll Photo (80 Lembar)",
      "10RP 1 Lembar",
      "1 Album Costum Jombo Kulit",
      "File Google Drive"
    ]
  },
  {
    "id": "svc_default_3",
    "name": "Paket C",
    "price": "Rp 2.000.000",
    "category": "wedding",
    "badge": "POPULAR",
    "iconKey": "heart",
    "waMsg": "Paket C",
    "features": [
      "2 Roll Photo (80 Lembar)",
      "10RP 1 Lembar",
      "1 Album Costum Jombo Kulit",
      "Video Liputan + Treaser",
      "Flasdisk 8GB"
    ]
  },
  {
    "id": "svc_default_4",
    "name": "Paket D",
    "price": "Rp 3.500.000",
    "category": "wedding",
    "badge": "",
    "iconKey": "star",
    "waMsg": "Paket D",
    "features": [
      "1 Album Kolase",
      "1 Album Photo Keluarga",
      "All File Flasdisk 8GB",
      "Free Cetakan 12RP + Bingkai",
      "Flasdisk 4GB"
    ]
  },
  {
    "id": "svc_default_5",
    "name": "Paket E",
    "price": "Rp 4.500.000",
    "category": "wedding",
    "badge": "",
    "iconKey": "award",
    "waMsg": "Paket E",
    "features": [
      "1 Album Kolase",
      "1 Album Smart Album",
      "Video Liputan + Treaser",
      "All File Flasdisk 8GB",
      "Free Cetakan 12RP + Bingkai"
    ]
  },
  {
    "id": "svc_default_6",
    "name": "Paket F",
    "price": "Rp 6.000.000",
    "category": "wedding",
    "badge": "PREMIUM",
    "iconKey": "layers",
    "waMsg": "Paket F (Premium)",
    "features": [
      "1 Album Kolase",
      "1 Album Smart Album",
      "Video Cinematic",
      "Video Liputan",
      "All File Flasdisk 16GB",
      "Free Cetakan 12RP + Bingkai"
    ]
  },
  {
    "id": "svc_default_7",
    "name": "Pembuatan Website",
    "price": "Mulai dari Rp 1.500.000",
    "category": "other",
    "badge": "NEW",
    "iconKey": "monitor",
    "waMsg": "Jasa Pembuatan Website",
    "features": [
      "Desain modern & responsif",
      "Optimasi SEO dasar",
      "Integrasi media sosial",
      "Maintenance 1 bulan gratis"
    ]
  }
];

// ── State ─────────────────────────────────────────────────────────────────────
let portfolioPhotos  = [];  // { id, src, category, titleId, titleEn, catLabel, width, height, filename }
let berandaPhotos    = [];  // { id, src, category, titleId, titleEn, catLabel, filename }
let services         = [];  // { id, name, price, category, features[], badge, iconKey }
let currentPage      = 'portfolio';
let uploadTarget     = 'portfolio'; // 'portfolio' | 'beranda'
let portfolioFilter  = 'all';
let berandaFilter    = 'all';
let deleteTarget     = null;        // { page, id }
let exportTab        = 'gallery';   // 'gallery' | 'html' | 'paket'
let serviceEditId    = null;        // ID layanan yang sedang diedit
let formFeatures     = [];          // Fitur sementara di form
let selectedIcon     = 'camera';    // Ikon terpilih
let serviceCatFilter = 'all';       // Filter kategori layanan

// ── Default data seeded from existing gallery-script.js ───────────────────────
const DEFAULT_PORTFOLIO = [
    { id: 'e1',  src: 'assets/compressed/ENGAGEMENT/NZ5_6186.jpg',  category: 'event',      titleId: 'Lamaran',    titleEn: 'Engagement', catLabel: 'Event',      width: 801,  height: 1200 },
    { id: 'e2',  src: 'assets/compressed/ENGAGEMENT/NZ5_6150.jpg',  category: 'event',      titleId: 'Lamaran',    titleEn: 'Engagement', catLabel: 'Event',      width: 801,  height: 1200 },
    { id: 'e3',  src: 'assets/compressed/ENGAGEMENT/Z5L_3507.jpg',  category: 'event',      titleId: 'Lamaran',    titleEn: 'Engagement', catLabel: 'Event',      width: 801,  height: 1200 },
    { id: 'pw1', src: 'assets/compressed/PREWED/NZ5_7309.jpg',       category: 'prewedding', titleId: 'Prewedding', titleEn: 'Prewedding', catLabel: 'Prewedding', width: 801,  height: 1200 },
    { id: 'pw2', src: 'assets/compressed/PREWED/Z5L_7936.jpg',       category: 'prewedding', titleId: 'Prewedding', titleEn: 'Prewedding', catLabel: 'Prewedding', width: 801,  height: 1200 },
    { id: 'pw3', src: 'assets/compressed/PREWED/Z5L_8188.jpg',       category: 'prewedding', titleId: 'Prewedding', titleEn: 'Prewedding', catLabel: 'Prewedding', width: 1200, height: 801  },
    { id: 'w1',  src: 'assets/compressed/WEDDING/NZ5_5605.jpg',      category: 'wedding',    titleId: 'Pernikahan', titleEn: 'Wedding',    catLabel: 'Wedding',    width: 1200, height: 801  },
    { id: 'w2',  src: 'assets/compressed/WEDDING/NZ5_5689.jpg',      category: 'wedding',    titleId: 'Pernikahan', titleEn: 'Wedding',    catLabel: 'Wedding',    width: 1200, height: 801  },
    { id: 'w3',  src: 'assets/compressed/WEDDING/NZ5_3603.jpg',      category: 'wedding',    titleId: 'Pernikahan', titleEn: 'Wedding',    catLabel: 'Wedding',    width: 1200, height: 801  },
    { id: 's1',  src: 'assets/compressed/STUDIO/NZ5_3317.jpg',       category: 'portrait',   titleId: 'Portrait Studio', titleEn: 'Studio Portrait', catLabel: 'Portrait', width: 801, height: 1200 },
    { id: 's2',  src: 'assets/compressed/STUDIO/NZ5_4429.jpg',       category: 'portrait',   titleId: 'Portrait Studio', titleEn: 'Studio Portrait', catLabel: 'Portrait', width: 801, height: 1200 },
    { id: 'ev1', src: 'assets/compressed/SMK AL HUDA/Z5L_6493.jpg',  category: 'event',      titleId: 'Event Sekolah', titleEn: 'School Event', catLabel: 'Event', width: 1200, height: 801 },
];

const DEFAULT_BERANDA = [
    { id: 'b1', src: 'assets/compressed/ENGAGEMENT/NZ5_6186.jpg',   category: 'event',      titleId: 'Lamaran',    titleEn: 'Engagement',     catLabel: 'LAMARAN'        },
    { id: 'b2', src: 'assets/compressed/PREWED/NZ5_7309.jpg',        category: 'prewedding', titleId: 'Prewedding', titleEn: 'Prewedding',      catLabel: 'PREWEDDING'     },
    { id: 'b3', src: 'assets/compressed/WEDDING/NZ5_5605.jpg',       category: 'wedding',    titleId: 'Pernikahan', titleEn: 'Wedding',         catLabel: 'PERNIKAHAN'     },
    { id: 'b4', src: 'assets/compressed/PREWED/Z5L_7936.jpg',        category: 'prewedding', titleId: 'Prewedding', titleEn: 'Prewedding',      catLabel: 'PREWEDDING'     },
    { id: 'b5', src: 'assets/compressed/SMK AL HUDA/Z5L_6493.jpg',   category: 'event',      titleId: 'Sekolah',    titleEn: 'School',          catLabel: 'SEKOLAH'        },
    { id: 'b6', src: 'assets/compressed/STUDIO/NZ5_3317.jpg',        category: 'portrait',   titleId: 'Portrait',   titleEn: 'Portrait Studio', catLabel: 'PORTRAIT STUDIO'},
];

// ── ID Generator ──────────────────────────────────────────────────────────────
function genId() { return 'photo_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }

// ── Cloud API (Vercel Blob via Serverless Functions) ─────────────────────────
async function saveAllDataToCloud() {
    const data = {
        portfolioPhotos,
        berandaPhotos,
        services
    };
    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_PASSWORD}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(await res.text());
        return true;
    } catch (e) {
        showToast('error', 'Gagal menyimpan ke cloud', e.message);
        return false;
    }
}

function savePortfolio() { saveAllDataToCloud(); }
function saveBeranda()   { saveAllDataToCloud(); }
function saveServices()  { saveAllDataToCloud(); }

async function loadData() {
    try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Gagal fetch dari cloud');
        const data = await res.json();
        
        portfolioPhotos = data.portfolioPhotos && data.portfolioPhotos.length > 0 ? data.portfolioPhotos : [...DEFAULT_PORTFOLIO];
        berandaPhotos   = data.berandaPhotos && data.berandaPhotos.length > 0 ? data.berandaPhotos : [...DEFAULT_BERANDA];
        
        let loadedServices = data.services || [];
        if (!loadedServices || loadedServices.length === 0) {
            loadedServices = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
        }
        services = loadedServices;
    } catch (e) {
        console.warn("Gagal load data dari cloud, fallback ke default:", e);
        portfolioPhotos = [...DEFAULT_PORTFOLIO];
        berandaPhotos   = [...DEFAULT_BERANDA];
        services        = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    }
}


// ── Auth ──────────────────────────────────────────────────────────────────────
function isLoggedIn() { return sessionStorage.getItem(LS_AUTH_KEY) === '1'; }
function setLoggedIn() { sessionStorage.setItem(LS_AUTH_KEY, '1'); }
function logout()    { sessionStorage.removeItem(LS_AUTH_KEY); location.reload(); }

// ── Toast ─────────────────────────────────────────────────────────────────────
const ICONS = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

function showToast(type, msg, sub = '') {
    const cont = document.getElementById('toast-container');
    const el   = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${ICONS[type]}</span>
        <div><div class="toast-msg">${msg}</div>${sub ? `<div class="toast-sub">${sub}</div>` : ''}</div>`;
    cont.appendChild(el);
    setTimeout(() => {
        el.classList.add('hiding');
        setTimeout(() => el.remove(), 280);
    }, 3500);
}

// ── Image Compression ─────────────────────────────────────────────────────────
function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = evt => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                // Resize if needed
                if (width > COMPRESS_MAX_PX || height > COMPRESS_MAX_PX) {
                    if (width > height) {
                        height = Math.round((height / width) * COMPRESS_MAX_PX);
                        width  = COMPRESS_MAX_PX;
                    } else {
                        width  = Math.round((width / height) * COMPRESS_MAX_PX);
                        height = COMPRESS_MAX_PX;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width  = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(blob => {
                    if (!blob) { reject(new Error('Kompresi gagal')); return; }
                    const reader2 = new FileReader();
                    reader2.onload = e2 => resolve({
                        dataUrl: e2.target.result,
                        blob,
                        width,
                        height,
                        originalSize: file.size,
                        compressedSize: blob.size,
                    });
                    reader2.onerror = reject;
                    reader2.readAsDataURL(blob);
                }, 'image/jpeg', COMPRESS_QUALITY);
            };
            img.onerror = reject;
            img.src = evt.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function fmtBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

function ratio(orig, comp) {
    return ((1 - comp / orig) * 100).toFixed(0) + '%';
}

// ── Render Helpers ────────────────────────────────────────────────────────────
const SVG_TRASH   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`;
const SVG_UPLOAD  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`;
const SVG_IMAGE   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;

function renderPhotoGrid(page) {
    const gridId  = page === 'portfolio' ? 'portfolio-grid'  : 'beranda-grid';
    const filter  = page === 'portfolio' ? portfolioFilter   : berandaFilter;
    const photos  = page === 'portfolio' ? portfolioPhotos   : berandaPhotos;
    const grid    = document.getElementById(gridId);
    if (!grid) return;

    const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="photos-empty">${SVG_IMAGE}<p>Belum ada foto di kategori ini.<br>Upload foto baru di atas.</p></div>`;
        updateStats();
        return;
    }

    grid.innerHTML = filtered.map(photo => `
        <div class="photo-card ${page === 'beranda' ? 'homepage-featured' : ''}" data-id="${photo.id}">
            <img src="${photo.src}" alt="${photo.titleEn}" loading="lazy" onerror="this.style.background='#252535';this.style.height='100%'">
            <div class="photo-card-overlay">
                <div class="photo-card-cat">${photo.catLabel}</div>
                <div class="photo-card-info">${photo.titleId}</div>
                <div class="photo-card-actions">
                    <button class="photo-delete-btn" onclick="confirmDelete('${page}','${photo.id}')">${SVG_TRASH} Hapus</button>
                </div>
            </div>
        </div>
    `).join('');

    updateStats();
}

function updateStats() {
    safeSet('stat-portfolio-count', portfolioPhotos.length);
    safeSet('stat-beranda-count',   berandaPhotos.length);
    safeSet('stat-wedding-count',   portfolioPhotos.filter(p => p.category === 'wedding').length);
    safeSet('stat-prewed-count',    portfolioPhotos.filter(p => p.category === 'prewedding').length);

    // Update nav badge
    const badge = document.getElementById('portfolio-badge');
    if (badge) badge.textContent = portfolioPhotos.length;
}

function safeSet(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

// ── Upload Queue Rendering ─────────────────────────────────────────────────────
function addToQueue(file, result) {
    const queueId = page === 'portfolio' ? 'portfolio-queue' : 'beranda-queue';
    const queue   = document.getElementById(queueId) ||
                    document.getElementById('portfolio-queue');
    if (!queue) return;

    const itemId = 'qi_' + genId();
    const ratioPct = ratio(result.originalSize, result.compressedSize);

    const el = document.createElement('div');
    el.className = 'queue-item';
    el.id = itemId;
    el.innerHTML = `
        <img class="queue-thumb" src="${result.dataUrl}" alt="Preview">
        <div class="queue-info">
            <div class="queue-name">${file.name}</div>
            <div class="queue-meta">
                <span>Asli: <span class="queue-size-before">${fmtBytes(result.originalSize)}</span></span>
                <span>Terkompresi: <span class="queue-size-after">${fmtBytes(result.compressedSize)}</span></span>
                <span class="queue-ratio">Hemat ${ratioPct}</span>
                <span>${result.width}×${result.height}px</span>
            </div>
            <div class="queue-progress"><div class="queue-progress-bar" style="width:100%"></div></div>
        </div>
        <div class="queue-actions">
            <span class="queue-status done">Siap</span>
            <button class="btn btn-outline btn-sm" onclick="downloadCompressed('${itemId}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="21" x2="12" y2="3"/></svg>
                Download
            </button>
        </div>
    `;
    el.dataset.dataUrl = result.dataUrl;
    el.dataset.filename = file.name;

    queue.insertBefore(el, queue.firstChild);
}

function downloadCompressed(itemId) {
    const el = document.getElementById(itemId);
    if (!el) return;
    const a = document.createElement('a');
    a.href = el.dataset.dataUrl;
    a.download = 'compressed_' + el.dataset.filename;
    a.click();
}

// ── Handle File Upload ────────────────────────────────────────────────────────
async function handleFiles(files, page) {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) { showToast('error', 'File tidak valid', 'Pilih file gambar (JPG, PNG, WEBP)'); return; }

    const catEl = document.getElementById(page === 'portfolio' ? 'port-category' : 'home-category');
    const titIdEl = document.getElementById(page === 'portfolio' ? 'port-title-id' : 'home-title-id');
    const titEnEl = document.getElementById(page === 'portfolio' ? 'port-title-en' : 'home-title-en');

    const category = catEl ? catEl.value : 'event';
    const titleId  = titIdEl ? titIdEl.value.trim() : 'Foto';
    const titleEn  = titEnEl ? titEnEl.value.trim() : 'Photo';
    const catLabel = (catEl ? catEl.options[catEl.selectedIndex].text : category).toUpperCase();

    showToast('info', `Mengompresi ${valid.length} foto...`, 'Harap tunggu, proses berjalan di browser');

    let added = 0;
    for (const file of valid) {
        try {
            const result = await compressImage(file);
            const id = genId();

            showToast('info', `Mengupload ${file.name}...`, 'Mohon tunggu');
            
            const upRes = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_PASSWORD}`
                },
                body: JSON.stringify({
                    filename: file.name,
                    imageBase64: result.dataUrl
                })
            });

            if (!upRes.ok) {
                const err = await upRes.json();
                throw new Error(err.error || 'Upload gagal');
            }
            const blobData = await upRes.json();
            const photoUrl = blobData.url;

            const photo = {
                id, src: photoUrl, category, titleId, titleEn, catLabel,
                width: result.width, height: result.height,
                filename: file.name, isUploaded: true,
                originalSize: result.originalSize, compressedSize: result.compressedSize,
            };

            if (page === 'portfolio') {
                portfolioPhotos.unshift(photo);
                savePortfolio();
            } else {
                berandaPhotos.unshift(photo);
                saveBeranda();
            }

            addToQueue(file, result);
            added++;
        } catch (err) {
            console.error('Proses gagal:', err);
            showToast('error', `Gagal: ${file.name}`, err.message);
        }
    }

    if (added > 0) {
        showToast('success', `${added} foto berhasil ditambahkan!`, `Foto sudah dikompres & masuk ke daftar ${page}`);
        renderPhotoGrid(page);
    
    }
}

// ── Delete ────────────────────────────────────────────────────────────────────
function confirmDelete(page, id) {
    const photos = page === 'portfolio' ? portfolioPhotos : berandaPhotos;
    const photo  = photos.find(p => p.id === id);
    if (!photo) return;

    deleteTarget = { page, id };

    const modal     = document.getElementById('delete-modal');
    const thumbEl   = document.getElementById('delete-modal-thumb');
    const titleEl   = document.getElementById('delete-modal-title');

    thumbEl.src   = photo.src;
    titleEl.textContent = photo.titleId + ' — ' + photo.catLabel;

    modal.classList.add('open');
}

function doDelete() {
    if (!deleteTarget) return;
    const { page, id } = deleteTarget;

    if (page === 'portfolio') {
        portfolioPhotos = portfolioPhotos.filter(p => p.id !== id);
        savePortfolio();
        renderPhotoGrid('portfolio');
    } else {
        berandaPhotos = berandaPhotos.filter(p => p.id !== id);
        saveBeranda();
        renderPhotoGrid('beranda');
    }

    closeDeleteModal();
    showToast('success', 'Foto berhasil dihapus!', `Foto telah dihapus dari daftar ${page}`);

}

function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    if (modal) modal.classList.remove('open');
    deleteTarget = null;
}

// ── Navigation ────────────────────────────────────────────────────────────────
function switchPage(page) {
    currentPage = page;
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));

    const panelEl = document.getElementById('panel-' + page);
    const navEl   = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (panelEl) panelEl.classList.add('active');
    if (navEl)   navEl.classList.add('active');

    updateTopbar(page);
}

function updateTopbar(page) {
    const titles = {
        portfolio: { h: 'Portfolio',      p: 'Kelola foto galeri portfolio' },
        beranda:   { h: 'Beranda',        p: 'Kelola foto slider di halaman beranda' },
        layanan:   { h: 'Layanan & Paket', p: 'Tambah, edit, dan hapus paket layanan fotografi' },
        export:    { h: 'Export Kode',    p: 'Generate kode siap pakai untuk diterapkan ke website' },
    };
    const t = titles[page] || titles.portfolio;
    safeSet('topbar-title', t.h);
    safeSet('topbar-sub',   t.p);

    // Render layanan saat pertama kali dibuka
    if (page === 'layanan') {
        renderServiceList();
        // Update badge
        const badge = document.getElementById('services-badge');
        if (badge) badge.textContent = services.length;
    }
}



function resetData(page) {
    if (!confirm(`Reset semua data ${page} ke default? Perubahan yang belum di-export akan hilang.`)) return;
    if (page === 'portfolio') {
        portfolioPhotos = [...DEFAULT_PORTFOLIO];
        savePortfolio();
        renderPhotoGrid('portfolio');
    } else {
        berandaPhotos = [...DEFAULT_BERANDA];
        saveBeranda();
        renderPhotoGrid('beranda');
    }
    showToast('info', `Data ${page} direset ke default`);
}

// ── Filter chips ──────────────────────────────────────────────────────────────
function setFilter(page, category) {
    if (page === 'portfolio') portfolioFilter = category;
    else berandaFilter = category;

    const prefix = page === 'portfolio' ? 'pf' : 'bf';
    document.querySelectorAll(`.filter-chip[data-page="${page}"]`).forEach(c => {
        c.classList.toggle('active', c.dataset.cat === category);
    });

    renderPhotoGrid(page);
}

// ── Mobile sidebar ────────────────────────────────────────────────────────────
function toggleSidebar() {
    document.getElementById('admin-sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
}

function closeSidebar() {
    document.getElementById('admin-sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // ---- LOGIN SCREEN ----
    const loginScreen     = document.getElementById('login-screen');
    const dashboard       = document.getElementById('admin-dashboard');
    const loginForm       = document.getElementById('login-form');
    const loginPwdInput   = document.getElementById('login-password');
    const loginErrMsg     = document.getElementById('login-error');

    async function showDashboard() {
        if (loginScreen) loginScreen.classList.add('hidden');
        if (dashboard)   dashboard.classList.remove('hidden');
        await loadData();
        renderPhotoGrid('portfolio');
        renderPhotoGrid('beranda');
        renderServiceList();
        updateStats();
        switchPage('portfolio');
        // Update services badge
        const badge = document.getElementById('services-badge');
        if (badge) badge.textContent = services.length;
    }

    if (isLoggedIn()) {
        showDashboard();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const pwd = loginPwdInput.value;
            if (pwd === ADMIN_PASSWORD) {
                setLoggedIn();
                showDashboard();
            } else {
                loginPwdInput.classList.add('error');
                loginErrMsg.textContent = 'Password salah. Coba lagi.';
                setTimeout(() => loginPwdInput.classList.remove('error'), 600);
            }
        });
    }

    // ---- LOGOUT ----
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // ---- NAVIGATION ----
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            switchPage(item.dataset.page);
            closeSidebar();
        });
    });

    // ---- UPLOAD ZONES — Portfolio ----
    setupUploadZone('portfolio-upload-zone', 'portfolio-file-input', 'portfolio');

    // ---- UPLOAD ZONES — Beranda ----
    setupUploadZone('beranda-upload-zone', 'beranda-file-input', 'beranda');

    function setupUploadZone(zoneId, inputId, page) {
        const zone  = document.getElementById(zoneId);
        const input = document.getElementById(inputId);
        if (!zone || !input) return;

        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files, page);
        });
        input.addEventListener('change', () => handleFiles(input.files, page));
    }

    // ---- FILTER CHIPS ----
    document.querySelectorAll('.filter-chip[data-page]').forEach(chip => {
        chip.addEventListener('click', () => setFilter(chip.dataset.page, chip.dataset.cat));
    });

    // ---- DELETE MODAL ----
    document.getElementById('delete-confirm-btn')?.addEventListener('click', doDelete);
    document.getElementById('delete-cancel-btn')?.addEventListener('click', closeDeleteModal);
    document.getElementById('delete-modal')?.addEventListener('click', e => {
        if (e.target === document.getElementById('delete-modal')) closeDeleteModal();
    });

    // ---- EXPORT TABS ----
    document.querySelectorAll('.export-tab').forEach(t => {
        t.addEventListener('click', () => switchExportTab(t.dataset.tab));
    });

    // ---- MOBILE SIDEBAR ----
    document.getElementById('mobile-menu-btn')?.addEventListener('click', toggleSidebar);
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);

    // ---- RESET BUTTONS ----
    document.getElementById('reset-portfolio-btn')?.addEventListener('click', () => resetData('portfolio'));
    document.getElementById('reset-beranda-btn')?.addEventListener('click',   () => resetData('beranda'));
    document.getElementById('reset-services-btn')?.addEventListener('click',  () => resetServicesData());

    // ---- SERVICE FORM ----
    initServiceForm();

    // ---- SERVICE CAT TABS ----
    document.querySelectorAll('.cat-section-tab[data-scat]').forEach(tab => {
        tab.addEventListener('click', () => setServiceCatFilter(tab.dataset.scat));
    });
});

// ============================================================
//  SERVICES (LAYANAN) MANAGEMENT
// ============================================================

// SVG icons library
const SERVICE_ICONS = {
    camera:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    image:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    heart:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    star:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    award:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    layers:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    file:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    video:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    gift:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
    book:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    users:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
};

const SVC_CAT_LABELS = { wedding: 'Wedding', prewedding: 'Prewedding', portrait: 'Portrait', event: 'Event', other: 'Lainnya' };

function resetServicesData() {
    if (!confirm('Reset semua layanan ke data default? Perubahan yang belum di-export akan hilang.')) return;
    services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    saveServices();
    renderServiceList();

    showToast('info', 'Data layanan direset ke default');
}

// ── Render Service List ───────────────────────────────────────────────────────
function renderServiceList() {
    const list   = document.getElementById('service-list');
    const catF   = serviceCatFilter;
    if (!list) return;

    const filtered = catF === 'all' ? services : services.filter(s => s.category === catF);

    safeSet('stat-services-count', services.length);

    if (filtered.length === 0) {
        list.innerHTML = `<div class="photos-empty" style="padding:40px 20px;text-align:center;color:var(--text-muted);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 12px;display:block;opacity:0.4"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
            <p style="font-size:14px;">Belum ada layanan di kategori ini.</p>
        </div>`;
        return;
    }

    list.innerHTML = filtered.map(svc => {
        const isFeatured = svc.badge === 'POPULAR' || svc.badge === 'PREMIUM';
        const badgeCls   = svc.badge === 'POPULAR' ? 'badge-popular' : svc.badge === 'PREMIUM' ? 'badge-premium' : '';
        const iconSvg    = SERVICE_ICONS[svc.iconKey] || SERVICE_ICONS.camera;
        const featureTags = (svc.features || []).slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('');
        const moreCount   = (svc.features || []).length - 3;

        return `
        <div class="service-row ${isFeatured ? 'featured-row' : ''}" data-id="${svc.id}">
            <div class="service-row-icon">${iconSvg}</div>
            <div class="service-row-info">
                <div class="service-row-name">
                    ${svc.name}
                    <span class="service-row-cat">${SVC_CAT_LABELS[svc.category] || svc.category}</span>
                    ${svc.badge ? `<span class="queue-status done" style="padding:2px 9px;font-size:10px;">${svc.badge}</span>` : ''}
                </div>
                <div class="service-row-price">${svc.price}</div>
                <div class="service-row-features">
                    ${featureTags}
                    ${moreCount > 0 ? `<span class="feature-tag">+${moreCount} lainnya</span>` : ''}
                </div>
            </div>
            <div class="service-row-actions">
                <button class="btn btn-outline btn-sm" onclick="editService('${svc.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteService('${svc.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                </button>
            </div>
        </div>`;
    }).join('');
}

// ── Set Category Filter ───────────────────────────────────────────────────────
function setServiceCatFilter(cat) {
    serviceCatFilter = cat;
    document.querySelectorAll('.cat-section-tab[data-scat]').forEach(t =>
        t.classList.toggle('active', t.dataset.scat === cat));
    renderServiceList();
}

// ── Form: Init ────────────────────────────────────────────────────────────────
function initServiceForm() {
    // Render icon picker
    const picker = document.getElementById('svc-icon-picker');
    if (picker) {
        picker.innerHTML = Object.entries(SERVICE_ICONS).map(([key, svg]) =>
            `<div class="icon-option ${key === 'camera' ? 'selected' : ''}" data-key="${key}" onclick="selectIcon('${key}')">${svg}</div>`
        ).join('');
    }

    // Toggle form visibility
    document.getElementById('add-service-btn')?.addEventListener('click', () => openServiceForm());
    document.getElementById('svc-form-cancel')?.addEventListener('click', () => closeServiceForm());
    document.getElementById('svc-form-cancel-bottom')?.addEventListener('click', () => closeServiceForm());

    // Add feature
    document.getElementById('svc-feature-add')?.addEventListener('click', addFeatureToList);
    document.getElementById('svc-feature-input')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); addFeatureToList(); }
    });

    // Submit form
    document.getElementById('svc-form')?.addEventListener('submit', e => {
        e.preventDefault();
        saveService();
    });
}

function selectIcon(key) {
    selectedIcon = key;
    document.querySelectorAll('.icon-option').forEach(el =>
        el.classList.toggle('selected', el.dataset.key === key));
}

function addFeatureToList() {
    const input = document.getElementById('svc-feature-input');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    formFeatures.push(val);
    input.value = '';
    renderFormFeatures();
}

function removeFormFeature(idx) {
    formFeatures.splice(idx, 1);
    renderFormFeatures();
}

function renderFormFeatures() {
    const container = document.getElementById('svc-features-list');
    if (!container) return;
    if (formFeatures.length === 0) {
        container.innerHTML = '<p style="font-size:12px;color:var(--text-muted);padding:8px 0;">Belum ada fitur. Tambahkan di atas.</p>';
        return;
    }
    container.innerHTML = formFeatures.map((f, i) => `
        <div class="feature-item-row">
            <span>${f}</span>
            <button class="feature-remove-btn" onclick="removeFormFeature(${i})" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
    `).join('');
}

// ── Open/Close Form ───────────────────────────────────────────────────────────
function openServiceForm(svc = null) {
    serviceEditId  = svc ? svc.id : null;
    formFeatures   = svc ? [...svc.features] : [];
    selectedIcon   = svc ? (svc.iconKey || 'camera') : 'camera';

    // Fill fields
    const f = id => document.getElementById(id);
    if (f('svc-name'))     f('svc-name').value     = svc?.name     || '';
    if (f('svc-price'))    f('svc-price').value    = svc?.price    || '';
    if (f('svc-category')) f('svc-category').value = svc?.category || 'wedding';
    if (f('svc-badge'))    f('svc-badge').value    = svc?.badge    || '';
    if (f('svc-wa-msg'))   f('svc-wa-msg').value   = svc?.waMsg    || svc?.name || '';

    // Update icon picker
    document.querySelectorAll('.icon-option').forEach(el =>
        el.classList.toggle('selected', el.dataset.key === selectedIcon));

    renderFormFeatures();

    // Show form
    const formSection = document.getElementById('svc-form-section');
    if (formSection) {
        formSection.classList.remove('hidden');
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update form title
    const titleEl = document.getElementById('svc-form-title');
    if (titleEl) titleEl.textContent = svc ? `Edit: ${svc.name}` : 'Tambah Layanan Baru';
}

function closeServiceForm() {
    document.getElementById('svc-form-section')?.classList.add('hidden');
    serviceEditId = null;
    formFeatures  = [];
}

// ── Edit / Delete Service ─────────────────────────────────────────────────────
function editService(id) {
    const svc = services.find(s => s.id === id);
    if (!svc) return;
    openServiceForm(svc);
}

function deleteService(id) {
    const svc = services.find(s => s.id === id);
    if (!svc) return;
    if (!confirm(`Hapus layanan "${svc.name}"? Perubahan harus di-export agar berlaku di website.`)) return;
    services = services.filter(s => s.id !== id);
    saveServices();
    renderServiceList();

    showToast('success', `Layanan "${svc.name}" dihapus`);
}

// ── Save Service (Add / Edit) ─────────────────────────────────────────────────
function saveService() {
    const getVal = id => (document.getElementById(id)?.value || '').trim();
    const name     = getVal('svc-name');
    const price    = getVal('svc-price');
    const category = getVal('svc-category');
    const badge    = getVal('svc-badge');
    const waMsg    = getVal('svc-wa-msg') || name;

    if (!name || !price) {
        showToast('error', 'Nama dan harga wajib diisi!');
        return;
    }

    if (serviceEditId) {
        // Edit mode
        const idx = services.findIndex(s => s.id === serviceEditId);
        if (idx !== -1) {
            services[idx] = { ...services[idx], name, price, category, badge, iconKey: selectedIcon, features: [...formFeatures], waMsg };
        }
        showToast('success', `Layanan "${name}" diperbarui!`, 'Export kode untuk menerapkan perubahan');
    } else {
        // Add mode
        services.push({ id: genId(), name, price, category, badge, iconKey: selectedIcon, features: [...formFeatures], waMsg });
        showToast('success', `Layanan "${name}" ditambahkan!`, 'Export kode untuk menerapkan perubahan');
    }

    saveServices();
    renderServiceList();
    closeServiceForm();
}



