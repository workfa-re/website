import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allInsights, getInsightPath } from "@/content/insights";
import { teamMembers } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    // Omit lastmod where no editorial modification date is recorded. A build date
    // or the original date of an external source is not this page's update date.
    const staticRoutes = [
        {
            url: baseUrl,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/plattform`,
            changeFrequency: "monthly",
            priority: 0.75,
        },
        {
            url: `${baseUrl}/impressum`,
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${baseUrl}/datenschutz`,
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${baseUrl}/sicherheit`,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/demnaechst`,
            changeFrequency: "monthly",
            priority: 0.1,
        },
        {
            url: `${baseUrl}/einblicke`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/einblicke/alle`,
            changeFrequency: "weekly",
            priority: 0.58,
        },
        {
            url: `${baseUrl}/einblicke/ueber-uns`,
            changeFrequency: "monthly",
            priority: 0.54,
        },
        {
            url: `${baseUrl}/kontakt`,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ] satisfies MetadataRoute.Sitemap;

    const insightRoutes = allInsights.map((insight) => ({
        url: `${baseUrl}${getInsightPath(insight)}`,
        ...(insight.kind === "own" ? { lastModified: new Date(insight.updatedAt) } : {}),
        changeFrequency: "monthly" as const,
        priority: "featured" in insight && insight.featured ? 0.72 : 0.55,
    }));

    const teamRoutes = teamMembers.map((member) => ({
        url: `${baseUrl}${member.profilePath}`,
        changeFrequency: "monthly" as const,
        priority: 0.45,
    }));

    return [...staticRoutes, ...insightRoutes, ...teamRoutes];
}
