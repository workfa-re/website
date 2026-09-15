# Offizielles Logo für Linkvorschauen

Abschlussstand für die Veröffentlichung vom 15.09.2026.

| Before | After |
| --- | --- |
| Standardvorschau mit Werbetexten, Rahmen und blauen Lichtverläufen. | Ausschließlich das bereitgestellte Workfare-Logo auf Weiß. Die vorherige Werbevorlage ist aus dem Quelltext entfernt. |
| Unterschiedliche direkte Verweise auf das generische Bild. | Zentrale Logo- und Vorschaukonfiguration in `src/config/brand.ts`. Alle allgemeinen Open-Graph-/Twitter-Bilder und bildlosen Fallbacks verwenden die neue Vorschau. |
| Standardbild unter der bereits verwendeten Adresse `/og-image.png`. | Neue Metadatenadresse `/workfare-preview.png`; die alte Adresse liefert ebenfalls das neue Logo statt der früheren Grafik. Bereits zwischengespeicherte Vorschauen anderer Dienste können bis zu deren Aktualisierung bestehen bleiben. |
| Werbegrafik als Organisationslogo ausgezeichnet. | Unverändertes Original-Logo mit seinen tatsächlichen Abmessungen in den strukturierten Daten. |
| Generischer Schriftentwurf „Workfare / Journal“ für Artikel ohne Bild. | Offizielles Logo auf Weiß. Aktuelle Artikel mit eigenen Bildern bleiben erhalten. |
| Alte JobBridge-Benennung in den Metadaten von „Demnächst“. | Workfare und das offizielle Vorschaubild. |
| Veraltete Dokumentation des Vorschaugenerators. | Herkunft, Verwendung und Ersatz durch das offizielle Logo dokumentiert. |

## Bestandsprüfung

Kein weiterer vergleichbarer Werbebildgenerator im Websitequelltext gefunden. Die tatsächlichen Pressefotos, bereitgestellten Teamfotos und die ausdrücklich gewünschte historische JobBridge-Karte bleiben erhalten. Die Plattformzeichen sind bytegleich mit den Originaldateien der Plattform; sie sind keine erfundenen Werbegrafiken.

## Validierung

- Vollständiges Lint, SEO-Prüfung und Produktionsbuild bestanden.
- 32 erzeugte HTML-Dateien auf veraltete Standardbild-URLs geprüft.
- Neue PNG-Vorschau visuell geprüft: 1200 × 630 Pixel, nur Logo auf weißer Fläche.
- Original-Logo und öffentliche Kopie sind bytegleich.
- Die erzeugten Antworten für alte und neue Bildadresse sind bytegleich.
- Allgemeine Seiten verwenden das Logo; echte Artikelbilder und Porträts bleiben als passende Seitenvorschauen erhalten.

Die Prüfung bestätigt den Produktionsbuild. Bereits gespeicherte Vorschauen externer Dienste werden durch einen Git-Push nicht automatisch aus deren Cache gelöscht.
