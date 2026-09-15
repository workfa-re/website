# Team ergänzen und Karten vereinfachen

Abschlussstand für die Veröffentlichung vom 15. September 2026. Diese Fassung ersetzt die Glasgestaltung großer Karten aus `changes-team-glass-2026-09-15.md` nach der anschließenden Rückmeldung.

## Gestaltung

| Before | After |
| --- | --- |
| Team-, Profil-, Kontakt- und Sicherheitskarten mit Glasreflexionen und Schattenrändern. | Gemeinsame neutrale Fläche mit dezenter echter 1px-Kante, ohne Schattenrand oder Hintergrundunschärfe. Liquid Glass bleibt bei Buttons und Header-Steuerelementen. |
| Profilnamen in stark verdichteter Sans-Schrift. | Bereits geladene Geist Sans, Gewicht 500, weniger enger Zeichenabstand und ausgewogener Umbruch. Die Rollenbezeichnung steht näher unter dem Namen. Keine zusätzliche Schriftdatei erforderlich. |
| Innere Bildrundungen an schattenbasierte Rahmen angepasst. | Rundungen berücksichtigen den tatsächlichen 1px-Rand. Die vergrößerten Porträtmaße bleiben erhalten. |
| Unterschiedliche Platzhalter aus Initialen oder Text. | Gemeinsames neutrales Personensymbol auf Teamübersicht, Kontaktseite und Profilen. |
| Teilweise sichtbar begrenzter Shader im Einblicke-Hero. | Masken blenden den Hintergrund innerhalb des Heros weich zu den Rändern aus. |
| Abschnittstrenner auf Über uns als innere Schatten. | Schlichte dünne Linien. Die Team-Unterzeile lautet „Die Menschen hinter Workfare.“ |

## Team und Inhalte

| Before | After |
| --- | --- |
| Drei Personen im Team. | Rezan Yalcin, Metin Yalcin, Cüneyt Celik, Tim Lohmeier und Tobias Rohm; automatisch auch auf der Kontaktseite und in der Sitemap. |
| Metin und Cüneyt ohne Profile. | Eigene Profilseiten mit den vorgegebenen Rollen Geschäftsführer beziehungsweise Business Angel und erweiterte Geschäftsführung. Zentraler Teamkontakt, solange keine persönlichen Adressen bestätigt sind. |
| Tim mit umfassender Projektentwicklungsbeschreibung und Bildplatzhalter. | Aktuelle Rolle: Mitarbeiter Produktentwicklung. Einfache Aufgaben auf der Workfare-Plattform: Bedienabläufe prüfen, Unklarheiten notieren und Feedback mit dem Team besprechen. Das bereitgestellte Foto ist auf Teamübersicht, Kontaktseite und Profil eingebunden; der LinkedIn-Link ist ergänzt. |
| Tobias mit Marketing- und Social-Media-Beschreibung. | Name und bestehende Direktadresse bleiben; Rolle und Beschreibung sind Platzhalter. Alte Aufgaben, Kenntnisse und Abteilungsangaben entfernt, auch aus Metadaten. |

## Umsetzung

| Before | After |
| --- | --- |
| Doppelte Sonderseiten für Tim und Tobias sowie eine abweichende allgemeine Profilroute. | Gemeinsame serverseitige `TeamProfile`-Komponente samt Metadaten für Tim, Tobias, Metin, Cüneyt und weitere neue Teammitglieder. Rezan behält seine individuellen Pressebereiche, nutzt aber dieselben Oberflächen und Namensstile. |
| Verwandte Beiträge über Text- und Schlagworttreffer zugeordnet. | Gemeinsamer Beitragsbereich auf allen Profilen, einschließlich Rezan. Beiträge werden anhand der exakten Autorenzuordnung ausgewählt und nach Datum sortiert. Ohne eigene Beiträge erscheint ein kurzer Hinweis. |
| Aufgabenüberschrift und Liste auf unterschiedlichen Höhen. | Gemeinsame Überschriftenzeile und bündiger Beginn von Beschreibung und Aufgabenliste. |
| Neue Personen könnten unbestätigte Angaben aus einer Vorlage übernehmen. | Keine erfundenen Porträts, persönlichen E-Mail-Adressen oder Orte. Tobias’ Platzhalterrolle wird nicht als Berufsangabe in strukturierten Daten ausgegeben. |

Die zuvor vereinfachte Weiterleitung von Sicherheit zur Kontaktseite und das wiederhergestellte historische Artikelcover bleiben erhalten.

## Prüfungen

- `npm run lint`, `npm run seo:verify`, `npm run build` und `git diff --check` bestanden.
- Produktionsbuild erzeugt beide neuen Profilrouten. Generiertes HTML, Profilmetadaten, Kontaktliste und Sitemap auf die fünf Personen geprüft.
- Teamraster auf Desktop sowie 320 Pixel breitem Mobilformat ohne seitlichen Überlauf. Karten haben berechnet `box-shadow: none` und keine Hintergrundfilter.
- Tims Foto und neue Namensschrift auf Desktop und Mobile geprüft. Neue Profilwege sowie Metin, Cüneyt und Tobias auf kleinem Mobilformat geprüft.
- Unabhängige Codeprüfung ohne offene Befunde. Lint, SEO-Prüfung und Produktionsbuild für den vollständigen finalen Stand erneut bestanden.

Screenshots liegen lokal unter `/private/tmp/workfare-team-update/`.
