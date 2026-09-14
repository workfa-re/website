# Lokale Plattformdemo und Website-Anpassungen · 14. September 2026

Die vollständige Plattformdemo läuft lokal; diese Runde ist noch nicht committed oder veröffentlicht. Die erneute Gestaltung der vier Glaskarten wurde auf Nutzerwunsch für später zurückgestellt. Der ausdrücklich angehängte Design-Skill `make-interfaces-feel-better` wurde verwendet. Das bestehende Hero-Design und seine Menüanimation bleiben erhalten.

## Vollständige Plattformdemo – neuer Auftrag

Die frühere Vorschau mit festen Frontend-Daten und eigenen lokalen Dialogen wurde vom Nutzer verworfen. Die nachfolgende Umsetzung öffnet die vollständige normale Plattform mit einer eigenen Supabase-Datenbank und privaten Besuchssitzungen. Ihre Architektur und alle Änderungen sind in `platform-demo.md` beschrieben.

Aktueller Prüfstand der vollständigen Datenbankdemo:

- 58 echte API-Prüfungen bestanden: Anmeldung aller drei Rollen, Bewerbung, beidseitiger Chat, Termin, Datentrennung zwischen zwei Besuchern, verweigerte fremde Zugriffe und Sperre alter Tokens nach Widerruf.
- Drei SQL-Prüfsuiten bestanden: Grenzen auf 23 Tabellen und 39 Geschäfts-RPCs, Auth-Bindung und vollständige Bereinigung. Der automatische Fünf-Minuten-Auftrag ist tatsächlich erfolgreich gelaufen.
- Der Fehlerpfad widerruft zuerst die Sitzung und verwendet anschließend den Datenbank-Cleanup. 27 gezielte Sitzungstests bestanden, einschließlich verspäteter paralleler Profilerstellung und fehlgeschlagenem Cleanup.
- Website: finaler Produktionsbuild mit Webpack und TypeScript bestanden.
- Browser: Suchende, private Anbieter und Unternehmen wechseln auf die normalen Plattformrouten mit den richtigen Datenbankprofilen. 390 × 844 und 1440 × 900 Pixel geprüft; Websitebreite entspricht jeweils der Fensterbreite, kein horizontaler Seitenüberlauf.
- Browser: normale Aktivitätsseite mit bestehendem Gespräch geöffnet, Testnachricht gespeichert und nach Neuladen bestätigt. Gespräch zeigt „Live“; keine Fehler oder Warnungen im dabei erfassten Browserprotokoll.
- Prüfgrenze: automatisierte Klicks innerhalb des eingebetteten iframe-Dokuments wurden vom Browserwerkzeug mit einem nicht mehr verfügbaren Ziel abgebrochen. Rollenwechsel und Einbettung wurden im Rahmen geprüft, die weiteren Bedienabläufe in einem direkten Tab derselben lokalen Anwendung. Ein kontrollierter Websocket-Wiederverbindungs-/Ablauftest ist noch nicht Bestandteil dieser Abnahme.
- Plattform: finale Gesamtsuite mit **253 Tests in 21 Dateien bestanden**. Produktionsbuild mit Demo-Konfiguration und Webpack erfolgreich; TypeScript fehlerfrei, 39 Seiten generiert, `/demo` und Proxy vorhanden.
- Alle sechs validierten SQL-Artefakte liegen unverändert im Plattform-Repository unter `infrastructure/demo/schema/`, einschließlich Bereinigungszeitplan. Die 29 direkten Abhängigkeiten stimmen mit Lockdatei und Installation überein.
- Startwerkzeuge: 8 Vertragstests, Syntaxprüfung und ESLint bestanden. `npm run demo:setup` am bestehenden lokalen System erfolgreich ausgeführt: sechs Dienste, tatsächliche Auth-Einstellungen, lokale Portgrenzen und vollständige Datenbankbedingungen geprüft. Keine Schemas erneut angewendet, bestehende Daten und Umgebungsdatei erhalten.
- Alle Prüfprozesse sind beendet. Website und lokale Demo bleiben zur Ansicht gestartet. Keine Änderungen dieser Runde committed oder gepusht.

## Vorhandene Website gezielt verfeinert

| Before | After |
|---|---|
| Alter Markenname in `TrustNarrative.tsx`. | Workfare im eigenen Text und in der zugänglichen Beschreibung. „Kleine Jobs. Klare Wege. Direkt in deiner Nähe.“ und die bestehende Gestaltung bleiben. |
| Verschiedene Schriftgrößen, farbige Icons und viel Text in „Für wen?“. | `FeatureSections.tsx` verwendet kurze Texte, dieselbe Überschriftenlogik und neutrale Glasflächen. **Dieser Karten-Zwischenstand ist nicht abgenommen; weitere Anordnung und Abstände bleiben ausdrücklich für später offen.** |
| Sicherheitsbereich mit abstrakten großen Icons, oberer Auswahleiste und dominantem Verweis. | Ruhiger Textwechsel ohne Icons oder zusätzliche Auswahleiste; beide Pfeile sitzen zusammen unten. Ein dezenter Textlink führt zur Sicherheitsseite. Die gemeinsame Höhe verhindert Sprünge und abgeschnittene längere Texte. |
| Closing-CTA würde auf Touch sofort weiterleiten. | `ClosingPlatformCta.tsx` und zugehöriges CSS erhalten die Hoveranimation. Touch, Stift und Tastatur warten auf ihr Ende; reduzierte Bewegung bleibt unmittelbar. Modifizierte Klicks behalten ihr normales Verhalten. Timer und Zustand werden beim Verlassen, Zurückkehren oder Unmount aufgeräumt. |
| Sehr hohe Abschlusssektion. | Die bisherigen Effekte bleiben bei kompakteren vertikalen Abständen in `FeatureSections.tsx`. |
| Mehrfach gestapelte Abstände vor dem Kontaktblock, besonders auf Rechtsseiten. | `LegalPageLayout.tsx` entfernt den zusätzlichen unteren Artikelabstand. `FooterChat.tsx` verringert den oberen Abstand; Inhalt und Chatfunktion bleiben erhalten. Der Chatbutton hat mindestens 44 Pixel Höhe und neutrale Zustandsfarben. |
| Der Build scheitert an unzulässigen zusätzlichen Exports der PNG-Route; dort steht noch JobBridge. | `og-image.png/route.tsx` hält die Bildgröße intern, entfernt den ungenutzten Export und verwendet die zentrale Workfare-Marke. Antwortformat und Bildgröße bleiben PNG mit 1200 × 630 Pixeln. |
| Änderungsstand und spätere Kartenwünsche könnten verwechselt werden. | `design-plan.md` markiert die Kartenkorrektur ausdrücklich als spätere Runde. `platform-demo.md` erklärt Aufbau, Schutz, Prüfgrenzen und Ausrollreihenfolge. |

## Frühere Verifikation vor der Umstellung

Die folgenden Ergebnisse dokumentieren die vorherige Vorschau und die übrigen Websiteänderungen. Sie gelten ausdrücklich nicht als Nachweis für die neue vollständige Datenbankdemo.

- Website: Produktionsbuild mit Webpack und TypeScript bestanden; reguläres ESLint bestanden.
- Plattform: finaler Produktionsbuild einschließlich TypeScript bestanden; `/demo` und `Proxy (Middleware)` werden erkannt.
- Plattform: **144 Tests in 18 Testdateien bestanden**, davon **82 Tests in vier neuen Demodateien**.
- Website: **31 Domain-/Weiterleitungsprüfungen** und SEO-Prüfung für 16 statische Seiten bestanden.
- Beide Projekte: Diff-Formatprüfung ohne Fehler; keine neuen Abhängigkeiten.
- Plattform-Lint: Die vorhandene globale ESLint-Konfiguration erfasst kein TS/TSX. Die neuen Demo-Dateien wurden deshalb zusätzlich mit einer temporären Next-/TypeScript-Konfiguration geprüft. Das ist keine Behauptung, dass das gesamte Plattform-TSX-Projekt gelintet wurde.
- Produktions-HTTP: alle öffentlichen Rollen erreichbar; unbekannte Verwaltungsrolle fällt auf Suchende zurück; strenge Demo-CSP und noindex vorhanden, kein Manifest. Eine gefälschte Demo-Kennzeichnung öffnet `/app-home` nicht. Die unveränderte Anmeldung bleibt das Ziel.
- Finaler Produktions-HTTP-Check: POST, PUT, PATCH, DELETE und OPTIONS auf `/demo` jeweils 405 mit `Allow: GET, HEAD`; HEAD weiterhin 200 mit strenger CSP.
- Website-HTTP: exakte Demo-Adresse in CSP erlaubt, eigene Einbettung weiterhin gesperrt. PNG-Antwort und 1200 × 630 Pixel bestätigt.
- Browser: eingebettete Rollenansichten bei 390 × 844 und 1440 × 900 Pixeln angesehen, ohne horizontalen Seitenüberlauf. Rollenauswahl und Ladebestätigung geprüft.
- Browser: echte Demo direkt geöffnet und unter Produktions-CSP bedient: Listenwechsel, Detaildialog, Escape/Rückkehr, Anbieterhinweis und lokale Einstellungen. Keine Fehler/Warnungen im Produktionskonsolenprotokoll dieser Prüfung.
- Browser: Kontaktabstand im Impressum auf Desktop und Handy geprüft; Chatbutton 44 Pixel hoch. Closing-CTA per Enter erreicht die Plattform; Rückkehr setzt den Animationszustand zurück.
- Ergänzend: zehn gezielte Verhaltenstestgruppen für Touch/Stift, Tastatur, reduzierte Bewegung, modifizierte Klicks, Timer und Seitenrückkehr am tatsächlichen CTA-Code bestanden.

## Offene Punkte

Für eine öffentliche Demo fehlen die getrennte gehostete Instanz, Domain/TLS und die Prüfung unter echten öffentlichen Cookie-, Proxy- und Lastbedingungen. Ein vollständiger Neuaufbau auf einem leeren Rechner ist durch die lokale Übernahmeprüfung allein nicht nachgewiesen. Die vier Glaskarten sind nicht abgenommen und bleiben auf ausdrücklichen Nutzerwunsch für später zurückgestellt. Die bestehende abweichende Git-Historie im Plattformprojekt wird nicht verändert.

Die tatsächliche Plattform enthält noch einzelne alte Markenbezeichnungen, beispielsweise den Dokumenttitel und Logo-Alternativtext. Sie wurden nicht durch eine gesonderte Demooberfläche kaschiert; die vollständige Plattform-Markenmigration bleibt eine spätere, gemeinsame Änderung.
