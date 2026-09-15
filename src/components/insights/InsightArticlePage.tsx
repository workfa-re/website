import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import { formatInsightDate, type OwnInsight } from "@/content/insights";
import { getTeamMember } from "@/content/team";
import styles from "./ArticlePage.module.css";

type InsightArticlePageProps = {
    article: OwnInsight;
};

export function InsightArticlePage({ article }: InsightArticlePageProps) {
    const author = getTeamMember(article.authorSlug);

    return (
        <main className={styles.page}>
            <div className={styles.shell}>
                <SiteHeader />

                <article className={styles.article}>
                    <Link href="/einblicke" className={styles.backLink}>
                        <ArrowLeft size={16} aria-hidden="true" />
                        Einblicke
                    </Link>

                    <header className={styles.header} data-has-image={Boolean(article.image)}>
                        <div className={styles.headingGroup}>
                            <h1 className={styles.title}>{article.title}</h1>
                            <p className={styles.introduction}>{article.heroLine}</p>

                            <div className={styles.byline}>
                                {author ? (
                                    <Link href={author.profilePath} className={styles.authorLink}>
                                        {author.displayName}
                                    </Link>
                                ) : (
                                    <span>{siteConfig.name}</span>
                                )}
                                <span className={styles.metaDetails}>
                                    <time dateTime={article.publishedAt}>{formatInsightDate(article.publishedAt)}</time>
                                    <span className={styles.dot} aria-hidden="true" />
                                    <span>{article.readingTime} Lesezeit</span>
                                </span>
                            </div>
                            {article.updatedAt !== article.publishedAt ? (
                                <p className={styles.updatedAt}>
                                    Aktualisiert am <time dateTime={article.updatedAt}>{formatInsightDate(article.updatedAt)}</time>
                                </p>
                            ) : null}
                        </div>

                        {article.image ? (
                            <figure className={styles.figure}>
                                <Image
                                    src={article.image.src}
                                    alt={article.image.alt}
                                    fill
                                    priority
                                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                                    className={styles.image}
                                    style={{ objectPosition: article.image.position ?? "center" }}
                                />
                            </figure>
                        ) : null}
                    </header>

                    <div className={styles.readingSection}>
                        {article.editorialNote ? <p className={styles.editorialNote}>{article.editorialNote}</p> : null}
                        <div className={styles.prose}>
                            {article.body.map((block, index) => {
                                if (block.type === "heading") {
                                    return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
                                }

                                if (block.type === "list") {
                                    return (
                                        <ul key={`${block.type}-${index}`}>
                                            {block.items.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    );
                                }

                                return <p key={`${block.type}-${index}`}>{block.text}</p>;
                            })}
                        </div>

                        <nav className={styles.articleNavigation} aria-label="Weitere Einblicke">
                            <Link href="/einblicke/alle" className={styles.textLink}>
                                Alle Einblicke
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </Link>
                            {author ? (
                                <Link href={author.profilePath} className={styles.textLink}>
                                    Zum Autorprofil
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                            ) : null}
                        </nav>
                    </div>
                </article>
            </div>
            <Footer showChat={false} />
        </main>
    );
}
