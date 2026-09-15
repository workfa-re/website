import type { ContactDepartment } from "@/components/contact/ContactPage";
import { siteConfig } from "@/config/site";

export const contactDepartments = [
    {
        id: "allgemein",
        title: "Allgemein",
        description: "Für deine Fragen, Ideen oder eine Zusammenarbeit mit Workfare.",
        email: siteConfig.contactEmail,
    },
    {
        id: "support",
        title: "Support",
        description: "Für Fragen zu deinem Konto, zu Jobs oder bei technischen Problemen.",
        email: siteConfig.supportEmail,
    },
    {
        id: "presse",
        title: "Presse",
        description: "Für Interviews, Medienanfragen und Berichte über Workfare.",
        email: siteConfig.pressEmail,
    },
    {
        id: "datenschutz",
        title: "Datenschutz",
        description: "Für Fragen zu deinen persönlichen Daten, Auskunft oder Löschung.",
        email: siteConfig.privacyEmail,
    },
] as const satisfies readonly ContactDepartment[];
