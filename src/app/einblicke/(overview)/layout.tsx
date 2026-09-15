import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";
import { InsightsNavigation, InsightsPanel } from "@/components/insights/InsightsNavigation";
import { siteConfig } from "@/config/site";
import styles from "@/components/insights/InsightsIndex.module.css";

export default function InsightsOverviewLayout({ children }: { children: ReactNode }) {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <SiteHeader />
                <header className={styles.hero}>
                    <div className={styles.heroBackdrop} aria-hidden="true">
                        <PixelShaderBackdrop variant="quiet" />
                    </div>
                    <div className={styles.heroGrid}>
                        <h1>Einblicke in <span>Workfare.</span></h1>
                        <div className={styles.heroIntro}>
                            <p>Wie Workfare entsteht, was sich auf der Plattform tut und was andere darüber berichten.</p>
                            <a href={`mailto:${siteConfig.pressEmail}`} className={styles.textLink}>
                                Kontakt für Presseanfragen <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <InsightsNavigation />
                </header>
                <InsightsPanel>{children}</InsightsPanel>
            </div>
            <Footer showChat={false} />
        </main>
    );
}
