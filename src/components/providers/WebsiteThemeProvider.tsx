"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_WEBSITE_THEME, websiteThemeColors, type WebsiteTheme } from "@/config/website-theme";

type WebsiteThemeContextValue = {
    theme: WebsiteTheme;
    setTheme: (theme: WebsiteTheme) => void;
};

const WebsiteThemeContext = createContext<WebsiteThemeContextValue | null>(null);

export function WebsiteThemeProvider({
    children,
    initialTheme = DEFAULT_WEBSITE_THEME,
}: {
    children: ReactNode;
    initialTheme?: WebsiteTheme;
}) {
    const [theme, setTheme] = useState<WebsiteTheme>(initialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.classList.toggle("light", theme === "light");
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
            meta.content = websiteThemeColors[theme];
        });
    }, [theme]);

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return <WebsiteThemeContext.Provider value={value}>{children}</WebsiteThemeContext.Provider>;
}

export function useWebsiteTheme() {
    const context = useContext(WebsiteThemeContext);
    if (!context) throw new Error("useWebsiteTheme requires WebsiteThemeProvider");
    return context;
}
