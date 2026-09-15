import { allInsights, getInsightAbsoluteUrl, getInsightAuthorName, getInsightSourceUrl, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { escapeXml } from "@/lib/xml";

export function GET() {
    const items = allInsights
        .map((insight) => {
            const href = getInsightAbsoluteUrl(insight);
            const guid = getInsightAbsoluteUrl(insight);
            const sourceLine =
                insight.kind === "external" ? ` Originalquelle: ${getInsightSourceUrl(insight)}` : "";
            const attribution = insight.kind === "external" ? `Externer Beitrag von ${insight.sourceName}. ` : "";

            return `<item>
  <title>${escapeXml(insight.title)}</title>
  <link>${escapeXml(href)}</link>
  <guid isPermaLink="true">${escapeXml(guid)}</guid>
  <pubDate>${new Date(insight.publishedAt).toUTCString()}</pubDate>
  <dc:creator>${escapeXml(getInsightAuthorName(insight))}</dc:creator>
  <category>${escapeXml(insight.kind === "external" ? "Externe Quelle" : "Eigener Beitrag")}</category>
  <category>${escapeXml(insight.category)}</category>
  <description>${escapeXml(`${attribution}${insight.excerpt}${sourceLine}`)}</description>
</item>`;
        })
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${siteConfig.name} ${insightsPage.label}`)}</title>
    <link>${escapeXml(`${siteConfig.url}${insightsPage.path}`)}</link>
    <atom:link href="${escapeXml(`${siteConfig.url}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(insightsPage.metaDescription)}</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>`,
        {
            headers: {
                "Content-Type": "application/rss+xml; charset=utf-8",
                "Cache-Control": "public, max-age=1800, stale-while-revalidate=86400",
            },
        },
    );
}
