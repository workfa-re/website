# Workfare: Kleine Verbesserungen am bestehenden Design

Stand: 14. September 2026. Verbindlicher Rahmen: **kein Redesign, keine helle neue Markenwelt, keine weiteren Bildentwürfe.** Farbwelt, Schriftfamilien und Hintergrundeffekte der Website sowie die Homepage-Reihenfolge bleiben. Auf ausdrücklichen neuen Nutzerwunsch ersetzt jetzt ein inszenierter Plattform-Startbildschirm die direkt eingebettete Live-Demo; die Anwendung öffnet separat auf `/demo`. Die Desktop-Aurora wurde bei gleicher Gestaltungsrichtung technisch entlastet; Darstellung und Ablauf sind geprüft, eine Netzwerk-Ladezeitverkürzung wurde nicht gemessen. Die Vorschläge betreffen gezielte Inhalts-, Lesbarkeits- und Bedienverbesserungen innerhalb des vorhandenen Designs.

Grundlage: Dateiinventur aller 81 ursprünglich getrackten Projektdateien, Codeprüfung aller Seitentypen, lokale Browserprüfungen und Primärquellenrecherche. Dieser Plan baut auf der bestehenden Website auf.

## Bereits umgesetzter lokaler Stand

- Paketkorrektur `a6f739e` ist lokal committed.
- Abgeschlossener UI-Stand für den lokalen Commit: gemeinsamer Header/Menu mit nativem Dialog und Fokusführung. Die ursprüngliche Menüanimation mit Slide, gestaffelten Links, Word-Roll und Hoverrotation ist wiederhergestellt. Die Nebenlinks stehen im normalen Fluss über einer dezenten, unten angeschnittenen Wortmarke am Fensterrand.
- Die vorhandene Brücke ersetzt das zwischenzeitliche Monoline-W und sitzt optisch einen Pixel höher. Workfare bleibt als Geist-Schriftzug sichtbar. Runde `.glass-control` und `.glass-button` teilen klare, neutrale Reflexe ohne künstliche Blauverläufe oder Sättigungsfilter.
- Hero-CTAs springen beim Hover nicht hoch. Die Serifüberschrift bleibt, mit lockererem Tracking von `-0.015em`, eng aufeinander abgestimmten Zeilen und kräftiger skalierter responsiver Größe.
- Kürzerer Hero-Text und Bereinigung ungenutzter Dateien/Assets sind ebenfalls bereits bearbeitet.
- **Vorheriger Prüfstand:** Build/TypeScript, Lint, SEO, 31 Domainprüfungen, OG-Bild, Header/Headline in acht Größen sowie Menübedienung wurden für eine frühere lokale Fassung geprüft. Zusätzlich ist der jüngste Stand mit Build/Lint, responsiven Browserprüfungen und 13 Aurora-Lifecycle-Prüfgruppen bestanden. Einzelheiten: `changes-2026-09-14.md`.

## Jüngste Korrekturen am Bestand

| Before | After |
|---|---|
| Zwischenzeitlich vereinfachte Navigation ohne ursprüngliche Bewegung. | Slide beim Öffnen/Schließen, gestaffelte Links, Word-Roll bei Hover/Fokus sowie Hoverrotation von Menü-/Schließen-Icon wiederhergestellt; Reduced Motion wird berücksichtigt. |
| Meta-Links und große Wortmarke getrennt angeordnet. | Gemeinsamer Menüfooter im normalen Fluss: Nebenlinks zuerst, dezente angeschnittene Wortmarke darunter. |
| Zwischenzeitliches Monoline-W. | Vorhandenes Brückenasset in `BrandMark.tsx`, 29 × 18 Pixel, optisch mit `-top-px` einen Pixel nach oben versetzt. |
| Glas mit 16-Pixel-Rundung beziehungsweise zwischenzeitlichen farbigen Effekten. | Vollrunde `.glass-control`/`.glass-button` mit gemeinsamen neutralen Reflexen, klarer Mitte und feiner Kante; kein Sättigungsfilter und kein künstlicher Blauverlauf im Glasmaterial. |
| Headerglas und sekundärer Hero-Button unterschiedlich gestaltet. | Gemeinsames Material; Headersteuerung 44 × 44 Pixel, Glasbutton mindestens 54 Pixel hoch. |
| Hero-CTAs bewegen sich beim Hover nach oben. | Rückmeldung nur über Fläche/Kante/Schatten, ohne Hochspringen. |
| Dichteres Tracking und enger zusammengerückte Herozeilen. | Instrument Serif bleibt; `-0.015em` Tracking, `1.06` Grundzeilenhöhe und `.18em` enger zusammengeführten Zeilen. |
| Frühere responsive Hero-Größenstaffelung. | `.hero-heading` nutzt `clamp(3rem, 15vw, 8rem)`, ab 1024 Pixeln `clamp(4.5rem, 9vw, 8.4rem)`; ohne horizontalen Überlauf in acht Größen geprüft. |
| Bisherige Desktop-Aurora-Implementierung. | CSS-Pixel mit Full-HD-Pixelbudget, Zielrate 30 Bilder/s, Pause bei unsichtbarem Hero/Tab; toten Scroll-Shaderpfad entfernt. Ablauf und Darstellung geprüft, keine gemessene Netzwerkbeschleunigung. |

## Prioritäten für die nächste kleine Runde

| Priorität | Konkreter Befund aus dem geprüften Bestand | Änderung innerhalb des vorhandenen Designs | Datei/Bereich |
|---|---|---|---|
| P1 | Aktuelle eigene JobBridge-Texte stehen noch in Homepage-Abschnitten, Teamprofilen, Einblicke-Seiten und Vorschaudaten. | In der nächsten Inhaltsrunde aktuelle eigene Marke vereinheitlichen; historische Fremdberichte, belegte Firmennamen, Quellen und URL-Pfade einzeln behandeln. | `FeatureSections`, `TrustNarrative`, Produktdemo, Team-/Einblicke-Inhalte und Metadaten, OG-Bild |
| P0 | Sicherheits-Slider kürzt Beschreibung mobil mit `line-clamp-4`. | Beschreibung vollständig lesbar machen; vorhandene Sliderform behalten und Höhe passend zum Inhalt wählen. | `src/components/FeatureSections.tsx`, Sicherheitsbeschreibung |
| P0 | Abschlussbutton blendet sein Label mit `group-hover:opacity-0` aus. | „Zur Plattform“ in jedem Zustand sichtbar halten. Form, Größe und Position bleiben. | `src/components/FeatureSections.tsx`, Abschluss-CTA |
| P0 | Sicherheit, Kontakt und Plattform nutzen noch `PlaceholderPage` statt eigentlicher Inhalte. | Im bestehenden dunklen Seitensystem echte Antworten ergänzen. Gestaltung nicht neu erfinden. | `src/app/sicherheit/page.tsx`, `src/app/kontakt/page.tsx`, `src/app/plattform/page.tsx` |
| P0 | Verifizierte Auftraggeber/moderierte Kommunikation werden als verfügbar beschrieben, andere Schutztexte als Absicht. | Tatsächlichen Funktionsstand bestätigen; vorhandene und geplante Funktionen konsistent formulieren. | Hero-Text, `FeatureSections.tsx`, `src/config/site.ts`, Sicherheitsseite |
| P1 | Kleine Hilfstexte kombinieren Grau und Transparenz über wechselnden Hintergründen. | Nur messbar kritische Textopazitäten lokal anheben. Bestehende Palette beibehalten. | Footer, Artikelkarten, Zielgruppen-/Sicherheitsbeschreibungen |
| P1 | Demo nennt konkrete Orte, Zeiten und Vergütungen. | Falls Testdaten: klein und eindeutig als Beispiel kennzeichnen. Kein Kartenumbau. | `src/components/ui/animated-hero.tsx`, `hero-scroll-demo.tsx` |
| P1 | Kontaktbereich hängt sichtbar stark am Chatwidget. | Funktionierenden E-Mail-/Kontaktweg unabhängig vom Widget erreichbar machen; Fehlerzustand verständlich. | `src/components/FooterChat.tsx`, Kontaktseite |
| P2 | Teamübersicht enthält vorbereitete zusätzliche Teamplätze. | Nur tatsächliche Personen als Team darstellen; leere Plätze nicht als Größeninszenierung verwenden. Kein neues Bildmaterial. | `src/components/team/TeamOverviewSection.tsx` |

Die Befunde stammen aus der gelesenen Ausgangsfassung. Vor Umsetzung gegen den laufenden Diff prüfen, damit bereits korrigierte Stellen nicht doppelt bearbeitet werden.

## Homepage: Bestehende Abschnitte gezielt prüfen

| Abschnitt | Was bleibt | Nächster sinnvoller Check |
|---|---|---|
| Hero | Dunkle Atmosphäre, Geist/Instrument Serif, Shader, Produktkarten, Aktionen | Neue Workfare-Nennung und gekürzten Text bei 320/390/1440 Pixel prüfen. Kein abgeschnittener Umbruch der vorhandenen `whitespace-nowrap`-Zeilen. |
| Plattformvorschau | Aktueller Plattform-Startbildschirm als statische Momentaufnahme; die übrige Website behält ihr Design | Jobkarten erscheinen einzeln beim Scrollen. Mobile Ausschnitte, Reduced Motion und JavaScript-freie Sichtbarkeit prüfen; „Live-Demo“ öffnet erst nach dem Klick die vollständige Anwendung auf `/demo`. |
| Vertrauenspassage | „Kleine Jobs. Klare Wege. Direkt in deiner Nähe.“, Anordnung und Pixelgestaltung | Text konsistent zur tatsächlichen Verfügbarkeit; Lesbarkeit über dem vorhandenen Hintergrund. |
| „Für wen?“ | Vier Zielgruppen, Raster, Symbole, Farben | Wiederholungen im Text kürzen. Jugendliche und Eltern innerhalb der bestehenden Karte verständlich unterscheiden. |
| Sicherheit | Slider, Nummerierung, Farbflächen, Detail-Link | Vollständige mobile Texte; Pfeile gut treffbar und benannt; Detail-Link bietet echte Antworten. |
| Abschluss | Form und Position | Label bleibt sichtbar, Beschriftung und tatsächliches Ziel passen zusammen. |
| Kontakt/Footer | Vorhandene dunkle Struktur | Kontakt funktioniert auch ohne Widget. Kleintexte/Fokus lesbar. Technische App-/Maildomains nur nach tatsächlicher Einrichtung ändern. |

## Headerglas: jetzige kleine Lösung fertig prüfen

Die bestehenden 44-Pixel-Steuerflächen bleiben der Umfang im Header. Das ursprüngliche Brückenzeichen sitzt scharf und deckend im runden Glas, der Workfare-Schriftzug daneben. `.glass-control` und `.glass-button` verwenden dasselbe Material mit neutralen Reflexen und klarer Mitte. Der aktuelle Code setzt `border-radius: 999px` und `blur(1.5px) brightness(1.04)` ein; künstliche Blauverläufe und Sättigungsfilter gehören nicht dazu. Der sekundäre Hero-Button nutzt dieses Material mit mindestens 54 Pixel Höhe. Keine zusätzliche große Glasleiste und keine neue Navigation.

Glas muss ohne Blur-Unterstützung noch als brauchbare Fläche erkennbar sein. Das native Menüdialog-Verhalten zusammen mit den wiederhergestellten Animationen prüfen: Öffnen, Schließ-Slide, gestaffelte Links, Word-Roll, Hoverrotation, Escape, Fokus innerhalb des Dialogs, Rückkehr zum Auslöser und Scrollfreigabe. Bei einer Navigation wartet der normale Linkklick das Schließen ab. Wortmarke und Linkleiste bleiben auch auf kleiner Bildschirmhöhe im normalen Fluss erreichbar. Die ursprünglichen Menüanimationen bleiben ausdrücklich erhalten.

Apple ordnet Glas der funktionalen Bedien- und Navigationsebene zu. Genau diese Begrenzung ist hier nützlich; die sparsame Web-Umsetzung ist unsere Ableitung. [Apple: Materialien](https://developer.apple.com/design/human-interface-guidelines/materials), [Apple: Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)

## Unterseiten: Inhalt statt neuer Gestaltung

| Seitentyp | Konkrete Ergänzung beziehungsweise Prüfung |
|---|---|
| `/plattform` | Unter bestehendem Kopf Voraussetzungen, tatsächliche Schritte, verfügbarer Umfang und Anwendungseinstieg erklären. Vorhandene Text-/Kartenmuster nutzen. |
| `/sicherheit` | Beantworten: Was wird geprüft? Welche Rolle haben Eltern? Was wird wann sichtbar? Wohin bei Problemen? Kurze Abschnitte und Anker reichen. |
| `/kontakt` | Funktionierende Kontaktadresse, Zweck und gegebenenfalls Presse-/Kooperationsweg. Formular nur bei tatsächlich funktionierendem Versand. |
| `/einblicke`, `/einblicke/alle` | Karten, Fotos und Überschriften behalten. Quellen, Datum, Fokus und Lesbarkeit prüfen. Eigene Texte und Medienberichte unterscheidbar halten. |
| Eigener Artikel `/einblicke/[slug]` | Autor, Datum, Bilder und Gliederung erhalten. Nur Lesebreite, Zeilenhöhe und Links konsistent machen. |
| Externer Bericht `/einblicke/[slug]` | Originalquelle und Datum klar, Original-Link erreichbar. Keine Berichterstattung als Partnerschaft oder Sicherheitszertifikat darstellen. |
| `/einblicke/team` | Echte Personen und Rollen zeigen; vorbereitete Plätze sachlich behandeln. |
| `/team/rezan-yalcin`, `/team/tim-lohmeier`, `/team/tobias-rohm`, `/team/[slug]` | Kontaktzustände und Abstände konsistent; persönliche Inhalte bewahren. Fehlende Fotos nicht durch künstliche Personen ersetzen. |
| `/impressum`, `/datenschutz` | Umgesetzt: gemeinsames kompaktes Layout mit Workfare-Header, größere Titel, erhaltene Rechtsangaben und umgestellte E-Mail-Adressen. Browser- und Inhaltsprüfung im Änderungsprotokoll. |
| `/demnaechst` | Falls benötigt: realen Status und funktionierenden Rückweg. Kein erfundenes Veröffentlichungsdatum. |
| `/blog`, `/team/rezan`, `/team/resan-yalcin` | Bestehende Weiterleitungen erhalten; keine neue Gestaltung. |
| Sitemap, RSS, News-Feed, OG, Manifest | Aktuelle eigene Marke konsistent; vorhandene URLs, Quellen und Redirects bewahren. |

## Texte und Belege

Vorhandene kurze Überschriften können bleiben. Konkretisieren sollte man die Erklärung darunter: „Verifiziert“ benötigt eine Beschreibung der tatsächlichen Prüfung; „moderiert“ benötigt einen verständlichen Ablauf; „Eltern sollen …“ und „Eltern können …“ sind unterschiedliche Produktstände.

„Schreib uns deine Frage“ ist verständlicher als „Wir melden uns sauber und nachvollziehbar zurück“. Antwortzeiten, Kostenfreiheit, bundesweite Verfügbarkeit und Alters-/Tätigkeitsregeln nur mit aktuellem Sachstand nennen. „Zur Plattform“ bleibt korrekt, solange es zum Anwendungseinstieg führt; „Jobs ansehen“ setzt tatsächlich direkt sichtbare Angebote voraus.

Keine erfundenen Zahlen, Sterne, Zitate, Partnerschaften, Siegel oder Garantien ergänzen. Reale Teamangaben und korrekt zugeordnete Berichte sind wertvolle Belege. Historische Artikel behalten Originaltitel und damaligen Kontext; aktuelle eigene Einordnung verwendet Workfare. Ein Wettbewerbsergebnis ist kein Nachweis unabhängiger Produktsicherheit.

## Lesbarkeit, Mobilgeräte und Medien

- Palette nicht ersetzen. Vorhandenes `#707782` auf deckendem `#02040b` ergibt rechnerisch etwa 4,54:1; `#808792` auf derselben Fläche etwa 5,66:1. Transparenz und Hintergrundeffekte verändern das Ergebnis. Das sind Beispielrechnungen, keine Freigabe aller gerenderten Zustände.
- WCAG 2.2 AA als Prüfzieldesign: normaler Text mindestens 4,5:1, großer Text mindestens 3:1; Fokus, Bedienflächen und Beschriftung ebenfalls prüfen. Farben allein bestätigen keine vollständige Zugänglichkeit. [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 44 × 44 CSS-Pixel als eigener guter Trefferflächenstandard behalten. WCAG 2.2 AA fordert grundsätzlich 24 × 24 oder passende Abstandsausnahmen; die größere Fläche ist eine bewusste Komfortentscheidung. [W3C: Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- 320/390 Pixel, geringe Bildschirmhöhe, 200 Prozent Zoom, lange deutsche Wörter und Reduced Motion prüfen. Kein allgemeiner Umbau der mobilen Struktur.
- Der Hero-Shader bleibt. Die neue Plattformvorschau erhält eine einmalige Kartenstaffelung; Reduced Motion, Sichtbarkeit ohne JavaScript und erreichbare Informationen testen. Keine Endlosschleife und keine Anmeldung auf der Startseite.
- Keine Fotokampagne, generierten Bilder oder neuen Videos. Bestehendes Material behalten; nur Ausschnitt, Qualität, Alternativtexte und Nutzungsrahmen prüfen.

## Referenzen nur als Prinzipien

| Quelle | Selektive Anwendung auf den vorhandenen Auftritt |
|---|---|
| [nebenan.de](https://nebenan.de/) | Konkrete Alltagssituationen und Antworten zu Anmeldung/Datenschutz/Finanzierung. Keine Farben, Fotos oder Layouts übernehmen. |
| [Goodwall](https://www.goodwall.io/) | Reale Menschen und eigene belegbare Stimmen. Keine Partnerleisten, Sterne oder fremde Reichweitenzahlen übertragen. |
| [YoungCapital](https://www.youngcapital.de/) | Aktionen klar benennen: Angebote sehen, registrieren oder Information lesen. Keine neue Suchoberfläche bauen. |
| [Join](https://join.com/de) | Produktansicht mit konkreter Funktion und Wirkung erklären. Keine Enterprise-Sprache oder Zertifikate kopieren. |
| [GOV.UK Design Principles](https://www.gov.uk/guidance/government-design-principles) | Nutzerfragen zuerst, verständliche Wege und kleine überprüfbare Schritte. Keine amtliche Gestaltung übernehmen. |

## Umsetzung und Abnahme

1. **Phase A ist lokal umgesetzt und geprüft:** gemeinsamer Header/Dialog mit ursprünglicher Menüanimation, Brückenzeichen, Workfare-Schriftzug, neutrales rundes Glas, ruhig reagierende Hero-CTAs und angepasste Serifüberschrift. Dazu kommen kürzerer Hero-Text, belegte Bereinigung und die Desktop-Aurora-Optimierung. Neue Build-, Browser- und Lifecycle-Ergebnisse stehen im Änderungsprotokoll. Die gemeinsame Durchsicht und Freigabe zum lokalen Commit sind erfolgt. Eine Veröffentlichung ist ein eigener Schritt.
2. **Kleine UI-Fehler:** CTA-Label und abgeschnittenen Sicherheitstext korrigieren; kritische Kontraste gezielt prüfen. Fertig, wenn alle wichtigen Texte in normalen Zuständen lesbar sind.
3. **Inhaltliche Lücken:** Sicherheits-, Kontakt- und Plattformseite im vorhandenen System vervollständigen. Fertig, wenn jede angekündigte Antwort und der reale Funktionsstatus vorhanden sind.
4. **Gezielte Prüfung:** Menü, Slider, Plattformvorschau und Kontakt mobil/per Tastatur testen; vorhandene Build-, Lint-, TypeScript- und SEO-Prüfungen ausführen. Keine Tests nur zur Bestätigung einzelner Farbklassen.
5. **Nach gemeinsamer Freigabe veröffentlichen:** nachvollziehbarer Commit/Diff, korrekt zugeordneter Autor, Deploymentvergleich und kurze Live-Prüfung. Domainweiterleitungen, Artikelquellen und technische App-/Mailverbindungen bleiben intakt.

Leistung unter denselben Bedingungen vorher/nachher vergleichen, ohne neue Effekte einzuführen. Gute Core-Web-Vitals-Bereiche: LCP höchstens 2,5 Sekunden, INP höchstens 200 ms, CLS höchstens 0,1, jeweils im Feld am 75. Perzentil. Fehlende Felddaten sind keine bestandene Messung. [Google/web.dev: Web Vitals](https://web.dev/articles/vitals)

Die Abnahmefrage lautet: **Ist die vorhandene Website klarer, besser bedienbar und inhaltlich verlässlicher, ohne wie eine andere Website auszusehen?**


## Letzte lokale Feinabstimmung

| Before | After |
|---|---|
| Zu großer vertikaler Abstand zwischen den beiden Herozeilen. | Abstand um `.18em` reduziert; Schriftfamilie, Größe und Buchstabenabstand bleiben. |
| Dominante vollständige Workfare-Wortmarke im Menü. | Blasse, kleinere und unten angeschnittene Signatur am Fensterrand; die Nebenlinks stehen darüber. Die vier Hauptlinks bleiben der Blickfang. |

Diese Feinabstimmung ist lokal umgesetzt und auf Desktop sowie Handy geprüft. Die bestehenden Menüanimationen bleiben erhalten. Die Nebenlinks stehen nach der letzten Korrektur ohne zusätzlichen Footerabstand direkt über der Signatur. Einzelheiten und Prüfgrenzen stehen im Änderungsprotokoll.

## Anschließende Hero- und Rechtsseitenrunde

| Before | After |
|---|---|
| Bisherige mobile Hero-Größenkurve und deckender Hauptbutton. | Unter 768 Pixeln etwa vier Prozent größere Überschrift; heller primärer Glasbutton im bestehenden Material. Separat committed. |
| Eigene alte Header und große Einstiege auf beiden Rechtsseiten. | Gemeinsamer Workfare-Header auf allen 23 regulären Inhaltsseiten; kompakte Rechtsseiten mit Titel, Stand und klar gegliederten Angaben. |
| Bisherige Website-Mailadressen. | Auf Nutzerwunsch vier Adressen auf `workfare.team` umgestellt; Menü und Impressum verwenden die zentrale Kontaktadresse. |

App- und Verwaltungsumstellung bleiben Folgeaufgaben. Die früheren Tabellen dokumentieren ihren damaligen Prüfstand; die aktuelle Detailprüfung und die erhaltenen Rechtsinhalte stehen in `changes-2026-09-14.md`.

## Aktuelle Entscheidung: Plattformvorschau zuerst, Live-Demo separat

Die Startseite zeigt auf ausdrücklichen neuen Nutzerwunsch eine statisch nachgebaute Momentaufnahme des aktuellen Plattform-Startbildschirms. Vier erfundene Jobkarten erscheinen einzeln beim Scrollen; die Navigation bildet den sichtbaren Plattformrahmen nach. Es werden keine E-Mail-Adressen gezeigt. Diese Vorschau lädt weder die Anwendung noch eine Demositzung oder Datenbankverbindung. Der Link „Live-Demo“ führt mit deaktiviertem Vorladen auf die separate Website-Seite `/demo`.

Dort bleibt die vollständige reguläre Plattform mit ihren Datenbank-Demoprofilen und dem besuchergebundenen Wechsel zwischen Suchenden, privaten Anbietern und Unternehmen erhalten. Der gemeinsame Website-Header, eine knappe Erklärung und drei Rollenbuttons rahmen die große Anwendungsansicht ein. Die Route ist von der Indexierung ausgeschlossen. Die Datenbanktrennung und der Anmeldeablauf werden in dieser Runde nicht verändert.

Die statische Vorschau verwendet die Plattformschrift ausschließlich innerhalb des dargestellten Bildschirms sowie das vorhandene Brückenasset. Gestaltung und responsive Details werden gegen den aktuellen Plattformstand abgeglichen. Sie ist keine automatisch synchronisierte Ansicht; spätere Plattformänderungen müssen bewusst in diesen Nachbau übernommen werden. Eine Behauptung pixelgenauer Gleichheit ist nicht Teil der Abnahme.

| Before | After |
|---|---|
| Die vollständige Datenbankdemo öffnete direkt beim Scrollen auf der Startseite. | Statischer, animierter Plattform-Startbildschirm ohne Anwendungssitzung; „Live-Demo“ öffnet die vollständige Anwendung auf `/demo`. |
| Einbettung und Einführung waren ein gemeinsamer Bereich. | Gestalteter Einblick auf der Startseite und eigene, großflächige Demoseite mit gemeinsamem Header. |
| Die Vorschau war an eine erreichbare Demo-Anwendung gebunden. | Der Startbildschirm wird von der Website selbst dargestellt; nur `/demo` benötigt die laufende Anwendung. |

Prüfung der aktuellen Vorschau: TypeScript, gezieltes ESLint und Produktionsbuild bestanden. Vorschau bei 320, 390 und 1440 Pixeln geprüft; Animation, Übergang auf `/demo` und alle drei Rollen dort bestätigt. Reduced Motion und der JavaScript-freie Fallback wurden im Quellcode geprüft. Der vollständige Änderungsumfang und die aktuellen Nachweise stehen in `changes-platform-preview-2026-09-14.md`; die Architektur steht in `platform-demo.md`.

Der frühere Prüfstand der Datenbankdemo bleibt dokumentiert: 253 Plattformtests, 58 echte API-Prüfungen, drei SQL-Prüfsuiten und beide damaligen Produktionsbuilds bestanden. Rollenwechsel und Desktop-/Handydarstellung wurden für diese vorherige Fassung geprüft. Das ersetzt nicht die Abnahme der neuen Startseitenvorschau und der getrennten Website-Route. Die Prüfung auf dem späteren Produktionshost gehört weiterhin zur Veröffentlichung. Diese Runde ist noch nicht committed oder veröffentlicht.

Für eine spätere gemeinsame Designrunde auf ausdrücklichen Nutzerwunsch vormerken:

- Die vier Glaskarten unter „Für wen?“ sind noch nicht abgenommen. Es sind weiterhin zu viele Informationen gleichzeitig sichtbar; Anordnung und Informationsmenge neu lösen.
- Die Abstände innerhalb und zwischen den Karten sind noch nicht stimmig. Mit dem Design-Skill erneut prüfen, statt den Zwischenstand als fertig zu behandeln.
- Der ausdrücklich angehängte Skill `make-interfaces-feel-better` wird verwendet.

Diese Kartenkorrekturen bleiben zurückgestellt.

## Farbmodi: gemeinsame Grundlage, Hellmodus später

Die Website bleibt aktuell dunkel. Ihr zentraler ThemeProvider steuert nun auch die statische Plattformvorschau und den Start der vollständigen Demo. Beide unterstützen `dark` und `light`; Änderungen können der eingebetteten Anwendung ohne Neuladen mitgeteilt werden. Die normale Plattform behält ihre eigene Profil-/Systemeinstellung. Umsetzung und Prüfgrenzen stehen in `changes-demo-theme-2026-09-14.md`.

Vorgemerkt: den vollständigen Hellmodus aller Websitebereiche gestalten, Kontraste und Glasflächen in beiden Modi prüfen und anschließend einen öffentlichen Umschalter mit gespeicherter Auswahl anbinden. Die vorbereitete Demo-Kopplung ist kein abgeschlossener Hellmodus der gesamten Website.

Anschließende Freigabe: Nutzerauftrag für Commit und Push erhalten. Die zuvor dokumentierten offenen Gestaltungsaufgaben bleiben erhalten. Die öffentliche Live-Demo wird erst mit ausdrücklich konfigurierter, getrennt bereitgestellter Demo-Instanz freigeschaltet; lokal bleibt sie aktiv. Abschließende Build-, Test- und Git-Prüfung: `changes-demo-theme-2026-09-14.md`.

## Neue lokale Runde am 15. September: inszenierte Vorschau

TODO — öffentliche Live-Demo: Auf ausdrücklichen Nutzerwunsch am 15. September zurückgestellt. Separate Demo-Datenbank, gehosteten Installationsweg, Dokploy-Anwendung, Domain und öffentliche Abnahme später umsetzen. Die Reihenfolge ist in `platform-demo.md` dokumentiert. Der aktuelle Commit gibt ausschließlich die mobile Headerkorrektur und ihre Dokumentation frei.

Auf Nutzerwunsch bleibt der Demo-Link jetzt unabhängig von der öffentlichen Einbettungsfreigabe sichtbar. Hero und Vorschau werden durch eine volle dynamische Bildschirmhöhe getrennt. Die Vorschau erhält eine einmalige Folge aus Glasfläche, geschriebener Wortmarke, Navigation, Texten und Jobkarten mit deutlicher Tiefenbewegung und ruhigem Endzustand. Bestehende Gestaltung und reduzierte Bewegung bleiben berücksichtigt. Die geprüfte Runde ist vom Nutzer für Commit und Push freigegeben; vollständige Änderungstabelle und Prüfgrenzen: `changes-cinematic-preview-2026-09-15.md`.
