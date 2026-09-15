import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { contactDepartments } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

const path = "/kontakt";
const pageUrl = `${siteConfig.url}${path}`;
const title = `Kontakt | ${siteConfig.name}`;
const description = "Kontakt zu Workfare: die passenden E-Mail-Adressen für allgemeine Fragen, Support, Presse und Datenschutz sowie direkte Kontakte zum Team.";

export const metadata: Metadata = {
    title: "Kontakt",
    description,
    alternates: {
        canonical: path,
    },
    openGraph: {
        title,
        description,
        url: path,
        type: "website",
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [socialPreview.url],
    },
};

const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        contactPoint: contactDepartments.map((department) => ({
            "@type": "ContactPoint",
            contactType: department.title,
            description: department.description,
            email: department.email,
        })),
    },
};

export default function KontaktPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactPageJsonLd) }}
            />
            <ContactPage departments={contactDepartments} />
        </>
    );
}
