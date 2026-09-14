"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ClosingPlatformCta } from "@/components/ui/ClosingPlatformCta";

const EASE = [0.16, 1, 0.3, 1] as const;
const SECTION_TITLE = "text-balance text-[clamp(3rem,5.85vw,5.72rem)] font-semibold leading-[0.98] tracking-[-0.038em] text-white";

const audienceItems = [
    {
        title: "Jugendliche & Eltern",
        description: "Erste Jobs finden. Gemeinsam den Überblick behalten.",
    },
    {
        title: "Private Auftraggeber",
        description: "Hilfe für kleine Aufgaben im Alltag.",
    },
    {
        title: "Gewerbliche Auftraggeber",
        description: "Unterstützung für Laden, Praxis und lokales Team.",
    },
    {
        title: "Vereine & Organisationen",
        description: "Gemeinsam anpacken – im Verein und bei Veranstaltungen.",
    },
];

const safetySlides = [
    {
        title: "Moderierter Zugang",
        description: "Workfare ist als digitale Taschengeldbörse für Jugendliche ab 14 gedacht: mit einem geführten Einstieg und klaren Rollen für Jugendliche, Eltern und Auftraggeber.",
    },
    {
        title: "Wenige Daten",
        description: "Sensible Informationen sollen nicht unnötig sichtbar werden. Erst wenn ein Job wirklich relevant wird, entstehen die nächsten Schritte.",
    },
    {
        title: "Eltern im Blick",
        description: "Eltern sollen nachvollziehen können, wo ihr Kind arbeitet und mit wem Kontakt entsteht, ohne jeden kleinen Schritt künstlich zu verkomplizieren.",
    },
    {
        title: "Auffälliges prüfen",
        description: "Wenn Profile, Nachrichten oder Abläufe nicht plausibel wirken, soll das System nicht wegsehen. Auffällige Vorgänge werden markiert und überprüfbar.",
    },
];

export function FeatureSections() {
    const reducedMotion = useReducedMotion() ?? false;
    const [activeSafetyIndex, setActiveSafetyIndex] = useState(0);
    const activeSafetyNumber = String(activeSafetyIndex + 1).padStart(2, "0");
    const moveSafety = (direction: number) => {
        setActiveSafetyIndex((index) => (index + direction + safetySlides.length) % safetySlides.length);
    };

    return (
        <div className="relative z-10 w-full bg-neutral-950">
            <section id="fuer-wen" className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
                <div className="mx-auto max-w-[78rem]">
                    <h2 className={SECTION_TITLE}>Für wen?</h2>
                    <motion.div
                        initial={reducedMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}
                        className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 xl:grid-cols-4"
                    >
                        {audienceItems.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={{
                                    hidden: { opacity: 0, y: 14 },
                                    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.55, ease: EASE } },
                                }}
                                className="rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)_65%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(255,255,255,0.055)] sm:p-7 xl:p-6"
                            >
                                <h3 className="text-balance text-[1.45rem] font-medium leading-[1.15] tracking-[-0.025em] text-white sm:text-2xl">
                                    {item.title}
                                </h3>
                                <p className="mt-4 max-w-[30ch] text-pretty text-base leading-7 text-slate-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section id="sicherheit" className="relative border-t border-white/8 px-5 py-20 sm:px-8 md:py-28 lg:px-10">
                <div className="mx-auto max-w-[78rem]">
                    <h2 className={`${SECTION_TITLE} max-w-[12ch]`}>
                        Wie Sicherheit <span className="text-slate-500">entsteht.</span>
                    </h2>

                    <div className="mt-10 rounded-[1.5rem] bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:p-8 md:mt-12 md:rounded-[2rem] lg:p-10">
                        <p className="text-xs tabular-nums text-slate-500"><span className="text-slate-300">{activeSafetyNumber}</span> / 04</p>
                        <div id="safety-panel" aria-live="polite" aria-atomic="true" className="mt-7 grid sm:mt-8">
                            {/* Shared grid cell keeps the height of the longest slide without clipping enlarged text. */}
                            {safetySlides.map((slide, index) => {
                                const selected = activeSafetyIndex === index;
                                return (
                                    <motion.div
                                        key={slide.title}
                                        aria-hidden={!selected}
                                        initial={false}
                                        animate={{ opacity: selected ? 1 : 0 }}
                                        transition={{ duration: reducedMotion ? 0 : 0.22, ease: EASE }}
                                        className={`col-start-1 row-start-1 grid content-start gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 ${selected ? "" : "pointer-events-none select-none"}`}
                                    >
                                        <h3 className="text-balance text-[clamp(1.7rem,3.2vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                                            {slide.title}
                                        </h3>
                                        <p className="max-w-[34rem] text-pretty text-base leading-7 text-slate-400 md:text-[1.0625rem] md:leading-8">
                                            {slide.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/8 pt-5 sm:mt-9">
                            <div aria-hidden="true" className="flex gap-1.5">
                                {safetySlides.map((slide, index) => (
                                    <span key={slide.title} className={`h-0.5 w-6 rounded-full transition-colors duration-200 motion-reduce:transition-none sm:w-8 ${activeSafetyIndex === index ? "bg-white/80" : "bg-white/15"}`} />
                                ))}
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button type="button" aria-label="Vorheriger Sicherheitsaspekt" aria-controls="safety-panel" onClick={() => moveSafety(-1)} className="glass-control grid h-11 w-11 place-items-center">
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button type="button" aria-label="Nächster Sicherheitsaspekt" aria-controls="safety-panel" onClick={() => moveSafety(1)} className="glass-control grid h-11 w-11 place-items-center">
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link href="/sicherheit" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 motion-reduce:transition-none">
                        Mehr zur Sicherheit <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <motion.section
                id="so-gehts"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
                className="relative isolate overflow-hidden border-t border-white/8 px-5 py-16 sm:px-8 md:py-20"
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                <div className="mx-auto flex min-h-[20rem] max-w-[78rem] flex-col items-center justify-center text-center md:min-h-[25rem]">
                    <h2 className="mb-7 text-balance text-xl font-medium leading-snug tracking-[-0.025em] text-slate-300 md:mb-8 md:text-2xl">
                        Bereit für den ersten sicheren Job?
                    </h2>
                    <ClosingPlatformCta />
                </div>
            </motion.section>
        </div>
    );
}
