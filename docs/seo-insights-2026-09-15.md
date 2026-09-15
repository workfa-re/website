# Einblicke: Auffindbarkeit und Google News

Stand: 15. September 2026. Diese Übersicht trennt die technische Website-Prüfung von den anschließend direkt in der angemeldeten Google Search Console bestätigten Ergebnissen. Die Domain-Inhaberschaft ist bestätigt; beide Sitemaps wurden inzwischen eingereicht und von Google gelesen.

Der Code-Stand „Refine insights navigation, team pages and SEO“ wurde zuvor als Commit `c3a6a1c63c77191ae7335651bcce4cda7c8c0d06` veröffentlicht; Autor und Committer sind `r-yalcin`, der Live-Abgleich ist bestanden. Die nachfolgenden Search-Console-Ergebnisse sind ein späterer Dokumentationsnachtrag und waren nicht Teil dieses Code-Commits.

## Was bereits öffentlich vorhanden ist

Bei der vorherigen technischen Prüfung dieser Runde wurden die HTTPS-Endpunkte mit gültiger Zertifikatsprüfung abgerufen. Die nachfolgende Tabelle dokumentiert diesen früheren Abrufstand; die aktuellen Google-Ergebnisse stehen im nächsten Abschnitt.

| Endpunkt | Geprüfter öffentlicher Stand |
| --- | --- |
| [robots.txt](https://workfa.re/robots.txt) | Erlaubt Suchmaschinenzugriff und nennt beide Sitemaps. Die zusätzlichen Cloudflare-Regeln wurden nicht verändert. |
| [sitemap.xml](https://workfa.re/sitemap.xml) | HTTP 200, 23 URLs: normale Seiten, alle zehn Einblicke und drei Teamprofile. |
| [news-sitemap.xml](https://workfa.re/news-sitemap.xml) | HTTP 200, gültiges XML, aktuell ohne Einträge. |
| [feed.xml](https://workfa.re/feed.xml) | HTTP 200, zehn Einträge. |
| [Einblicke](https://workfa.re/einblicke) und vorhandener eigener Artikel | HTTP 200. |

Eine Sitemap existierte somit bereits vor der Konto-Anmeldung. Der technische Abruf allein belegt keine Aufnahme einzelner URLs in Google.

Der erste Einstieg in die Search Console endete zunächst an der Google-Anmeldung. Dieser Zwischenstand ist überholt: Nach der Anmeldung durch den Nutzer konnten Inhaberschaft, Sitemaps und URL-Status direkt geprüft werden. Kontoadresse und Verifikationswerte werden hier nicht festgehalten.

## Aktuell in Search Console bestätigt

| Prüfung | Ergebnis am 15. September 2026 |
| --- | --- |
| Domain `workfa.re` | Inhaberschaft bestätigt. |
| robots.txt | Von Google als gültig gemeldet. |
| Allgemeine Sitemap | Eingereicht, Status „Erfolgreich“, 23 Seiten erkannt; zuletzt am 15. September 2026 gelesen. |
| News-Sitemap | Eingereicht und gelesen, null URLs. Die Detailmeldung nennt ein fehlendes Tag `url` unter `urlset`. |
| Startseite `/` | Bereits indexiert. Googlebot Smartphone hat sie am 15. September 2026 gecrawlt; Crawling und Indexierung sind erlaubt, der Seitenabruf war erfolgreich. Die Canonical-URL zeigt auf die Startseite selbst. |
| `/einblicke` | Zunächst als unbekannt gemeldet. Die Indexierungsanfrage wurde anschließend erfolgreich angenommen und die bevorzugte Crawl-Warteschlange bestätigt. Das ist noch keine bestätigte Indexierung. |
| `/einblicke/ueber-uns` | Zunächst als unbekannt gemeldet. Die Indexierungsanfrage wurde erfolgreich angenommen und die bevorzugte Crawl-Warteschlange bestätigt. Die tatsächliche Indexierung steht noch aus. |
| `/einblicke/warum-jobbridge-entstanden-ist` | Zunächst als unbekannt gemeldet. Die Indexierungsanfrage wurde erfolgreich angenommen und die bevorzugte Crawl-Warteschlange bestätigt. Die tatsächliche Indexierung steht noch aus. |
| `/team/rezan-yalcin` | Bereits indexiert, ein gültiges Profilseite-Element erkannt. Letzter Googlebot-Smartphone-Crawl laut Anzeige: 15. September 2026, 16:27:13. Crawling und Indexierung erlaubt, Abruf erfolgreich. Nutzerseitige Canonical-URL verweist auf sich selbst; Google bestätigt die geprüfte URL als Canonical. |

Damit sind alle fünf gezielten URL-Prüfungen abgeschlossen: Startseite und Rezan-Profil sind bereits indexiert; für Einblicke, Über uns und den eigenen Artikel wurden die Anfragen angenommen. Für das bereits indexierte Profil war keine neue Anfrage erforderlich. Die im Profilbericht genannte alte Profiladresse unter `jobbridge.app` ist eine historische Entdeckungsquelle; ihr Auftauchen allein belegt keinen Weiterleitungs- oder Canonical-Fehler.

Die News-Sitemap ist leer, weil derzeit kein eigener freigegebener Nachrichtenbeitrag aus den letzten 48 Stunden vorliegt. Google beschreibt eine leere News-Sitemap in Veröffentlichungspausen ausdrücklich als zulässig; eine entsprechende Leer-Warnung schadet der regulären Suche nicht. Die hier beobachtete Detailmeldung wird deshalb dokumentiert und bei der nächsten tatsächlich veröffentlichten Nachricht erneut geprüft. Alte Beiträge werden weder umdatiert noch zur Füllung als neue Nachrichten ausgegeben. [Google zu leeren News-Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)

Ein zusätzlicher erneuter HTTP-Abruf war wegen eines Kapazitätsfehlers der automatischen Werkzeug-Freigabeprüfung nicht ausführbar. Das ist kein Websitefehler. Die aktuelle Basis für die oben genannten Google-Ergebnisse ist die direkt geprüfte Search Console.

## Veröffentlichte technische Änderungen

- Die allgemeine Sitemap enthält die neue Seite `/einblicke/ueber-uns` statt der weitergeleiteten Teamübersicht. Die bestehenden Profiladressen bleiben enthalten.
- Das pauschale Änderungsdatum aller Seiten wurde entfernt. Eigene Beiträge verwenden weiterhin ihr gepflegtes `updatedAt`; bei Profilen, allgemeinen Seiten und Quellenverweisen wird kein unbekanntes Datum erfunden. Das Veröffentlichungsdatum eines fremden Artikels ist kein Änderungsdatum unserer Quellenseite. Google empfiehlt zuverlässig belegbare Änderungsdaten. [Sitemap-Dokumentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Die News-Sitemap berücksichtigt nur ausdrücklich freigegebene eigene Beiträge, deren ursprüngliche Veröffentlichung bereits erfolgt ist und weniger als 48 Stunden zurückliegt. Zukünftige oder ungültige Daten werden ausgeschlossen. Eine Bearbeitung macht alte Beiträge nicht wieder zu neuen Nachrichten. Die Route berechnet das Zeitfenster bei jedem Abruf ohne zwischengespeicherte, veraltete Ergebnisse.
- Die beiden XML-Ausgaben verwenden denselben Escape-Helper. Sonderzeichen in Titeln oder Quellen beschädigen dadurch nicht das XML.
- Im RSS-Feed sind eigene Beiträge und externe Quellen ausdrücklich unterschieden. Verfasser, Kategorien, dauerhafte Eintragsadressen und eine Selbstreferenz sind enthalten. Fremde Volltexte werden nicht übernommen.
- Die Artikelseiten enthalten strukturierte Breadcrumbs und einen RSS-Verweis. Eigene Beiträge behalten das passende `BlogPosting`-Markup, mit Autorprofil, Rubrik und Verlag. Bei fehlendem Personenprofil ist der Ersatzautor korrekt als Organisation bezeichnet.
- Ein externer Presseverweis wird in den Social-Metadaten als unsere Quellenseite gekennzeichnet, nicht als fremder Originalartikel unter unserer Marke. Im strukturierten Inhalt bleiben Originalquelle und Urheber zugeordnet.
- Pauschal angesetzte Bildmaße wurden entfernt. Artikel-Markup verwendet das tatsächlich hinterlegte Motiv und fällt nicht auf das allgemeine Website-Logo zurück.

## So läuft ein neuer Beitrag künftig durch

1. In `src/content/insights.ts` einen eigenen Beitrag mit beständiger URL, geprüftem Text, passendem Bild, Autorprofil und tatsächlichem Veröffentlichungsdatum ergänzen. Das ist dateibasierter Inhalt; eine Änderung muss gebaut und veröffentlicht werden, bevor Google sie abrufen kann. Es gibt keinen automatischen Entwurfs- oder Veröffentlichungskalender.
2. `updatedAt` nur bei einer tatsächlichen inhaltlichen Änderung anpassen. Fremde Presseberichte mit ihrer ursprünglichen Quelle und deren Datum getrennt pflegen.
3. `newsEligible: true` nur für einen eigenen, redaktionell als Nachricht geeigneten Beitrag setzen. Dieser Schalter meldet keine Zulassung durch Google. Hintergrund- und Über-uns-Texte benötigen ihn nicht.
4. `npm run seo:verify`, Lint und Build durchführen. Nach dem Deployment Artikel, Sitemap und Feed prüfen. Artikelroute, interne Verweise, allgemeine Sitemap, RSS und Metadaten entstehen aus demselben Inhaltsbestand.
5. Ein neuer geeigneter Beitrag erscheint für die ersten 48 Stunden in derselben News-Sitemap. Danach bleibt er über die allgemeine Sitemap und das Archiv auffindbar. Bei mehr als 1.000 aktuellen Nachrichten müssen mehrere News-Sitemaps erzeugt werden.

Eine leere News-Sitemap ist bei längeren Veröffentlichungspausen korrekt. Alte Artikel künstlich neu zu datieren ist keine Lösung. [Google zu News-Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)

## Search Console: erledigt und nächste Schritte

- [x] Domain-Property `workfa.re` in der [Google Search Console](https://search.google.com/search-console) und Inhaberschaft bestätigt. Bestehende Verifikation beibehalten. [Domain bestätigen](https://support.google.com/webmasters/answer/9008080?hl=de)
- [x] `https://workfa.re/sitemap.xml` und `https://workfa.re/news-sitemap.xml` eingereicht und Abruf durch Google kontrolliert. Die allgemeine Sitemap ist erfolgreich; der besondere Leerzustand der News-Sitemap ist oben dokumentiert. [Sitemaps-Bericht](https://support.google.com/webmasters/answer/7451001?hl=de)
- [x] Alle fünf gezielten URLs geprüft: Indexierung von Startseite und Rezan-Profil bestätigt, einschließlich eines gültigen Profilseite-Elements; Indexierung für Einblicke, Über uns und den eigenen Artikel erfolgreich beantragt.
- [ ] Die tatsächliche Aufnahme der drei angefragten Unterseiten später kontrollieren. Eine angenommene Anfrage ist keine Aufnahmegarantie. [Erneuten Crawl anfragen](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [ ] Einen eigenen Artikel im [Rich Results Test](https://search.google.com/test/rich-results) prüfen. Sichtbarer Titel, Autorenangabe, Datum und Bild müssen zu den strukturierten Daten passen. [Article-Markup](https://developers.google.com/search/docs/appearance/structured-data/article)
- [ ] Für den früheren Domainumzug prüfen, ob die alten einzelnen URLs dauerhaft auf ihr jeweiliges neues Gegenstück weiterleiten und ob der Adresswechsel für die verifizierten alten Properties gemeldet wurde. Das setzt weiterhin Kontrolle über die alte Domain voraus. [Googles Umzugsanleitung](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [ ] Anschließend Seitenindexierung, Leistung und gegebenenfalls News-Leistungsberichte beobachten. Eine `site:`-Suche allein ist kein vollständiger Indexierungsnachweis.

## Was Google News tatsächlich voraussetzt

Seit März 2025 generiert Google die Publikationsseiten automatisch. Eine manuelle Publisher-Center-Seite oder ein dort eingereichter RSS-Feed ist kein Aufnahmeweg mehr. Google prüft geeignete, crawlbare Inhalte automatisch. Der RSS-Feed bleibt für Leser und andere Abonnenten nützlich. [Aktuelle Publisher-Center-Regelung](https://support.google.com/news/publisher-center/answer/15898024?hl=de)

Technisches Markup hilft beim Verstehen des Artikels. Redaktionelle Qualität bleibt entscheidend: eigenständige berichtenswerte Inhalte, klare Autoren und Daten, nachvollziehbare Quellen, Angaben zum Herausgeber und erreichbarer Kontakt. Workfare sollte eigene Unternehmensmeldungen transparent als solche veröffentlichen und nicht den Eindruck einer unabhängigen Zeitung erwecken. [News-Richtlinien](https://support.google.com/news/publisher-center/answer/6204050?hl=de)

Weder die News-Aufnahme noch Platz eins in der Suche sind zusagbar. Sichtbarkeit hängt unter anderem von Thema, Suchanfrage, Relevanz, Aktualität und Vertrauenssignalen ab. Alte Hintergrundtexte können regulär in der Suche erscheinen, ohne aktuelle Nachrichten zu sein. [Google zur Erkennung](https://support.google.com/news/publisher-center/answer/9606634?hl=de), [Google zum News-Ranking](https://support.google.com/news/publisher-center/answer/9606702?hl=de)

## Prüfung dieser Änderungen

`npm run seo:verify` führt zusätzlich echte Laufzeitprüfungen der News-Auswahl aus: sofort veröffentlichte Artikel, die 48-Stunden-Grenze, zukünftige und ungültige Daten, Aktualisierung alter Artikel, bewusste News-Freigabe, Zeitzonen sowie XML-Sonderzeichen. Die Tests benötigen keinen Server und keine Kontozugangsdaten. Der abschließende lokale Stand hat diese Prüfungen, vollständiges ESLint, TypeScript und den Produktionsbuild bestanden.

Die laufende lokale Website wurde zusätzlich per HTTP geprüft: allgemeine Sitemap mit 23 URLs und neuer Über-uns-Adresse, gültige leere News-Sitemap, zehn RSS-Einträge einschließlich Verfassern und Feed-Selbstreferenz. Der eigene Artikel liefert `BlogPosting` mit dem tatsächlichen Autorprofil und dem hinterlegten Porträt; der geprüfte externe WDR-Verweis liefert `WebPage` statt eigenen Artikel-Markups. Beide enthalten gültiges Breadcrumb-JSON-LD. Alle geprüften Antworten waren HTTP 200.

Kontoprüfung, Sitemap-Einreichung und alle fünf gezielten URL-Prüfungen sind abgeschlossen. Offen bleiben die spätere Kontrolle der tatsächlichen Indexierung der drei angefragten Unterseiten, der separate Rich-Results-Test des eigenen Artikels und die gesonderte Prüfung des früheren Domainumzugs. Erfolgreiche lokale Tests und angenommene Crawl-Anfragen ersetzen keine Bestätigung der Aufnahme durch Google.
