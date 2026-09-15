import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Building2, Instagram, Mail, Phone, type LucideIcon } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { ProfileContributions } from "@/components/team/ProfileContributions";
import { siteConfig } from "@/config/site";
import { getTeamMember, type TeamMember } from "@/content/team";
import { externalInsights, formatInsightDate, getInsightAbsoluteUrl, getInsightUrl, getInsightsByAuthor, type Insight } from "@/content/insights";
import { serializeJsonLd } from "@/lib/json-ld";
import styles from "@/components/team/ProfileSurfaces.module.css";

const member = getTeamMember("rezan");

const contactIcons = {
    "direct-email": Mail,
    "team-email": Building2,
    instagram: Instagram,
    phone: Phone,
    website: ArrowUpRight,
    "external-profile": Award,
} satisfies Record<TeamMember["contactLinks"][number]["kind"], LucideIcon>;

function isDefined<T>(value: T | undefined): value is T {
    return Boolean(value);
}

function getProfileInsightKey(insight: Insight) {
    return insight.kind === "own" ? insight.slug : insight.id;
}

function getProfileInsightHref(insight: Insight) {
    return getInsightUrl(insight);
}

function getProfileInsightAbsoluteUrl(insight: Insight) {
    return getInsightAbsoluteUrl(insight);
}

function getProfileInsightSource(insight: Insight) {
    return insight.kind === "own" ? siteConfig.name : insight.sourceName;
}

export const metadata: Metadata = {
    title: member ? `${member.displayName} – ${member.role}` : "Rezan Yalcin",
    description: member
        ? "Profil von Rezan Yalcin, Gründer von Workfare: App-Entwicklung, sichere Taschengeldjobs, Jugend forscht und ausgewählte Medienberichte."
        : undefined,
    alternates: {
        canonical: "/team/rezan-yalcin",
    },
    openGraph: {
        title: member ? `${member.displayName} | ${siteConfig.name}` : `Rezan Yalcin | ${siteConfig.name}`,
        description: member
            ? "Rezan Yalcin entwickelt Workfare als sichere digitale Taschengeldbörse für lokale Hilfe, Jugendliche, Eltern und Auftraggeber."
            : undefined,
        url: "/team/rezan-yalcin",
        images: [{ url: member?.profileImage?.src ?? "/og-image.png", width: 1459, height: 1054, alt: member?.profileImage?.alt ?? siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: member ? `${member.displayName} | ${siteConfig.name}` : `Rezan Yalcin | ${siteConfig.name}`,
        description: member
            ? "Profil von Rezan Yalcin, Gründer von Workfare, mit ausgewählten Beiträgen und öffentlichen Erwähnungen."
            : undefined,
        images: [member?.profileImage?.src ?? "/og-image.png"],
    },
};

const profileImage = member?.profileImage ?? {
    src: "/team/rezan-yalcin-portrait.jpeg",
    alt: "Porträt von Rezan Yalcin.",
    position: "center 35%",
};

export default function RezanYalcinProfilePage() {
    if (!member) {
        return null;
    }

    const profileUrl = `${siteConfig.url}${member.profilePath}`;
    const directEmail = member.contactLinks.find((link) => link.kind === "direct-email")?.value;
    const publicContactLinks = member.contactLinks.filter((link) =>
        ["direct-email", "instagram", "external-profile"].includes(link.kind),
    );
    const pressMentions = [
        externalInsights.find((insight) => insight.id === "wdr-studiogespraech-rezan-yalcin-app-entwickler"),
        externalInsights.find((insight) => insight.id === "wdr-rezan-jobbridge-jugend-forscht"),
        externalInsights.find((insight) => insight.id === "blick-aktuell-jugend-forscht-bundesfinale-4-platz"),
    ].filter(isDefined);
    const selectedAuthoredInsights = getInsightsByAuthor(member.slug);
    const profileSubjectItems = [...pressMentions, ...selectedAuthoredInsights];
    const mentionJsonLd = profileSubjectItems.map((insight) => ({
        "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
        "@id": `${getProfileInsightAbsoluteUrl(insight)}#profile-mention`,
        name: insight.title,
        url: getProfileInsightAbsoluteUrl(insight),
        datePublished: insight.publishedAt,
        description: insight.excerpt,
        ...(insight.kind === "own"
            ? {
                  author: {
                      "@type": "Person",
                      "@id": `${profileUrl}#person`,
                      name: member.name,
                      url: profileUrl,
                  },
                  publisher: {
                      "@type": "Organization",
                      "@id": `${siteConfig.url}/#organization`,
                      name: siteConfig.name,
                      url: siteConfig.url,
                  },
              }
            : {
                  publisher: {
                      "@type": "Organization",
                      name: insight.sourceName,
                      url: insight.sourceUrl,
                  },
              }),
    }));
    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profile`,
        url: profileUrl,
        name: `${member.displayName} | ${siteConfig.name}`,
        description: member.description,
        inLanguage: "de-DE",
        mainEntity: {
            "@type": "Person",
            "@id": `${profileUrl}#person`,
            name: member.name,
            alternateName: [member.displayName, member.shortName],
            jobTitle: member.role,
            description: member.profileIntro,
            url: profileUrl,
            ...(directEmail ? { email: directEmail } : {}),
            image: `${siteConfig.url}${profileImage.src}`,
            sameAs: member.sameAs,
            knowsAbout: member.knowsAbout,
            worksFor: {
                "@type": "Organization",
                "@id": `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                url: siteConfig.url,
            },
            homeLocation: {
                "@type": "Place",
                name: member.location,
            },
            subjectOf: mentionJsonLd,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
            />
            <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
                <section className="relative isolate overflow-hidden bg-[#02040b]">
                    <PixelShaderBackdrop className="absolute inset-0 opacity-90" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.03),#02040b_92%)]" />
                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:min-h-[70svh] lg:px-10">
                        <SiteHeader />

                        <div className="grid flex-1 items-center gap-10 pb-8 pt-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(21rem,0.63fr)] lg:pb-10 lg:pt-12">
                            <div>
                                <Link
                                    href="/einblicke/ueber-uns#team"
                                    className={`glass-button ${styles.backButton}`}
                                >
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    Über uns
                                </Link>

                                <div className="mt-9 max-w-3xl">
                                    <aside className={`relative mb-6 overflow-visible lg:hidden ${styles.mobilePortrait}`}>
                                        <div className={`content-panel ${styles.portraitFrame}`}>
                                            <div className={styles.portraitSurface}>
                                                <Image
                                                    src={profileImage.src}
                                                    alt={profileImage.alt}
                                                    fill
                                                    sizes="(min-width: 658px) 138px, (min-width: 507px) calc(22.5vw - 10px), 104px"
                                                    className={styles.portraitImage}
                                                    style={{ objectPosition: profileImage.position }}
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    </aside>

                                    <h1 className={styles.profileName}>
                                        {member.displayName}
                                    </h1>
                                </div>
                                <p className={`${styles.profileRole} text-xl font-semibold tracking-[-0.035em] text-blue-100/84 sm:text-2xl`}>
                                    {member.role}
                                </p>
                                <p className="mt-6 max-w-2xl text-[1.02rem] font-medium leading-8 tracking-[-0.02em] text-slate-300 sm:text-[1.14rem]">
                                    {member.description}
                                </p>

                                <div className="mt-7 flex max-w-2xl flex-wrap gap-2.5">
                                    {publicContactLinks.map((link) => {
                                        const Icon = contactIcons[link.kind];

                                        return (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                aria-label={`${link.label}: ${link.value}`}
                                                className={`glass-button ${styles.contactButton}`}
                                            >
                                                <Icon className="h-4 w-4 shrink-0 text-slate-200" aria-hidden="true" />
                                                <span className="min-w-0 break-all">{link.value}</span>
                                                <ArrowUpRight
                                                    className={styles.buttonArrow}
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <aside className="relative hidden overflow-visible lg:block">
                                <div className={`content-panel ${styles.portraitFrame}`}>
                                    <div className={styles.portraitSurface}>
                                        <Image
                                            src={profileImage.src}
                                            alt={profileImage.alt}
                                            fill
                                            sizes="(min-width: 1280px) 470px, (min-width: 1024px) calc(41.8vw - 64px), calc(100vw - 54px)"
                                            className={styles.portraitImage}
                                            style={{ objectPosition: profileImage.position }}
                                            priority
                                        />
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10 lg:pb-[6.5rem] lg:pt-10">
                    <div className="max-w-4xl">
                        <div>
                            <h2 className="max-w-3xl text-[clamp(2.15rem,3.7vw,3.85rem)] font-semibold leading-[0.96] tracking-[-0.058em] text-white">
                                Aus einem echten Problem wurde ein Produkt.
                            </h2>
                            <p className="mt-6 max-w-3xl text-[1.02rem] font-medium leading-8 tracking-[-0.02em] text-slate-400 sm:text-[1.12rem] sm:leading-9">
                                {member.profileIntro}
                            </p>
                        </div>

                    </div>
                </section>

                <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:px-10 lg:pb-16">
                    <div className="space-y-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="max-w-none text-[clamp(2.15rem,3.8vw,4rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
                                    Presse & Erwähnungen
                                </h2>
                                <p className="mt-5 max-w-2xl text-[1rem] font-medium leading-7 tracking-[-0.02em] text-slate-500 sm:text-[1.08rem]">
                                    Ausgewählte öffentliche Fundstellen zu Rezan Yalcin und dem damaligen Projekt JobBridge: Mediengespräch, WDR-Beitrag und die Einordnung zum Bundesfinale.
                                </p>
                            </div>
                            <Link
                                href="/einblicke/alle"
                                className={`glass-button ${styles.contactButton}`}
                            >
                                Alle Einblicke
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {pressMentions.map((insight) => {
                                const href = getProfileInsightHref(insight);
                                const source = getProfileInsightSource(insight);

                                return (
                                    <Link
                                        key={getProfileInsightKey(insight)}
                                        href={href}
                                        className={`group content-panel ${styles.cardLink} ${styles.pressCard}`}
                                    >
                                        <span className={`relative block aspect-[16/10] ${styles.cardVisual}`}>
                                            {insight.image ? (
                                                <Image
                                                    src={insight.image.src}
                                                    alt={insight.image.alt}
                                                    fill
                                                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 33vw, 100vw"
                                                    className={styles.cardImage}
                                                    style={{ objectPosition: insight.image.position ?? "center center" }}
                                                />
                                            ) : (
                                                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.65))]" />
                                            )}
                                        </span>
                                        <span className="flex flex-1 flex-col p-5 sm:p-6">
                                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-500">
                                                <span className="text-slate-300">{source}</span>
                                                <span aria-hidden="true">·</span>
                                                <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                                            </span>
                                            <span className="mt-5 block text-[1.35rem] font-semibold leading-[1.04] tracking-[-0.05em] text-white transition-colors duration-200 group-hover:text-blue-100 sm:text-[1.5rem]">
                                                {insight.title}
                                            </span>
                                            <span className="mt-4 block text-[0.98rem] font-medium leading-7 tracking-[-0.02em] text-slate-400">
                                                {insight.excerpt}
                                            </span>
                                            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-blue-100/82 transition-colors duration-200 group-hover:text-white">
                                                Eintrag öffnen
                                                <ArrowUpRight
                                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <ProfileContributions member={member} />

                <Footer showChat={false} />
            </main>
        </>
    );
}
