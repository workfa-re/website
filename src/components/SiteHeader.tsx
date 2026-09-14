import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { SiteMenuButton } from "@/components/SiteMenu";
import { siteConfig } from "@/config/site";

export function SiteHeader({ className = "" }: { className?: string }) {
    return (
        <header className={`flex items-center justify-between ${className}`}>
            <Link
                href="/"
                aria-label={`${siteConfig.name} Startseite`}
                className="brand-link inline-flex min-h-11 items-center gap-3 rounded-[1.125rem] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02040b]"
            >
                <span className="glass-control" aria-hidden="true">
                    <BrandMark className="h-[18px] w-[29px]" />
                </span>
                <span className="brand-wordmark text-[1.25rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[1.3rem]">
                    {siteConfig.name}
                </span>
            </Link>

            <SiteMenuButton />
        </header>
    );
}
