import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export function LegalPageLayout({
    title,
    description,
    updatedAt,
    children,
}: {
    title: string;
    description: ReactNode;
    updatedAt: string;
    children: ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-400/30 selection:text-blue-100">
            <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                <SiteHeader />
            </div>

            <article className="mx-auto w-full max-w-3xl px-5 pt-6 [overflow-wrap:anywhere] sm:px-8 sm:pt-10">
                <div className="pb-8">
                    <h1 className="text-balance text-[2.125rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.5rem]">
                        {title}
                    </h1>
                    <p className="mt-4 text-pretty text-base leading-7">{description}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        Stand: {updatedAt} · gilt für workfa.re
                    </p>
                </div>

                {children}
            </article>

            <Footer />
        </main>
    );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="border-t border-white/10 py-7 last:pb-0 sm:py-8 sm:last:pb-0">
            <h2 className="text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-7 [&_a]:rounded-sm [&_a]:underline [&_a]:decoration-blue-200/40 [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-white/80">
                {children}
            </div>
        </section>
    );
}

export function LegalDefinitionRows({ items }: { items: Array<{ term: string; description: ReactNode }> }) {
    return (
        <dl className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item) => (
                <div key={item.term} className="grid gap-1 py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="text-sm font-medium leading-7 text-slate-400">{item.term}</dt>
                    <dd className="min-w-0">{item.description}</dd>
                </div>
            ))}
        </dl>
    );
}
