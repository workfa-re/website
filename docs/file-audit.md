# Workfare – lesende Dateiinventur und Cleanup-Nachweise

## Nachtrag zur Icon-Bereinigung – 16.09.2026

Nach der Nutzerkorrektur verwenden Favicon, Webmanifest und Plattformvorschau
wieder die blaue Brücke ohne dunkelblauen Hintergrund. Die transparente Datei
`public/workfare-platform-mark.png` bleibt erhalten; ausschließlich
`public/workfare-platform-mark-dark.png` bleibt gelöscht. Beide Farbmodi der
Vorschau nutzen die transparente Grafik ohne zusätzliche Icon-Hintergrundfläche.
Die vorübergehend eingeführten vier Wortmarken-Icons wurden wieder entfernt.
Die Bildherkunft und Größen sind in `docs/image-provenance.md` dokumentiert.

Die nachfolgende ursprüngliche Inventur beschreibt den damaligen Stand;
für die aktuelle Icon-Auswahl gilt die Korrektur in diesem Nachtrag.

Stand: 14.09.2026. Repository: `workfa-re/website`. Ausgangs-HEAD der Domainumstellung: `0713f8d09eb3fe94c1cc4ea5450c716834d57643`; HEAD bei Berichtserstellung: `0713f8d09eb3fe94c1cc4ea5450c716834d57643`. Der anschließende Installationsfix wurde separat als `a6f739eb85301d470962e93cd2a2ad7bb3ba0559` committed. Die folgende Matrix dokumentiert den ursprünglichen Bestand vor der Quelltextbereinigung.

## Umfang und Methode

Exakt **81 getrackte Dateien**, davon **17 öffentliche Binärbilder** und **64 Textdateien**. Alle Dateien aus `git ls-files` klassifiziert. Quelltexte, Datenmodelle, Importgraph, öffentliche Asset-Referenzen und relevante Render-/SEO-/Redirectlogik gelesen. Lange JSX-Dateien zusätzlich strukturell und anhand ihrer Daten-/Seiteneinstiege geprüft. Lockfile vollständig als JSON ausgewertet (452 Pakete; alle 445 aufgelösten Paketquellen liegen unter registry.npmjs.org). Kein vollständiger Sicherheits- oder Lizenzscan; keine Live-Webseiten/externen Rechtebelege nachgeladen. Keine .env/Secrets, node_modules, .next oder Git-Objektdateien inventarisiert. Git-Historie nur über normale git-log/show-Metadaten zur Herkunft geprüft.

Alle 17 Bilder mit Pillow geöffnet, Typ, Abmessungen, EXIF/XMP/Textfelder und SHA-256 geprüft. Zusätzlich sechs besondere/verwaiste Bilder visuell angesehen. Byte-Suche nach üblichen KI-/C2PA-/Generator-Markern ohne positiven Fund. Das beweist ausdrücklich NICHT, dass eine unbekannte Bearbeitung oder KI-Nutzung ausgeschlossen ist. Aussehen allein wurde nie als KI-Nachweis verwendet.

Zum Beginn der Inventur war keine AGENTS.md in Projekt/Elternordnern vorhanden. Während einer späteren Next.js-Entwicklungssitzung erzeugte Scaffold-Hinweise gehören nicht zur ursprünglichen 81-Dateien-Matrix. Die Inventur selbst war lesend. Anschließende, lokal bearbeitete Cleanup-Dateien werden unten separat aufgeführt; die vollständige Ausgangsmatrix bleibt als Nachweis erhalten.

## Konkrete sichere kleine Cleanup-Kandidaten

1. **Vier tote Quelldateien**: `src/components/legal/LegalPage.tsx` (kein Importer), `src/components/legal/LegalInteractions.tsx` (nur von totem LegalPage importiert), `src/components/ui/shader-animation.tsx` (kein Importer) und `src/styles/globals.css` (keine Referenz; RootLayout importiert stattdessen `src/app/globals.css`). Reale Rechtstexte verwenden lokale LegalRow-Komponenten und sind davon unabhängig.
2. **Verwaiste Legal-CSS-Regeln** in `src/app/globals.css:309–363`: `.legal-heading-highlight`, `data-legal-section`, `data-legal-highlight`, `legal-heading-focus` kommen außerhalb des toten Legal-Moduls nicht vor. Keine pauschale Entfernung der übrigen Menü-/Theme-Regeln.
3. **Zwei ungenutzte Exporte**: `homePageConfig` samt Flags in `src/config/site.ts:1–5` und `getOwnInsight` in `src/content/insights.ts:340–342`. Gesamtrepo-Suche findet nur Definitionen. `getInsightUrl`, `getInsightLastModified`, Teamfunktionen und andere Datenhelfer sind dagegen aktiv.
4. **Doppelter JSON-LD-Serializer**: RootLayout enthält dieselbe Escape-Funktion wie `src/lib/json-ld.ts`. Bestehenden Helfer importieren, Escape-Verhalten exakt erhalten.
5. **Falsche OG-Logo-Maße**: `src/app/layout.tsx:118–119` nennt 1024×1024 für `/og-image.png`; `src/app/og-image.png/route.tsx` rendert 1200×630. Metadaten korrigieren, Bild unverändert lassen.
6. **Vier nicht referenzierte public-Bilder**, zusammen 1.147.898 Byte: blick-aktuell JPG, altes Jugend-forscht-Porträt, SG-Bundeswettbewerb und WDR-Programmierfoto (vollständige Pfade unten). Kein dynamischer Dateiname führt zu ihnen; Bilder werden aus den expliziten content-Daten gelesen. Aktuelle Bilder/Artikel bleiben bestehen. Dateien sind KEINE belegten KI-Bilder; Entfernung wäre Bereinigung ungenutzter öffentlicher Kopien. Git-Historie bewahrt die vorherige Fassung. Nicht als sichere Byte-Duplikate bezeichnen: alle SHA-256 verschieden und z.B. Blick-JPG/WebP zeigen unterschiedliche Aufnahmen.
7. **README korrigieren**: aktuell falsche Pages-Router-Anleitung (`pages/index.tsx`, `/api/hello`) und generische Vercel-Hinweise. Aktuelles App-Router-Projekt, npm-Skripte, Node-Stand des Installationsfixes, Deployment und Regeln für neue Medien dokumentieren. Bestehende Lizenzgrenzen beibehalten.
8. **Unbenutzte externe Bildfreigabe**: `images.unsplash.com` nur in next.config.ts (CSP + remotePatterns), in keinem Inhalt/Renderer referenziert. Kleine spätere Konfigurationsbereinigung möglich; keine aktuell verwendete externe Bildquelle.
9. **Ungenutzte Animationstokens**: Accordion-down/up und animate-shimmer nur in globals.css definiert; keine entsprechenden Klassen/Animationen im getrackten JSX. Optional entfernen, aktive Shader-Variablen „shimmer“ hiervon trennen.
10. **Geist Mono** wird im RootLayout geladen, `font-mono` kommt im sichtbaren Quellbestand nur im toten LegalInteractions vor. Optional nach Entfernung prüfen/reduzieren. Instrument Serif ist aktiv im Hero; nicht entfernen.

## Was erhalten bleiben muss

- Alle neun externen Medien-/Schul-/Projektartikel, Original-URLs, Titel, Daten und historische JobBridge-Nennung.
- `/blog`, `/team/rezan`, `/team/resan-yalcin` sind aktive historische Redirects, kein toter Code.
- `/team/[slug]` hat aktuell keinen eigenen statisch generierten Profilpfad, ist aber ausdrücklich ein späterer Fallback für weitere Teammitglieder. Nicht als sicheren Löschkandidaten behandeln.
- `hero-scroll-demo.tsx` und `sticky-scroll-tablet.tsx` sind trotz „demo“ im Namen aktiv auf der Startseite.
- `three` und `@types/three` bleiben für den dynamisch geladenen AuroraCanvas im aktiven Hero nötig. Radix Slot, cva, clsx, tailwind-merge, Framer Motion und Lucide sind nachweisbar verbunden.
- `baseline-browser-mapping` ist Tooling-Abhängigkeit und Teil des parallelen Installationsfixes; fehlender Browserimport rechtfertigt keine Entfernung.
- Fonts/Animationen, die aktive Module nutzen, nicht aufgrund Dateinamen pauschal löschen.
- Teamnamen, Ansprechpartner, rechtlicher Anbieter, Mail-/App-/Admin-Domains sind keine beliebig ersetzbaren Markenstrings.
- Echte Quellenbilder mit Fotograf-/Copyright-Metadaten nicht als „KI“ aussortieren und Rechte-/Provenienzmetadaten nicht stillschweigend entfernen.

## Bilder und Suchmaschinen

Alle public-Dateien sind prinzipiell direkt adressierbar. `robots.ts` erlaubt `/` und sperrt nur `/api/`. next.config.ts enthält kein bildspezifisches X-Robots-Tag. Daher können auch die vier nicht mehr eingebundenen Bilder bei bekannten URLs weiter gecrawlt werden; der Audit beweist keine tatsächlich erfolgte Google-Indexierung.

Aktuelle Artikelbilder werden bewusst über Bildkomponenten, OpenGraph/Twitter und JSON-LD verbreitet; eigene Artikel zusätzlich per RSS/News-Sitemap, alle Artikel per normaler Sitemap. Keine belegte generative KI-Fotodatei gefunden. Canva-Design, deterministisches OG-Rendering, Canvas-Shader und abstrakte CSS-Platzhalter sind nicht mit generativen Personenfotos gleichzusetzen. Ein pauschales noindex aller Bilder wäre daher sachlich unbegründet. Für künftig bestätigte synthetische Bilder explizite Herkunftskennzeichnung und gezielte Entscheidung pro Asset, keine Falschdeklaration echter Pressefotos.

Vier öffentliche Platzhalterseiten (`/kontakt`, `/sicherheit`, `/plattform`, `/demnaechst`) sind indexierbar und stehen in der Sitemap. Das ist eine sichtbare Produkt-/Inhaltsfrage, kein versehentlich totes Modul. Ausbau oder gezieltes noindex wäre separat zu entscheiden; nicht im Cleanup löschen.

## Vollständige öffentliche Assetliste

| Datei | Format, Maße, Größe | Referenzen / Status | Metadaten / Provenienz |
|---|---|---|---|
| `public/favicon.ico` | ICO, 48×48, 15,406 B | src/app/datenschutz/page.tsx:153<br>src/app/impressum/page.tsx:122<br>src/app/layout.tsx:91<br>src/app/manifest.ts:15<br>src/components/SiteHeader.tsx:16<br>src/components/ui/animated-hero.tsx:1031 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. |
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.jpg` | JPEG, 754×502, 92,766 B | **KEINE Referenz** | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/blick-aktuell-jugend-forscht-bundesfinale.webp` | WEBP, 1200×800, 117,030 B | src/content/insights.ts:211 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/jobbridge-author-article-cover.png` | PNG, 1050×600, 703,412 B | src/content/insights.ts:91 | Canva Renderer + Template „Blue Gradient Modern Tech Business Card“, Erstelldatum 2026-02-02; beweist Designexport, keine generative KI. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/jugend-forscht-jobbridge-offiziell-4-preis.jpg` | JPEG, 620×414, 46,966 B | src/content/insights.ts:248 | Nikon Z9, Fotograf/Copyright MAX LAUTENSCHLAEGER, Photoshop-Bearbeitung; Fotoprovenienzhinweise bewahren. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/radio-bonn-jugend-forscht-bundesfinale.jpg` | JPEG, 1200×540, 51,936 B | src/content/insights.ts:229 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/rezan-yalcin-profile-jugend-forscht.jpg` | JPEG, 303×303, 38,382 B | **KEINE Referenz** | EXIF-Datum 2026-06-01; früheres Porträt, kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/rheinbacher-jugend-forscht-nrw.jpg` | JPEG, 758×850, 156,054 B | src/content/insights.ts:266 | Google/Picasa-XMP und Originaldatum 2026-03-19; kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/rub-jugend-forscht-rezan-yalcin.jpg` | JPEG, 804×536, 42,051 B | src/content/insights.ts:304 | JPEG-Kommentar gd-jpeg, Qualität 75; kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/sg-rheinbach-bundeswettbewerb.jpg` | JPEG, 1920×2560, 719,713 B | **KEINE Referenz** | JPEG-Kommentar gd-jpeg, Qualität 82; kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/sg-rheinbach-landesebene-2026.jpg` | JPEG, 1536×836, 102,095 B | src/content/insights.ts:285 | JPEG-Kommentar gd-jpeg, Qualität 82; kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/wdr-jobbridge-interview.jpg` | JPEG, 1009×641, 140,069 B | src/content/insights.ts:191 | EXIF/XMP Bearbeitungsdatum 2026-06-23; kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/wdr-jobbridge-programmieren.jpg` | JPEG, 1600×900, 297,037 B | **KEINE Referenz** | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/wdr-lokalzeit-bonn-sendungslogo.jpg` | JPEG, 1600×900, 157,833 B | src/content/insights.ts:171 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/insights/wdr-studiogespraech-rezan-yalcin-clean.png` | PNG, 760×422, 480,568 B | src/content/insights.ts:151 | EXIF/XMP UserComment=Screenshot; „clean“ im Dateinamen ist kein KI-Nachweis. Historie: als Medienasset im Commit d97675a hinzugefügt. |
| `public/jobbridge-bridge-logo-white.png` | PNG, 617×372, 6,985 B | src/components/TrustNarrative.tsx:31<br>src/components/insights/InsightsIndexPage.tsx:28 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. |
| `public/team/rezan-yalcin-profile.jpeg` | JPEG, 1200×1600, 302,375 B | src/app/team/rezan-yalcin/page.tsx:71<br>src/content/team.ts:50 | Keine aussagekräftige Ersteller-/Rechte-Metadaten gefunden; Herkunft dadurch nicht gesichert. Historie: Profilbild in 3ccf24c erneuert; content/team.ts beschreibt Radiostudio-Porträt. |

## Vollständige Klassifikation aller getrackten Textdateien

| Datei | Zeilen | Rolle / Befund |
|---|---:|---|
| `.gitignore` | 41 | Aktive Git-Ausschlüsse; .env, Builds und temporäre Dateien ausgenommen. |
| `LICENSE` | 30 | MIT mit ausdrücklichen Marken-/Inhaltsausnahmen. Erhalten, keine Lizenzänderung. |
| `README.md` | 47 | Veraltete create-next-app-Anleitung mit nicht existierendem pages/index.tsx und api/hello; sichere Dokumentationskorrektur. |
| `eslint.config.mjs` | 18 | Aktive ESLint-Konfiguration für Next/TypeScript. |
| `next.config.ts` | 75 | Aktive Host-Weiterleitungen, Sicherheitsheader und Bildkonfiguration; ungenutzte Unsplash-Freigabe gefunden. |
| `package-lock.json` | 6917 | Installations-Lockfile; vollständig als JSON ausgewertet, nicht generierter Quellcode und nicht löschen. Parallel separater Installationsfix. |
| `package.json` | 37 | Aktive Abhängigkeiten und Skripte; keine pauschale Dependency-Löschung. |
| `postcss.config.mjs` | 7 | Aktive Tailwind-PostCSS-Einbindung. |
| `scripts/verify-domains.mjs` | 77 | 31 lokale Checks für Weiterleitungen, Hosts, Canonical und Discovery; erhalten. |
| `scripts/verify-seo.mjs` | 87 | Statische Sitemap-/Robots-/Routen-Konsistenzprüfung; erhalten. |
| `src/app/blog/page.tsx` | 5 | Aktive historische permanente Weiterleitung nach /einblicke; erhalten. |
| `src/app/datenschutz/page.tsx` | 422 | Aktive rechtliche Seite mit eigener LegalRow-Komponente; nutzt alte LegalPage-Komponente nicht. |
| `src/app/demnaechst/page.tsx` | 35 | Aktive öffentliche Platzhalterroute mit Canonical/OG-Metadaten; Produktentscheidung für Ausbau oder noindex nötig. |
| `src/app/einblicke/[slug]/page.tsx` | 206 | Aktive Einblicke-Route; Content-Daten, Canonical und strukturierte Daten lesen/erhalten. |
| `src/app/einblicke/alle/page.tsx` | 97 | Aktive Einblicke-Route; Content-Daten, Canonical und strukturierte Daten lesen/erhalten. |
| `src/app/einblicke/page.tsx` | 61 | Aktive Einblicke-Route; Content-Daten, Canonical und strukturierte Daten lesen/erhalten. |
| `src/app/einblicke/team/page.tsx` | 61 | Aktives individuelles Teamprofil mit Metadaten, Kontakten und Artikelbezügen; nicht vereinfachend entfernen. |
| `src/app/feed.xml/route.ts` | 49 | Aktiver RSS-Feed, XML escaping und interne Links; erhalten. |
| `src/app/globals.css` | 364 | Aktiv aus RootLayout importiert. Tote Legal-Highlight- und Accordion/Shimmer-Regeln separat bereinigbar. |
| `src/app/impressum/page.tsx` | 358 | Aktive rechtliche Seite mit eigener LegalRow-Komponente; nutzt alte LegalPage-Komponente nicht. |
| `src/app/kontakt/page.tsx` | 35 | Aktive öffentliche Platzhalterroute mit Canonical/OG-Metadaten; Produktentscheidung für Ausbau oder noindex nötig. |
| `src/app/layout.tsx` | 207 | Aktiver Einstieg: Fonts, Metadaten, drei JSON-LD-Blöcke. Doppelter Serializer und falsche OG-Logo-Maße. |
| `src/app/manifest.ts` | 21 | Aktives Webmanifest; Marke aus siteConfig, Favicon korrekt referenziert. |
| `src/app/news-sitemap.xml/route.ts` | 51 | Aktive dynamische News-Sitemap. Leerer Inhalt außerhalb Zweitagesfenster beabsichtigt. |
| `src/app/og-image.png/route.tsx` | 103 | Aktives deterministisch gerendertes 1200×630-PNG; keine generative KI. |
| `src/app/page.tsx` | 60 | Aktive Homepage; Hero, Scroll-Demo, Trust, Features und Footer werden eingebunden. |
| `src/app/plattform/page.tsx` | 35 | Aktive öffentliche Platzhalterroute mit Canonical/OG-Metadaten; Produktentscheidung für Ausbau oder noindex nötig. |
| `src/app/robots.ts` | 15 | Aktives robots.txt: allow /, nur /api/ gesperrt; Bilder generell crawlbar. |
| `src/app/sicherheit/page.tsx` | 35 | Aktive öffentliche Platzhalterroute mit Canonical/OG-Metadaten; Produktentscheidung für Ausbau oder noindex nötig. |
| `src/app/sitemap.ts` | 88 | Aktive Sitemap, abgeleitet aus allen Artikeln und Teamdaten; historische Routen erhalten. |
| `src/app/team/[slug]/page.tsx` | 205 | Vorbereitete generische Teamroute; derzeit alle drei realen Profile durch eigene Routen abgedeckt, generateStaticParams liefert leer. Nicht automatisch löschen. |
| `src/app/team/resan-yalcin/page.tsx` | 5 | Aktive historische Tippfehler-Weiterleitung nach /team/rezan-yalcin; erhalten. |
| `src/app/team/rezan-yalcin/page.tsx` | 408 | Aktives individuelles Teamprofil mit Metadaten, Kontakten und Artikelbezügen; nicht vereinfachend entfernen. |
| `src/app/team/rezan/page.tsx` | 5 | Aktive historische Kurz-Weiterleitung nach /team/rezan-yalcin; erhalten. |
| `src/app/team/tim-lohmeier/page.tsx` | 345 | Aktives individuelles Teamprofil mit Metadaten, Kontakten und Artikelbezügen; nicht vereinfachend entfernen. |
| `src/app/team/tobias-rohm/page.tsx` | 346 | Aktives individuelles Teamprofil mit Metadaten, Kontakten und Artikelbezügen; nicht vereinfachend entfernen. |
| `src/components/FeatureSections.tsx` | 502 | Aktive Homepage-Zielgruppen und Sicherheits-Slides; bindet UI Button ein. |
| `src/components/Footer.tsx` | 56 | Aktiver Footer, Plattform-/Legal-Links und optionaler Chat. |
| `src/components/FooterChat.tsx` | 314 | Aktive Microsoft-Chat-Einbindung; externe Freigabe/Verfügbarkeit kein totes lokales Modul. |
| `src/components/PlaceholderPage.tsx` | 32 | Aktiv auf vier öffentlichen Platzhalterseiten; nicht automatisch löschen. |
| `src/components/SiteHeader.tsx` | 33 | Aktiver gemeinsamer Header, Favicon und Menü. |
| `src/components/SiteMenu.tsx` | 237 | Aktives Portal-Menü, Framer Motion, Navigation aus siteConfig. |
| `src/components/TrustNarrative.tsx` | 502 | Aktive Trust-Sektion und wiederverwendeter PixelShaderBackdrop; enthält Canvas, kein öffentliches KI-Foto. |
| `src/components/insights/ExternalInsightPage.tsx` | 132 | Aktive Anzeige externer Artikel mit Quelle/Original-Link und lokalem Quellenbild. |
| `src/components/insights/InsightArticlePage.tsx` | 155 | Aktive eigene Artikelanzeige; Bilder und body aus strukturierten Daten. |
| `src/components/insights/InsightCard.tsx` | 72 | Aktive Artikelkarte; dynamische Bildpfade stammen aus insights.ts. |
| `src/components/insights/InsightsIndexPage.tsx` | 88 | Aktive Einblicke-Startseite mit neuesten Beiträgen und Team. |
| `src/components/legal/LegalInteractions.tsx` | 415 | BELEGT NICHT ERREICHBAR. Einziger Importer ist ungenutztes LegalPage.tsx. |
| `src/components/legal/LegalPage.tsx` | 132 | BELEGT NICHT EINGEBUNDEN. Kein Importer im gesamten getrackten Projekt. |
| `src/components/team/ProfilePortraitPlaceholder.tsx` | 21 | Aktiver abstrakter Platzhalter für fehlende Porträts; kein Personenfoto. |
| `src/components/team/TeamIndexPage.tsx` | 36 | Aktive Teamübersicht für /einblicke/team. |
| `src/components/team/TeamOverviewSection.tsx` | 238 | Aktive Teamkarten, ein bewusst reservierter vierter Platzhalter; Daten dynamisch. |
| `src/components/ui/animated-hero.tsx` | 1212 | Aktiver Hero mit tatsächlichem dynamischem import(three); three/@types/three behalten. |
| `src/components/ui/button.tsx` | 56 | Aktiver Button über FeatureSections; Radix/cva/cn-Dependencies behalten. |
| `src/components/ui/hero-scroll-demo.tsx` | 760 | Aktive Homepage-Demo trotz Dateiname demo; bindet StickyScrollTablet ein. |
| `src/components/ui/shader-animation.tsx` | 98 | BELEGT NICHT EINGEBUNDEN. Export ShaderAnimation ohne Importer. |
| `src/components/ui/sticky-scroll-tablet.tsx` | 243 | Aktive Scroll-/Viewport-Logik der Homepage-Demo. |
| `src/config/site.ts` | 72 | Aktive zentrale URLs/Navigation/Metadaten. homePageConfig und beide Flags ohne Nutzer. |
| `src/content/insights.ts` | 366 | Aktive Daten: ein eigener Beitrag, neun externe Quellen. getOwnInsight ungenutzt; Medien und Slugs erhalten. |
| `src/content/team.ts` | 264 | Aktive drei Teamprofile mit Kontakten/Bildpfaden. Personen/Altdienst-Domains erhalten. |
| `src/lib/json-ld.ts` | 18 | Aktiver sicherer JSON-LD-Serializer; zur Vereinheitlichung auch aus RootLayout verwenden. |
| `src/lib/utils.ts` | 6 | Aktives cn über button.tsx; clsx/tailwind-merge bleiben nötig. |
| `src/styles/globals.css` | 26 | BELEGT NICHT EINGEBUNDEN. Andere globals.css wird ausdrücklich im RootLayout verwendet. |
| `tsconfig.json` | 42 | Aktive TypeScript-Einstellungen und @/* Alias. |

## Prüfung und Grenzen

Nur lesende Inventur, Referenz-/Metadatenprüfung; keine neuen Builds/Tests ausgeführt. Spätere Bereinigung muss Diff/Whitespace, Lint/Build und passende bestehende SEO-/Domainprüfungen erhalten. Externe Medienlizenzen und Ursprungsseiten wurden in dieser lokalen Inventur nicht live neu verifiziert. Quellzuordnung ist belegter Repo-Inhalt, keine neu erteilte Nutzungsfreigabe. Ein leerer Metadatensatz ist kein Beweis für echte Fotografie oder für KI.

## Nachfolgende lokale Bereinigung

Nach dem separaten Installationscommit wurden die vier belegten toten Quelldateien und die vier unreferenzierten öffentlichen Bilder entfernt. `homePageConfig` und `getOwnInsight` wurden entfernt. RootLayout verwendet den vorhandenen JSON-LD-Helfer und nennt die korrekten 1200×630-Bildmaße. Aktuelle zentrale Markenangaben sowie Footer-/Chat-Texte verwenden Workfare; historische Artikeldaten, Personenangaben und bestehende Dienstadressen blieben erhalten. Die README wurde auf das tatsächliche Setup umgestellt; `image-provenance.md` hält die Quellen und entfernten historischen Kopien fest.

Die Matrix oben umfasst den Ausgangsstand von 81 Dateien. Neu hinzugefügte Dokumentation oder weitere parallel geprüfte UI-Korrekturen sind darin nicht als ursprüngliche Dateien gezählt. Diese Dokumentation ist kein Beleg einer Veröffentlichung.

## Prüfstand der zugeordneten Cleanup-Dateien

- ESLint für `layout.tsx`, `Footer.tsx`, `FooterChat.tsx`, `config/site.ts` und `content/insights.ts`: erfolgreich.
- `git diff --check`: erfolgreich.
- Vergleich der Artikeldaten gegen den Installationscommit: bis auf den entfernten ungenutzten `getOwnInsight`-Helfer exakt unverändert.
- Bestehende konkrete Dienst-URLs und E-Mail-Adressen in den bearbeiteten Dateien: unverändert.
- Keine verbleibenden Quelltextverweise auf die acht entfernten Dateien.
- Gemeinsamer JSON-LD-Helfer: HTML-Zeichen und Unicode-Zeilentrenner werden maskiert; JSON-Roundtrip erhält die Originaldaten.
- Vollständiger Build und projektweite Prüfungen erfolgen gemeinsam nach Abschluss der parallelen, kleinen UI-Anpassungen. Es wurde durch diese Bereinigung nichts gestaged, committed, gepusht oder veröffentlicht.
