import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TeamOverviewSection } from "@/components/team/TeamOverviewSection";
import styles from "./AboutPage.module.css";

export function AboutPage() {
    return (
        <div>
            <section className={styles.intro} aria-labelledby="about-heading">
                <h2 id="about-heading">Die Menschen hinter Workfare.</h2>
                <p className={styles.introduction}>
                    Wir arbeiten daran, dass Jugendliche passende Jobs in ihrer Nähe finden.
                    Mit klaren Absprachen und Menschen, die erreichbar sind.
                </p>
            </section>

            <section className={styles.story} aria-labelledby="story-heading">
                <h2 id="story-heading">Eine Idee aus<br className={styles.desktopBreak} /> dem Alltag.</h2>
                <div className={styles.storyText}>
                    <p>
                        Der Ausgangspunkt ist einfach: Jugendliche möchten sich etwas dazuverdienen.
                        Familien und Nachbarn brauchen Unterstützung. Oft fehlt der passende Weg,
                        um zusammenzufinden.
                    </p>
                    <p>
                        Aus dieser Erfahrung hat Rezan Workfare entwickelt. Wir bringen die Idee
                        gemeinsam weiter: mit verständlichen Abläufen, einem Blick auf Sicherheit
                        und einem offenen Ohr für die Menschen, die die Plattform nutzen.
                    </p>
                </div>
            </section>

            <TeamOverviewSection />

            <aside className={styles.contact} aria-label="Kontakt zum Team">
                <div>
                    <h2>Mit uns ins Gespräch kommen.</h2>
                    <p>Für Fragen, Ideen oder eine Zusammenarbeit.</p>
                </div>
                <Link href="/kontakt" className={styles.contactLink}>
                    Kontakt aufnehmen
                    <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
            </aside>
        </div>
    );
}
