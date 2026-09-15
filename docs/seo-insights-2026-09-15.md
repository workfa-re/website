# Einblicke: Auffindbarkeit und Google News

Stand: 15. September 2026. Diese Übersicht trennt die öffentlich geprüfte Website von den lokalen Änderungen dieser Runde. Die Google-Einreichung wurde dabei nicht ausgeführt.

## Was bereits öffentlich vorhanden ist

Die HTTPS-Endpunkte wurden mit gültiger Zertifikatsprüfung abgerufen:

| Endpunkt | Geprüfter öffentlicher Stand |
| --- | --- |
| [robots.txt](https://workfa.re/robots.txt) | Erlaubt Suchmaschinenzugriff und nennt beide Sitemaps. Die zusätzlichen Cloudflare-Regeln wurden nicht verändert. |
| [sitemap.xml](https://workfa.re/sitemap.xml) | HTTP 200, 23 URLs: normale Seiten, alle zehn Einblicke und drei Teamprofile. |
| [news-sitemap.xml](https://workfa.re/news-sitemap.xml) | HTTP 200, gültiges XML, aktuell ohne Einträge. |
| [feed.xml](https://workfa.re/feed.xml) | HTTP 200, zehn Einträge. |
| [Einblicke](https://workfa.re/einblicke) und vorhandener eigener Artikel | HTTP 200. |

Eine Sitemap existiert somit schon. Ob Google einzelne URLs aufgenommen hat und ob die Sitemaps im richtigen Konto eingereicht wurden, ist damit nicht bewiesen. Dafür braucht es die Search Console; ihr Kontostand wurde in dieser Runde nicht eingesehen.

Der Einstieg in die Search Console wurde im Browser geprüft. Nach „Jetzt starten“ erscheint die Google-Anmeldung. Es besteht dort derzeit kein zugänglicher Kontostand; es wurden keine Sitemaps eingereicht oder Kontoeinstellungen verändert. Die Anmeldung kann vor der späteren Prüfung der veröffentlichten Seiten erfolgen.

## Lokale technische Änderungen

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

## Search Console: nach Veröffentlichung erledigen

- [ ] In der [Google Search Console](https://search.google.com/search-console) prüfen, ob die Domain-Property `workfa.re` im zuständigen Konto existiert. Falls nicht: anlegen und den von Google ausgegebenen TXT-Eintrag bei Cloudflare eintragen. Einen bestehenden Verifikationseintrag beibehalten. [Domain bestätigen](https://support.google.com/webmasters/answer/9008080?hl=de)
- [ ] Im Bericht „Sitemaps“ `https://workfa.re/sitemap.xml` und `https://workfa.re/news-sitemap.xml` einreichen beziehungsweise vorhandene Einreichungen kontrollieren. Die Verweise in robots.txt ermöglichen bereits die Entdeckung; die Einreichung schafft zusätzlich nachvollziehbare Status- und Fehlerberichte. [Sitemaps-Bericht](https://support.google.com/webmasters/answer/7451001?hl=de)
- [ ] Mit der URL-Prüfung Startseite, Einblicke, Über uns, einen eigenen Beitrag und ein Profil testen. Live-Test, gewählte Canonical-URL und Indexierungsgrund ansehen; bei Bedarf Indexierung beantragen. Das ist eine Anfrage, keine Aufnahmegarantie. [Erneuten Crawl anfragen](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
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

Offen bleibt die Kontoprüfung und Einreichung in Search Console sowie die Prüfung des endgültig veröffentlichten Standes durch Google. Eine erfolgreiche lokale Prüfung ersetzt diese Schritte nicht.
