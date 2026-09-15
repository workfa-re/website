import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import styles from "@/components/insights/InsightsIndex.module.css";
import { InsightCard } from "@/components/insights/InsightCard";
import { allInsights, getInsightAbsoluteUrl, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: "Alle Einblicke",
    description:
        "Alle Workfare-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Hintergründe zur Plattform.",
    alternates: {
        canonical: `${insightsPage.path}/alle`,
    },
    openGraph: {
        title: `Alle Einblicke | ${siteConfig.name}`,
        description:
            "Alle Workfare-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Hintergründe zur Plattform.",
        url: `${insightsPage.path}/alle`,
        type: "website",
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title: `Alle Einblicke | ${siteConfig.name}`,
        description:
            "Alle Workfare-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Hintergründe zur Plattform.",
        images: [socialPreview.url],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${insightsPage.path}/alle#collection`,
    url: `${siteConfig.url}${insightsPage.path}/alle`,
    name: `Alle Einblicke | ${siteConfig.name}`,
    description: metadata.description,
    inLanguage: "de-DE",
    hasPart: allInsights.map((insight) => ({
        "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
        name: insight.title,
        url: getInsightAbsoluteUrl(insight),
        datePublished: insight.publishedAt,
        sameAs: insight.kind === "external" ? insight.externalUrl : undefined,
    })),
};

export default function AllInsightsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
            />
            <section className={styles.latest} aria-labelledby="all-insights-heading">
                <div className={styles.sectionHeading}>
                    <h2 id="all-insights-heading">Alle Beiträge</h2>
                </div>
                <div className={styles.articleGrid}>
                    {allInsights.map((insight) => (
                        <InsightCard key={insight.kind === "own" ? insight.slug : insight.id} insight={insight} headingLevel={3} />
                    ))}
                </div>
            </section>
        </>
    );
}
