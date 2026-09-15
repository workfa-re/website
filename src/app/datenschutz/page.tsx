import { socialPreview } from "@/config/brand";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { LegalDefinitionRows, LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { siteConfig } from "@/config/site";

const updatedAt = "14. September 2026";
const platformPrivacyUrl = "https://app.jobbridge.app/legal/datenschutz";

export const metadata: Metadata = {
    title: "Datenschutz",
    description:
        `Datenschutzhinweise für workfa.re: welche Daten auf der ${siteConfig.name}-Landingpage entstehen, wofür sie genutzt werden und welche Rechte bestehen.`,
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/datenschutz",
    },
    openGraph: {
        title: `Datenschutz | ${siteConfig.name}`,
        description:
            `Klarer Überblick über Datenverarbeitung, Kontakt, Chat, Hosting und Rechte auf der ${siteConfig.name}-Landingpage.`,
        url: "/datenschutz",
        images: [socialPreview],
    },
    twitter: {
        card: "summary_large_image",
        title: `Datenschutz | ${siteConfig.name}`,
        description:
            `Klarer Überblick über Datenverarbeitung, Kontakt, Chat, Hosting und Rechte auf der ${siteConfig.name}-Landingpage.`,
        images: [socialPreview.url],
    },
};

const rights = [
    "Auskunft",
    "Berichtigung",
    "Löschung",
    "Einschränkung",
    "Datenübertragbarkeit",
    "Widerspruch",
    "Beschwerde bei einer Aufsichtsbehörde",
];

export default function DatenschutzPage() {
    return (
        <LegalPageLayout
            title="Datenschutz"
            description={
                <>
                    Diese Hinweise erklären, welche Daten auf der {siteConfig.name}-Landingpage entstehen, wofür sie
                    genutzt werden und welche Rechte Sie haben.
                </>
            }
            updatedAt={updatedAt}
        >
            <LegalSection title="Geltungsbereich">
                <p>
                    Diese Datenschutzhinweise gelten für die Website <strong className="text-white">workfa.re</strong>.
                    Die Plattform unter{" "}
                    <a href="https://app.jobbridge.app" className="text-blue-200 transition-colors hover:text-white">
                        app.jobbridge.app
                    </a>{" "}
                    ist ein eigener Bereich und verarbeitet andere Daten, etwa wenn dort Konten, Jobs,
                    Kommunikation, Verifizierungen oder Zahlungen genutzt werden.
                </p>
                <p>
                    Für die Plattform gelten die dort veröffentlichten{" "}
                    <a
                        href={platformPrivacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 transition-colors hover:text-white"
                    >
                        Datenschutzhinweise <ArrowUpRight className="inline-block h-3.5 w-3.5 align-[-0.125em]" aria-hidden="true" />
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection title="Verantwortlicher">
                <p>
                    Verantwortlich für diese Landingpage ist Rezan Aaron Yalcin, {siteConfig.name}, Am Neuen Wasserwerk
                    3, 53359 Rheinbach, Deutschland.
                </p>
                <LegalDefinitionRows
                    items={[
                        {
                            term: "E-Mail",
                            description: (
                                <a
                                    href="mailto:rezan.yalcin@workfare.team"
                                    className="text-blue-200 transition-colors hover:text-white"
                                >
                                    <Mail className="mr-2 inline-block h-4 w-4 align-[-0.125em]" aria-hidden="true" />
                                    rezan.yalcin@workfare.team
                                </a>
                            ),
                        },
                        {
                            term: "Datenschutz",
                            description:
                                "Ein Datenschutzbeauftragter ist für diese Landingpage derzeit nicht gesondert benannt.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection title="Seitenaufruf und Betrieb">
                <p>
                    Beim Aufruf der Website werden technisch notwendige Zugriffsdaten verarbeitet. Dazu können
                    IP-Adresse, Datum und Uhrzeit, angeforderte URL, Referrer, Browser- und Geräteinformationen,
                    übertragene Datenmenge sowie Status- und Fehlermeldungen gehören.
                </p>
                <p>
                    Zweck ist die sichere Auslieferung der Website, die Stabilität des Betriebs, die
                    Fehleranalyse und die Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                    Unser berechtigtes Interesse liegt im sicheren und funktionsfähigen Betrieb dieser Website.
                </p>
                <LegalDefinitionRows
                    items={[
                        {
                            term: "Hosting",
                            description: "Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland.",
                        },
                        {
                            term: "Logdaten",
                            description:
                                "Server-Logs werden in der Regel nach 7 Tagen gelöscht. Eine längere Speicherung erfolgt nur, wenn sie zur Aufklärung von Sicherheits- oder Missbrauchsfällen erforderlich ist.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection title="Kontakt und Chat">
                <p>
                    Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, den Inhalt Ihrer
                    Nachricht und die für die E-Mail-Übermittlung üblichen Metadaten. Zweck ist die Bearbeitung
                    Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, bei vorvertraglichen
                    Anfragen zusätzlich Art. 6 Abs. 1 lit. b DSGVO.
                </p>
                <p>
                    Der Chat im Footer wird erst geladen, wenn Sie <span className="text-white">Chat öffnen</span>{" "}
                    auswählen. Dann wird das Microsoft/Teams-Customer-Connect-Widget eingebunden. Für diese
                    Kommunikation können Daten durch Microsoft Ireland Operations Limited verarbeitet werden.
                </p>
                <LegalDefinitionRows
                    items={[
                        {
                            term: "E-Mail",
                            description: "Microsoft Ireland Operations Limited (Microsoft 365 / Exchange Online).",
                        },
                        {
                            term: "Speicherdauer",
                            description:
                                "Kontaktanfragen werden spätestens 6 Monate nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Nachweisinteressen entgegenstehen.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection title="Cookies, Tracking und externe Links">
                <p>
                    Auf dieser Landingpage setzen wir keine Analyse- oder Marketing-Skripte ein und verwenden
                    keine Tracking-Cookies. Technisch notwendige Funktionen können verarbeitet werden, soweit sie
                    für die Bereitstellung der Seite erforderlich sind.
                </p>
                <p>
                    Wenn Sie externe Links öffnen, verlassen Sie diese Website. Für externe Angebote, die
                    Plattform und eingebundene Dienste gelten die Datenschutzhinweise des jeweiligen Anbieters.
                </p>
            </LegalSection>

            <LegalSection title="Empfänger und Übermittlungen">
                <p>
                    Empfänger personenbezogener Daten können technische Dienstleister sein, die wir für Hosting,
                    Sicherheit, Auslieferung der Website, E-Mail-Kommunikation oder den Chat einsetzen. Dazu
                    gehören insbesondere Hetzner Online GmbH und Microsoft Ireland Operations Limited.
                </p>
                <p>
                    Sofern Dienstleister Daten außerhalb der EU oder des EWR verarbeiten, erfolgt dies nur auf
                    Grundlage geeigneter Schutzmechanismen, etwa eines Angemessenheitsbeschlusses oder
                    EU-Standardvertragsklauseln.
                </p>
            </LegalSection>

            <LegalSection title="Ihre Rechte">
                <p>
                    Sie können nach Maßgabe der DSGVO Rechte gegenüber dem Verantwortlichen geltend machen.
                    Dazu gehören:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    {rights.map((right) => (
                        <li key={right}>
                            {right}
                        </li>
                    ))}
                </ul>
                <p>
                    Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für
                    Nordrhein-Westfalen ist dies die Landesbeauftragte für Datenschutz und Informationsfreiheit
                    Nordrhein-Westfalen.
                </p>
            </LegalSection>

            <LegalSection title="Aktualisierung">
                <p>
                    Wir passen diese Hinweise an, wenn sich die Website, eingesetzte Dienstleister oder
                    rechtliche Anforderungen ändern. Maßgeblich ist die jeweils hier veröffentlichte Fassung.
                </p>
                <p className="text-sm text-slate-400">
                    Weitere rechtliche Angaben finden Sie im{" "}
                    <Link href="/impressum" className="text-blue-200 transition-colors hover:text-white">
                        Impressum
                    </Link>
                    .
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}
