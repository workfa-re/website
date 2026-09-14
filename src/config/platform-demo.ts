const configuredUrl = process.env.NEXT_PUBLIC_PLATFORM_DEMO_URL;
const isProduction = process.env.NODE_ENV === "production";
const fallbackUrl = isProduction
    ? "https://demo.workfa.re/demo"
    : "http://localhost:3001/demo";
const demoUrl = new URL(configuredUrl || fallbackUrl);

if (
    !["http:", "https:"].includes(demoUrl.protocol)
    || (isProduction && demoUrl.protocol !== "https:")
    || demoUrl.username
    || demoUrl.password
    || demoUrl.search
    || demoUrl.hash
    || demoUrl.pathname !== "/demo"
) {
    throw new Error("NEXT_PUBLIC_PLATFORM_DEMO_URL must end in /demo without credentials, query or fragment; production requires HTTPS.");
}

export const platformDemoUrl = demoUrl.href;
// Public rollout is explicit; local development keeps the demo available.
export const platformDemoEnabled = !isProduction || Boolean(configuredUrl);

// Public demo views only. These values never grant account permissions.
export const platformDemoRoles = [
    { id: "seeker", label: "Suchende", note: null },
    { id: "private-provider", label: "Private Anbieter", note: null },
    { id: "company", label: "Unternehmen", note: null },
] as const;

export type PlatformDemoRole = (typeof platformDemoRoles)[number]["id"];
