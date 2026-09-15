import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { placeholderPages, siteConfig } from "@/config/site";

const page = placeholderPages.plattform;

export const metadata: Metadata = {
    title: page.navLabel,
    description: page.metaDescription,
    alternates: {
        canonical: page.path,
    },
    openGraph: {
        title: `${page.navLabel} | ${siteConfig.name}`,
        description: page.metaDescription,
        url: page.path,
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title: `${page.navLabel} | ${siteConfig.name}`,
        description: page.metaDescription,
        images: [socialPreview.url],
    },
};

export default function PlattformPage() {
    return (
        <PlaceholderPage
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
        />
    );
}
