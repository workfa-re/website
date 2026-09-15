export const siteConfig = {
    name: "Workfare",
    url: "https://workfa.re",
    appUrl: "https://app.jobbridge.app",
    contactEmail: "kontakt@workfare.team",
    supportEmail: "support@workfare.team",
    privacyEmail: "datenschutz@workfare.team",
    pressEmail: "presse@workfare.team",
    defaultTitle: "Sichere Taschengeldjobs für Jugendliche",
    defaultDescription:
        "Workfare verbindet Jugendliche, Eltern und Auftraggeber in Deutschland: sichere Taschengeldjobs, klare Rollen, Verifizierung und transparente Freigaben.",
} as const;

export const mainNavItems = [
    { label: "Startseite", href: "/" },
    { label: "Sicherheit", href: "/sicherheit" },
    { label: "Einblicke", href: "/einblicke" },
    { label: "Kontakt", href: "/kontakt" },
] as const;

export const menuMetaLinks = [
    { label: "Plattform", href: siteConfig.appUrl },
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "E-Mail", href: `mailto:${siteConfig.contactEmail}` },
] as const;

export const placeholderPages = {
    plattform: {
        path: "/plattform",
        navLabel: "Plattform",
        eyebrow: "Plattform",
        title: "Die digitale Taschengeldbörse",
        description:
            "Workfare bringt Jugendliche, Eltern und Auftraggeber in einem klaren digitalen Ablauf zusammen: lokale Aufgaben, nachvollziehbare Freigaben und transparente Kommunikation.",
        metaDescription:
            "Die Workfare-Plattform für sichere Taschengeldjobs: lokale Aufgaben, Verifizierung, Elternfreigaben und klare Rollen für Jugendliche, Eltern und Auftraggeber.",
    },
    sicherheit: {
        path: "/sicherheit",
        navLabel: "Sicherheit",
        eyebrow: "Sicherheit",
        title: "Sicher arbeiten",
        description:
            "Wie Workfare Jugendliche, Eltern und Auftraggeber schützt: klare Rollen, geprüfte Kontakte und ein Ablauf, der nicht auf Zufall gebaut ist.",
        metaDescription:
            "Sicherheit bei Workfare: klare Rollen, geprüfte Kontakte, Jugendschutz und transparente Freigaben für sichere Taschengeldjobs.",
    },
    demnaechst: {
        path: "/demnaechst",
        navLabel: "In Planung",
        eyebrow: "In Planung",
        title: "Wird vorbereitet",
        description:
            "Dieser Bereich bleibt bewusst reduziert, bis Inhalt und Funktion feststehen. Keine leere Seite, kein künstliches Versprechen.",
        metaDescription:
            "Ein vorbereiteter Workfare-Bereich für kommende Inhalte und Funktionen.",
    },
} as const;
