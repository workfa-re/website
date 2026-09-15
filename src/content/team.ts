import { siteConfig } from "@/config/site";

export type TeamMember = {
    slug: string;
    name: string;
    displayName: string;
    shortName: string;
    role: string;
    description: string;
    profileIntro: string;
    location: string;
    profilePath: string;
    profilePending?: boolean;
    profileImage?: {
        src: string;
        alt: string;
        position?: string;
    };
    focus: string[];
    contactLinks: {
        kind: "direct-email" | "team-email" | "instagram" | "phone" | "website" | "external-profile";
        label: string;
        value: string;
        description: string;
        href: string;
    }[];
    profileLinks: {
        label: string;
        value: string;
        description: string;
        href?: string;
    }[];
    knowsAbout: string[];
    sameAs?: string[];
};

export const teamMembers = [
    {
        slug: "rezan",
        name: "Rezan Yalcin",
        displayName: "Rezan Yalcin",
        shortName: "Rezan",
        role: "Gründer von Workfare",
        description:
            "Rezan entwickelt Workfare aus der eigenen Erfahrung heraus: Jugendliche sollen lokale Taschengeldjobs fairer, transparenter und sicherer finden können.",
        profileIntro:
            "Viele Jugendliche möchten sich lokal etwas dazuverdienen, finden aber kaum einen einfachen, sicheren und nachvollziehbaren Weg. Gleichzeitig suchen ältere Menschen, Familien und Nachbarn Unterstützung im Alltag, ohne direkt zu wissen, wen sie vertrauensvoll fragen können. Aus dieser Lücke entsteht Workfare: eine Plattform, die lokale Hilfe einfacher macht und beide Seiten sicherer zusammenbringt.",
        location: "Rheinbach, Deutschland",
        profilePath: "/team/rezan-yalcin",
        profileImage: {
            src: "/team/rezan-yalcin-portrait.jpeg",
            alt: "Porträt von Rezan Yalcin.",
            position: "center 35%",
        },
        focus: [
            "Produktentwicklung und Nutzerführung",
            "Jugendschutz, Sicherheit und klare Freigaben",
            "Lokale Taschengeldjobs für Jugendliche und Auftraggeber",
        ],
        contactLinks: [
            {
                kind: "direct-email",
                label: "Direkt",
                value: "rezan.yalcin@workfare.team",
                description: "Persönlicher Kontakt zu Rezan.",
                href: "mailto:rezan.yalcin@workfare.team",
            },
            {
                kind: "team-email",
                label: "Workfare Team",
                value: "kontakt@workfare.team",
                description: "Für Medien, Kooperationen und organisatorische Rückfragen.",
                href: "mailto:kontakt@workfare.team",
            },
            {
                kind: "instagram",
                label: "Instagram",
                value: "@rezanycn",
                description: "Öffentliche Updates und kurze Einblicke.",
                href: "https://www.instagram.com/rezanycn/",
            },
            {
                kind: "external-profile",
                label: "Jugend forscht",
                value: "Offizielles Profil",
                description: "Projekteintrag zum damaligen Projekt JobBridge beim Bundeswettbewerb 2026.",
                href: "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
            },
        ],
        profileLinks: [
            {
                label: "Einblicke",
                value: "Beiträge und Medienberichte",
                description: "Gesammelte Berichte, eigene Texte und Updates rund um Workfare.",
                href: "/einblicke/alle",
            },
            {
                label: "Jugend forscht",
                value: "4. Preis Arbeitswelt",
                description: "Offizieller Projekteintrag zum damaligen Projekt JobBridge beim Bundeswettbewerb 2026.",
                href: "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
            },
            {
                label: "WDR",
                value: "Studiogespräch und Beitrag",
                description: "Öffentliche Berichterstattung über Rezan Yalcin und das damalige Projekt JobBridge.",
                href: "https://www1.wdr.de/mediathek/video/sendungen/lokalzeit-bonn/studiogespraech-rezan-yalin-app-entwickler-100.html",
            },
            {
                label: "Kontakt",
                value: "kontakt@workfare.team",
                description: "Für Medien, Kooperationen und offizielle Rückfragen zu Workfare.",
                href: "mailto:kontakt@workfare.team",
            },
        ],
        knowsAbout: [
            "Workfare",
            "sichere Taschengeldjobs",
            "Jugendschutz",
            "digitale Plattformen",
            "Rheinbach",
        ],
        sameAs: [
            siteConfig.url,
            "https://ray-group.eu",
            "https://www.instagram.com/rezanycn/",
            "https://www1.wdr.de/nrw/rheinland/rhein-sieg-kreis/rezan-job-app-rheinbach-100.html",
            "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
        ],
    },
    {
        slug: "metin-yalcin",
        name: "Metin Yalcin",
        displayName: "Metin Yalcin",
        shortName: "Metin",
        role: "Geschäftsführer",
        description: "Metin Yalcin ist Geschäftsführer von Workfare.",
        profileIntro: "Metin Yalcin übernimmt die Geschäftsführung von Workfare.",
        location: "",
        profilePath: "/team/metin-yalcin",
        focus: ["Geschäftsführung"],
        contactLinks: [
            {
                kind: "team-email",
                label: "Workfare Team",
                value: "kontakt@workfare.team",
                description: "Kontakt zur Geschäftsführung über das Workfare Team.",
                href: "mailto:kontakt@workfare.team",
            },
        ],
        profileLinks: [],
        knowsAbout: ["Workfare"],
    },
    {
        slug: "cueneyt-celik",
        name: "Cüneyt Celik",
        displayName: "Cüneyt Celik",
        shortName: "Cüneyt",
        role: "Business Angel & erweiterte Geschäftsführung",
        description:
            "Cüneyt Celik begleitet Workfare als Business Angel und gehört zur erweiterten Geschäftsführung.",
        profileIntro:
            "Cüneyt Celik ist als Business Angel und in der erweiterten Geschäftsführung bei Workfare tätig.",
        location: "",
        profilePath: "/team/cueneyt-celik",
        focus: ["Business Angel", "Erweiterte Geschäftsführung"],
        contactLinks: [
            {
                kind: "team-email",
                label: "Workfare Team",
                value: "kontakt@workfare.team",
                description: "Kontakt zu Cüneyt über das Workfare Team.",
                href: "mailto:kontakt@workfare.team",
            },
        ],
        profileLinks: [],
        knowsAbout: ["Workfare"],
    },
    {
        slug: "tim-lohmeier",
        name: "Tim Lohmeier",
        displayName: "Tim Lohmeier",
        shortName: "Tim",
        role: "Mitarbeiter Produktentwicklung",
        description:
            "Tim unterstützt die Produktentwicklung bei Workfare. Er testet einfache Bedienabläufe, dokumentiert Fehler und gibt Rückmeldungen zur Nutzerfreundlichkeit.",
        profileIntro:
            "Tim prüft die Plattform aus Nutzersicht: Sind die einzelnen Schritte verständlich und funktionieren sie wie erwartet? Er hält Unklarheiten fest und bespricht seine Beobachtungen mit dem Produktteam.",
        location: "Rheinbach, Deutschland",
        profilePath: "/team/tim-lohmeier",
        profileImage: {
            src: "/team/tim-lohmeier-portrait.jpg",
            alt: "Porträt von Tim Lohmeier.",
            position: "center 30%",
        },
        focus: [
            "Einfache Bedienabläufe auf der Workfare-Plattform prüfen",
            "Unklare Schritte und kleine Fehler notieren",
            "Rückmeldungen mit dem Produktteam besprechen",
        ],
        contactLinks: [
            {
                kind: "direct-email",
                label: "Direkt",
                value: "tim.lohmeier@workfare.team",
                description: "Persönlicher Kontakt zu Tim.",
                href: "mailto:tim.lohmeier@workfare.team",
            },
            {
                kind: "team-email",
                label: "Workfare Team",
                value: "kontakt@workfare.team",
                description: "Kontakt für allgemeine Fragen zu Workfare.",
                href: "mailto:kontakt@workfare.team",
            },
            {
                kind: "external-profile",
                label: "LinkedIn",
                value: "LinkedIn",
                description: "Das LinkedIn-Profil von Tim Lohmeier.",
                href: "https://www.linkedin.com/in/tim-lohmeier-214493437",
            },
        ],
        profileLinks: [
            {
                label: "Aufgabenbereich",
                value: "Produktentwicklung bei Workfare",
                description: "Bedienabläufe prüfen und Rückmeldungen zur Nutzerfreundlichkeit sammeln.",
            },
            {
                label: "Kontakt",
                value: "tim.lohmeier@workfare.team",
                description: "Direkter Kontakt zu Tim.",
                href: "mailto:tim.lohmeier@workfare.team",
            },
        ],
        knowsAbout: ["Workfare", "Bedienabläufe", "Nutzerfeedback"],
        sameAs: [
            `${siteConfig.url}/team/tim-lohmeier`,
            "https://www.linkedin.com/in/tim-lohmeier-214493437",
        ],
    },
    {
        slug: "tobias-rohm",
        name: "Tobias Rohm",
        displayName: "Tobias Rohm",
        shortName: "Tobias",
        role: "Rolle folgt",
        description: "Dieses Profil wird ergänzt.",
        profileIntro: "Platzhalter: Informationen zu Tobias' Rolle und Aufgaben folgen.",
        location: "",
        profilePath: "/team/tobias-rohm",
        profilePending: true,
        focus: [],
        contactLinks: [
            {
                kind: "direct-email",
                label: "E-Mail",
                value: "tobias.rohm@workfare.team",
                description: "Direkter Kontakt zu Tobias.",
                href: "mailto:tobias.rohm@workfare.team",
            },
        ],
        profileLinks: [],
        knowsAbout: [],
        sameAs: [`${siteConfig.url}/team/tobias-rohm`],
    },
] as const satisfies TeamMember[];

export type TeamMemberSlug = (typeof teamMembers)[number]["slug"];

export function getTeamMember(slug: string): TeamMember | undefined {
    return teamMembers.find((member) => member.slug === slug);
}

export function getTeamProfileSlug(member: Pick<TeamMember, "profilePath">): string {
    return member.profilePath.replace(/^\/team\//, "");
}

export function getTeamMemberByProfileSlug(profileSlug: string): TeamMember | undefined {
    return teamMembers.find((member) => getTeamProfileSlug(member) === profileSlug);
}
