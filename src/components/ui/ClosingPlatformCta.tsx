"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./ClosingPlatformCta.module.css";

// A safety net for interrupted animations; normal navigation follows their actual completion.
const NAVIGATION_FALLBACK_MS = 1100;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getPendingAnimations(link: HTMLAnchorElement) {
    return link.getAnimations({ subtree: true }).filter((animation) =>
        animation.playState !== "finished" && animation.playState !== "idle"
    );
}

export function ClosingPlatformCta() {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const pendingHrefRef = useRef<string | null>(null);
    const fallbackRef = useRef<number | null>(null);
    const mountedRef = useRef(true);
    const navigatedRef = useRef(false);
    const [hovered, setHovered] = useState(false);
    const [departing, setDeparting] = useState(false);

    const clearPendingNavigation = useCallback(() => {
        pendingHrefRef.current = null;
        if (fallbackRef.current !== null) {
            window.clearTimeout(fallbackRef.current);
            fallbackRef.current = null;
        }
    }, []);

    const finishNavigation = useCallback(() => {
        const href = pendingHrefRef.current;
        if (!mountedRef.current || !href || navigatedRef.current) return;

        clearPendingNavigation();
        navigatedRef.current = true;
        window.location.assign(href);
    }, [clearPendingNavigation]);

    useEffect(() => {
        mountedRef.current = true;

        const reset = () => {
            clearPendingNavigation();
            navigatedRef.current = false;
            setDeparting(false);
            setHovered(false);
        };
        const motionPreference = window.matchMedia(REDUCED_MOTION_QUERY);
        const onMotionPreferenceChange = () => {
            if (motionPreference.matches) finishNavigation();
        };

        window.addEventListener("pagehide", reset);
        window.addEventListener("pageshow", reset);
        motionPreference.addEventListener("change", onMotionPreferenceChange);

        return () => {
            mountedRef.current = false;
            clearPendingNavigation();
            window.removeEventListener("pagehide", reset);
            window.removeEventListener("pageshow", reset);
            motionPreference.removeEventListener("change", onMotionPreferenceChange);
        };
    }, [clearPendingNavigation, finishNavigation]);

    useEffect(() => {
        if (!departing) return;

        let cancelled = false;

        function waitForAnimations() {
            const link = linkRef.current;
            if (cancelled || !link || !pendingHrefRef.current) return;

            // Include the fill, arrow and label. Recheck after cancellation (for example on resize).
            const animations = getPendingAnimations(link);
            if (animations.length === 0) {
                finishNavigation();
                return;
            }

            void Promise.allSettled(animations.map((animation) => animation.finished)).then(waitForAnimations);
        }

        // React has committed data-active before we read the resulting CSS transitions.
        const frame = window.requestAnimationFrame(waitForAnimations);
        return () => {
            cancelled = true;
            window.cancelAnimationFrame(frame);
        };
    }, [departing, finishNavigation]);

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
        if (event.defaultPrevented) return;

        const link = event.currentTarget;
        const nativeNavigation = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
            || link.hasAttribute("download") || (link.target !== "" && link.target !== "_self");

        if (nativeNavigation) {
            clearPendingNavigation();
            setDeparting(false);
            return;
        }

        if (pendingHrefRef.current || navigatedRef.current) {
            event.preventDefault();
            return;
        }

        // The animation state decides, not device detection: hybrid devices also work reliably.
        const animationComplete = link.dataset.active === "true" && getPendingAnimations(link).length === 0;
        if (animationComplete || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

        event.preventDefault();
        pendingHrefRef.current = link.href;
        setDeparting(true);
        fallbackRef.current = window.setTimeout(finishNavigation, NAVIGATION_FALLBACK_MS);
    }

    return (
        <a
            ref={linkRef}
            href={siteConfig.appUrl}
            aria-label="Zur Workfare Plattform"
            className={styles.link}
            data-active={hovered || departing ? "true" : undefined}
            aria-busy={departing || undefined}
            onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
            onPointerLeave={() => setHovered(false)}
            onPointerCancel={() => setHovered(false)}
            onClick={handleClick}
            onAuxClick={() => { clearPendingNavigation(); setDeparting(false); }}
        >
            <span aria-hidden="true" className={styles.fill} />
            <span aria-hidden="true" className={styles.arrowPosition}>
                <ChevronDown className={styles.arrow} />
            </span>
            <span className={styles.label}>Zur Plattform</span>
        </a>
    );
}
