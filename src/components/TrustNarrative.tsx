"use client";

import Image from "next/image";
import { type CSSProperties, type PointerEvent, type ReactNode, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";
import { siteConfig } from "@/config/site";
import styles from "./TrustNarrative.module.css";

export { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";

const revealVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    }),
};

function FillButton({ href, children, variant, icon }: {
    href: string;
    children: ReactNode;
    variant: "primary" | "secondary";
    icon: ReactNode;
}) {
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const updateOrigin = (event: PointerEvent<HTMLAnchorElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <a
            href={href}
            style={{ "--fill-x": `${origin.x}%`, "--fill-y": `${origin.y}%` } as CSSProperties}
            data-active={isPressed || isHovering || isFocused}
            data-variant={variant}
            onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) {
                    setOrigin({ x: 50, y: 50 });
                    setIsFocused(true);
                }
            }}
            onBlur={() => { setIsFocused(false); setIsPressed(false); }}
            onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                    updateOrigin(event);
                    setIsHovering(true);
                }
            }}
            onPointerMove={(event) => {
                if (event.pointerType === "mouse") updateOrigin(event);
            }}
            onPointerDown={(event) => { updateOrigin(event); setIsPressed(true); }}
            onPointerUp={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            onPointerLeave={() => { setIsHovering(false); setIsPressed(false); }}
            className={`glass-button ${variant === "primary" ? "glass-button-primary" : ""} ${styles.fillButton}`}
        >
            <span aria-hidden="true" className={styles.fillWave} />
            <span aria-hidden="true" className={styles.buttonIcon}>{icon}</span>
            <span className={styles.buttonLabel}>{children}</span>
        </a>
    );
}

export function TrustNarrative() {
    const reducedMotion = useReducedMotion() ?? false;

    return (
        <section id="vertrauen" data-trust-narrative aria-label="Workfare Ablauf und Plattformprinzip" className={styles.section}>
            <PixelShaderBackdrop />
            <div aria-hidden="true" className={styles.shade} />
            <motion.div
                className={styles.layout}
                initial={reducedMotion ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.headlineGroup}>
                    <motion.div className={`${styles.mark} ${styles.reveal}`} variants={reducedMotion ? undefined : revealVariants} custom={0} aria-hidden="true">
                        <Image src="/jobbridge-bridge-logo-white.png" alt="" fill sizes="96px" className={styles.markImage} />
                    </motion.div>
                    <motion.h2 className={`${styles.title} ${styles.reveal}`} variants={reducedMotion ? undefined : revealVariants} custom={0.12}>
                        <span>Kleine Jobs.</span>
                        <span className={styles.mutedTitle}>Klare Wege.</span>
                        <span>Direkt in deiner Nähe.</span>
                    </motion.h2>
                </div>
                <div className={styles.details}>
                    <motion.p className={`${styles.description} ${styles.reveal}`} variants={reducedMotion ? undefined : revealVariants} custom={0.24}>
                        <span>Workfare zeigt, was gebraucht wird,</span>{" "}
                        wer helfen kann und wie aus einer Anfrage ein fairer Job wird.
                    </motion.p>
                    <motion.div className={`${styles.actions} ${styles.reveal}`} variants={reducedMotion ? undefined : revealVariants} custom={0.36}>
                        <FillButton href={siteConfig.appUrl} variant="primary" icon={<ArrowUpRight size={18} />}>
                            Plattform öffnen
                        </FillButton>
                        <FillButton href="#fuer-wen" variant="secondary" icon={<ArrowDown size={18} />}>
                            Mehr verstehen
                        </FillButton>
                    </motion.div>
                </div>
            </motion.div>
            <noscript><style>{`.${styles.reveal}{opacity:1!important;transform:none!important}`}</style></noscript>
        </section>
    );
}
