import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { ProfilePortraitPlaceholder } from "./ProfilePortraitPlaceholder";
import { ProfileContributions } from "./ProfileContributions";
import { siteConfig } from "@/config/site";
import type { TeamMember } from "@/content/team";
import { serializeJsonLd } from "@/lib/json-ld";
import styles from "./ProfileSurfaces.module.css";

export function createTeamProfileMetadata(member: TeamMember): Metadata {
    const image = member.profileImage;
    const imageUrl = image?.src ?? "/og-image.png";

    return {
        title: member.profilePending ? member.displayName : `${member.displayName} – ${member.role}`,
        description: member.description,
        alternates: { canonical: member.profilePath },
        openGraph: {
            title: `${member.displayName} | ${siteConfig.name}`,
            description: member.description,
            url: member.profilePath,
            type: "profile",
            images: [{ url: imageUrl, alt: image?.alt ?? siteConfig.name }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${member.displayName} | ${siteConfig.name}`,
            description: member.description,
            images: [imageUrl],
        },
    };
}

function Portrait({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
    return (
        <div className={`content-panel ${styles.portraitFrame}`}>
            <div className={styles.portraitSurface}>
                {member.profileImage ? (
                    <Image
                        src={member.profileImage.src}
                        alt={member.profileImage.alt}
                        fill
                        sizes={compact
                            ? "(min-width: 658px) 138px, (min-width: 507px) calc(22.5vw - 10px), 104px"
                            : "(min-width: 1280px) 470px, (min-width: 1024px) calc(41.8vw - 64px), 0px"}
                        className={styles.portraitImage}
                        style={{ objectPosition: member.profileImage.position ?? "center" }}
                    />
                ) : <ProfilePortraitPlaceholder compact={compact} />}
            </div>
        </div>
    );
}

export function TeamProfile({ member }: { member: TeamMember }) {
    const profileUrl = `${siteConfig.url}${member.profilePath}`;
    const directEmail = member.contactLinks.find((link) => link.kind === "direct-email");
    const teamEmail = member.contactLinks.find((link) => link.kind === "team-email");
    const contact = directEmail ?? teamEmail;
    const externalProfiles = member.contactLinks.filter((link) => link.kind === "external-profile");
    const profileJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profile`,
        url: profileUrl,
        name: `${member.displayName} | ${siteConfig.name}`,
        description: member.description,
        inLanguage: "de-DE",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: {
            "@type": "Person",
            "@id": `${profileUrl}#person`,
            name: member.name,
            url: profileUrl,
            ...(!member.profilePending ? { jobTitle: member.role, description: member.profileIntro } : {}),
            ...(directEmail ? { email: directEmail.value } : {}),
            ...(member.profileImage ? { image: `${siteConfig.url}${member.profileImage.src}` } : {}),
            ...(member.location ? { homeLocation: { "@type": "Place", name: member.location } } : {}),
            ...(member.knowsAbout.length ? { knowsAbout: member.knowsAbout } : {}),
            ...(member.sameAs?.length ? { sameAs: member.sameAs } : {}),
            worksFor: { "@id": `${siteConfig.url}/#organization`, "@type": "Organization", name: siteConfig.name },
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileJsonLd) }} />
            <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
                <section className="relative isolate overflow-hidden bg-[#02040b]">
                    <PixelShaderBackdrop className="absolute inset-0 opacity-90" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.03),#02040b_92%)]" />
                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:min-h-[70svh] lg:px-10">
                        <SiteHeader />
                        <div className="grid flex-1 items-center gap-10 pb-12 pt-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(21rem,0.63fr)] lg:pb-16 lg:pt-12">
                            <div className="min-w-0">
                                <Link href="/einblicke/ueber-uns#team" className={`glass-button ${styles.backButton}`}>
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Über uns
                                </Link>
                                <div className="mt-9 max-w-3xl">
                                    <div className={`mb-6 lg:hidden ${styles.mobilePortrait}`}>
                                        <Portrait member={member} compact />
                                    </div>
                                    <h1 className={styles.profileName}>{member.displayName}</h1>
                                </div>
                                <p className={`${styles.profileRole} max-w-xl text-lg font-medium text-slate-300 sm:text-xl`}>{member.role}</p>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{member.description}</p>
                                {(contact || externalProfiles.length > 0) && (
                                    <div className="mt-7 flex flex-wrap gap-2.5">
                                        {contact && <a href={contact.href} className={`glass-button ${styles.contactButton}`} aria-label={`${contact.label}: ${contact.value}`}>
                                            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                                            <span className="min-w-0 break-all">{contact.value}</span>
                                            <ArrowUpRight className={styles.buttonArrow} aria-hidden="true" />
                                        </a>}
                                        {externalProfiles.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`glass-button ${styles.contactButton}`}
                                                aria-label={`${member.displayName} auf ${link.label} (öffnet in neuem Tab)`}
                                            >
                                                <span>{link.value}</span>
                                                <ArrowUpRight className={styles.buttonArrow} aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="hidden lg:block"><Portrait member={member} /></div>
                        </div>
                    </div>
                </section>

                {!member.profilePending && member.focus.length > 0 && (
                    <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-x-8 gap-y-5 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-16 lg:px-10">
                        <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:col-span-2">Bei Workfare</h2>
                        <p className="max-w-2xl text-pretty text-base leading-8 text-slate-400">{member.profileIntro}</p>
                        <ul className="list-disc space-y-5 self-start pl-5 text-pretty text-base leading-8 text-slate-300 marker:text-slate-500">
                            {member.focus.map((focus) => <li key={focus}>{focus}</li>)}
                        </ul>
                    </section>
                )}

                <ProfileContributions member={member} />
                <Footer showChat={false} />
            </main>
        </>
    );
}
