export type WebsiteTheme = "dark" | "light";

// Switcher and the complete light website design are a later step.
export const DEFAULT_WEBSITE_THEME: WebsiteTheme = "dark";

export const websiteThemeColors: Record<WebsiteTheme, string> = {
    dark: "#02040b",
    light: "#f6f8fc",
};
