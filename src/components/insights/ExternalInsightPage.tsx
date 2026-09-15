import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { formatInsightDate, type ExternalInsight } from "@/content/insights";
import styles from "./ArticlePage.module.css";

type ExternalInsightPageProps = {
    insight: ExternalInsight;
};

export function ExternalInsightPage({ insight }: ExternalInsightPageProps) {
    return (
        <main className={styles.page}>
            <div className={styles.shell}>
                <SiteHeader />

                <article className={styles.article}>
                    <Link href="/einblicke" className={styles.backLink}>
                        <ArrowLeft size={16} aria-hidden="true" />
                        Einblicke
                    </Link>

                    <header className={styles.header} data-has-image={Boolean(insight.image)}>
                        <div className={styles.headingGroup}>
                            <h1 className={styles.title}>{insight.title}</h1>
                            <p className={styles.introduction}>{insight.excerpt}</p>

                            <div className={styles.byline}>
                                <span className={styles.sourceName}>{insight.sourceName}</span>
                                <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                            </div>

                            <div className={styles.actions}>
                                <a
                                    href={insight.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.sourceButton}
                                >
                                    Originalquelle öffnen
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                    <span className="sr-only"> (öffnet in einem neuen Tab)</span>
                                </a>
                                <Link href="/einblicke/alle" className={styles.textLink}>
                                    Alle Einblicke
                                </Link>
                            </div>
                        </div>

                        {insight.image ? (
                            <figure className={styles.figure}>
                                <Image
                                    src={insight.image.src}
                                    alt={insight.image.alt}
                                    fill
                                    priority
                                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                                    className={styles.image}
                                    style={{ objectPosition: insight.image.position ?? "center" }}
                                />
                            </figure>
                        ) : null}
                    </header>

                    <div className={styles.sourceSection}>
                        <section className={styles.prose} aria-labelledby="about-source-heading">
                            <h2 id="about-source-heading">Zum Originalbeitrag</h2>
                            <p>
                                Dieser Einblick verweist auf einen Beitrag von {insight.sourceName}.
                                Den vollständigen Inhalt findest du direkt bei der Originalquelle.
                            </p>
                            <p>
                                Titel, Erscheinungsdatum und die Angaben zur Urheberschaft beziehen sich auf den
                                dort veröffentlichten Beitrag. Über den Link oben öffnest du die Quelle in einem neuen Tab.
                            </p>
                        </section>

                        <aside className={styles.sourcePanel} aria-labelledby="source-details-heading">
                            <h2 id="source-details-heading">Quelle &amp; Veröffentlichung</h2>
                            <dl className={styles.sourceDetails}>
                                <div>
                                    <dt>Veröffentlicht bei</dt>
                                    <dd>{insight.sourceName}</dd>
                                </div>
                                <div>
                                    <dt>Datum</dt>
                                    <dd>
                                        <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                                    </dd>
                                </div>
                                {insight.authorName ? (
                                    <div>
                                        <dt>Von</dt>
                                        <dd>{insight.authorName}</dd>
                                    </div>
                                ) : null}
                            </dl>
                        </aside>
                    </div>
                </article>
            </div>

            <Footer showChat={false} />
        </main>
    );
}
