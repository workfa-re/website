# Sicherheitskontakt, Artikelbild und Teamprofile

Stand: 15. September 2026. Lokal umgesetzt und geprüft; noch nicht committet oder gepusht.

Nachfolgende Rückmeldung: Die Glasgestaltung großer Karten wurde in `changes-team-update-2026-09-15.md` durch schlichte Flächen ohne Schattenrand ersetzt. Buttons behalten Liquid Glass. Die folgende Tabelle dokumentiert die vorherige Zwischenfassung.

| Bereich | Vorher | Nachher |
| --- | --- | --- |
| Sicherheit: „Etwas stimmt nicht?“ | Separate Kontaktkarten mit Adressen und weiteren Links. | Ein kurzer Hinweis und ein Glasbutton zur Kontaktseite, auf der alle Ansprechpersonen stehen. |
| Sicherheit: Code und Metadaten | CSS und Seitenbeschreibung für direkt angezeigte Kontakte. | Nicht mehr benötigte Kartenstile entfernt; Beschreibung an die Weiterleitung angepasst. Bestehende Sprungmarke bleibt erhalten. |
| Artikel „Warum JobBridge entstanden ist“ | Rezans Porträt als Beitragsbild. | Die ursprüngliche blaue JobBridge-Markenkarte ist wieder eingebunden, mit passendem Alternativtext. Historischer Hinweis und Artikeldaten bleiben erhalten. |
| Gemeinsame Glasgestaltung | Karten verwendeten unterschiedliche lokale Materialien. | Neue gemeinsame `glass-panel`-Klasse verwendet dieselben zentralen Glasvariablen wie Header und Buttons, einschließlich Lichtkante und innerer Reflexion. |
| Über uns | Eigene Kartenfüllungen und kleinere Teamfotos. | Drei kompakte Glaskarten mit Teamfotos von 80 × 96 statt 72 × 88 Pixeln. Kontaktbutton verwendet ebenfalls das gemeinsame Glasmaterial. |
| Profile | Unterschiedliche Flächen für Porträts, Kontaktbuttons und Beiträge. | Porträtrahmen, Beitrags- und Ressourcenflächen nutzen Glaspaneele; Kontakt- und Navigationsbuttons nutzen Glasbuttons. Gilt für alle drei bestehenden Profile und die allgemeine Profilroute. |
| Profilbilder | Kleinere Bilder und zusätzliche farbige Leuchteffekte. | Moderat größere Porträts, abgestimmte innere und äußere Rundungen sowie neutrale Lichtkanten. Bildquellen bleiben erhalten. |
| Bedienung | Teilweise abweichende Oberflächenregeln. | Sichtbarer Tastaturfokus, ausreichende Buttonhöhen, nicht blockierende Reflexionsebenen und Rücksicht auf reduzierte Bewegung. |

## Prüfung

- `npm run lint`: bestanden.
- `npm run seo:verify`: bestanden.
- `npm run build`: bestanden, einschließlich TypeScript und Seitengenerierung.
- `git diff --check`: bestanden.
- Erzeugtes HTML geprüft: Sicherheitskontakt hat genau einen Link zur Kontaktseite und keine E-Mail-Karten; das Artikelbild ist wieder die originale Markenkarte; alle drei Profile verwenden die gemeinsamen Glasflächen.
- Browserprüfung auf Desktop und Mobilgeräten, einschließlich 320 Pixel breiter Darstellung: keine seitlichen Überläufe in den geprüften Bereichen. Wege von Sicherheit zu Kontakt sowie von Einblicke über Über uns zu Rezan funktionieren.
- Teamübersicht, Rezans Profil und Beitragskarten visuell geprüft; Tim auf Desktop und Tobias auf kleinem Mobilformat ebenfalls geprüft.
- Unabhängige Codeprüfung ohne offene Befunde.

## Vorschläge für die nächste Runde

1. Echte Porträts für Tim und Tobias ergänzen, sobald freigegebene Bilder vorliegen.
2. Die individuellen Profilseiten auf eine gemeinsame Vorlage umstellen. Die Oberflächen sind bereits zentral gepflegt; eine gemeinsame Vorlage würde auch Aufbau und Abstände für neue Teammitglieder vereinheitlichen.

Screenshots dieser Prüfung liegen lokal unter `/private/tmp/workfare-team-glass-review/`.
