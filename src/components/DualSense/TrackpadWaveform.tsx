import { useRef, useEffect } from 'react';
import './TrackpadWaveform.css';

interface TrackpadWaveformProps {
    width?: number;
    height?: number;
    isHovered?: boolean;
    className?: string;
}

interface TechLogo {
    name: string;
    category: 'ai' | 'framework' | 'cloud' | 'language';
}

interface FloatingLogo extends TechLogo {
    x: number;
    offset: number;
}

const techLogos: TechLogo[] = [
    // AI & ML (highlighted, 1.5x)
    { name: 'OpenAI', category: 'ai' },
    { name: 'Claude', category: 'ai' },
    { name: 'HuggingFace', category: 'ai' },
    { name: 'LangChain', category: 'ai' },
    // Frameworks
    { name: 'React', category: 'framework' },
    { name: 'Next.js', category: 'framework' },
    { name: 'Node.js', category: 'framework' },
    // Cloud
    { name: 'AWS', category: 'cloud' },
    { name: 'Docker', category: 'cloud' },
    { name: 'Vercel', category: 'cloud' },
    // Languages
    { name: 'TypeScript', category: 'language' },
    { name: 'Go', category: 'language' },
    { name: 'Python', category: 'language' },
];

const CATEGORY_COLORS: Record<string, string> = {
    ai: '#63D2FF',
    framework: '#32de8a',
    cloud: '#f9a03f',
    language: '#171219',
};

const BASE_FONT_SIZE = 10;
const AI_FONT_MULTIPLIER = 1.5;
const LOGO_SPACING = 90;

function lerp(current: number, target: number, factor: number): number {
    return current + (target - current) * factor;
}

const TrackpadWaveform = ({
    width: propWidth,
    height: propHeight,
    isHovered = false,
    className = '',
}: TrackpadWaveformProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const phaseRef = useRef(0);
    const scrollOffsetRef = useRef(0);
    const amplitudeRef = useRef(12);
    const speedRef = useRef(0.4);
    const isHoveredRef = useRef(isHovered);
    const sizeRef = useRef({ width: 0, height: 0 });

    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        amplitudeRef.current = 12;
        speedRef.current = 0.4;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const parent = canvas.parentElement;
            const w = propWidth || (parent ? parent.clientWidth : 280);
            const h = propHeight || (parent ? parent.clientHeight : 80);
            sizeRef.current = { width: w, height: h };
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        const observer = new ResizeObserver(resize);
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const totalLogoWidth = techLogos.length * LOGO_SPACING;

        const logos: FloatingLogo[] = [];
        const allLogos = [...techLogos, ...techLogos]; // duplicate for seamless loop
        allLogos.forEach((logo, i) => {
            logos.push({
                ...logo,
                x: i * LOGO_SPACING,
                offset: (i * 0.7) % (Math.PI * 2),
            });
        });

        const targetAmplitude = { default: 12, hovered: 18 };
        const targetSpeed = { default: 0.4, hovered: 0.15 };
        const frequency = 0.03;
        const lerpFactor = 0.05;

        const draw = () => {
            const { width: w, height: h } = sizeRef.current;
            if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(draw); return; }

            const hoveredNow = isHoveredRef.current;
            const ampTarget = hoveredNow ? targetAmplitude.hovered : targetAmplitude.default;
            const spdTarget = hoveredNow ? targetSpeed.hovered : targetSpeed.default;

            amplitudeRef.current = lerp(amplitudeRef.current, ampTarget, lerpFactor);
            speedRef.current = lerp(speedRef.current, spdTarget, lerpFactor);

            const amplitude = amplitudeRef.current;
            const speed = speedRef.current;

            phaseRef.current += 0.015;
            scrollOffsetRef.current += speed;

            if (scrollOffsetRef.current >= totalLogoWidth) {
                scrollOffsetRef.current -= totalLogoWidth;
            }

            ctx.clearRect(0, 0, w, h);

            // Draw sine wave
            const gradient = ctx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, 'rgba(112, 171, 175, 0.1)');
            gradient.addColorStop(0.3, 'rgba(112, 171, 175, 0.6)');
            gradient.addColorStop(0.5, '#70ABAF');
            gradient.addColorStop(0.7, 'rgba(112, 171, 175, 0.6)');
            gradient.addColorStop(1, 'rgba(112, 171, 175, 0.1)');

            ctx.save();
            ctx.shadowColor = 'rgba(112, 171, 175, 0.4)';
            ctx.shadowBlur = 8;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            const centerY = h / 2;

            for (let x = 0; x <= w; x++) {
                const y = centerY + amplitude * Math.sin(frequency * x + phaseRef.current);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            ctx.restore();

            // Draw floating tech logos
            const scrollX = scrollOffsetRef.current;

            for (const logo of logos) {
                let posX = logo.x - scrollX;

                // Wrap around for seamless scrolling
                while (posX < -LOGO_SPACING) posX += totalLogoWidth;
                while (posX > w + LOGO_SPACING) posX -= totalLogoWidth;

                if (posX < -LOGO_SPACING || posX > w + LOGO_SPACING) continue;

                const posY =
                    centerY +
                    amplitude * Math.sin(frequency * posX + phaseRef.current) -
                    12;

                const isAI = logo.category === 'ai';
                const fontSize = isAI
                    ? BASE_FONT_SIZE * AI_FONT_MULTIPLIER
                    : BASE_FONT_SIZE;
                const color = CATEGORY_COLORS[logo.category];

                ctx.save();
                ctx.font = `600 ${fontSize}px 'SUSE', system-ui, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                if (isAI) {
                    ctx.shadowColor = 'rgba(112, 171, 175, 0.6)';
                    ctx.shadowBlur = 10;
                }

                // Fade at edges
                const edgeFade = 40;
                let alpha = 1;
                if (posX < edgeFade) {
                    alpha = Math.max(0, posX / edgeFade);
                } else if (posX > w - edgeFade) {
                    alpha = Math.max(0, (w - posX) / edgeFade);
                }

                ctx.globalAlpha = alpha;
                ctx.fillStyle = color;
                ctx.fillText(logo.name, posX, posY);
                ctx.restore();
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animRef.current);
        };
    }, [propWidth, propHeight]);

    return (
        <canvas
            ref={canvasRef}
            className={`trackpad-waveform ${className}`}
        />
    );
};

export default TrackpadWaveform;
