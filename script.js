/* ═══════════════════════════════════════════════════════════════════
   JBL Tune 720BT — Scroll-Linked Canvas Animation Engine
   Hardware-accelerated, buttery-smooth scrollytelling
   ═══════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── CONFIGURATION ───────────────────────────────────────────
    const FRAME_COUNT   = 240;
    const FRAME_DIR     = './ezgif-5901b969e0a9da4b-jpg/';
    const FRAME_PREFIX  = 'ezgif-frame-';
    const FRAME_EXT     = '.jpg';
    const NAV_THRESHOLD = 100;

    // ─── DOM REFS ────────────────────────────────────────────────
    const canvas     = document.getElementById('product-canvas');
    const ctx        = canvas.getContext('2d');
    const scrollCont = document.getElementById('scroll-container');
    const nav        = document.getElementById('main-nav');
    const navLinks   = document.querySelectorAll('.nav__link');
    const sectionEls = document.querySelectorAll('.scroll-section');

    // ─── IMAGE PRELOADING ────────────────────────────────────────
    const images = new Array(FRAME_COUNT);
    let loadedCount = 0;
    let imagesReady = false;

    function padNumber(n) {
        return String(n).padStart(3, '0');
    }

    function framePath(index) {
        return FRAME_DIR + FRAME_PREFIX + padNumber(index + 1) + FRAME_EXT;
    }

    function preloadImages() {
        return new Promise((resolve) => {
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = framePath(i);
                img.onload = img.onerror = () => {
                    loadedCount++;
                    if (loadedCount >= FRAME_COUNT) {
                        imagesReady = true;
                        resolve();
                    }
                };
                images[i] = img;
            }
        });
    }

    // ─── CANVAS RENDERING ────────────────────────────────────────
    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width  = window.innerWidth  * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width  = window.innerWidth  + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame(index) {
        const img = images[index];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cw = window.innerWidth;
        const ch = window.innerHeight;

        // Cover-fit the image
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
            drawW = cw;
            drawH = cw / imgRatio;
            drawX = 0;
            drawY = (ch - drawH) / 2;
        } else {
            drawH = ch;
            drawW = ch * imgRatio;
            drawX = (cw - drawW) / 2;
            drawY = 0;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // ─── SCROLL PROGRESS ─────────────────────────────────────────
    function getScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = scrollCont.scrollHeight - window.innerHeight;
        return Math.min(1, Math.max(0, scrollTop / maxScroll));
    }

    // ─── NAV VISIBILITY ──────────────────────────────────────────
    function updateNav(scrollTop) {
        if (scrollTop > NAV_THRESHOLD) {
            nav.classList.add('nav--visible');
        } else {
            nav.classList.remove('nav--visible');
        }
    }

    // ─── SECTION VISIBILITY (Intersection-based) ─────────────────
    // Each section animates its children when it enters the viewport center
    function updateSections() {
        const viewportCenter = window.innerHeight / 2;

        sectionEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            // Section is "active" when viewport center is within its bounds
            const isActive = sectionTop < viewportCenter + 100 && sectionBottom > viewportCenter - 100;

            if (isActive) {
                // Calculate how far into the section we are (0→1)
                const sectionHeight = rect.height;
                const centerOffset = viewportCenter - sectionTop;
                const localProgress = Math.min(1, Math.max(0, centerOffset / sectionHeight));

                // Animate children with staggered delays
                const animEls = el.querySelectorAll('[data-animate]');
                animEls.forEach((animEl) => {
                    const delay = parseInt(animEl.dataset.delay || '0', 10);
                    const threshold = 0.05 + (delay / 2000);
                    if (localProgress > threshold) {
                        animEl.classList.add('is-visible');
                    }
                });

                // Update nav active link
                navLinks.forEach((link) => {
                    if (link.dataset.section === el.id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            } else {
                // Remove animations when section leaves viewport
                const animEls = el.querySelectorAll('[data-animate]');
                animEls.forEach((animEl) => {
                    animEl.classList.remove('is-visible');
                });
            }
        });
    }

    // ─── MAIN ANIMATION LOOP ─────────────────────────────────────
    let lastFrameIndex = -1;
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(tick);
            ticking = true;
        }
    }

    function tick() {
        ticking = false;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress  = getScrollProgress();

        // 1. Update nav
        updateNav(scrollTop);

        // 2. Update canvas frame
        if (imagesReady) {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * (FRAME_COUNT - 1))
            );
            if (frameIndex !== lastFrameIndex) {
                drawFrame(frameIndex);
                lastFrameIndex = frameIndex;
            }
        }

        // 3. Update sections
        updateSections();
    }

    // ─── SMOOTH NAV SCROLLING ────────────────────────────────────
    function setupNavClicks() {
        // Map section IDs to scroll progress ranges for nav click scrolling
        const sectionRanges = {
            hero:          0.00,
            engineering:   0.18,
            battery:       0.43,
            customization: 0.68,
            cta:           0.88,
        };

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                const startProgress = sectionRanges[sectionId] || 0;
                const maxScroll = scrollCont.scrollHeight - window.innerHeight;
                const targetY = startProgress * maxScroll;

                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            });
        });

        // CTA buttons in nav and page
        document.querySelectorAll('a[href="#cta"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const maxScroll = scrollCont.scrollHeight - window.innerHeight;
                const targetY = 0.88 * maxScroll;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            });
        });
    }

    // ─── INITIALIZATION ──────────────────────────────────────────
    function init() {
        resizeCanvas();

        // Draw first frame immediately if available
        if (images[0] && images[0].complete) {
            drawFrame(0);
        }

        // Bind events
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            resizeCanvas();
            if (imagesReady && lastFrameIndex >= 0) {
                drawFrame(lastFrameIndex);
            }
        });

        setupNavClicks();

        // Initial render
        tick();
    }

    // ─── BOOT ────────────────────────────────────────────────────
    preloadImages().then(() => {
        tick();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
