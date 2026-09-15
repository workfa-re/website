import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { siteConfig } from "@/config/site";
import { teamMembers, type TeamMember } from "@/content/team";
import { serializeJsonLd } from "@/lib/json-ld";

const path = "/einblicke/ueber-uns";
const description = "Die Idee hinter Workfare und die Menschen, die daran arbeiten. Lerne unser Team kennen und finde die passenden Kontaktwege.";
const title = `Über uns | ${siteConfig.name}`;

export const metadata: Metadata = {
    title: "Über uns",
    description,
    alternates: { canonical: path },
    openGraph: {
        title,
        description,
        url: path,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name: title,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: teamMembers.map((member: TeamMember) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}${member.profilePath}#person`,
        name: member.name,
        ...(!member.profilePending ? { jobTitle: member.role } : {}),
        url: `${siteConfig.url}${member.profilePath}`,
    })),
};

export default function AboutRoute() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutJsonLd) }} />
            <AboutPage />
        </>
    );
}
