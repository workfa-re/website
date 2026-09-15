import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import { SafetyPage } from "@/components/safety/SafetyPage";
import { siteConfig } from "@/config/site";

const path = "/sicherheit";
const title = `Sicherheit | ${siteConfig.name}`;
const description = "Sicherheit bei Workfare: Orientierung für Jugendliche, Eltern und Auftraggeber, eine Checkliste vor dem Job und der Weg zur passenden Kontaktperson.";

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
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [socialPreview.url],
    },
};

export default function SicherheitPage() {
    return <SafetyPage />;
}
