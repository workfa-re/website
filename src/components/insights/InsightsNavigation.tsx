"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./InsightsIndex.module.css";

const views = [
    { href: "/einblicke", label: "Aktuell" },
    { href: "/einblicke/alle", label: "Alle Beiträge" },
    { href: "/einblicke/ueber-uns", label: "Über uns" },
] as const;

export function InsightsNavigation() {
    const pathname = usePathname();
    return (
        <nav className={styles.sectionNav} aria-label="Einblicke entdecken">
            {views.map((view) => (
                <Link key={view.href} href={view.href} scroll={false} aria-current={pathname === view.href ? "page" : undefined}>
                    {view.label}
                </Link>
            ))}
        </nav>
    );
}

export function InsightsPanel({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const reducedMotion = useReducedMotion();
    return (
        <AnimatePresence initial={false}>
            <motion.div
                key={pathname}
                className={styles.panel}
                initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : .24, ease: [.22, 1, .36, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
