import { InsightCard } from "@/components/insights/InsightCard";
import { latestInsights } from "@/content/insights";
import styles from "./InsightsIndex.module.css";

export function InsightsIndexPage() {
    return (
        <section id="neueste" className={styles.latest} aria-labelledby="latest-insights-heading">
            <div className={styles.sectionHeading}>
                <h2 id="latest-insights-heading">Neueste Einblicke</h2>
            </div>
            <div className={styles.articleGrid}>
                {latestInsights.map((insight) => (
                    <InsightCard key={insight.kind === "own" ? insight.slug : insight.id} insight={insight} headingLevel={3} />
                ))}
            </div>
        </section>
    );
}
