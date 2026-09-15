import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import { InsightsIndexPage } from "@/components/insights/InsightsIndexPage";
import { latestInsights, getInsightAbsoluteUrl, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: insightsPage.label,
    description: insightsPage.metaDescription,
    alternates: {
        canonical: insightsPage.path,
        types: {
            "application/rss+xml": "/feed.xml",
        },
    },
    openGraph: {
        title: `${insightsPage.label} | ${siteConfig.name}`,
        description: insightsPage.metaDescription,
        url: insightsPage.path,
        type: "website",
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title: `${insightsPage.label} | ${siteConfig.name}`,
        description: insightsPage.metaDescription,
        images: [socialPreview.url],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${insightsPage.path}#collection`,
    url: `${siteConfig.url}${insightsPage.path}`,
    name: `${insightsPage.label} | ${siteConfig.name}`,
    description: insightsPage.metaDescription,
    inLanguage: "de-DE",
    isPartOf: {
        "@id": `${siteConfig.url}/#website`,
    },
    hasPart: latestInsights.map((insight) => ({
        "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
        name: insight.title,
        url: getInsightAbsoluteUrl(insight),
        datePublished: insight.publishedAt,
        sameAs: insight.kind === "external" ? insight.externalUrl : undefined,
    })),
};

export default function EinblickePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
            />
            <InsightsIndexPage />
        </>
    );
}
