import type { OwnInsight } from "@/content/insights";

const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

/** News entries expire from their original publication date, never their edit date. */
export function getRecentNewsArticles(articles: readonly OwnInsight[], now: number) {
    return articles.filter((article) => {
        const publishedAt = Date.parse(article.publishedAt);

        return (
            article.newsEligible === true &&
            Number.isFinite(publishedAt) &&
            publishedAt <= now &&
            now - publishedAt < NEWS_WINDOW_MS
        );
    });
}
