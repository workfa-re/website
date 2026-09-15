# Sicherheitsseite · 15. September 2026

Die Sicherheitsseite ersetzt den bisherigen Platzhalter unter `/sicherheit`. Die Gestaltung folgt den freigegebenen Kontakt- und Einblicke-Seiten.

## Gestaltung und Struktur

| Before | After |
| --- | --- |
| `src/app/sicherheit/page.tsx` zeigte einen weitgehend leeren Platzhalter mit zusätzlicher kleiner Rubrikzeile. | `SafetyPage.tsx` enthält einen klaren Einstieg, drei kurze Grundlagen, eine vierteilige Checkliste und direkte Hilfe. |
| Eigener großflächiger Hintergrund und abweichende Typografie. | Gleicher `SiteHeader`, gleiche Breite und Seitenabstände, gleicher Hintergrund und `PixelShaderBackdrop` im ruhigen Modus wie auf Kontakt und Einblicke. Position, Maskierung und Deckkraft sind identisch. |
| Keine strukturierten Sicherheitsinhalte. | Kurze Hinweise zu Absprachen, Elternbeteiligung und persönlicher Information stehen in drei Glasflächen. Die Checkliste verwendet eine ruhigere nummerierte Liste mit Trennlinien. |
| Keine passenden Glasflächen auf der Seite. | `SafetyPage.module.css` verwendet die gemeinsamen `--glass-surface-*`-Werte einschließlich Rand- und Innenreflex. 24-Pixel-Außenradius und 22-Pixel-Innenradius bei 2 Pixel Abstand passen zusammen. |
| Keine eigenen responsiven Inhaltsbereiche. | Grundlagen und Checkliste wechseln auf kleineren Bildschirmen in eine Spalte. Hilfe steht ab 640 Pixeln zweispaltig; E-Mail-Adressen dürfen bei Bedarf umbrechen. |
| Keine abgestimmte Einblendung. | Titel, Einleitung und Grundlagen erscheinen kurz gestaffelt. Reduzierte Bewegung deaktiviert diese Effekte; der vorhandene Shader bleibt dann statisch. |
| Allgemeiner Footer-Chat ohne Bezug zum Anliegen. | Ein Hilfebereich verlinkt Support, Datenschutz und die Kontaktseite; der doppelte Chatblock entfällt. Die beiden E-Mail-Zeilen richten sich auf Desktop aneinander aus. |

## Inhalte und Auffindbarkeit

| Before | After |
| --- | --- |
| Der Platzhalter erwähnte pauschal geprüfte Kontakte. | Die Seite gibt konkrete Orientierung, ohne unbestätigte Verifizierungs-, Versicherungs-, Zahlungs- oder Reaktionsgarantien zu behaupten. |
| Support und Datenschutz waren auf der Sicherheitsseite nicht direkt erreichbar. | Mailto-Ziele stammen aus `siteConfig.supportEmail` und `siteConfig.privacyEmail`. Die Datenschutzerklärung ist ausdrücklich als die dieser Website bezeichnet. |
| Open-Graph- und Twitter-Titel nannten JobBridge. | Titel, Beschreibung und Vorschaumetadaten beziehen sich auf Workfare und die sichtbaren Inhalte. Canonical und vorhandener Sitemap-Pfad bleiben `/sicherheit`. |
| Ein separater Sicherheits-Platzhalter wurde zentral gepflegt. | Der nicht mehr benötigte Eintrag in `placeholderPages` ist entfernt; es bestehen keine weiteren Referenzen darauf. |

Die Inhalte leiten sich aus den bisherigen Grundsätzen der Website ab und ergänzen allgemeine praktische Hinweise. Die Arbeit umfasst keine Prüfung oder Änderung der Plattform-Sicherheitsmechanismen. Postfachempfang, automatische Moderation oder garantierte Bearbeitungszeiten wurden nicht behauptet oder getestet.

## Prüfung

- Vollständiges Lint, Produktionsbuild einschließlich TypeScript und `npm run seo:verify` bestanden. Nach der abschließenden Ausrichtung der Hilfezeilen wurden Lint und Build erneut erfolgreich ausgeführt.
- Produktions-HTML: eine H1, Titel `Sicherheit | Workfare`, Canonical `https://workfa.re/sicherheit`, Workfare-Open-Graph-Metadaten und korrekte zentrale Mailto-Adressen.
- Browserprüfung bei 1280 × 720, 768 × 1024, 390 × 844 und 320 × 568: kein horizontaler Überlauf. Einstiege, Checkliste und Hilfebereich visuell geprüft.
- Beide Hilfe-Anker zeigen auf einen vorhandenen Abschnitt; der Sprung wurde auf Desktop und Mobile ausgeführt. Seitenlinks verwenden die bestehenden Kontakt- und Datenschutzrouten. Neue Inhaltslinks haben mindestens 44 Pixel Höhe, die E-Mail-Zeilen 48 Pixel.
- Unabhängige Code- und Inhaltsprüfung: keine konkreten Befunde zu Shader, Glasmaterial, Layout, Bedienbarkeit oder Metadaten. Sicherheitsfunktionen werden nicht aus Marketingformulierungen als garantiert abgeleitet.
- Ein erneuter Turbopack-Build scheiterte zunächst an einem nicht erlaubten lokalen Hilfsport; der Fehler blieb im Build-Cache gespeichert. Nach erfolgreichem Loopback-Test wurde ausschließlich `.next/cache/turbopack` reversibel nach `/private/tmp` verschoben. Der reguläre Produktionsbuild mit frischem Cache bestand anschließend vollständig. Projektkonfiguration und Dev-Server wurden dafür nicht geändert.

Der Nutzer hat die Sicherheitsseite nach Ansicht der Desktop- und Mobile-Vorschau für Commit und Push freigegeben.
