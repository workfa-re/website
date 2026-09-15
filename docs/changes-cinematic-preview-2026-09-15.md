# Hero und animierte Plattformvorschau

Stand: 15. September 2026. Umgesetzt, geprüft und vom Nutzer für Commit und Push freigegeben. Gestaltung anhand von `make-interfaces-feel-better`, im bestehenden Workfare-Design.

## Einstieg und Bildschirmhöhe

| Before | After |
|---|---|
| Der Produktionsbuild blendete den Live-Demo-Link ohne gehostete Demo-Adresse aus. | Der Link auf `/demo` ist in `hero-scroll-demo.tsx` immer vorhanden, auch auf Handys. Die eigentliche öffentliche Einbettung bleibt an ihre konfigurierte Instanz gebunden. |
| Die Linkbreite konnte mit dem Beispielhinweis konkurrieren. | `PlatformPreview.module.css`: Link schrumpft nicht, Label bleibt einzeilig, die Trefferfläche bleibt 48 Pixel hoch. Die Leiste steht außerhalb des abgeschnittenen Vorschaurahmens. |
| Drei getrennte Hero-Höhen verwendeten den kleinsten mobilen Viewport. | `page.tsx` und `animated-hero.tsx` teilen eine dynamische Viewporthöhe mit Fallback sowie den äußeren Abstand. Die Innenhöhe berücksichtigt Abstand und Rahmen. |
| Sehr kurze Displays benötigten zusätzlichen Platz unterhalb des ersten Bildschirms. | Nur bei schmalen, kurzen Displays werden Text- und Buttonabstände kompakter. Schriftgröße und Buttonflächen bleiben erhalten. |
| Sichere Bildschirmränder wurden nicht an allen Breakpoints einbezogen. | Die Hero-Innenabstände berücksichtigen obere, untere und seitliche Safe Areas. Bei geringer Höhe oder größerem Text darf der Inhalt weiter wachsen, statt abgeschnitten zu werden. |

## Animationsfolge

| Before | After |
|---|---|
| Der Plattformrahmen stand bereits vollständig da. | Beim Hereinscrollen hebt sich die Oberfläche leicht aus der Tiefe; eine einmalige Lichtkante betont ihren Glasrand. Kein Blur auf dem gesamten großen Rahmen. |
| Die Wortmarke war sofort sichtbar und auf dem Handy versteckt. | Workfare wird von links nach rechts aufgedeckt. Auf Handys erhalten Marke/Profil und Navigation zwei klare Zeilen. Die Profil- und Navigationsdetails werden nicht zusammengedrückt. |
| Navigation und Tabs erschienen gleichzeitig. | Glaselemente erscheinen nacheinander, gefolgt von ihren einzelnen Inhalten. Schrift, Beschreibung und Angebotsüberschrift folgen mit abgestimmten kurzen Versätzen. |
| Jobkarten verwendeten nur einen einfachen vertikalen Übergang. | Karten erscheinen mit geringer Neigung, deutlicherer Tiefe und lokaler Unschärfe. Nach ihrer Ankunft bleiben die Karten ruhig. |
| Direktes oder schnelles Scrollen konnte die Karten vor der gemeinsamen Sequenz auslösen. | Frühe Karten warten auf den erfassten Start der Vorschau. Später sichtbare Karten berechnen nur die verbleibende Wartezeit und erscheinen zügig. |
| Fallbacks betrafen nur die Jobkarten. | Reduzierte Bewegung und deaktiviertes JavaScript zeigen auch Rahmen, Wortmarke und Navigation sofort. Die normale Zentrierung der Desktop-Navigation bleibt erhalten. |
| Erweiterte Bewegung hätte dauerhafte Arbeit verursachen können. | Alle neuen Effekte sind einmalig; keine eigenen Dauertimer, Scroll-Listener oder Animationsschleifen. Wiederholtes Vorbeiscrollen startet die abgeschlossene Sequenz nicht erneut. |

## Feinabstimmung nach Durchsicht

| Before | After |
|---|---|
| Ein Lichtstreifen lief nach dem Einblenden über die Karten; die Trennlinie leuchtete kurz auf. | Beide Effekte samt Pseudoelementen, Keyframes und zusätzlichem React-Zustand entfernt. |
| Die räumliche Einblendung war zurückhaltend. | Rahmen und Karten kommen etwas deutlicher aus der Tiefe und laufen sanfter aus. Die beiden Karten einer Desktopzeile folgen mit 180 statt 140 Millisekunden Versatz. |
| Wortmarke, Navigation und Texte erschienen schneller. | Die Wortmarke wird über eine Sekunde aufgedeckt. Glaselemente und Text bewegen sich etwas deutlicher, bei gleicher Reihenfolge und weiterhin einmaligem Ablauf. |

## Prüfung und Grenzen

- Nach der Feinabstimmung erneut geprüft: ESLint der Vorschau und vollständiges TypeScript ohne Fehler. Desktop bei 1440 × 900 und Handy bei 390 × 844 zeigen die stärkeren Startzustände und scharfe, ruhige Karten am Ende. Die entfernten Pseudoelemente werden im Browser nicht mehr erzeugt; der Live-Demo-Link bleibt 48 Pixel hoch. Unabhängige Quellcodeprüfung ohne neue Befunde.
- Vollständiges Website-ESLint, TypeScript, SEO-Prüfung für 17 statische Seiten und Produktionsbuild bestanden. Diff-Formatprüfung ohne Fehler. Keine neuen Abhängigkeiten.
- Geprüfte Bildschirmgrößen: 320 × 568, 390 × 667, 390 × 844, 768 × 1024, 844 × 390 und 1440 × 900 Pixel. Kein horizontaler Seitenüberlauf; Überschrift und Buttons bleiben innerhalb des Hero.
- Bei 320 × 568, beiden normalen 390-Pixel-Formaten, Tablet-Hochformat und Desktop beginnt die Vorschau exakt unter der ersten Bildschirmhöhe. Im sehr niedrigen Querformat wächst der Hero mit dem Inhalt; die Vorschau erscheint auch dort erst darunter.
- Am kleinen Handy ist der Demo-Link vollständig sichtbar, 48 Pixel hoch und ohne Textumbruch. Screenshots des Hero, der Vorschau und des Links geprüft.
- Die gestaffelten Zustände wurden im Browser beobachtet: zunächst erscheint die Marke, während nachfolgende Gruppen und Karten noch verborgen sind. Anschließend sind alle vier Desktopkarten sichtbar, scharf und am vorgesehenen Platz. Die mobile nächste Karte startet erst, wenn sie in Sicht kommt.
- Unabhängige Gegenprüfung: Zentrierung der Desktop-Navigation im Fallback und Startreihenfolge bei schnellem Scrollen korrigiert.
- Reduzierte Bewegung und JavaScript-freie Darstellung wurden im Quellcode und anhand des erzeugten Fallbacks geprüft, nicht durch eine Umschaltung der Geräteeinstellungen. Safari-Werkzeugleisten und reale Geräte sind durch Browser-Viewportprüfungen nicht vollständig abgedeckt. Es wurde keine Bildraten- oder Energielaufzeitmessung durchgeführt.
- Produktionsmarkup geprüft: sichtbarer Link auf `/demo`, weiterhin kein iframe und keine Demositzung auf der Startseite. Ohne konfigurierte öffentliche Instanz zeigt die Zielseite ihren Vorbereitungshinweis.
- Der vorhandene Docker-Dienst und die isolierte lokale Demo wurden wieder gestartet. Der tatsächliche Klick auf „Live-Demo“ öffnete die separate Seite und die dunkle Suchendenansicht mit dem Beispielprofil. Die Startseite steht danach wieder am Seitenanfang; temporäre Browsergrößen wurden zurückgesetzt.

Die Glaskarten weiter unten und der vollständige Website-Hellmodus bleiben die separat vorgemerkten Aufgaben. Die Animationsarbeit verändert weder Datenbankzugriffe noch Demo-Berechtigungen.
