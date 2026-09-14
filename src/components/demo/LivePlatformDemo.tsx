"use client";

import { useEffect, useRef, useState } from "react";
import { useWebsiteTheme } from "@/components/providers/WebsiteThemeProvider";
import { platformDemoRoles, platformDemoUrl, type PlatformDemoRole } from "@/config/platform-demo";

export function LivePlatformDemo() {
    const { theme } = useWebsiteTheme();
    const [entry, setEntry] = useState<{ role: PlatformDemoRole; theme: typeof theme }>({ role: "seeker", theme });
    const role = entry.role;
    const [loadedRole, setLoadedRole] = useState<PlatformDemoRole | null>(null);
    const [unavailable, setUnavailable] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const frameRef = useRef<HTMLIFrameElement>(null);
    const currentRole = platformDemoRoles.find((option) => option.id === role)!;
    const frameUrl = new URL(platformDemoUrl);
    frameUrl.searchParams.set("role", role);
    frameUrl.searchParams.set("theme", entry.theme);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (
                event.origin !== new URL(platformDemoUrl).origin
                || event.source !== frameRef.current?.contentWindow
                || event.data?.type !== "workfare:demo-ready"
                || event.data?.role !== role
            ) return;
            // Synchronize on every ready event, including full navigation inside the iframe.
            frameRef.current?.contentWindow?.postMessage({ type: "workfare:demo-theme", theme }, new URL(platformDemoUrl).origin);
            setLoadedRole(role);
            setUnavailable(false);
        };
        window.addEventListener("message", onMessage);
        // The iframe can finish before the website hydrates. Request readiness again
        // after installing our listener; a later-loading frame still announces itself.
        frameRef.current?.contentWindow?.postMessage({ type: "workfare:demo-ready-request" }, new URL(platformDemoUrl).origin);
        return () => window.removeEventListener("message", onMessage);
    }, [role, theme, attempt]);

    useEffect(() => {
        // A theme change preserves the current page, role and all demo edits.
        frameRef.current?.contentWindow?.postMessage({ type: "workfare:demo-theme", theme }, new URL(platformDemoUrl).origin);
    }, [theme]);

    function selectRole(nextRole: PlatformDemoRole) {
        if (nextRole === role) return;
        setLoadedRole(null);
        setUnavailable(false);
        setEntry({ role: nextRole, theme });
    }

    function retryDemo() {
        setEntry({ role, theme });
        setLoadedRole(null);
        setUnavailable(false);
        setAttempt((value) => value + 1);
    }

    useEffect(() => {
        if (loadedRole === role) return;
        // Start the timeout when the lazy iframe becomes visible, not on page load.
        const frame = frameRef.current;
        if (!frame) return;
        let timeout: ReturnType<typeof setTimeout> | undefined;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            timeout = setTimeout(() => setUnavailable(true), 45000);
        });
        observer.observe(frame);
        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [role, loadedRole, attempt]);

    return (
        <section aria-label="Die Plattform ausprobieren" data-theme={theme} className="live-platform-demo pb-6 sm:pb-8">
            <div className="mx-auto w-full max-w-[100rem] px-2 sm:px-4 lg:px-6">
                <div className="mb-5 flex justify-center sm:mb-6">
                    <div role="group" aria-label="Demoansicht wechseln" className="demo-role-group grid w-full max-w-[31rem] grid-cols-3 gap-1 rounded-[2rem] bg-white/[0.025] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                        {platformDemoRoles.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={role === option.id}
                                aria-controls="platform-demo-frame"
                                onClick={() => selectRole(option.id)}
                                className={`demo-role-button flex min-h-14 flex-col items-center justify-center rounded-full px-3 py-2 text-center text-xs font-medium leading-4 transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:text-sm ${role === option.id ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(255,255,255,0.05)]" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                            >
                                {option.label}
                                {option.note && <span className="mt-0.5 text-[0.65rem] font-normal text-slate-400">{option.note}</span>}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative isolate overflow-hidden rounded-[1.25rem] bg-[var(--demo-surface)] shadow-[0_24px_80px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] sm:rounded-[1.75rem]">
                    {loadedRole !== role && (
                        <div role="status" className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[var(--demo-surface)] px-6 text-center text-sm text-[var(--demo-muted)]">
                            <p>{unavailable ? "Die Demo ist gerade nicht erreichbar." : "Demo wird geladen …"}</p>
                            {unavailable && <button type="button" onClick={retryDemo} className="demo-retry glass-control min-h-11 px-5 text-sm text-white">Erneut laden</button>}
                        </div>
                    )}
                    <iframe
                        key={`${role}-${attempt}`}
                        ref={frameRef}
                        id="platform-demo-frame"
                        title={`Workfare – ${currentRole.label}${currentRole.note ? ` (${currentRole.note})` : ""} mit Demodaten`}
                        src={frameUrl.href}
                        inert={loadedRole !== role}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="origin"
                        className="relative z-10 block h-[82svh] min-h-[34rem] w-full border-0 lg:h-[85svh]"
                    />
                </div>
            </div>
        </section>
    );
}
