import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SafetyPage.module.css";

const principles = [
    {
        title: "Klare Absprachen.",
        description: "Eine verständliche Aufgabe, ein vereinbarter Zeitrahmen und eine klare Vergütung. So wissen beide Seiten, worauf sie sich einlassen.",
    },
    {
        title: "Eltern einbeziehen.",
        description: "Gerade bei den ersten Jobs hilft eine zweite Perspektive. Besprecht neue Aufgaben und Kontakte gemeinsam, bevor es losgeht.",
    },
    {
        title: "Daten bewusst teilen.",
        description: "Teile nur, was für den Job nötig ist. Passwörter, Zugangscodes und private Unterlagen gehören nicht in eine Jobabsprache.",
    },
] as const;

const preparations = [
    {
        title: "Die Aufgabe verstehen",
        description: "Was ist zu tun, wo findet der Job statt und wie lange dauert er? Frag nach, wenn die Beschreibung unklar ist oder du dir die Aufgabe nicht zutraust.",
    },
    {
        title: "Die Details festhalten",
        description: "Klärt Zeitpunkt, Vergütung und Ansprechperson vorab. Haltet eure Absprachen schriftlich fest, damit ihr später nachsehen könnt.",
    },
    {
        title: "Jemanden einbeziehen",
        description: "Besprich als Jugendlicher den Job mit deinen Eltern oder einer vertrauten erwachsenen Person. Sie sollte wissen, wo du bist und wie sie dich erreicht.",
    },
    {
        title: "Bedenken ernst nehmen",
        description: "Wenn etwas anders ist als vereinbart oder du dich unter Druck gesetzt fühlst, halte inne. Sprich mit einer vertrauten Person und melde problematische Kontakte.",
    },
] as const;

export function SafetyPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <SiteHeader />

                <header className={styles.hero}>
                    <div className={styles.heroBackdrop} aria-hidden="true">
                        <PixelShaderBackdrop variant="quiet" />
                    </div>
                    <div className={styles.heroTitle}>
                        <h1>Sicherheit bei <span>Workfare.</span></h1>
                    </div>
                    <div className={styles.heroIntro}>
                        <p>Ein guter Job beginnt mit klaren Absprachen. Hier findest du Orientierung für Jugendliche, Eltern und Auftraggeber – und Hilfe, wenn etwas nicht passt.</p>
                        <a href="#hilfe" className={styles.textLink}>
                            Hilfe bei einem Problem <ArrowDown size={16} aria-hidden="true" />
                        </a>
                    </div>
                </header>

                <section aria-label="Grundlagen für einen guten Einstieg">
                    <ul className={styles.principles}>
                        {principles.map((principle, index) => (
                            <li
                                key={principle.title}
                                className={`${styles.contentPanel} ${styles.principle}`}
                                style={{ "--entrance-delay": `${100 + index * 90}ms` } as CSSProperties}
                            >
                                <h2>{principle.title}</h2>
                                <p>{principle.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.preparation} aria-labelledby="preparation-heading">
                    <div className={styles.sectionIntro}>
                        <h2 id="preparation-heading">Bevor es<br className={styles.desktopBreak} /> losgeht.</h2>
                        <p>Vier Dinge, die du vor einem Job in Ruhe klären solltest.</p>
                        <a href="#hilfe" className={styles.textLink}>
                            Noch etwas unklar? <ArrowDown size={16} aria-hidden="true" />
                        </a>
                    </div>
                    <ol className={styles.steps}>
                        {preparations.map((step, index) => (
                            <li key={step.title} className={styles.step}>
                                <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section id="hilfe" className={styles.help} aria-labelledby="help-heading">
                    <div className={styles.helpIntro}>
                        <div>
                            <h2 id="help-heading">Etwas stimmt nicht?</h2>
                            <p>Auf unserer Kontaktseite findest du die richtige Ansprechperson für dein Anliegen.</p>
                        </div>
                        <Link href="/kontakt" className={`glass-button ${styles.contactButton}`}>
                            Zur Kontaktseite <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </div>
            <Footer showChat={false} />
        </main>
    );
}
