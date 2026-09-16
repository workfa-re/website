"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ClosingPlatformCta } from "@/components/ui/ClosingPlatformCta";
import styles from "./FeatureSections.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const entrance: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.85, ease: EASE },
    }),
};
const titleEntrance: Variants = {
    hidden: { y: "105%" },
    visible: (delay: number) => ({
        y: "0%",
        transition: { delay, duration: 1, ease: EASE },
    }),
};

const audiences = [
    { start: "Du willst", emphasis: "helfen.", description: ["Für Jugendliche.", "Mit Eltern an ihrer Seite."] },
    { start: "Du brauchst", emphasis: "Hilfe.", description: ["Für Privatpersonen,", "Unternehmen und Vereine."] },
];
const principles = [
    { start: "Klare", emphasis: "Absprachen." },
    { start: "Eltern", emphasis: "einbeziehen." },
    { start: "Daten", emphasis: "bewusst teilen." },
];

export function FeatureSections() {
    const reducedMotion = useReducedMotion() ?? false;
    const reveal = reducedMotion ? undefined : entrance;
    const revealTitle = reducedMotion ? undefined : titleEntrance;

    return (
        <div className={styles.features}>
            <section id="fuer-wen" className={styles.audienceSection} aria-label="Für wen ist Workfare?">
                <h2 className="sr-only">Für alle, die helfen oder Hilfe suchen.</h2>
                <div className={styles.audienceComposition}>
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={audience.emphasis}
                            className={`${styles.audienceSide} ${index === 1 ? styles.helpSide : ""}`}
                            initial={reducedMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3 className={styles.audienceTitle}>
                                <span className={styles.lineMask}>
                                    <motion.span className={`${styles.reveal} ${styles.quiet}`} variants={revealTitle} custom={0}>{audience.start}</motion.span>
                                </span>
                                <span className={styles.lineMask}>
                                    <motion.span className={styles.reveal} variants={revealTitle} custom={0.1}>{audience.emphasis}</motion.span>
                                </span>
                            </h3>
                            <motion.p className={`${styles.audienceDescription} ${styles.reveal}`} variants={reveal} custom={0.2}>
                                {audience.description[0]}<br />{audience.description[1]}
                            </motion.p>
                        </motion.div>
                    ))}
                    <motion.div
                        className={styles.connection}
                        aria-hidden="true"
                        initial={reducedMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.span className={`${styles.connectionLine} ${styles.reveal}`} variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } } }} />
                        <motion.span className={`${styles.bridge} ${styles.reveal}`} variants={reveal} custom={0.15}>
                            <Image src="/jobbridge-bridge-logo-white.png" alt="" width={617} height={372} sizes="60px" />
                        </motion.span>
                    </motion.div>
                </div>
            </section>

            <motion.section
                id="sicherheit"
                className={styles.safetySection}
                aria-labelledby="safety-intro-title"
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.safetyComposition}>
                    <motion.h2 id="safety-intro-title" className={`${styles.safetyTitle} ${styles.reveal}`} variants={reveal} custom={0}>
                        Vertrauen fängt <span>vor dem Job an.</span>
                    </motion.h2>
                    <ul className={styles.principles} aria-label="Drei Grundsätze für einen guten Einstieg">
                        {principles.map((principle, index) => (
                            <motion.li key={principle.start} className={styles.reveal} variants={reveal} custom={0.15 + index * 0.1}>
                                <span>{principle.start}</span> {principle.emphasis}
                            </motion.li>
                        ))}
                    </ul>
                    <motion.div className={`${styles.safetyAction} ${styles.reveal}`} variants={reveal} custom={0.45}>
                        <Link href="/sicherheit" className={`glass-button ${styles.safetyLink}`}>
                            Mehr zur Sicherheit <ArrowUpRight size={17} aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                id="so-gehts"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
                className="relative isolate overflow-hidden border-t border-white/8 px-5 py-16 sm:px-8 md:py-20 lg:px-10"
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                <div className="mx-auto flex min-h-[20rem] max-w-[78rem] flex-col items-center justify-center text-center md:min-h-[25rem]">
                    <h2 className="mb-7 text-balance text-xl font-medium leading-snug tracking-[-0.025em] text-slate-300 md:mb-8 md:text-2xl">
                        Bereit für den ersten sicheren Job?
                    </h2>
                    <ClosingPlatformCta />
                </div>
            </motion.section>
            <noscript><style>{`.${styles.reveal}{opacity:1!important;transform:none!important}`}</style></noscript>
        </div>
    );
}
