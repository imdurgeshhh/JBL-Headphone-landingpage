import { useState, useEffect, useCallback, useRef } from 'react';

const FRAME_COUNT = 240;
const FRAME_PREFIX = '/frames/ezgif-frame-';
const FRAME_EXT = '.jpg';

function padNumber(n) {
  return String(n).padStart(3, '0');
}

function framePath(index) {
  return FRAME_PREFIX + padNumber(index + 1) + FRAME_EXT;
}

/**
 * Hook that preloads all 240 image frames and returns
 * the images array once ready.
 */
export function useImagePreloader() {
  const [ready, setReady] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    const imgs = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= FRAME_COUNT) {
          imagesRef.current = imgs;
          setReady(true);
        }
      };
      imgs[i] = img;
    }

    imagesRef.current = imgs;
  }, []);

  return { images: imagesRef.current, ready };
}

/**
 * Hook that tracks scroll progress (0-1) within a container element.
 * Returns scroll progress, raw scrollTop, and a ref for the container.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const st = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = container.scrollHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, st / maxScroll));

    setScrollTop(st);
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, scrollTop, containerRef };
}

/**
 * Hook that draws the correct frame to a canvas based on scroll progress.
 */
export function useCanvasRenderer(canvasRef, images, ready, progress) {
  const lastFrameRef = useRef(-1);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

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
  }, [canvasRef, images]);

  // Resize canvas on mount and window resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [canvasRef]);

  useEffect(() => {
    resizeCanvas();
    const onResize = () => {
      resizeCanvas();
      if (ready && lastFrameRef.current >= 0) {
        drawFrame(lastFrameRef.current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [resizeCanvas, drawFrame, ready]);

  // Draw frame based on progress
  useEffect(() => {
    if (!ready) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(progress * (FRAME_COUNT - 1))
    );
    if (frameIndex !== lastFrameRef.current) {
      drawFrame(frameIndex);
      lastFrameRef.current = frameIndex;
    }
  }, [progress, ready, drawFrame]);
}

/**
 * Hook that detects if an element is in viewport center area.
 * Returns isVisible boolean.
 */
export function useSectionVisibility(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const active = rect.top < viewportCenter + 150 && rect.bottom > viewportCenter - 150;
      setIsVisible(active);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [ref]);

  return isVisible;
}
