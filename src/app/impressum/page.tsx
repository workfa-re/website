import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { LegalDefinitionRows, LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { siteConfig } from "@/config/site";

const updatedAt = "14. September 2026";
const platformImprintUrl = "https://app.jobbridge.app/legal/impressum";

export const metadata: Metadata = {
    title: "Impressum",
    description:
        "Impressum und Anbieterkennzeichnung für workfa.re: verantwortliche Angaben, Kontakt und Abgrenzung zur Plattform.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/impressum",
    },
    openGraph: {
        title: `Impressum | ${siteConfig.name}`,
        description:
            `Anbieterkennzeichnung, Kontakt und rechtliche Abgrenzung der ${siteConfig.name}-Landingpage.`,
        url: "/impressum",
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title: `Impressum | ${siteConfig.name}`,
        description:
            `Anbieterkennzeichnung, Kontakt und rechtliche Abgrenzung der ${siteConfig.name}-Landingpage.`,
        images: [socialPreview.url],
    },
};

export default function ImpressumPage() {
    return (
        <LegalPageLayout
            title="Impressum"
            description="Anbieterkennzeichnung und Kontakt für workfa.re."
            updatedAt={updatedAt}
        >
            <LegalSection title="Anbieter">
                <p>
                    Angaben nach § 5 Digitale-Dienste-Gesetz und, soweit einschlägig, nach § 18
                    Medienstaatsvertrag.
                </p>
                <LegalDefinitionRows
                    items={[
                        {
                            term: "Diensteanbieter",
                            description: (
                                <>
                                    Rezan Aaron Yalcin
                                    <br />
                                    {siteConfig.name}
                                </>
                            ),
                        },
                        {
                            term: "Anschrift",
                            description: (
                                <>
                                    Am Neuen Wasserwerk 3
                                    <br />
                                    53359 Rheinbach
                                    <br />
                                    Deutschland
                                </>
                            ),
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection title="Kontakt">
                <p>
                    Für Anfragen zur Website, Hinweise zu Inhalten oder allgemeine Kontaktaufnahme erreichen Sie
                    uns per E-Mail.
                </p>
                <p>
                    <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-blue-200 transition-colors hover:text-white"
                    >
                        <Mail className="mr-2 inline-block h-4 w-4 align-[-0.125em]" aria-hidden="true" />
                        {siteConfig.contactEmail}
                    </a>
                </p>
            </LegalSection>

            <LegalSection title="Redaktionelle Verantwortung">
                <p>
                    Verantwortlich für journalistisch-redaktionelle Inhalte im Sinne des § 18 Abs. 2
                    Medienstaatsvertrag, soweit solche Inhalte auf dieser Landingpage vorliegen:
                </p>
                <LegalDefinitionRows
                    items={[
                        {
                            term: "Name",
                            description: "Rezan Aaron Yalcin",
                        },
                        {
                            term: "Anschrift",
                            description: (
                                <>
                                    Am Neuen Wasserwerk 3
                                    <br />
                                    53359 Rheinbach
                                    <br />
                                    Deutschland
                                </>
                            ),
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection title="Abgrenzung zur Plattform">
                <p>
                    Dieses Impressum gilt für die Landingpage <strong className="text-white">workfa.re</strong>.
                    Die Plattform unter{" "}
                    <a href="https://app.jobbridge.app" className="text-blue-200 transition-colors hover:text-white">
                        app.jobbridge.app
                    </a>{" "}
                    ist ein eigener Bereich mit separaten rechtlichen Angaben.
                </p>
                <p>
                    Das Impressum der Plattform finden Sie unter{" "}
                    <a
                        href={platformImprintUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 transition-colors hover:text-white"
                    >
                        app.jobbridge.app/legal/impressum <ArrowUpRight className="inline-block h-3.5 w-3.5 align-[-0.125em]" aria-hidden="true" />
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection title="Streitbeilegung">
                <p>
                    Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
                <p className="text-sm leading-6 text-slate-400">
                    Die frühere EU-Plattform zur Online-Streitbeilegung ist seit dem 20. Juli 2025 eingestellt.
                </p>
            </LegalSection>

            <LegalSection title="Inhalte und Rechte">
                <p>
                    Die Inhalte dieser Landingpage wurden sorgfältig erstellt. Für Inhalte externer Websites,
                    auf die wir verlinken, ist der jeweilige Anbieter verantwortlich. Bei konkreten Hinweisen
                    auf rechtswidrige Inhalte prüfen wir den betroffenen Link.
                </p>
                <p>
                    Texte, Gestaltung, Markenbestandteile und sonstige Inhalte dieser Landingpage sind
                    urheberrechtlich geschützt, soweit sie nicht anders gekennzeichnet sind. Eine Nutzung
                    außerhalb der gesetzlichen Grenzen bedarf der vorherigen Zustimmung des jeweiligen
                    Rechteinhabers.
                </p>
                <p className="text-sm leading-6 text-slate-400">
                    Die Datenschutzhinweise zur Landingpage finden Sie unter{" "}
                    <Link href="/datenschutz" className="text-blue-200 transition-colors hover:text-white">
                        Datenschutz
                    </Link>
                    .
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}
