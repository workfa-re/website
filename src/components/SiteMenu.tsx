"use client";

import { usePathname, useRouter } from "next/navigation";
import { type KeyboardEvent, type MouseEvent, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavItems, menuMetaLinks, siteConfig } from "@/config/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MENU_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
type MenuPhase = "closed" | "open" | "closing";

function MenuWord({ label, active, reducedMotion }: { label: string; active: boolean; reducedMotion: boolean }) {
    return (
        <span className="relative block h-[1em] overflow-hidden pb-[0.055em]">
            <motion.span
                className="block will-change-transform"
                animate={{ y: active && !reducedMotion ? "-100%" : "0%" }}
                transition={{ duration: reducedMotion ? 0 : 0.72, ease: MENU_EASE }}
            >
                {label}
            </motion.span>
            <motion.span
                aria-hidden
                className="absolute inset-x-0 top-full block text-white will-change-transform"
                animate={{ y: active && !reducedMotion ? "-100%" : "0%" }}
                transition={{ duration: reducedMotion ? 0 : 0.72, ease: MENU_EASE }}
            >
                {label}
            </motion.span>
        </span>
    );
}

function MenuItem({
    item,
    index,
    isCurrent,
    reducedMotion,
    onNavigate,
}: {
    item: (typeof mainNavItems)[number];
    index: number;
    isCurrent: boolean;
    reducedMotion: boolean;
    onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
    const [active, setActive] = useState(false);

    return (
        <motion.a
            href={item.href}
            aria-label={item.label}
            aria-current={isCurrent ? "page" : undefined}
            onClick={(event) => onNavigate(event, item.href)}
            onHoverStart={() => setActive(!isCurrent)}
            onHoverEnd={() => setActive(false)}
            onFocus={() => setActive(!isCurrent)}
            onBlur={() => setActive(false)}
            className={`hero-menu-link rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 ${
                isCurrent ? "text-white/34" : "text-white/96 hover:text-white focus-visible:text-white"
            }`}
            style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
            initial={reducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: reducedMotion ? 0 : 0.78,
                delay: reducedMotion ? 0 : 0.18 + index * 0.055,
                ease: EASE,
            }}
        >
            <MenuWord label={item.label} active={active} reducedMotion={reducedMotion} />
        </motion.a>
    );
}

export function SiteMenuButton({ className = "" }: { className?: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const pendingHrefRef = useRef<string | null>(null);
    const [phase, setPhase] = useState<MenuPhase>("closed");
    const dialogId = useId();
    const pathname = usePathname() ?? "/";
    const router = useRouter();
    const reducedMotion = useReducedMotion() ?? false;
    const isPresented = phase !== "closed";

    useEffect(() => {
        if (!isPresented) return;

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isPresented]);

    useEffect(() => {
        if (phase === "open" && !dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }

        if (phase !== "closed") return;

        const href = pendingHrefRef.current;
        pendingHrefRef.current = null;
        if (!href) return;

        if (href.startsWith("/") && !href.startsWith("//")) {
            router.push(href);
        } else {
            window.location.assign(href);
        }
    }, [phase, router]);

    function closeMenu() {
        setPhase((current) => (current === "closed" ? current : "closing"));
    }

    function finishClosing() {
        if (phase !== "closing") return;

        dialogRef.current?.close();
        setPhase("closed");
        triggerRef.current?.focus({ preventScroll: true });
    }

    function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
        if (
            event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
            event.shiftKey || event.altKey || event.currentTarget.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();
        pendingHrefRef.current = href === pathname ? null : href;
        closeMenu();
    }

    function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
        if (event.key !== "Tab") return;

        const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = controls[0];
        const last = controls[controls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    }

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setPhase("open")}
                aria-label="Menü öffnen"
                aria-haspopup="dialog"
                aria-expanded={isPresented}
                aria-controls={dialogId}
                className={`glass-control menu-trigger ${className}`}
            >
                <span className="menu-trigger-icon flex">
                    <Menu className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
                </span>
            </button>

            <motion.dialog
                ref={dialogRef}
                id={dialogId}
                aria-label="Navigation"
                className="site-menu-dialog"
                initial={false}
                animate={phase === "open"
                    ? { y: 0, opacity: 1 }
                    : { y: reducedMotion ? 0 : "-100%", opacity: reducedMotion ? 0 : 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.72, ease: EASE }}
                onAnimationComplete={finishClosing}
                onCancel={(event) => {
                    event.preventDefault();
                    closeMenu();
                }}
                onClose={() => {
                    setPhase("closed");
                    triggerRef.current?.focus({ preventScroll: true });
                }}
                onKeyDown={keepFocusInMenu}
            >
                {isPresented ? (
                    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#050505] text-white">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(59,130,246,0.11),transparent_34%),radial-gradient(circle_at_22%_86%,rgba(14,165,233,0.08),transparent_26%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_28%,rgba(255,255,255,0.018))]" />

                        <motion.button
                            type="button"
                            onClick={closeMenu}
                            aria-label="Menü schließen"
                            className="glass-control absolute right-6 top-6 z-20 sm:right-10 sm:top-10"
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            autoFocus
                        >
                            <motion.span
                                className="flex"
                                variants={{
                                    rest: { rotate: 0, scale: 1 },
                                    hover: reducedMotion ? { rotate: 0, scale: 1 } : { rotate: 90, scale: 1.05 },
                                }}
                                transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
                            >
                                <X className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
                            </motion.span>
                        </motion.button>

                        <nav aria-label="Hauptnavigation" className="hero-menu-nav">
                            <div className="hero-menu-items">
                                {mainNavItems.map((item, index) => (
                                    <MenuItem
                                        key={item.href}
                                        item={item}
                                        index={index}
                                        isCurrent={item.href === pathname}
                                        reducedMotion={reducedMotion}
                                        onNavigate={handleNavigation}
                                    />
                                ))}
                            </div>
                        </nav>

                        <div className="hero-menu-footer">
                            <div data-hero-menu-meta className="hero-menu-meta">
                                <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.8rem] font-medium text-white/44 sm:gap-x-10 sm:text-sm">
                                    {menuMetaLinks.map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(event) => handleNavigation(event, item.href)}
                                            className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div data-hero-menu-wordmark aria-hidden="true" className="hero-menu-wordmark">
                                {siteConfig.name}
                            </div>
                        </div>
                    </div>
                ) : null}
            </motion.dialog>
        </>
    );
}
