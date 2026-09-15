"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";

export { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";

function WorkfareMark() {
    return (
        <div aria-hidden="true" className="relative h-11 w-[5.8rem] sm:h-[3.25rem] sm:w-[7rem]">
            <div className="absolute -inset-4 rounded-full bg-blue-300/10 blur-2xl" />
            <Image
                src="/jobbridge-bridge-logo-white.png"
                alt=""
                fill
                sizes="112px"
                className="object-contain object-left drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            />
        </div>
    );
}

function FillButton({
    href,
    children,
    variant,
    icon,
}: {
    href: string;
    children: ReactNode;
    variant: "primary" | "secondary";
    icon: ReactNode;
}) {
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const resetTimeoutRef = useRef<number | null>(null);

    const updateOrigin = (event: PointerEvent<HTMLAnchorElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
        updateOrigin(event);
        setIsPressed(true);

        if (resetTimeoutRef.current) {
            window.clearTimeout(resetTimeoutRef.current);
        }

        resetTimeoutRef.current = window.setTimeout(() => setIsPressed(false), 620);
    };

    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                window.clearTimeout(resetTimeoutRef.current);
            }
        };
    }, []);

    const style = {
        "--fill-x": `${origin.x}%`,
        "--fill-y": `${origin.y}%`,
    } as CSSProperties;
    const isPrimary = variant === "primary";
    const activeSurface = isPressed || isHovering;
    const contentClass = isPrimary
        ? activeSurface
            ? "text-white"
            : "text-[#02040b] group-hover:text-white"
        : activeSurface
          ? "text-[#02040b]"
          : "text-white group-hover:text-[#02040b]";

    return (
        <Link
            href={href}
            style={style}
            onFocus={() => setIsHovering(true)}
            onBlur={() => {
                setIsHovering(false);
                setIsPressed(false);
            }}
            onPointerEnter={(event) => {
                updateOrigin(event);
                setIsHovering(true);
            }}
            onPointerMove={updateOrigin}
            onPointerDown={handlePointerDown}
            onPointerUp={() => setIsPressed(false)}
            onPointerLeave={() => {
                setIsHovering(false);
                setIsPressed(false);
            }}
            className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[0.9rem] border px-5 text-[0.92rem] font-semibold tracking-[-0.01em] transition duration-500 ease-out active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040b] sm:min-h-[3.25rem] sm:px-6 sm:text-[0.98rem] ${
                isPrimary
                    ? `${
                          activeSurface
                              ? "border-blue-200/70 bg-blue-500 shadow-[0_22px_62px_rgba(37,99,235,0.32)]"
                              : "border-white bg-white shadow-[0_18px_54px_rgba(255,255,255,0.12)]"
                      } hover:border-blue-200/70 hover:bg-blue-500 hover:shadow-[0_22px_62px_rgba(37,99,235,0.32)]`
                    : `${
                          activeSurface
                              ? "border-white bg-white text-[#02040b]"
                              : "border-white/12 bg-[#171a22] text-white shadow-[0_16px_44px_rgba(0,0,0,0.22)]"
                      } hover:border-white hover:bg-white hover:text-[#02040b]`
            }`}
        >
            <span
                aria-hidden="true"
                className={`absolute aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 ${
                    activeSurface ? "scale-100" : "scale-0"
                } ${isPrimary ? "bg-blue-500" : "bg-white"}`}
                style={{ left: "var(--fill-x)", top: "var(--fill-y)" }}
            />
            <span
                aria-hidden="true"
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    isPrimary
                        ? "bg-[linear-gradient(135deg,rgba(147,197,253,0.26),transparent_58%)]"
                        : "bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_62%)]"
                }`}
            />
            <span className={`relative z-10 transition-colors duration-500 ${contentClass}`}>
                {icon}
            </span>
            <span className={`relative z-10 transition-colors duration-500 ${contentClass}`}>
                {children}
            </span>
        </Link>
    );
}

export function TrustNarrative() {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion() ?? false;
    const [hasRevealed, setHasRevealed] = useState(false);
    const isRevealed = reducedMotion || hasRevealed;
    const revealState = isRevealed ? "show" : "hidden";

    useEffect(() => {
        if (reducedMotion) {
            return;
        }

        const element = contentRef.current;
        if (!element) return;

        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
            const isComfortablyVisible = rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.2;

            if (isComfortablyVisible) {
                setHasRevealed(true);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setHasRevealed(true);
                }
            },
            { rootMargin: "0px 0px -14% 0px", threshold: 0.24 }
        );
        const frame = window.requestAnimationFrame(checkVisibility);

        observer.observe(element);
        window.addEventListener("scroll", checkVisibility, { passive: true });
        window.addEventListener("resize", checkVisibility);

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
        };
    }, [reducedMotion]);

    const revealVariants = {
        hidden: {
            opacity: 0,
            y: reducedMotion ? 0 : 22,
        },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: reducedMotion ? 0 : delay,
                duration: reducedMotion ? 0.01 : 0.92,
                ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            id="vertrauen"
            data-trust-narrative
            aria-label="Workfare Ablauf und Plattformprinzip"
            className="relative isolate min-h-[94svh] overflow-hidden bg-[#02040b] text-white"
        >
            <PixelShaderBackdrop />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#02040b] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0)_40%,rgba(2,4,11,0.22)_100%)]" />

            <div className="relative z-10 mx-auto flex min-h-[94svh] w-full max-w-[78rem] items-center px-5 py-16 sm:px-8 md:py-20 lg:px-10">
                <div className="relative w-full max-w-[49rem]">
                    <div ref={contentRef} className="relative z-10">
                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0}
                            className="will-change-transform"
                        >
                            <WorkfareMark />
                        </motion.div>

                        <motion.h2
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.13}
                            className="mt-14 max-w-[13.5ch] text-pretty text-[clamp(3rem,5.85vw,5.72rem)] font-semibold leading-[0.96] tracking-[-0.038em] text-[#707782] will-change-transform"
                        >
                            <span className="block text-white">Kleine Jobs.</span>
                            <span className="block">Klare Wege.</span>
                            <span className="block text-white">Direkt in deiner Nähe.</span>
                        </motion.h2>

                        <motion.p
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.27}
                            className="mt-7 max-w-[35rem] text-pretty text-[clamp(1.08rem,1.45vw,1.54rem)] font-medium leading-[1.28] tracking-[-0.02em] text-[#808792] will-change-transform"
                        >
                            <span className="text-white">Workfare zeigt, was gebraucht wird,</span>{" "}
                            <span>wer helfen kann und wie aus einer Anfrage ein fairer Job wird.</span>
                        </motion.p>

                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.41}
                            className="mt-7 flex flex-col gap-3 will-change-transform sm:flex-row sm:items-center"
                        >
                            <FillButton href="https://app.jobbridge.app" variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
                                Plattform öffnen
                            </FillButton>
                            <FillButton href="#fuer-wen" variant="secondary" icon={<ArrowDown className="h-4 w-4" />}>
                                Mehr verstehen
                            </FillButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
