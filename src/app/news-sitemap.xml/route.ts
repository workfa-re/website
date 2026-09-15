import { getInsightPath, ownInsights } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { getRecentNewsArticles } from "@/lib/news-sitemap";
import { escapeXml } from "@/lib/xml";

export const dynamic = "force-dynamic";

export function GET() {
    const articles = getRecentNewsArticles(ownInsights, Date.now());

    const urls = articles
        .map(
            (article) => `<url>
  <loc>${escapeXml(`${siteConfig.url}${getInsightPath(article)}`)}</loc>
  <news:news>
    <news:publication>
      <news:name>${escapeXml(siteConfig.name)}</news:name>
      <news:language>de</news:language>
    </news:publication>
    <news:publication_date>${escapeXml(article.publishedAt)}</news:publication_date>
    <news:title>${escapeXml(article.title)}</news:title>
  </news:news>
</url>`,
        )
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`,
        {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                // Recalculate the rolling news window for each request, including quiet publishing periods.
                "Cache-Control": "no-store",
            },
        },
    );
}
