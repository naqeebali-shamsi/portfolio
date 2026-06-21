import { useRef, useEffect } from 'react';

// --- Constants ---
const COLORS = {
  dim: [42, 34, 48] as const,       // #2a2230
  ripple: [99, 210, 255] as const,  // #63D2FF frozen-lake
  mouse: [50, 222, 138] as const,   // #32de8a emerald
};

const DIM_BRIGHTNESS = 0.03;
const RIPPLE_SPEED = 400;       // px per second
const RIPPLE_BAND = 60;         // width of the ripple ring in px
const MOUSE_RADIUS = 80;
const MOUSE_DECAY = 2.0;        // brightness decay per second
const ENTRANCE_DELAY = 300;     // ms before entrance ripple
const DOT_RADIUS = 2;

// Per-dot: x, y, brightness, targetBrightness, velocityY, isLetter
const STRIDE = 6;

interface Props {
  className?: string;
  onRippleComplete?: () => void;
}

export function SignalGrid({ className, onRippleComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const callbackRef = useRef(onRippleComplete);
  callbackRef.current = onRippleComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement!;
    const ctx = canvas.getContext('2d')!;
    const isMobile = window.innerWidth < 768;
    const cellSize = isMobile ? 20 : 12;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = container.clientWidth;
    let h = container.clientHeight;

    // --- Build grid ---
    function buildGrid() {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const total = cols * rows;
      const dots = new Float32Array(total * STRIDE);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * STRIDE;
          dots[i] = c * cellSize + cellSize / 2;
          dots[i + 1] = r * cellSize + cellSize / 2;
          dots[i + 2] = DIM_BRIGHTNESS;
          dots[i + 3] = DIM_BRIGHTNESS;
          dots[i + 4] = 0;
          dots[i + 5] = 0;
        }
      }

      // --- Text sampling ---
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d')!;

      const fontSize = Math.min(w * 0.08, 120);
      offCtx.font = `700 ${fontSize}px 'Cal Sans', system-ui, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#fff';

      const lineGap = fontSize * 0.2;
      const totalTextH = fontSize * 2 + lineGap;
      const startY = h / 2 - totalTextH / 2 + fontSize / 2;

      offCtx.fillText('NAQEEBALI', w / 2, startY);
      offCtx.fillText('SHAMSI', w / 2, startY + fontSize + lineGap);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const pixels = imageData.data;

      for (let i = 0; i < total; i++) {
        const px = Math.round(dots[i * STRIDE]);
        const py = Math.round(dots[i * STRIDE + 1]);
        if (px >= 0 && px < w && py >= 0 && py < h) {
          const idx = (py * w + px) * 4;
          if (pixels[idx + 3] > 128) {
            dots[i * STRIDE + 5] = 1;
          }
        }
      }

      return { dots, cols, rows, total };
    }

    let grid = buildGrid();

    // --- State ---
    let rippleStart = 0;
    let rippleTriggered = false;
    let rippleComplete = false;
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let scrollProgress = 0;

    // Entrance ripple
    const rippleTimer = setTimeout(() => {
      rippleStart = performance.now();
      rippleTriggered = true;
    }, ENTRANCE_DELAY);

    // --- Event handlers ---
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const onMouseLeave = () => {
      mouseActive = false;
    };

    let touchTimer: number;
    const onTouchStart = (e: TouchEvent) => {
      if (!isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) {
        mouseX = t.clientX - rect.left;
        mouseY = t.clientY - rect.top;
        mouseActive = true;
        clearTimeout(touchTimer);
        touchTimer = window.setTimeout(() => { mouseActive = false; }, 500);
      }
    };

    const onScroll = () => {
      const section = canvas.closest('section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      scrollProgress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const prevRippleTriggered = rippleTriggered;
        const prevRippleStart = rippleStart;
        const prevRippleComplete = rippleComplete;
        grid = buildGrid();
        rippleTriggered = prevRippleTriggered;
        rippleStart = prevRippleStart;
        rippleComplete = prevRippleComplete;
      }, 200);
    };
    window.addEventListener('resize', onResize);

    // --- Render loop ---
    let lastTime = performance.now();
    let animId = 0;

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const { dots, total } = grid;
      const centerX = w / 2;
      const centerY = h / 2;

      // Ripple state
      const rippleElapsed = rippleTriggered ? (now - rippleStart) / 1000 : -1;
      const rippleRadius = rippleElapsed >= 0 ? rippleElapsed * RIPPLE_SPEED : -1;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

      if (rippleTriggered && !rippleComplete && rippleRadius > maxDist + RIPPLE_BAND) {
        rippleComplete = true;
        callbackRef.current?.();
      }

      // Scroll dissolution
      const dissolveStart = 0.3;
      const dissolveEnd = 0.8;
      const dissolveFactor = scrollProgress <= dissolveStart
        ? 0
        : Math.min(1, (scrollProgress - dissolveStart) / (dissolveEnd - dissolveStart));

      // --- Update ---
      for (let i = 0; i < total; i++) {
        const idx = i * STRIDE;
        const x = dots[idx];
        const y = dots[idx + 1];
        let brightness = dots[idx + 2];
        const isLetter = dots[idx + 5] === 1;

        // 1. Entrance ripple
        if (rippleRadius >= 0) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const delta = rippleRadius - dist;

          if (delta >= 0 && delta < RIPPLE_BAND) {
            const intensity = 1 - delta / RIPPLE_BAND;
            brightness = Math.max(brightness, intensity);
          } else if (delta >= RIPPLE_BAND) {
            dots[idx + 3] = isLetter ? 1.0 : DIM_BRIGHTNESS;
          }
        }

        // 2. Mouse proximity
        if (mouseActive) {
          const mdx = x - mouseX;
          const mdy = y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < MOUSE_RADIUS) {
            brightness = Math.max(brightness, (1 - mDist / MOUSE_RADIUS) * 0.8);
          }
        }

        // 3. Lerp brightness
        const target = dots[idx + 3];
        if (brightness > target) {
          brightness = Math.max(target, brightness - MOUSE_DECAY * dt);
        } else {
          brightness += (target - brightness) * 4 * dt;
        }

        // 4. Scroll dissolution for letter dots
        if (dissolveFactor > 0 && isLetter && dots[idx + 4] === 0) {
          if (Math.random() < dissolveFactor * dt * 3) {
            dots[idx + 4] = -(50 + Math.random() * 100);
          }
        }

        // Apply velocity
        if (dots[idx + 4] !== 0) {
          dots[idx + 1] += dots[idx + 4] * dt;
          dots[idx + 4] *= 0.98;
          brightness *= 0.97;
        }

        dots[idx + 2] = Math.max(0, Math.min(1, brightness));
      }

      // --- Draw ---
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < total; i++) {
        const idx = i * STRIDE;
        const x = dots[idx];
        const y = dots[idx + 1];
        const brightness = dots[idx + 2];
        const isLetter = dots[idx + 5] === 1;

        if (brightness < 0.01) continue;

        // Determine color
        const mdx = x - mouseX;
        const mdy = y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const inMouse = mouseActive && mDist < MOUSE_RADIUS;

        let r: number, g: number, b: number;
        const t = brightness;

        if (inMouse && !isLetter) {
          r = COLORS.dim[0] + (COLORS.mouse[0] - COLORS.dim[0]) * t;
          g = COLORS.dim[1] + (COLORS.mouse[1] - COLORS.dim[1]) * t;
          b = COLORS.dim[2] + (COLORS.mouse[2] - COLORS.dim[2]) * t;
        } else if (isLetter || brightness > 0.1) {
          r = COLORS.dim[0] + (COLORS.ripple[0] - COLORS.dim[0]) * t;
          g = COLORS.dim[1] + (COLORS.ripple[1] - COLORS.dim[1]) * t;
          b = COLORS.dim[2] + (COLORS.ripple[2] - COLORS.dim[2]) * t;
        } else {
          r = COLORS.dim[0];
          g = COLORS.dim[1];
          b = COLORS.dim[2];
        }

        const alpha = Math.max(0.05, brightness);

        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(2)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      clearTimeout(rippleTimer);
      clearTimeout(touchTimer);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
