# Plattformvorschau auf der Startseite

Stand: 14. September 2026. Lokal umgesetzt; Browser- und Build-Prüfung abgeschlossen. Noch kein Commit oder Push dieser Runde.

Die Startseite zeigt einen inszenierten Nachbau des aktuellen Plattform-Startbildschirms. Die vollständige Anwendung bleibt als eigener nächster Schritt über „Live-Demo“ auf `/demo` verfügbar. Die bestehende Datenbankdemo, ihre Besuchstrennung und die Anmeldung für die drei Rollen werden nicht verändert.

## Inhalt und Gestaltung

| Before | After |
|---|---|
| Direkt eingebettete Anwendung in `hero-scroll-demo.tsx`, abhängig vom laufenden Demodienst. | Statischer Plattform-Startbildschirm aus Website-Komponenten; keine Plattformanfrage, Anmeldung oder Datenbankverbindung durch diesen Startseitenbereich. |
| Die laufende Anwendung lieferte Schrift und Branding im iframe. | `Plus Jakarta Sans` ist auf den nachgebauten Plattformbildschirm begrenzt; das vorhandene Plattform-Brückenasset wird lokal verwendet. Die Schrift der umgebenden Website bleibt erhalten. |
| Der Plattformrahmen war Teil der direkt bedienbaren Anwendung. | Navigation, Profilanzeige, Filterleiste und Kartenflächen sind nach dem aktuellen Plattformdesign nachgebaut. Sie dienen als visuelle Vorschau und sind keine scheinbar bedienbaren Schaltflächen. |
| Die laufende Sitzung bestimmte sichtbare Jobs und Kontoinformationen. | Vier festgeschriebene, erfundene Jobs mit kurzen Beschreibungen; keine E-Mail-Adressen. Ein kurzer Hinweis kennzeichnet die Beispieldaten. |
| Die Anwendung erschien als vollständiger, gleichzeitig geladener Bereich. | Jede Jobkarte wird beim Scrollen einmal eingeblendet: 0,72 Sekunden mit 0,14 Sekunden zusätzlicher Verzögerung für die zweite Spalte. Leichte Verschiebung und Unschärfe laufen zur ruhigen Endposition aus. |
| Keine eigene Bewegungsalternative für den neuen Kartenaufbau. | Reduced Motion zeigt Karten direkt. Eine `noscript`-Regel hält sie auch ohne JavaScript sichtbar. |
| Die Startseitenfläche richtete sich nach der Höhe des Live-iframes. | Eigenständig bemessener großer Bildschirmrahmen; auf Mobile ist der Ausschnitt auf die ersten zwei Karten ausgelegt. Abgerundete Flächen und ein weicher unterer Verlauf schließen die Vorschau ab. |
| Drei Rollenbuttons standen bereits über der Startseitendemo. | Ein kurzer „Live-Demo“-Link unter der Vorschau führt auf `/demo`. Die Rollenwahl gehört zur vollständigen Demo. |
| Kein eigenständiger Übergang zur vollständigen Demo. | Klarer Link mit mindestens 48 Pixel hoher Trefferfläche, sichtbarem Tastaturfokus und ruhigem Hover; beim Drücken 0,96 Skalierung. Reduzierte Bewegung deaktiviert die Übergänge. |
| Der vollständige Demo-Einstieg war im Startseitenbereich enthalten. | `prefetch={false}` am Link verhindert das Vorladen des `/demo`-Einstiegs durch Next.js. Reguläre Website-Ressourcen werden weiterhin geladen. |

## Separate Live-Demo

| Before | After |
|---|---|
| iframe und Rollenlogik lebten im Startseitenbaustein. | Unverändertes Verhalten in `src/components/demo/LivePlatformDemo.tsx`, ausschließlich auf der eigenen Demoseite eingebunden. |
| Keine eigene Website-Seite für die Live-Demo. | `src/app/demo/page.tsx` mit gemeinsamem `SiteHeader`, „Live-Demo“ als Titel und einer kurzen Erklärung zu den Beispieldaten. |
| Die Anwendung war Bestandteil des normalen Seitenflusses nach dem Hero. | Große Anwendungsansicht auf `/demo` mit Suchenden-, Privat- und Unternehmensrolle; iframe-Höhe weiterhin 82 beziehungsweise 85 Prozent der dynamischen Bildschirmhöhe. |
| Keine eigenen Metadaten für den separaten Website-Einstieg. | Eigener Titel und Canonical `/demo`, `noindex`/`nofollow` einschließlich Googlebot. Die Route ist nicht in der vorhandenen Sitemap enthalten. |

Die Bereitschaftsprüfung kontrolliert weiterhin Herkunft, sendenden iframe und ausgewählte Rolle. Verzögertes Laden, 45-Sekunden-Zeitüberschreitung, Wiederholen und die bestehende iframe-Sandbox bleiben erhalten. Diese Trennung verändert weder Datenbankzugriffe noch Berechtigungen in der Plattform.

## Pflege und Prüfstand

Die Vorschau ist eine bewusst gepflegte Momentaufnahme. Spätere Änderungen am Plattformdesign müssen auch in den Nachbau übernommen werden; sie werden dort nicht automatisch aktualisiert. Pixelgenaue Gleichheit wird nicht behauptet. Die echte Demo verwendet weiterhin den regulären Plattformcode.

Bestanden: TypeScript-Prüfung der Website und gezieltes ESLint für die Vorschau, `src/app/demo/page.tsx` und `src/components/demo/LivePlatformDemo.tsx`.

- Produktionsbuild mit Webpack erfolgreich; neue Route `/demo` wird statisch erzeugt. Der erste Versuch ohne Netzwerkzugriff konnte die zusätzliche Plattformschrift nicht abrufen; der abschließende Build mit Zugriff auf den Schriftanbieter bestand.
- Vorschau bei 320, 390 und 1440 Pixeln angesehen. Gemessene Seitenbreite jeweils gleich Fensterbreite; kein horizontaler Überlauf. Die vollständige Demoseite wurde auf Handy und Desktop geprüft.
- Kartenanimation beobachtet: zuerst einzelne Karten sichtbar, weitere beim Herunterscrollen mit gestaffeltem Übergang; sichtbare Karten enden bei Deckkraft 1 und ohne Unschärfe. Mobile zeigt nacheinander die ersten beiden Karten.
- Startseite im Browser mit null iframes nachgewiesen. Klick auf „Live-Demo“ führt zur eigenen Seite `/demo`; dort lädt erst die echte Anwendung. Suchenden-, Privat- und Unternehmensprofil jeweils über die Rollenwahl bestätigt.
- HTTP-Prüfung bestätigt Titel, noindex und den richtigen lokalen iframe-Einstieg.
- Reduced-Motion-Regel und JavaScript-freier Fallback im Quellcode geprüft; keine separate Browseremulation dieser beiden Einstellungen durchgeführt.
- Der alte lokale Plattform-Entwicklungsprozess antwortete nicht mehr. Er wurde beendet und mit dem vorhandenen geprüften `demo:dev`-Start neu gestartet. Keine Plattform-Quelldateien oder Datenbankregeln geändert.
- Diff-Formatprüfung bestanden. Keine neue Paketabhängigkeit, kein Commit und kein Push.

Die früheren 253 Plattformtests, 58 API-Prüfungen, drei SQL-Prüfsuiten und damaligen Builds beziehen sich auf die vollständige Datenbankdemo. Sie werden nicht als neue Prüfung dieser Vorschau gezählt. Nachweise stehen in `changes-platform-demo-2026-09-14.md`.

Die Glaskarten bleiben wie besprochen einer späteren Runde vorbehalten. Öffentliches Demo-Hosting ist weiterhin offen.
