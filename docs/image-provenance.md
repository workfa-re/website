# Bildherkunft und Verwendung

## Aktueller Icon-Stand – 16.09.2026

- Nach der Nutzerkorrektur bleibt die blaue Brücke ohne dunkelblauen Hintergrund
  erhalten. `public/favicon.ico` wurde aus dem Stand `2e82ab8` wiederhergestellt
  (16, 32 und 48 Pixel, transparenter Hintergrund).
- `public/workfare-platform-mark.png` wurde aus demselben Stand wiederhergestellt.
  Die Plattformvorschau verwendet diese transparente Brücke in beiden Farbmodi;
  der Icon-Rahmen fügt keine eigene Hintergrundfläche hinzu.
- Ausschließlich `public/workfare-platform-mark-dark.png`, die Variante mit
  dunkelblauem Hintergrund, bleibt entfernt und wird nicht mehr referenziert.
- Die zwischenzeitlich angelegten `public/brand/workfare-icon-{96,180,192,512}.png`
  mit Wortmarke auf weißem Quadrat wurden wieder entfernt. Favicon-Metadaten und
  Webmanifest verwenden wieder das Brücken-Favicon.
- Die offizielle Wortmarke `public/brand/workfare-logo.png`, das freigegebene
  Social-Vorschaubild, die weiße UI-Brücke und historische Pressebilder bleiben
  erhalten. Es wurden keine neuen Grafiken generiert.

Die folgenden Inventuren und Fingerabdrücke beschreiben ihren jeweils angegebenen
historischen Prüfstand. Für die aktuelle Auswahl gilt die Korrektur oben.

Stand: 14.09.2026. Lokale Bestandsprüfung vor der Bereinigung: 17 getrackte Dateien unter `public/`. 13 werden weiter benötigt; vier nicht mehr eingebundene Kopien wurden aus dem öffentlichen Arbeitsbestand entfernt. Historische Presseartikel und die dort verwendeten Bilder bleiben erhalten.

Diese Liste dokumentiert den im Repository belegten Stand. Quellenlinks und vorhandene EXIF/XMP-Angaben sind keine neu erteilte Lizenz. Externe Quellen wurden im Rahmen dieser lokalen Inventur nicht erneut live geprüft. Bekannte Urheber-/Copyright-Angaben dürfen bei späteren Bearbeitungen nicht stillschweigend entfernt werden.

Kein Bild wurde aufgrund seines Aussehens als KI-generiert eingestuft. Es wurden keine ausdrücklichen KI-/C2PA-Generierungsmarker gefunden; fehlende Marker schließen KI-Bearbeitung nicht aus. Canva-Designexporte, Screenshots und deterministisch programmierte Grafiken sind gesondert beschrieben.

## Weiter verwendete öffentliche Dateien

| Datei | Dateidaten | Aktuelle Referenz | Quellenbezug und Metadaten |
|---|---|---|---|
| `public/favicon.ico` | ICO, 48×48, 15,406 Byte | `src/app/datenschutz/page.tsx:153`<br>`src/app/impressum/page.tsx:122`<br>`src/app/layout.tsx:92`<br>`src/app/manifest.ts:15` | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Historisches Marken-Icon. Weiterhin für Favicon/Webmanifest und Rechtstexte benötigt. Keine weitergehenden Herkunftsmetadaten. |
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.webp` | WEBP, 1200×800, 117,030 Byte | `src/content/insights.ts:211` | [Im Artikel hinterlegte Originalquelle](https://www.blick-aktuell.de/Berichte/Rezan-Aaron-Yalcin-aus-Rheinbach-gewinnt-4-Platz-beim-Jugend-forscht-Bundesfinale-665655.html)<br>Im Artikelmodell einer externen Quelle zugeordnet; keine aussagekräftigen Ersteller-/Rechte-Metadaten gefunden. |
| `public/insights/jobbridge-author-article-cover.png` | PNG, 1050×600, 703,412 Byte | `src/content/insights.ts:91` | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Canva-Renderer, Template „Blue Gradient Modern Tech Business Card“, Design-Datum 2026-02-02. Eigenes historisches Artikelcover; Designexport ist kein Nachweis für generative KI. |
| `public/insights/jugend-forscht-jobbridge-offiziell-4-preis.jpg` | JPEG, 620×414, 46,966 Byte | `src/content/insights.ts:248` | [Im Artikel hinterlegte Originalquelle](https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db)<br>EXIF: Nikon Z9; Fotograf und Copyright MAX LAUTENSCHLAEGER; Photoshop-Bearbeitung. Rechteangaben und historische Bildverwendung bleiben erhalten. |
| `public/insights/radio-bonn-jugend-forscht-bundesfinale.jpg` | JPEG, 1200×540, 51,936 Byte | `src/content/insights.ts:229` | [Im Artikel hinterlegte Originalquelle](https://www.radiobonn.de/artikel/jugend-forscht-sieg-geht-nicht-nach-rheinbach-2663104)<br>Im Artikelmodell einer externen Quelle zugeordnet; keine aussagekräftigen Ersteller-/Rechte-Metadaten gefunden. |
| `public/insights/rheinbacher-jugend-forscht-nrw.jpg` | JPEG, 758×850, 156,054 Byte | `src/content/insights.ts:266` | [Im Artikel hinterlegte Originalquelle](https://www.rheinbacher.de/2026/03/jugend-forscht-nrw-zeichnet-rezan.html)<br>EXIF/XMP: Google/Picasa, Aufnahmedatum 2026-03-19. Keine Aussage über Lizenz durch diese Softwareangabe. |
| `public/insights/rub-jugend-forscht-rezan-yalcin.jpg` | JPEG, 804×536, 42,051 Byte | `src/content/insights.ts:304` | [Im Artikel hinterlegte Originalquelle](https://news.rub.de/presseinformationen/vermischtes/2026-03-19-jugend-forscht-nrw-zeichnet-spitzenforschertalente-aus)<br>JPEG-Kommentar gd-jpeg, Qualität 75. Quellenbezug aus insights.ts; keine eigene Lizenzmetadaten. |
| `public/insights/sg-rheinbach-landesebene-2026.jpg` | JPEG, 1536×836, 102,095 Byte | `src/content/insights.ts:285` | [Im Artikel hinterlegte Originalquelle](https://sg-rheinbach.de/jugend-forscht-landesebene-2026/)<br>JPEG-Kommentar gd-jpeg, Qualität 82. Quellenbezug aus insights.ts. |
| `public/insights/wdr-jobbridge-interview.jpg` | JPEG, 1009×641, 140,069 Byte | `src/content/insights.ts:191` | [Im Artikel hinterlegte Originalquelle](https://www1.wdr.de/nrw/rheinland/rhein-sieg-kreis/rezan-job-app-rheinbach-100.html)<br>EXIF/XMP: Bearbeitungsdatum 2026-06-23. Quellenbezug aus insights.ts. |
| `public/insights/wdr-lokalzeit-bonn-sendungslogo.jpg` | JPEG, 1600×900, 157,833 Byte | `src/content/insights.ts:171` | [Im Artikel hinterlegte Originalquelle](https://www1.wdr.de/mediathek/rezan-15-aus-rheinbach-raeumt-mit-seiner-app-bei-jugend-forscht-ab-100.html)<br>Im Artikelmodell einer externen Quelle zugeordnet; keine aussagekräftigen Ersteller-/Rechte-Metadaten gefunden. |
| `public/insights/wdr-studiogespraech-rezan-yalcin-clean.png` | PNG, 760×422, 480,568 Byte | `src/content/insights.ts:151` | [Im Artikel hinterlegte Originalquelle](https://www1.wdr.de/mediathek/video/sendungen/lokalzeit-bonn/studiogespraech-rezan-yalin-app-entwickler-100.html)<br>EXIF/XMP UserComment=Screenshot, 144 dpi. Der Dateiname „clean“ belegt keine generative Bearbeitung. |
| `public/jobbridge-bridge-logo-white.png` | PNG, 617×372, 6,985 Byte | `src/components/TrustNarrative.tsx:31`<br>`src/components/insights/InsightsIndexPage.tsx:28` | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Historisches Markenzeichen, weiterhin in Trust-/Einblicke-Oberflächen referenziert. Keine Ersteller-Metadaten. |
| `public/team/rezan-yalcin-profile.jpeg` | JPEG, 1200×1600, 302,375 Byte | `src/app/team/rezan-yalcin/page.tsx:71`<br>`src/content/team.ts:50` | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Radiostudio-Porträt gemäß Teamdaten; hinzugefügt/erneuert in 3ccf24c. Keine Ersteller-/Kamerametadaten; keine unabhängige Herkunftsbestätigung durch die Datei. |

## Entfernte, nicht mehr eingebundene Kopien

Die folgenden Pfade hatten keine Referenzen in den getrackten Quelltexten, Datenmodellen, Bildkonfigurationen, Sitemap- oder Feed-Routen. Das Projekt enthält keine Upload-Route und erzeugt keine Bildpfade aus diesen Dateinamen. Die Entfernung betrifft öffentliche Kopien, keine Quellenartikel und keine Rechte. Die vorherigen Dateien bleiben im Git-Verlauf erhalten, beispielsweise im Commit `a6f739eb85301d470962e93cd2a2ad7bb3ba0559`.

| Früherer Pfad | Dateidaten | Referenzstatus | Herkunftshinweis |
|---|---|---|---|
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.jpg` | JPEG, 754×502, 92,766 Byte | Keine aktuelle Einbindung | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Ältere unreferenzierte Pressefoto-Kopie. Kein aktueller Quellenlink im Datenmodell; keine Ersteller-/Rechte-Metadaten. Nicht identisch mit dem weiter verwendeten WebP. |
| `public/insights/rezan-yalcin-profile-jugend-forscht.jpg` | JPEG, 303×303, 38,382 Byte | Keine aktuelle Einbindung | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Früheres unreferenziertes Profilbild; EXIF-Datum 2026-06-01. Nach Erneuerung des Profils nicht mehr eingebunden. |
| `public/insights/sg-rheinbach-bundeswettbewerb.jpg` | JPEG, 1920×2560, 719,713 Byte | Keine aktuelle Einbindung | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Unreferenzierte Wettbewerbsaufnahme; gd-jpeg-Kommentar. Keine aktuelle Artikelzuordnung im Datenmodell. |
| `public/insights/wdr-jobbridge-programmieren.jpg` | JPEG, 1600×900, 297,037 Byte | Keine aktuelle Einbindung | Siehe Herkunftshinweis; kein separater Original-Link im aktuellen Artikelmodell.<br>Unreferenzierte frühere WDR-Bildkopie; kein aktueller Datenmodelleintrag. Keine aussagekräftigen Ersteller-Metadaten. |

## Aktueller Stand der Standardvorschau — 15.09.2026

- Die frühere Text-/Verlaufswerbung aus `src/app/og-image.png/route.tsx` ist entfernt. Sie war eine automatisch aus Code gerenderte Linkvorschau, kein belegter generativer Bildexport.
- `public/brand/workfare-logo.png` ist die unveränderte, vom Nutzer bereitgestellte Datei `Logo_wf.png` (367 × 100 Pixel). Die Kopie wurde bytegenau gegen das Original geprüft.
- `/workfare-preview.png` zeigt ausschließlich dieses Logo mittig auf Weiß im Format 1200 × 630. Keine zusätzlichen Slogans, Glaseffekte oder künstlichen Lichtflächen. Das Logo wird nur in der Darstellung skaliert.
- Die alte Adresse `/og-image.png` liefert dieselbe neue Grafik, damit alte Bildverweise ebenfalls das offizielle Logo erhalten. Alle aktuellen Standard-Metadaten verwenden die neue Bildadresse.
- Das Organisationslogo in strukturierten Daten und der Ersatz für Artikel ohne Bild verwenden ebenfalls das offizielle Logo.
- Die zwei `public/workfare-platform-mark*.png` sind mit den entsprechenden Originalen des Plattformprojekts bytegleich. Sie bleiben als Bestandteil der echten Plattformvorschau erhalten.
- Das alte Studioporträt `public/team/rezan-yalcin-profile.jpeg` wird aktuell nicht mehr im Quelltext eingebunden. Der Eintrag weiter oben dokumentiert den historischen Prüfstand; die Datei wurde nicht als KI-Bild klassifiziert.

## Weitere visuelle Inhalte

### Ergänzung vom 15.09.2026: Tim Lohmeier

- `public/team/tim-lohmeier-portrait.jpg`: vom Nutzer als Foto für Tim Lohmeier bereitgestellte Originaldatei `8f991cb5-c23e-4a91-82e8-47f704e0c11c.JPG`, 3840 × 5120 Pixel. Unverändert übernommen; keine generative Bearbeitung. Darstellungsausschnitt erfolgt über CSS, passende Auslieferungsgrößen über Next Image.
- Verwendung: Teamübersicht, Kontaktseite, Tims Profil und dessen Linkvorschau, zentral über `src/content/team.ts`.

- `/workfare-preview.png` wird aus dem bereitgestellten offiziellen Logo auf einer weißen Fläche erzeugt; `/og-image.png` dient nur noch als kompatible zweite Adresse.
- Hero-/Trust-Hintergründe werden mit Canvas/WebGL beziehungsweise CSS dargestellt. Sie sind dekorative Animationen und keine öffentlichen Personenfotos.
- Fehlende Teamfotos verwenden ausdrücklich beschriftete CSS-Platzhalter. Keine erfundenen Personenbilder einsetzen.

## Regeln für neue Bilder

1. Nur benötigte Dateien in `public/` aufnehmen. Dort sind Dateien direkt erreichbar, auch ohne sichtbaren Link.
2. Originalquelle, Verwendungszweck, erforderliche Nutzungsfreigabe und bekannte Bearbeitung dokumentieren. Bei eigenem Material verantwortliche Person beziehungsweise Originaldatei nennen, ohne private Zugangsdaten zu veröffentlichen.
3. Generative KI-Herkunft nur bei Beleg angeben und dann ausdrücklich dokumentieren. Keine Vermutungen aus dem Aussehen als Tatsache darstellen.
4. Historische Titel, Personen und Quellenbezüge erhalten. Ein Markenwechsel ändert die Rechte an Pressebildern nicht.
5. Falls ein bestimmtes Bild nicht in Suchmaschinen erscheinen soll, die konkrete Datei und ihre Metadaten-/Vorschauverwendung behandeln. Kein pauschales noindex für alle echten Quellenbilder.

## Dateifingerabdrücke des geprüften Ausgangsstands

SHA-256 dient der eindeutigen Zuordnung der oben beschriebenen Dateien. Alle 17 Fingerabdrücke sind verschieden; gleiche Motive oder ähnliche Dateinamen sind kein Beweis für Byte-Duplikate.

| Datei | SHA-256 |
|---|---|
| `public/favicon.ico` | `e4ac89abea34875edc40422b858e0d7164347b6f2a079a6065182d15efb68ede` |
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.webp` | `fae32775a8c5d56091958a07c0ca7b2283633ba84634f36efda06b078f6edab8` |
| `public/insights/jobbridge-author-article-cover.png` | `207781116498b75a125c90cf49728dcc2eff535f42857dd7ef1a6133729c6141` |
| `public/insights/jugend-forscht-jobbridge-offiziell-4-preis.jpg` | `b3fa6facae47add5eb3248373f831b7a9f2687d1fca2114c37bc256028df326e` |
| `public/insights/radio-bonn-jugend-forscht-bundesfinale.jpg` | `ccc963fdfedae882168213467a6e1c1fc1a29bb8e9b7e97592c5f66950a24b14` |
| `public/insights/rheinbacher-jugend-forscht-nrw.jpg` | `34c44c93ecca2f590684b2557fe9c11526f05c379de02bfc8f09fc150a1a04c8` |
| `public/insights/rub-jugend-forscht-rezan-yalcin.jpg` | `59e702b563ffe16999630d1234b22e7e41285267e848c465f86108da88c981c7` |
| `public/insights/sg-rheinbach-landesebene-2026.jpg` | `1122ac32ed64693b33379f78ac385d757338971c777f6bdedc21dc5a31a22a04` |
| `public/insights/wdr-jobbridge-interview.jpg` | `19d850d864518a96397d58090b4fe4288dca92dd29466e11f53985bf96dea219` |
| `public/insights/wdr-lokalzeit-bonn-sendungslogo.jpg` | `7fb40e466e66e3086ae82fa1979abf93e0fc2a5a03274fb8d8262c3588c6ac02` |
| `public/insights/wdr-studiogespraech-rezan-yalcin-clean.png` | `66b7a479d6f355a5ebb4400a19473bf18319eb9d71ada7e72257b3c302ffd763` |
| `public/jobbridge-bridge-logo-white.png` | `218dcf71a5841badfda13f9baa12f278fad3eb3a46bd84f68c86be9ad710fab1` |
| `public/team/rezan-yalcin-profile.jpeg` | `0e7ea5e56fa6ae24e9d1edc5c37240fa9769635a08f575ae7ceee9893bfa703f` |
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.jpg` | `c74876627eb51cbd8cb008258ba1d1199692655ea551ddee1de43c0e0554b6e9` |
| `public/insights/rezan-yalcin-profile-jugend-forscht.jpg` | `b717791a2261e49523e2e897ec1b452b21e0e149a93dc45f2877e3fdaa5fc8ef` |
| `public/insights/sg-rheinbach-bundeswettbewerb.jpg` | `2ba17f4d6c67cf8d3f0f39d235c482ca2417cbf431c3f26ef7a13b2f70c5799b` |
| `public/insights/wdr-jobbridge-programmieren.jpg` | `43becb6f1056e3b3aca1447464a61ba5ab41e36f816d04c4420b5ae39eae5c2e` |
