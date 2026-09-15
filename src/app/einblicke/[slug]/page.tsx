import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalInsightPage } from "@/components/insights/ExternalInsightPage";
import { InsightArticlePage } from "@/components/insights/InsightArticlePage";
import {
    allInsights,
    getInsightAbsoluteUrl,
    getInsightBySlug,
    getInsightCanonicalPath,
    getInsightSlug,
    getInsightSourceUrl,
    insightsPage,
    type ExternalInsight,
    type OwnInsight,
} from "@/content/insights";
import { getTeamMember } from "@/content/team";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

type InsightArticleRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return allInsights.map((insight) => ({ slug: getInsightSlug(insight) }));
}

function getOwnInsightMetadata(article: OwnInsight): Metadata {
    const author = getTeamMember(article.authorSlug);
    const path = getInsightCanonicalPath(article);
    const imageUrl = article.image?.src ?? "/og-image.png";

    return {
        title: article.title,
        description: article.description,
        authors: [
            {
                name: author?.displayName ?? siteConfig.name,
                url: author ? `${siteConfig.url}${author.profilePath}` : siteConfig.url,
            },
        ],
        alternates: {
            canonical: path,
            types: { "application/rss+xml": "/feed.xml" },
        },
        openGraph: {
            title: `${article.title} | ${siteConfig.name}`,
            description: article.description,
            url: path,
            type: "article",
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
            authors: author ? [author.displayName] : [siteConfig.name],
            tags: article.tags,
            images: [{ url: imageUrl, alt: article.image?.alt ?? article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${article.title} | ${siteConfig.name}`,
            description: article.description,
            images: [imageUrl],
        },
    };
}

function getExternalInsightMetadata(insight: ExternalInsight): Metadata {
    const path = getInsightCanonicalPath(insight);
    const imageUrl = insight.image?.src ?? "/og-image.png";

    return {
        title: insight.title,
        description: insight.excerpt,
        alternates: {
            canonical: path,
            types: { "application/rss+xml": "/feed.xml" },
        },
        openGraph: {
            title: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            url: path,
            // This is our source reference page, not the external publisher's article.
            type: "website",
            images: [{ url: imageUrl, alt: insight.image?.alt ?? insight.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            images: [imageUrl],
        },
    };
}

export async function generateMetadata({ params }: InsightArticleRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);

    if (!insight) {
        return {};
    }

    return insight.kind === "own" ? getOwnInsightMetadata(insight) : getExternalInsightMetadata(insight);
}

export default async function InsightArticleRoute({ params }: InsightArticleRouteProps) {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);

    if (!insight) {
        notFound();
    }

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Startseite", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: insightsPage.label, item: `${siteConfig.url}${insightsPage.path}` },
            { "@type": "ListItem", position: 3, name: insight.title, item: getInsightAbsoluteUrl(insight) },
        ],
    };

    if (insight.kind === "external") {
        const insightUrl = getInsightAbsoluteUrl(insight);
        const imageUrl = insight.image?.src ? new URL(insight.image.src, siteConfig.url).href : `${siteConfig.url}/og-image.png`;
        const externalJsonLd = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${insightUrl}#webpage`,
            url: insightUrl,
            name: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            inLanguage: "de-DE",
            isPartOf: {
                "@id": `${siteConfig.url}/#website`,
            },
            about: {
                "@type": "CreativeWork",
                name: insight.title,
                url: getInsightSourceUrl(insight),
                sameAs: insight.externalUrl,
                datePublished: insight.publishedAt,
                publisher: {
                    "@type": "Organization",
                    name: insight.sourceName,
                    url: insight.sourceUrl,
                },
                ...(insight.authorName
                    ? {
                          author: {
                              "@type": "Person",
                              name: insight.authorName,
                          },
                      }
                    : {}),
            },
            publisher: {
                "@id": `${siteConfig.url}/#organization`,
            },
            image: [imageUrl],
            keywords: insight.tags.join(", "),
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serializeJsonLd(externalJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbsJsonLd) }}
                />
                <ExternalInsightPage insight={insight} />
            </>
        );
    }

    const article = insight;
    const author = getTeamMember(article.authorSlug);
    const articleUrl = getInsightAbsoluteUrl(article);
    const articleImageUrl = article.image?.src ? new URL(article.image.src, siteConfig.url).href : undefined;

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        inLanguage: "de-DE",
        ...(articleImageUrl ? { image: [articleImageUrl] } : {}),
        author: {
            "@type": author ? "Person" : "Organization",
            "@id": author ? `${siteConfig.url}${author.profilePath}#person` : `${siteConfig.url}/#organization`,
            name: author?.displayName ?? siteConfig.name,
            url: author ? `${siteConfig.url}${author.profilePath}` : siteConfig.url,
        },
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        keywords: article.tags.join(", "),
        articleSection: article.category,
        isPartOf: { "@id": `${siteConfig.url}${insightsPage.path}#collection` },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbsJsonLd) }}
            />
            <InsightArticlePage article={article} />
        </>
    );
}
