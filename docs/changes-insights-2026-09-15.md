# Einblicke, Über uns und Auffindbarkeit

Stand: 15. September 2026. Diese Runde ist umgesetzt und geprüft. Nach der gemeinsamen Browserdurchsicht hat der Nutzer Commit und Push ausdrücklich freigegeben. Die vorherige mobile Vorschau-Headerkorrektur ist bereits separat committed und gepusht. Die nachfolgende Deployment- und Google-Prüfung ist im Projektplan beschrieben.

## Anschließende Nutzerkorrektur: gemeinsamer Einblicke-Rahmen

Die folgende Tabelle beschreibt den jüngsten Stand und ersetzt die frühere Entscheidung für drei getrennte Einstiege weiter unten.

| Before | After |
| --- | --- |
| Aktuell, Archiv und Über uns hatten eigene Seiteneinstiege. | Ein gemeinsames dauerhaftes Layout hält Workfare-Header, Einblicke-Hero und Navigation beim Wechsel sichtbar. Nur der Inhalt darunter wechselt. Die drei bekannten URLs, eigene Metadaten und direkte Links bleiben erhalten. |
| „Alle anzeigen“ stand zusätzlich rechts neben „Neueste Einblicke“. | Der doppelte Link entfällt; „Alle Beiträge“ in der Navigation öffnet das vollständige Archiv. |
| Die aktuelle Übersicht enthielt zusätzlich einen Über-uns-Teaser. | „Aktuell“ zeigt ausschließlich die sechs neuesten Beiträge, „Alle Beiträge“ alle zehn vorhandenen Beiträge, „Über uns“ Geschichte und Team. Die Auswahl der neuesten Beiträge ist zentral definiert und auch im strukturierten Inhalt verwendet. |
| Über uns begann mit einem zweiten großen Hero. | Kompakte Überschrift und Einleitung direkt unter dem gemeinsamen Rahmen, gefolgt von Geschichte, Team und Kontakt. |
| „Journal & Presse“ über dem Hero und Rubriken wie „Hintergrund“ über Artikeltiteln. | Diese zusätzlichen Zeilen sind entfernt. Artikelkategorien bleiben in den Inhaltsdaten und Metadaten verfügbar. |
| Der Pressekontakt verwendete die allgemeine Kontaktadresse. | Ein eigener zentraler Pressekontakt verlinkt `presse@workfare.team`. Das konfiguriert einen Website-Link; Einrichtung und Empfang des Postfachs wurden nicht geprüft. |
| Vollständig statischer Einblicke-Hintergrund. | Das vorhandene Pixelmotiv kehrt als ruhigere Variante ausschließlich in einer maskierten Hero-Ecke zurück. Der gemeinsame Hero bleibt beim Ansichtswechsel montiert. |
| Der Pixelhintergrund war Teil einer großen anderen Oberflächenkomponente. | Eigenständige wiederverwendbare Komponente mit kompatiblem Standardexport; die ruhige Variante reagiert nicht auf die Maus und berücksichtigt Sichtbarkeit sowie reduzierte Bewegung. |
| Wechsel zwischen getrennten Seitenoberflächen. | Kurze Einblendung nur des unteren Inhalts, mit unveränderter Scrollposition und markiertem aktuellem Navigationspunkt. Beim ersten Aufruf und bei reduzierter Bewegung wird keine Eingangsanimation erzwungen. |
| Eigene, anschließend ungenutzte Hero-, Archiv- und Teaser-Styles. | Entfernt; der gemeinsame Rahmen und die reduzierte Über-uns-Einleitung verwenden klar getrennte Styles. |

Die Umsetzung verwendet eine Next.js-Routengruppe. Die sichtbaren URLs ändern sich dadurch nicht. Artikel und vollständige Profile behalten ihre eigenständigen Ansichten.

Abschlussprüfung der Korrektur: vollständiges ESLint, TypeScript, SEO-Laufzeitprüfungen und Produktionsbuild bestanden. Nach dem Verschieben der Seitendateien wurden ausschließlich veraltete generierte Next-Routentypen erneuert und der lokale Website-Server auf Port 3000 neu gestartet. Browserprüfung bei 320 Pixeln und Desktopbreiten von 1042 bis 1280 Pixeln: sechs Karten unter Aktuell, zehn unter Alle Beiträge, Geschichte und Team unter Über uns; jeweils genau eine Hauptüberschrift und keine horizontale Überbreite. Direktes Antippen der Navigation ließ die Scrollposition unverändert bei null und die Heroüberschrift bei 132 Pixeln Abstand zum oberen Fensterrand. Zurück-Navigation funktioniert. Die ruhigere Shader-Variante wurde zusätzlich mit temporären Laufzeitprüfungen auf einfache Animationsschleife, Sichtbarkeitspause, reduzierte Bewegung, Resize und Cleanup geprüft. Der Dev-Server läuft wieder. Diese Prüfungen wurden vor dem freigegebenen Commit und Push abgeschlossen.

## Orientierung und Hierarchie

| Before | After |
| --- | --- |
| Großer, stark inszenierter Einblicke-Einstieg mit dicht gesetzter Überschrift, zusätzlichem Logo und animiertem Shader. | Ruhiger Einstieg „Einblicke in Workfare.“ mit klarer Typografie, kurzer Einordnung und erreichbarem Pressekontakt. Bestehender gemeinsamer Workfare-Header bleibt. |
| Einblicke, Archiv und Team waren weniger klar als zusammengehörige Wege erkennbar. | Kleine Glasnavigation mit „Aktuell“, „Alle Beiträge“ und „Über uns“. Das Archiv verwendet dieselbe Gestaltung. |
| Die Teamübersicht belegte einen großen Teil der Einblicke-Seite. | Die Navigation öffnet Geschichte und Team unter `/einblicke/ueber-uns` im gemeinsamen Einblicke-Rahmen. Rücklinks aus Profilen führen zum dortigen Team-Anker. |
| Große Teamübersicht mit zusätzlichen Platzhalterprofilen. | Kurze Geschichte und drei kompakte Karten für Rezan, Tim und Tobias; jede öffnet das vollständige bestehende Profil. Fehlende Fotos werden durch Initialen der tatsächlichen Teammitglieder dargestellt. |
| Mehrere Adressen führten zur alten Teamübersicht beziehungsweise zu Rezan. | Die frühere Teamübersicht und Rezans vorhandene Aliasadressen leiten dauerhaft auf die neuen beziehungsweise kanonischen Adressen weiter. Profil-Rücklinks führen zu „Über uns“, direkt zum Team. |
| Aktuelle Profiltexte verwendeten teilweise die alte Marke. | Aktuelle Rollen und Profilbeschreibungen verwenden Workfare. Historische Quellentitel und ihre Originaladressen bleiben korrekt zugeordnet. |

Die neuen Über-uns-Texte sind erste redaktionelle Entwürfe auf Grundlage der vorhandenen Projektgeschichte. Die persönliche Geschichte und Formulierungen sollten vor Veröffentlichung vom Team gelesen werden. Es wurden keine zusätzlichen Teammitglieder oder eine Unternehmensgröße erfunden.

## Typografie, Abstände und Oberflächen

| Before | After |
| --- | --- |
| Dichte Titel und unterschiedliche Darstellung von Übersicht, Archiv und Artikeln. | Aufeinander abgestimmte Überschriftengrößen, Zeilenhöhen und Abstände; Übersicht und Archiv nutzen ein gemeinsames Stylesheet, beide Artikeltypen ebenfalls. |
| Weniger klar getrennte Informationen in den Beitragskarten. | Quelle oder Autor, Datum, Titel, Kurztext und Kategorie stehen in einer festen Reihenfolge. Eigene Beiträge und externe Berichte sind erkennbar unterschieden. |
| Kartenflächen, Bildrundungen und Innenabstände wirkten weniger zusammenhängend. | Dezente Glasflächen mit 24-Pixel-Außenradius, 10-Pixel-Innenabstand und 14-Pixel-Bildradius; ruhige Ränder und Kontrast statt zusätzlicher Effekte. |
| Stark inszenierte Artikelansicht mit doppeltem responsivem Bild-Markup. | Ein responsives Titelbild, klarer Lesebereich bis 68 Zeichen Breite und Fließtext mit großzügiger Zeilenhöhe. |
| Technische Hinweise über SEO und Sitemaps erschienen in der Artikeloberfläche. | Leser sehen relevante Angaben zu Quelle, Autor, Datum und Originalbeitrag. Technische Hinweise stehen in der Projektdokumentation. |
| Alte und generierte Motive wurden für Rezan beziehungsweise den eigenen Hintergrundartikel verwendet. | Das vom Nutzer zugeordnete echte Foto ist unverändert eingebunden: Teamkarte, Profil, eigener Hintergrundartikel und zugehörige Metadaten. Die Darstellung nutzt responsive Bildausschnitte. Die Bilddatei wurde nicht retuschiert. |
| Der historische eigene Artikel verwendete den alten Namen ohne Einordnung. | Ein kurzer Hinweis erklärt den früheren Projektnamen. Originaltitel, Artikeladresse, Text und ursprüngliches Veröffentlichungsdatum bleiben als historische Fassung erhalten. |

Alte Bilddateien wurden in dieser Runde nicht pauschal gelöscht. Das bisherige Motiv des eigenen Artikels wird von diesem Artikel nicht mehr geladen; die neue Fotodatei ist rund 155 KB groß. Die vollständigen Profilseiten behalten ihren bisherigen Aufbau; diese Runde ändert dort Bild, Markenangaben und Rückwege.

## Bedienung und laufender Aufwand

| Before | After |
| --- | --- |
| Shader-Animationen liefen auch auf redaktionellen Übersichten und Artikelseiten. | Beide Artikeltypen verwenden statische Hintergründe. Einblicke, Archiv und Über uns teilen eine ruhige, lokal begrenzte Shader-Ecke im gemeinsamen Hero. |
| Unterschiedliche Verlinkung zurück zur Übersicht. | Artikel bieten einen direkten Weg ins vollständige Archiv und bei eigenen Beiträgen zum Autorprofil. |
| Quellenverweise waren weniger klar als externe Originale gekennzeichnet. | Externe Originale bleiben eindeutig beschriftet, mit sicherem neuem Tab und ergänzendem Screenreader-Hinweis. |
| Uneinheitliche Interaktionsdetails. | Sichtbare Tastaturfokusse, mindestens 44 Pixel hohe kleine Navigationslinks, größere Kontaktaktionen und ruhige, gezielt begrenzte Übergänge. Reduzierte Bewegung wird berücksichtigt. |

Es wurden keine neuen Pakete installiert. Die Artikel- und Team-Inhalte werden serverseitig gerendert; aktive Navigation, kurze Inhaltsübergänge und der Hero-Shader verwenden die vorhandenen Client-Bibliotheken. Eine bessere Downloadzeit, ein Lighthouse-Wert oder verbesserte Core Web Vitals wurden nicht gemessen und werden hier nicht behauptet.

## Technische Auffindbarkeit

| Before | After |
| --- | --- |
| Sitemap vorhanden, aber alte Teamübersichtsadresse und pauschale Änderungsdaten. | Neue Über-uns-Adresse; belegbare Änderungsdaten eigener Artikel, keine erfundenen Aktualisierungsdaten allgemeiner Seiten. |
| News-Auswahl und Datumskanten waren nicht als eigenständiges Verhalten geprüft. | Nur ausdrücklich geeignete eigene Nachrichten aus den letzten 48 Stunden; keine zukünftigen oder ungültigen Daten, keine erneute News-Aufnahme nur durch Bearbeitung. Laufzeittests sichern diese Grenzen ab. |
| Getrennte XML-Behandlung und weniger vollständige RSS-Zuordnung. | Gemeinsames XML-Escaping; RSS mit Autoren, Kategorien und Feed-Selbstreferenz, klar getrennt nach eigenen Beiträgen und fremden Quellen. |
| Teilweise ungenaue Artikel- und Bildmetadaten. | Passende Autorprofile, Breadcrumbs, tatsächliche Bilder und korrekte Kennzeichnung externer Quellenseiten. Keine erfundenen Bildmaße oder fremde Artikel unter eigener Urheberschaft. |
| Doppelter Markenname im Titel des Archivs. | Einmaliger Seitentitel „Alle Einblicke | Workfare“. |
| Google-Veröffentlichungsablauf war nicht dokumentiert. | Konkreter Ablauf für neue Artikel, Search Console und Google News in `seo-insights-2026-09-15.md`. |

## Durchgeführte Prüfung

- Vollständiges ESLint, TypeScript, SEO-Prüfung und Produktionsbuild bestanden auch nach der letzten Titel- und Hinweisergänzung. Der abschließende Build erzeugt alle 35 vorgesehenen statischen Seiten erfolgreich; dynamische Feeds bleiben dynamisch.
- SEO-Prüfung: 18 statische Seiten sowie Laufzeittests für Veröffentlichung, 48-Stunden-Grenze, Zukunftsdaten, ungültige Daten, alte bearbeitete Artikel, Freigabe, Zeitzonen und XML-Sonderzeichen.
- Gerendertes Produktions-HTML von 16 relevanten Inhaltsseiten unabhängig geprüft: kanonische Adresse, eine Hauptüberschrift, kein unbeabsichtigtes Indexierungsverbot und interne Verlinkung. Drei dauerhafte Weiterleitungen geprüft.
- Lokale HTTP-Prüfung: allgemeine Sitemap mit 23 URLs einschließlich Über uns, gültige leere News-Sitemap, zehn RSS-Einträge, Artikel- und Breadcrumb-Daten. Antworten jeweils erfolgreich.
- Browser und Screenshots: Einblicke bei 320 und 1440 Pixeln; Über uns einschließlich Team bei 320 und 1280 Pixeln; eigener Artikel, langer externer WDR-Titel und Rezan-Profil auf kleinem Handy; Archiv und Rezan-Profil zusätzlich bei 1092 Pixeln Desktopbreite. Keine horizontale Überbreite in den geprüften Ansichten. Das neue Foto lädt und die Teamkarten bleiben kompakt.
- Wege von Einblicke zu Über uns, zum Profil und zum Artikel sowie gemeinsames mobiles Menü geprüft. Sichtbarer Hinweis zum alten Projektnamen und endgültiger Archivtitel im Browser bestätigt.

## Noch offen

- Den veröffentlichten Stand nach dem freigegebenen Push gegen diese Fassung prüfen; spätere redaktionelle Ergänzungen der Über-uns-Geschichte bleiben möglich.
- Search Console erfordert im geöffneten Browser eine Google-Anmeldung. Kontostand, eingereichte Sitemaps und tatsächliche Indexierung wurden daher nicht eingesehen oder verändert. Nach Veröffentlichung die dokumentierten Schritte ausführen.
- Aufnahme in Google News oder Platz eins in Google lassen sich nicht zusagen. Die Sitemaps und Metadaten erleichtern Entdeckung und Verständnis; Google entscheidet über Indexierung und Platzierung.
- Die öffentliche Live-Demo, die zurückgestellten Glaskarten und der vollständige Hellmodus bleiben eigene Folgeaufgaben.
