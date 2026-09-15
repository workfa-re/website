"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, ArrowUpRight, Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, Clock3, Euro, ListFilter, MapPin, PawPrint, Repeat2, Settings, Shovel, Smartphone, Sprout } from "lucide-react";
import styles from "./PlatformPreview.module.css";
import { useWebsiteTheme } from "@/components/providers/WebsiteThemeProvider";

const platformFont = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

// A deliberate visual snapshot of the platform home. No session, API or account data.
const jobs = [
    { title: "Den Garten gemeinsam fit machen", category: "Gartenarbeit", icon: Shovel, recurring: true, description: "Wir sammeln Laub, jäten ein kleines Beet und gießen die Pflanzen. Handschuhe und Werkzeug liegen bereit.", price: "15 € / Std.", distance: "0,8 km entfernt", author: "Robin", initial: "R" },
    { title: "Das neue Smartphone gemeinsam einrichten", category: "IT-Hilfe", icon: Smartphone, recurring: false, description: "Kontakte übertragen, die Kamera ausprobieren und wichtige Einstellungen erklären – ganz in Ruhe und Schritt für Schritt.", price: "18 € / Std.", distance: "1,2 km entfernt", author: "Sam", initial: "S" },
    { title: "Eine entspannte Runde mit unserem Hund", category: "Haustierbetreuung", icon: PawPrint, recurring: false, description: "Unser ruhiger Hund freut sich über einen Spaziergang durch das Viertel. Beim ersten Treffen gehen wir gemeinsam.", price: "12 € / Std.", distance: "0,6 km entfernt", author: "Robin", initial: "R" },
    { title: "Pflanzen während der Ferien versorgen", category: "Gartenarbeit", icon: Sprout, recurring: false, description: "Einmal täglich die Balkonpflanzen gießen und kurz nach dem Rechten sehen. Alles Weitere besprechen wir gemeinsam.", price: "14 € / Std.", distance: "1,5 km entfernt", author: "Sam", initial: "S" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_PACE = 1.25;
const enterDelay = (seconds: number) => ({ "--enter-delay": `${seconds * REVEAL_PACE}s` }) as CSSProperties;
type CardTiming = { index: number; enteredAt: number | null };
const cardEntrance: Variants = {
    hidden: { opacity: 0, y: 56, scale: 0.955, rotateX: 6, filter: "blur(4px)" },
    visible: ({ index, enteredAt }: CardTiming) => ({
        opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)",
        transition: {
            duration: 1.08 * REVEAL_PACE,
            // Keep the first cards behind the chrome; later cards enter as they scroll into view.
            delay: Math.max(0, enteredAt === null ? 0 : (enteredAt + 1200 * REVEAL_PACE - performance.now()) / 1000) + (index % 2) * 0.18 * REVEAL_PACE,
            ease: EASE,
        },
    }),
};

function PreviewJob({ job, index, enteredAt, reducedMotion }: {
    job: typeof jobs[number]; index: number; enteredAt: number | null; reducedMotion: boolean;
}) {
    return (
        <motion.article
            className={styles.card}
            data-preview-card
            custom={{ index, enteredAt }}
            initial={reducedMotion ? false : "hidden"}
            whileInView={enteredAt === null && !reducedMotion ? "hidden" : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            variants={reducedMotion ? undefined : cardEntrance}
        >
            <h4>{job.title}</h4>
            <div className={styles.meta}>
                <span className={styles.category}><job.icon size={12} />{job.category}</span>
                {job.recurring && <span className={styles.recurring}><Repeat2 size={13} /> Regelmäßig</span>}
                <span className={styles.provider}>Privater Auftraggeber</span>
            </div>
            <p>{job.description}</p>
            <div className={styles.cardFooter}>
                <span><Euro size={16} /><strong>{job.price}</strong></span>
                <span><MapPin size={16} />{job.distance}</span>
            </div>
            <div className={styles.byline}><Clock3 size={12} /> Heute <span className={styles.miniAvatar}>{job.initial}</span> {job.author}</div>
        </motion.article>
    );
}

export function HeroScrollDemo() {
    const reducedMotion = useReducedMotion() ?? false;
    const { theme } = useWebsiteTheme();
    const [enteredAt, setEnteredAt] = useState<number | null>(null);

    return (
        <section id="how-it-works" aria-label="Ein Blick in die Workfare Plattform" className={styles.section}>
            <div className={styles.presentation} style={{ "--reveal-pace": REVEAL_PACE } as CSSProperties} data-motion={reducedMotion ? "off" : "on"} data-entered={enteredAt !== null ? "true" : undefined}>
                <motion.div
                    data-theme={theme}
                    data-preview-screen
                    className={`${styles.screen} ${platformFont.className}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 68, scale: 0.97, rotateX: 4 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    onViewportEnter={() => {
                        const now = performance.now();
                        setEnteredAt((previous) => previous ?? now);
                    }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: reducedMotion ? 0 : 1.15 * REVEAL_PACE, ease: EASE }}
                >
                    <span aria-hidden="true" className={styles.edgeLight} />
                    <div className={styles.chrome} aria-hidden="true">
                        <div className={`${styles.pill} ${styles.brand} ${styles.chromeReveal}`} style={enterDelay(0.08)}>
                            <span className={styles.bridge}><Image src={theme === "dark" ? "/workfare-platform-mark-dark.png" : "/workfare-platform-mark.png"} alt="" width={40} height={40} /></span>
                            <span className={styles.brandName}><span className={styles.wordmark}>Workfare</span><small className={styles.reveal} style={enterDelay(0.64)}>Musterstadt</small></span>
                        </div>
                        <div className={`${styles.pill} ${styles.navigation} ${styles.chromeReveal}`} style={enterDelay(0.3)}>
                            <span className={`${styles.selectedNav} ${styles.reveal}`} style={enterDelay(0.44)}><BriefcaseBusiness size={18} /><span>Jobs</span></span>
                            <span className={styles.reveal} style={enterDelay(0.54)}><Activity size={19} /></span>
                            <span className={styles.reveal} style={enterDelay(0.64)}><Settings size={19} /></span>
                        </div>
                        <div className={styles.account}>
                            <span className={`${styles.pill} ${styles.notification} ${styles.chromeReveal}`} style={enterDelay(0.46)}><Bell size={19} /><i /></span>
                            <span className={`${styles.pill} ${styles.profile} ${styles.chromeReveal}`} style={enterDelay(0.56)}>
                                <span className={styles.avatar}>M</span>
                                <span className={styles.profileName}>Mila<small><BriefcaseBusiness size={11} /> Jobsuchend</small></span>
                                <ChevronDown size={13} className={styles.chevron} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.intro}>
                            <h2 className={styles.reveal} style={enterDelay(0.48)}>Finde deinen Job</h2>
                            <p className={styles.reveal} style={enterDelay(0.6)}>Hier findest du aktuelle Taschengeldjobs in deiner Nähe.</p>
                        </div>
                        <div className={styles.toolbar} aria-hidden="true">
                            <div className={`${styles.tabs} ${styles.chromeReveal}`} style={enterDelay(0.7)}>
                                <span className={`${styles.selectedTab} ${styles.reveal}`} style={enterDelay(0.78)}><BriefcaseBusiness size={14} /> Aktuell <b>4</b></span>
                                <span className={styles.reveal} style={enterDelay(0.88)}><Clock3 size={14} /> Warteliste <b>1</b></span>
                                <span className={styles.reveal} style={enterDelay(0.98)}><CheckCircle2 size={14} /> Beworben <b>3</b></span>
                            </div>
                            <span className={`${styles.filter} ${styles.chromeReveal}`} style={enterDelay(0.9)}><ListFilter size={17} /><span>Filter</span></span>
                        </div>
                        <h3 className={`${styles.listTitle} ${styles.reveal}`} style={enterDelay(0.92)}>Lokale Angebote <span>4</span></h3>
                        <div className={styles.jobs}>
                            {jobs.map((job, index) => (
                                <PreviewJob key={job.title} job={job} index={index} enteredAt={enteredAt} reducedMotion={reducedMotion} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.fade} aria-hidden="true" />
                </motion.div>
                <div className={styles.caption}>
                    <span>Einblicke mit Beispieldaten</span>
                    <Link href="/demo" prefetch={false} className={styles.demoLink}>
                        Live-Demo <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
            <noscript><style>{`.${styles.screen},.${styles.card}{transform:none!important}.${styles.screen},.${styles.card},.${styles.reveal},.${styles.chromeReveal},.${styles.wordmark}{opacity:1!important;translate:none!important;scale:none!important;filter:none!important;clip-path:none!important;animation:none!important}`}</style></noscript>
        </section>
    );
}
