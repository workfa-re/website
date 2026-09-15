"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Dot = {
    x: number;
    y: number;
    phase: number;
    alpha: number;
    size: number;
    accent: boolean;
    columnBias: number;
    flickerMs: number;
};

type PointerState = {
    x: number;
    y: number;
    active: boolean;
};

export type PixelShaderBackdropProps = {
    className?: string;
    variant?: "default" | "quiet";
};

export function PixelShaderBackdrop({ className = "", variant = "default" }: PixelShaderBackdropProps) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const targetPointerRef = useRef<PointerState>({ x: -1000, y: -1000, active: false });
    const smoothPointerRef = useRef<PointerState>({ x: -1000, y: -1000, active: false });
    const reducedMotion = useReducedMotion() ?? false;
    const quiet = variant === "quiet";

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", { alpha: true });

        if (!host || !canvas || !context) return;

        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let dots: Dot[] = [];
        let animationFrame = 0;
        let isVisible = false;
        let disposed = false;
        let animationTime = 0;
        let lastFrameTime: number | null = null;
        let lastPaintTime = 0;
        const pointerEnabled = !quiet && !reducedMotion;

        const buildDots = () => {
            const rect = host.getBoundingClientRect();
            width = Math.max(Math.floor(rect.width), 1);
            height = Math.max(Math.floor(rect.height), 1);
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const gap = width < 680 ? 16 : width < 1100 ? 14 : 13;
            const margin = gap * 0.4;
            const nextDots: Dot[] = [];

            for (let y = margin; y < height - margin; y += gap) {
                for (let x = margin; x < width - margin; x += gap) {
                    const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
                    const normalized = noise - Math.floor(noise);
                    const edgeFadeX = Math.min(x / 180, (width - x) / 220, 1);
                    const edgeFadeY = Math.min(y / 140, (height - y) / 190, 1);
                    const textFalloff = x < width * 0.53 && y > height * 0.16 && y < height * 0.83 ? 0.72 : 1;
                    const emphasis = (0.22 + Math.pow(Math.max(0, edgeFadeX * edgeFadeY), 0.76) * 0.55) * textFalloff;

                    nextDots.push({
                        x,
                        y,
                        phase: normalized * Math.PI * 2,
                        alpha: emphasis * (0.48 + normalized * 0.46),
                        size: normalized > 0.97 ? 4.4 : normalized > 0.72 ? 3.55 : 2.85,
                        accent: normalized > 0.985,
                        columnBias: Math.max(0, x / width),
                        flickerMs: 260 + Math.floor(normalized * 430),
                    });
                }
            }

            dots = nextDots;
        };

        const paint = (time: number) => {
            context.clearRect(0, 0, width, height);
            const pointer = smoothPointerRef.current;
            const target = targetPointerRef.current;
            const pointerEase = target.active ? 0.18 : 0.1;

            pointer.x += (target.x - pointer.x) * pointerEase;
            pointer.y += (target.y - pointer.y) * pointerEase;
            pointer.active = target.active || Math.hypot(pointer.x - target.x, pointer.y - target.y) > 0.8;

            const motionTime = quiet ? time * 0.4 : time;
            const motionScale = quiet ? 0.35 : 1;
            const slowWaveX = Math.sin(motionTime * 0.000165) * 5 * motionScale;
            const slowWaveY = Math.cos(motionTime * 0.000145) * 4 * motionScale;
            const pointerRadius = Math.min(width < 760 ? 116 : 168, Math.max(width, height) * 0.27);

            for (const dot of dots) {
                const wave = reducedMotion ? 0 : Math.sin(motionTime * 0.000275 + dot.x * 0.012 + dot.y * 0.007 + dot.phase);
                const diagonal = reducedMotion ? 0 : Math.sin(motionTime * 0.00024 + (dot.x - dot.y) * 0.007 + dot.phase * 0.55);
                const idle = reducedMotion ? 0 : (wave * 0.48 + diagonal * 0.32) * motionScale;

                let x = dot.x + Math.cos(dot.phase) * idle;
                let y = dot.y + Math.sin(dot.phase * 0.82) * idle;
                let alpha = dot.alpha;
                let size = dot.size;
                let pointerBoost = 0;
                let pointerClear = 0;

                if (!reducedMotion) {
                    const rightDrift = Math.max(0, dot.columnBias - 0.34);
                    x += slowWaveX * rightDrift * 0.42;
                    y += slowWaveY * rightDrift * 0.28;
                    alpha += Math.max(0, wave) * 0.035;
                }

                if (pointerEnabled && pointer.active) {
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    const force = Math.max(0, 1 - distance / pointerRadius);

                    if (force > 0) {
                        const angle = Math.atan2(dy, dx);
                        const strength = force * force * 0.62;
                        const ring = Math.max(0, 1 - Math.abs(distance - pointerRadius * 0.62) / (pointerRadius * 0.34));
                        const tangent = (1 - force) * ring * (width < 760 ? 7 : 11);
                        x += Math.cos(angle) * strength * (width < 760 ? 34 : 52) - Math.sin(angle) * tangent;
                        y += Math.sin(angle) * strength * (width < 760 ? 34 : 52) + Math.cos(angle) * tangent;
                        pointerClear = force * 0.26;
                        alpha = alpha * (1 - pointerClear) + ring * 0.25;
                        size += ring * 0.45;
                        pointerBoost = Math.max(strength * 0.75, ring * 0.44);
                    }
                }

                let flickerLevel = 0.12;
                if (!reducedMotion && quiet) {
                    flickerLevel = 0.08 + Math.sin(motionTime * 0.00025 + dot.phase) * 0.025;
                } else if (!reducedMotion) {
                    const tick = Math.floor((time + dot.phase * 997) / dot.flickerMs);
                    const flickerSeed = Math.sin(dot.x * 0.073 + dot.y * 0.119 + tick * 9.71 + dot.phase * 3.2) * 43758.5453;
                    const flicker = flickerSeed - Math.floor(flickerSeed);
                    flickerLevel = flicker > 0.94 ? 0.82 : flicker > 0.8 ? 0.46 : flicker > 0.58 ? 0.22 : 0.035;
                }
                const blueMix = Math.min(1, flickerLevel * 0.34 + pointerBoost * 0.46 + (dot.accent ? 0.38 : 0));
                const whiteMix = Math.min(1, flickerLevel * 0.16 + pointerBoost * 0.2 + (dot.accent ? 0.08 : 0));
                const r = Math.round(40 + (96 - 40) * blueMix + 54 * whiteMix);
                const g = Math.round(45 + (142 - 45) * blueMix + 58 * whiteMix);
                const b = Math.round(54 + (224 - 54) * blueMix + 46 * whiteMix);
                const pixelAlpha = Math.min(alpha + flickerLevel * 0.16 + 0.03 - pointerClear * 0.08, 0.84);

                context.fillStyle = `rgba(${r}, ${g}, ${b}, ${pixelAlpha})`;
                context.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size);
            }
        };

        const canAnimate = () => !disposed && !reducedMotion && isVisible && !document.hidden;

        const draw = (time: number) => {
            animationFrame = 0;
            if (!canAnimate()) return;

            animationTime += lastFrameTime === null ? 0 : Math.min(time - lastFrameTime, 64);
            lastFrameTime = time;

            // The quiet backdrop changes slowly; painting at 30 fps is sufficient.
            if (!quiet || time - lastPaintTime >= 1000 / 30) {
                paint(animationTime);
                lastPaintTime = time;
            }
            animationFrame = window.requestAnimationFrame(draw);
        };

        const start = () => {
            if (canAnimate() && animationFrame === 0) {
                animationFrame = window.requestAnimationFrame(draw);
            }
        };

        const stop = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
            lastFrameTime = null;
        };

        const syncAnimation = () => {
            if (canAnimate()) start();
            else stop();
        };

        const handlePointerMove = (event: globalThis.PointerEvent) => {
            const rect = host.getBoundingClientRect();
            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            targetPointerRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                active: inside,
            };

            if (inside) {
                start();
            }
        };

        const handlePointerLeave = () => {
            targetPointerRef.current.active = false;
            start();
        };

        const resizeObserver = new ResizeObserver(() => {
            if (disposed) return;
            buildDots();
            paint(animationTime);
        });
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                if (disposed) return;
                isVisible = entry.isIntersecting;
                syncAnimation();
            },
            { rootMargin: quiet ? "0px" : "160px 0px", threshold: 0.02 }
        );

        // Paint once even with reduced motion; only the animation loop is conditional.
        targetPointerRef.current = { x: -1000, y: -1000, active: false };
        smoothPointerRef.current = { x: -1000, y: -1000, active: false };
        buildDots();
        paint(animationTime);
        resizeObserver.observe(host);
        visibilityObserver.observe(host);
        document.addEventListener("visibilitychange", syncAnimation);
        if (pointerEnabled) {
            window.addEventListener("pointermove", handlePointerMove, { passive: true });
            window.addEventListener("pointerleave", handlePointerLeave);
        }

        return () => {
            disposed = true;
            stop();
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            document.removeEventListener("visibilitychange", syncAnimation);
            if (pointerEnabled) {
                window.removeEventListener("pointermove", handlePointerMove);
                window.removeEventListener("pointerleave", handlePointerLeave);
            }
        };
    }, [quiet, reducedMotion]);

    return (
        <div
            ref={hostRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" />
            <div
                className={quiet
                    ? "absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,rgba(37,99,235,0.04),transparent_55%)]"
                    : "absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,rgba(37,99,235,0.1),transparent_42%),linear-gradient(90deg,rgba(2,4,11,0.2)_0%,rgba(2,4,11,0.02)_48%,rgba(2,4,11,0.24)_100%)]"}
            />
        </div>
    );
}
