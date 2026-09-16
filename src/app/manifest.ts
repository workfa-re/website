import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { brandIcons } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${siteConfig.name} – ${siteConfig.defaultTitle}`,
        short_name: siteConfig.name,
        description: siteConfig.defaultDescription,
        start_url: "/",
        display: "standalone",
        background_color: "#02040b",
        theme_color: "#02040b",
        icons: [
            {
                src: brandIcons.small,
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: brandIcons.large,
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
