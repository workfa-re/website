import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatInsightDate, getInsightsByAuthor, getInsightUrl } from "@/content/insights";
import type { TeamMember } from "@/content/team";
import styles from "./ProfileSurfaces.module.css";

export function ProfileContributions({ member }: { member: Pick<TeamMember, "slug" | "shortName"> }) {
    const insights = getInsightsByAuthor(member.slug);
    const headingId = `contributions-${member.slug}`;

    return (
        <section aria-labelledby={headingId} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-18 sm:px-8 lg:px-10 lg:pb-24">
            <div className="space-y-8 border-t border-white/[0.07] pt-10">
                <div className="max-w-3xl">
                    <h2 id={headingId} className="text-balance text-[clamp(2rem,3.2vw,3.35rem)] font-medium leading-[1.08] tracking-tight text-white">
                        Beiträge von {member.shortName}
                    </h2>
                    {insights.length > 0 && (
                        <p className="mt-5 text-pretty text-base leading-7 text-slate-400">
                            Eigene Beiträge und Einblicke aus der Arbeit an Workfare.
                        </p>
                    )}
                </div>

                {insights.length > 0 ? (
                    <ul className="grid gap-3">
                        {insights.map((insight) => (
                            <li key={insight.slug}>
                                <Link href={getInsightUrl(insight)} className={`group content-panel ${styles.cardLink} ${insight.image ? styles.storyCard : "block"}`}>
                                    {insight.image && (
                                        <span className={`relative block aspect-[16/7] md:aspect-auto md:min-h-[9.5rem] ${styles.cardVisual}`}>
                                            <Image
                                                src={insight.image.src}
                                                alt={insight.image.alt}
                                                fill
                                                sizes="(min-width: 768px) 13rem, calc(100vw - 58px)"
                                                className={styles.cardImage}
                                                style={{ objectPosition: insight.image.position ?? "center" }}
                                            />
                                        </span>
                                    )}
                                    <span className="flex min-h-[9.5rem] flex-col justify-center p-4 sm:p-5 md:py-4">
                                        <time dateTime={insight.publishedAt} className="text-sm text-slate-400">
                                            {formatInsightDate(insight.publishedAt)}
                                        </time>
                                        <span className="mt-2 block text-xl font-medium leading-snug tracking-tight text-white">
                                            {insight.title}
                                        </span>
                                        <span className="mt-2 line-clamp-2 text-pretty text-base leading-6 text-slate-400">
                                            {insight.excerpt}
                                        </span>
                                        <span className="inline-flex items-center gap-2 pt-4 text-sm font-medium text-slate-200">
                                            Artikel lesen <ArrowUpRight size={16} aria-hidden="true" />
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={`content-panel ${styles.emptyState}`}>
                        <p className="text-base leading-7 text-slate-400">Noch keine Beiträge veröffentlicht.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
