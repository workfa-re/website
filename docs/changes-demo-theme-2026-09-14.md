# Demo folgt der Websitefarbe

Prüfstand: 14. September 2026. Lokal umgesetzt; Commit und Push vom Nutzer anschließend freigegeben. Eine öffentliche Demo-Instanz ist noch nicht eingerichtet.

Die Website bleibt vorerst dunkel. Ihr Modus wird jetzt zentral als `dark` oder `light` verwaltet. Die Startseitenvorschau und die vollständige Plattformdemo übernehmen diesen Wert. Der vollständige Hellmodus der Website einschließlich öffentlichem Umschalter und gespeicherter Auswahl ist ein späterer Gestaltungsschritt.

| Before | After |
|---|---|
| Dunkle Website ohne gemeinsame Theme-Schnittstelle. | `WebsiteThemeProvider` stellt den aktuellen Modus und `setTheme` bereit; Standard bleibt `dark`. HTML-Klasse, Farbschema und Browserleistenfarbe folgen diesem Wert. |
| Statische Plattformvorschau immer hell. | Vorschau unterstützt beide Plattformpaletten einschließlich passendem Brückenasset, Karten, Navigation, Texten und unterem Verlauf. |
| Live-Demo konnte unabhängig von der Website hell starten. | iframe erhält beim Einstieg `theme=dark` beziehungsweise `theme=light`. |
| Plattform löste die Farbe aus Profil-/Systempräferenz auf. | Ausschließlich die getrennte Demo verwendet eine eigene Farbpräferenz. Server-HTML, früher Bootstrap und ThemeProvider bekommen denselben Startwert. Die normale Plattform behält ihr Verhalten. |
| Kein Vertrag für spätere Website-Farbwechsel. | Die Website sendet den neuen Modus per `postMessage`, ohne den iframe neu zu laden. Aktuelle Seite, Rolle und Demoänderungen bleiben erhalten. |
| Ladefläche und Rollensteuerung nur dunkel gestaltet. | Beide Varianten sind vorbereitet, einschließlich lesbarem Wiederholen-Button im hellen Fehlerzustand. |

## Technische Anbindung

- Die Quelle ist `src/config/website-theme.ts` mit `DEFAULT_WEBSITE_THEME`. Spätere Bedienelemente verwenden `useWebsiteTheme().setTheme(...)`.
- `LivePlatformDemo` hält die Startfarbe im Einstieg fest. Ein bloßer Farbwechsel ändert deshalb nicht die iframe-URL. Rollenwechsel und Wiederholen übernehmen die dann aktuelle Websitefarbe.
- Die Plattform prüft `theme` vor der Profilerstellung. Erlaubt ist genau ein Wert `dark` oder `light`; ungültige oder doppelte Parameter werden abgewiesen. Ohne Parameter gilt die gültige Demo-Farbpräferenz, sonst `dark`.
- `wf-demo-theme` speichert nur die Farbe für 24 Stunden. Es ist kein Anmeldecookie und hat keine Berechtigungswirkung. Die Theme-Kopplung schreibt keine Profilpräferenz in die Datenbank und ändert keine Zugriffsregeln.
- Die Plattform akzeptiert Theme-Nachrichten ausschließlich vom direkten Parent und dessen exakt erlaubter Herkunft. Der Listener steht bereits vor der Bereitschaftsmeldung bereit. Die Website akzeptiert diese Meldung nur vom eigenen iframe, dessen konfigurierter Herkunft und der ausgewählten Rolle; danach sendet sie die aktuelle Farbe erneut. Das deckt auch interne Navigation und frühe Nachrichten ab.
- Nach Installation ihres Listeners fragt die Website die Bereitschaft zusätzlich aktiv ab. So wird auch eine Demo erkannt, die bereits vor der Website-Hydration fertig war. Die Antwort wird mit denselben Herkunfts-/Fenstergrenzen geprüft; Theme-Nachrichten lösen keine weitere Bereitschaftsmeldung aus.

## Prüfung

- Website: TypeScript und gezieltes ESLint bestanden; Produktionsbuild bestanden.
- Plattform: 120 gezielte Tests für Einstieg, SSR, Bridge, Rollenwechsel, ungültige Nachrichten und bestehendes Verhalten bestanden; TypeScript und gezieltes ESLint bestanden.
- Nach der zusätzlichen Handshake-Korrektur: 38 Bridge-Tests einschließlich verspätetem Parent, fremder Herkunft/fremdem Fenster und vermiedener Antwortschleife bestanden; gezieltes ESLint ebenfalls. Diese 38 Prüfungen überschneiden sich mit der vorherigen Suite und sind keine zusätzlich zu addierende Gesamtzahl.
- Browser: dunkler eingebetteter Start als Suchende, dunkler Wechsel zu privaten Anbietern und heller direkter Demo-Start bestätigt. HTML-Klasse und `color-scheme` stimmen beim hellen Start überein.
- Die dunkle statische Startseitenvorschau wurde visuell geprüft.
- Die eingebettete Live-Demo wurde bei 390 × 844 Pixeln geprüft: Startfarbe dunkel, kein horizontaler Überlauf der Website und lesbare Rollensteuerung. Der vorherige helle Demo-Cookie wird durch den dunklen Website-Einstieg korrekt überschrieben.
- Nach dem abschließenden Neuladen wurde die dunkle Suchendenansicht wieder sichtbar: Ladeoverlay entfernt und iframe bedienbar. Website-TypeScript, ESLint und Produktionsbuild wurden nach der Handshake-Korrektur erneut erfolgreich ausgeführt.
- Ein öffentlicher Website-Umschalter ist noch nicht vorhanden. Der spätere Wechsel im laufenden Website-UI wird daher noch nicht als durchgängig im Browser abgenommen ausgewiesen; die Nachrichtenannahme ist durch Plattformtests geprüft.
- Im Entwicklungsbrowser wurde einmal eine React-Key-Warnung aus `OuterLayoutRouter` protokolliert, ohne Verweis auf eine eigene Komponente. Die geprüfte Navigation und Farbdarstellung funktionierten; der Produktionsbuild war erfolgreich. Die Ursache dieses Hinweises ist noch nicht geklärt.

Die getrennte Datenbankdemo und ihre bisherigen Sicherheitsprüfungen sind in `platform-demo.md` und im Plattformprojekt unter `docs/demo-platform.md` dokumentiert. Diese Farbanpassung verändert keine Datenbankstruktur, Anmeldung oder Besuchsgrenze.

## Abschluss vor Commit und Push

- Gesamte Plattformtestsuite: 297 Tests in 21 Dateien bestanden, zusätzlich acht Vertragstests der lokalen Startwerkzeuge. Plattform-TypeScript fehlerfrei.
- Beide Produktionsbuilds bestanden; die Plattform wurde ausdrücklich mit deaktivierten Demo-Flags gebaut. Website-ESLint, SEO-Prüfung für 17 statische Seiten und 31 Weiterleitungs-/Domainprüfungen bestanden.
- Der öffentliche Demo-Einstieg benötigt jetzt explizit `NEXT_PUBLIC_PLATFORM_DEMO_URL`. Ohne diese Variable enthält der Produktionsbuild keinen Demo-Link auf der Startseite und keinen iframe auf `/demo`; stattdessen eine kurze Vorbereitungsnachricht. Auch die iframe-Freigabe in der CSP bleibt ohne Konfiguration geschlossen. Diese Fälle wurden am lokalen Produktionsserver geprüft. Die Entwicklung auf localhost behält die Demo.
- Geprüft wurden außerdem die lokale Aktivierung, die ausdrückliche Produktionsfreigabe und vier unzulässige Zieladressen.
- Die inhaltlich identischen, jedoch unterschiedlich zugeordneten Plattform-Vorläufercommits wurden auf die bestehende GitHub-Historie abgeglichen. Eine lokale Sicherungsbranch bewahrt den vorherigen Stand. Kein Überschreiben der GitHub-Historie erforderlich.
- Zugangsdaten, `.env`-Dateien und lokale Laufzeitdaten werden nicht versioniert. Öffentliches Demo-Hosting und der vollständige Website-Hellmodus bleiben Folgeaufgaben.
