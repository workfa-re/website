"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, ArrowUpRight, Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, Clock3, Euro, ListFilter, MapPin, PawPrint, Repeat2, Settings, Shovel, Smartphone, Sprout } from "lucide-react";
import styles from "./PlatformPreview.module.css";
import { useWebsiteTheme } from "@/components/providers/WebsiteThemeProvider";
import { platformDemoEnabled } from "@/config/platform-demo";

const platformFont = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

// A deliberate visual snapshot of the platform home. No session, API or account data.
const jobs = [
    { title: "Den Garten gemeinsam fit machen", category: "Gartenarbeit", icon: Shovel, recurring: true, description: "Wir sammeln Laub, jäten ein kleines Beet und gießen die Pflanzen. Handschuhe und Werkzeug liegen bereit.", price: "15 € / Std.", distance: "0,8 km entfernt", author: "Robin", initial: "R" },
    { title: "Das neue Smartphone gemeinsam einrichten", category: "IT-Hilfe", icon: Smartphone, recurring: false, description: "Kontakte übertragen, die Kamera ausprobieren und wichtige Einstellungen erklären – ganz in Ruhe und Schritt für Schritt.", price: "18 € / Std.", distance: "1,2 km entfernt", author: "Sam", initial: "S" },
    { title: "Eine entspannte Runde mit unserem Hund", category: "Haustierbetreuung", icon: PawPrint, recurring: false, description: "Unser ruhiger Hund freut sich über einen Spaziergang durch das Viertel. Beim ersten Treffen gehen wir gemeinsam.", price: "12 € / Std.", distance: "0,6 km entfernt", author: "Robin", initial: "R" },
    { title: "Pflanzen während der Ferien versorgen", category: "Gartenarbeit", icon: Sprout, recurring: false, description: "Einmal täglich die Balkonpflanzen gießen und kurz nach dem Rechten sehen. Alles Weitere besprechen wir gemeinsam.", price: "14 € / Std.", distance: "1,5 km entfernt", author: "Sam", initial: "S" },
];

const cardEntrance: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(5px)" },
    visible: (index: number) => ({ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.72, delay: (index % 2) * 0.14, ease: [0.22, 1, 0.36, 1] } }),
};

export function HeroScrollDemo() {
    const reducedMotion = useReducedMotion();
    const { theme } = useWebsiteTheme();

    return (
        <section id="how-it-works" aria-label="Ein Blick in die Workfare Plattform" className={styles.section}>
            <div className={styles.presentation}>
                <div data-theme={theme} className={`${styles.screen} ${platformFont.className}`}>
                    <div className={styles.chrome} aria-hidden="true">
                        <div className={`${styles.pill} ${styles.brand}`}>
                            <span className={styles.bridge}><Image src={theme === "dark" ? "/workfare-platform-mark-dark.png" : "/workfare-platform-mark.png"} alt="" width={40} height={40} /></span>
                            <span className={styles.brandName}>Workfare<small>Musterstadt</small></span>
                        </div>
                        <div className={`${styles.pill} ${styles.navigation}`}>
                            <span className={styles.selectedNav}><BriefcaseBusiness size={18} /><span>Jobs</span></span>
                            <span><Activity size={19} /></span>
                            <span><Settings size={19} /></span>
                        </div>
                        <div className={styles.account}>
                            <span className={`${styles.pill} ${styles.notification}`}><Bell size={19} /><i /></span>
                            <span className={`${styles.pill} ${styles.profile}`}>
                                <span className={styles.avatar}>M</span>
                                <span className={styles.profileName}>Mila<small><BriefcaseBusiness size={11} /> Jobsuchend</small></span>
                                <ChevronDown size={13} className={styles.chevron} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.intro}>
                            <h2>Finde deinen Job</h2>
                            <p>Hier findest du aktuelle Taschengeldjobs in deiner Nähe.</p>
                        </div>
                        <div className={styles.toolbar} aria-hidden="true">
                            <div className={styles.tabs}>
                                <span className={styles.selectedTab}><BriefcaseBusiness size={14} /> Aktuell <b>4</b></span>
                                <span><Clock3 size={14} /> Warteliste <b>1</b></span>
                                <span><CheckCircle2 size={14} /> Beworben <b>3</b></span>
                            </div>
                            <span className={styles.filter}><ListFilter size={17} /><span>Filter</span></span>
                        </div>
                        <h3 className={styles.listTitle}>Lokale Angebote <span>4</span></h3>
                        <div className={styles.jobs}>
                            {jobs.map((job, index) => (
                                <motion.article key={job.title} className={styles.card} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reducedMotion ? {} : cardEntrance}>
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
                            ))}
                        </div>
                    </div>
                    <div className={styles.fade} aria-hidden="true" />
                </div>
                <div className={styles.caption}>
                    <span>Einblicke mit Beispieldaten</span>
                    {platformDemoEnabled && <Link href="/demo" prefetch={false} className={styles.demoLink}>
                        Live-Demo <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>}
                </div>
            </div>
            <noscript><style>{`.${styles.card}{opacity:1!important;transform:none!important;filter:none!important}`}</style></noscript>
        </section>
    );
}
