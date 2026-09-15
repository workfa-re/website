import type { Metadata } from "next";
import { SafetyPage } from "@/components/safety/SafetyPage";
import { siteConfig } from "@/config/site";

const path = "/sicherheit";
const title = `Sicherheit | ${siteConfig.name}`;
const description = "Sicherheit bei Workfare: Orientierung für Jugendliche, Eltern und Auftraggeber, eine Checkliste vor dem Job und direkte Kontakte für Support und Datenschutz.";

export const metadata: Metadata = {
    title: "Sicherheit",
    description,
    alternates: {
        canonical: path,
    },
    openGraph: {
        title,
        description,
        url: path,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
    },
};

export default function SicherheitPage() {
    return <SafetyPage />;
}
