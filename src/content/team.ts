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
        slug: "tim-lohmeier",
        name: "Tim Lohmeier",
        displayName: "Tim Lohmeier",
        shortName: "Tim",
        role: "Produktentwicklung Workfare Edu",
        description:
            "Tim entwickelt im Workfare Lab die Grundlagen für Workfare Edu: eine Lernplattform, auf der Jugendliche bezahlbare Nachhilfe finden und eigenes Wissen fair weitergeben können.",
        profileIntro:
            "Viele Schüler brauchen Hilfe in Mathe, Englisch oder anderen Fächern, doch gute Nachhilfe ist oft teuer oder schwer zu organisieren. Gleichzeitig gibt es Jugendliche, die ein Fach stark beherrschen, anderen helfen möchten und sich dabei fair etwas dazuverdienen wollen. Workfare Edu soll daraus einen klaren, lokalen Lernweg machen: verständliche Profile, passende Lernhilfe und ein Ablauf, der für Schüler, Eltern und Nachhilfegebende nachvollziehbar bleibt.",
        location: "Rheinbach, Deutschland",
        profilePath: "/team/tim-lohmeier",
        focus: [
            "Bedarf von Schülern und Eltern in Rheinbach verstehen",
            "Nachhilfeprofile, Fachbereiche und Verfügbarkeiten klar strukturieren",
            "Faire Regeln für Kontakt, Vertrauen und sichere Lernhilfe entwickeln",
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
                label: "Workfare Lab",
                value: "kontakt@workfare.team",
                description: "Kontakt für Fragen zu Workfare Edu und dem Workfare Lab.",
                href: "mailto:kontakt@workfare.team",
            },
        ],
        profileLinks: [
            {
                label: "Projekt",
                value: "Workfare Edu",
                description: "Ein neues Lernplattform-Projekt in der Anfangsphase.",
            },
            {
                label: "Standort",
                value: "Workfare Rheinbach",
                description: "Lokaler Ausgangspunkt für die Arbeit an Workfare Edu.",
            },
            {
                label: "Kontakt",
                value: "tim.lohmeier@workfare.team",
                description: "Direkter Kontakt zu Tim.",
                href: "mailto:tim.lohmeier@workfare.team",
            },
        ],
        knowsAbout: [
            "Workfare Edu",
            "Workfare Lab",
            "Nachhilfe für Schüler",
            "digitale Lernplattformen",
            "Rheinbach",
            "Taschengeldjobs durch Wissensvermittlung",
        ],
        sameAs: [`${siteConfig.url}/team/tim-lohmeier`],
    },
    {
        slug: "tobias-rohm",
        name: "Tobias Rohm",
        displayName: "Tobias Rohm",
        shortName: "Tobias",
        role: "Content & Social Media Manager",
        description:
            "Tobias arbeitet in der Abteilung Marketing und Kommunikation als Content & Social Media Manager und macht Workfare auf den richtigen Kanälen verständlich.",
        profileIntro:
            "Workfare braucht nicht nur eine gute Plattform, sondern auch klare Kommunikation. Tobias arbeitet in der Abteilung Marketing und Kommunikation daran, Inhalte, Social-Media-Auftritte und öffentliche Botschaften so aufzubereiten, dass die Idee hinter Workfare verständlich bleibt und die richtigen Menschen erreicht.",
        location: "Rheinbach, Deutschland",
        profilePath: "/team/tobias-rohm",
        focus: [
            "Content-Planung für Workfare und öffentliche Updates",
            "Social-Media-Kommunikation für Jugendliche, Eltern und Auftraggeber",
            "Marketing und Kommunikation rund um die digitale Taschengeldbörse",
        ],
        contactLinks: [
            {
                kind: "direct-email",
                label: "E-Mail",
                value: "tobias.rohm@workfare.team",
                description: "Direkter Kontakt zu Tobias.",
                href: "mailto:tobias.rohm@workfare.team",
            },
        ],
        profileLinks: [
            {
                label: "E-Mail",
                value: "tobias.rohm@workfare.team",
                description: "Direkter Kontakt zu Tobias.",
                href: "mailto:tobias.rohm@workfare.team",
            },
            {
                label: "Arbeitsort",
                value: "Rheinbach, Deutschland",
                description: "Arbeitsort und lokaler Bezug der Rolle.",
            },
            {
                label: "Abteilung",
                value: "Marketing und Kommunikation",
                description: "Schwerpunkt in Content, Social Media und externer Kommunikation.",
            },
            {
                label: "Adresse",
                value: "Rheinbach",
                description: "Geschäftlicher Standort.",
            },
        ],
        knowsAbout: [
            "Content",
            "Social Media",
            "Marketing und Kommunikation",
            "Workfare",
            "digitale Taschengeldbörse",
            "Rheinbach",
        ],
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
