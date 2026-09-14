import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { LivePlatformDemo } from "@/components/demo/LivePlatformDemo";
import { platformDemoEnabled } from "@/config/platform-demo";

export const metadata: Metadata = {
    title: "Live-Demo",
    description: "Die Workfare-Plattform mit Beispieldaten ausprobieren.",
    alternates: { canonical: "/demo" },
    robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
    },
};

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <div className="mx-auto w-full max-w-[100rem] px-5 pb-6 pt-6 sm:px-8 sm:pb-8 lg:px-10">
                <SiteHeader />
                <div className="mt-8 sm:mt-10">
                    <h1 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                        Live-Demo
                    </h1>
                    <p className="mt-2 text-pretty text-sm leading-6 text-slate-400 sm:text-base">
                        {platformDemoEnabled
                            ? "Wähle eine Rolle und probiere Workfare mit Beispieldaten aus."
                            : "Die Live-Demo wird vorbereitet. Bald kannst du Workfare hier mit Beispieldaten ausprobieren."}
                    </p>
                </div>
            </div>
            {platformDemoEnabled && <LivePlatformDemo />}
        </main>
    );
}
