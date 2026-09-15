import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatInsightDate, getInsightUrl, type Insight } from "@/content/insights";
import { getTeamMember } from "@/content/team";
import { siteConfig } from "@/config/site";
import { brandLogo } from "@/config/brand";
import styles from "./InsightCard.module.css";

type InsightCardProps = { insight: Insight; headingLevel?: 2 | 3 };

export function InsightCard({ insight, headingLevel = 2 }: InsightCardProps) {
    const author = insight.kind === "own" ? getTeamMember(insight.authorSlug) : undefined;
    const Heading = headingLevel === 3 ? "h3" : "h2";

    return (
        <article className={styles.card}>
            <Link href={getInsightUrl(insight)} className={styles.link}>
                <div className={styles.visual}>
                    {insight.image ? (
                        <Image
                            src={insight.image.src} alt={insight.image.alt} fill
                            sizes="(min-width: 1280px) 580px, (min-width: 900px) 46vw, 92vw"
                            className={styles.image}
                            style={{ objectPosition: insight.image.position ?? "center" }}
                        />
                    ) : (
                        <span className={styles.fallback}>
                            <Image
                                src={brandLogo.url}
                                alt={brandLogo.alt}
                                width={brandLogo.width}
                                height={brandLogo.height}
                                className={styles.fallbackLogo}
                            />
                        </span>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.meta}>
                        <span>{insight.kind === "external" ? insight.sourceName : (author?.displayName ?? siteConfig.name)}</span>
                        <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                    </div>
                    <Heading className={styles.title}>{insight.title}</Heading>
                    <p className={styles.excerpt}>{insight.excerpt}</p>
                    <div className={styles.footer}>
                        <span>{insight.kind === "own" ? `Aus Workfare · ${insight.category}` : insight.category}</span>
                        <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
