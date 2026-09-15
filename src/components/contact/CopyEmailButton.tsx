"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import styles from "./ContactPage.module.css";

export function CopyEmailButton({ email }: { email: string }) {
    const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeRequest = useRef(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => () => {
        activeRequest.current += 1;
        if (resetTimer.current) clearTimeout(resetTimer.current);
    }, []);

    async function copyEmail() {
        const request = ++activeRequest.current;
        if (resetTimer.current) clearTimeout(resetTimer.current);
        let result: "copied" | "error";

        try {
            await navigator.clipboard.writeText(email);
            result = "copied";
        } catch {
            result = "error";
        }

        if (request !== activeRequest.current) return;
        setStatus(result);
        resetTimer.current = setTimeout(() => setStatus("idle"), 2500);
    }

    return (
        <span className={styles.copyControl}>
            <button
                type="button"
                onClick={copyEmail}
                className={styles.copyButton}
                aria-label={`${email} kopieren`}
                title="E-Mail-Adresse kopieren"
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.span
                        key={status === "copied" ? "copied" : "copy"}
                        className={styles.copyIcon}
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                        transition={reducedMotion ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
                    >
                        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    </motion.span>
                </AnimatePresence>
            </button>
            <span role="status" className={status === "idle" ? "sr-only" : styles.copyFeedback}>
                {status === "copied" ? "Adresse kopiert" : status === "error" ? "Bitte Adresse markieren und kopieren." : ""}
            </span>
        </span>
    );
}
