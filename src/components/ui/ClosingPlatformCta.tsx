"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type TransitionEvent } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./ClosingPlatformCta.module.css";

// The transition normally completes in 700 ms; this also covers interrupted or missing transition events.
const NAVIGATION_FALLBACK_MS = 1100;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function ClosingPlatformCta() {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const fillRef = useRef<HTMLSpanElement>(null);
    const pointerTypeRef = useRef("");
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

    function fillIsExpanded() {
        const link = linkRef.current;
        const fill = fillRef.current;
        if (!link || !fill || link.clientWidth === 0) return false;

        const style = window.getComputedStyle(link);
        const availableWidth = link.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        return fill.getBoundingClientRect().width >= availableWidth - 1;
    }

    useEffect(() => {
        mountedRef.current = true;

        const reset = () => {
            clearPendingNavigation();
            navigatedRef.current = false;
            pointerTypeRef.current = "";
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
        // Keyboard activation can follow an already completed mouse hover.
        if (departing && fillIsExpanded()) finishNavigation();
    }, [departing, finishNavigation]);

    function handlePointerDown(event: PointerEvent<HTMLAnchorElement>) {
        pointerTypeRef.current = event.pointerType;
        if (event.pointerType !== "mouse") setHovered(false);
    }

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

        const nativePointerType = "pointerType" in event.nativeEvent ? event.nativeEvent.pointerType : "";
        const pointerType = nativePointerType || pointerTypeRef.current;
        const animateActivation = event.detail === 0 || pointerType === "touch" || pointerType === "pen";

        if (!animateActivation || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

        event.preventDefault();
        pendingHrefRef.current = link.href;
        setDeparting(true);
        fallbackRef.current = window.setTimeout(finishNavigation, NAVIGATION_FALLBACK_MS);
    }

    function handleTransitionEnd(event: TransitionEvent<HTMLSpanElement>) {
        if (event.target === event.currentTarget && event.propertyName === "width" && fillIsExpanded()) {
            finishNavigation();
        }
    }

    return (
        <a
            ref={linkRef}
            href={siteConfig.appUrl}
            aria-label="Zur Workfare Plattform"
            className={styles.link}
            data-active={hovered || departing ? "true" : undefined}
            onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
            onPointerLeave={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerCancel={() => { pointerTypeRef.current = ""; setHovered(false); }}
            onClick={handleClick}
            onAuxClick={() => { clearPendingNavigation(); setDeparting(false); }}
        >
            <span ref={fillRef} aria-hidden="true" className={styles.fill} onTransitionEnd={handleTransitionEnd} />
            <span aria-hidden="true" className={styles.arrowPosition}>
                <ChevronDown className={styles.arrow} />
            </span>
            <span className={styles.label}>Zur Plattform</span>
        </a>
    );
}
