# Workfare Website

Öffentliche Website unter [workfa.re](https://workfa.re), entwickelt mit Next.js App Router, React, TypeScript und Tailwind CSS. Die Veröffentlichung erfolgt über Dokploy aus dem Repository [workfa-re/website](https://github.com/workfa-re/website).

## Lokal starten

Die geprüfte Entwicklungsumgebung verwendet Node.js 24 und npm 11. Die installierte Next.js-Version benötigt mindestens Node.js 20.9.0.

```bash
npm ci
npm run dev
```

Danach ist die Website unter [localhost:3000](http://localhost:3000) erreichbar. Abhängigkeiten werden über `package.json` und `package-lock.json` gemeinsam verwaltet. Für den Produktionsbuild muss der Download der eingebundenen Google-Schriften erreichbar sein.

## Prüfen und Produktionsstand ansehen

```bash
npm run lint
npm run seo:verify
npm run build
npm run start -- --port 3100
```

Während der Produktionsserver läuft, in einem zweiten Terminal:

```bash
npm run domains:verify -- http://127.0.0.1:3100
```

Die Domainprüfung verwendet ausschließlich einen lokalen Server. Sie kontrolliert permanente Weiterleitungen, erhaltene Pfade und Suchparameter, die Abgrenzung zu anderen Hosts sowie Canonical-, Sitemap-, Robots- und Feed-Adressen.

## Projektaufbau

- `src/app/`: Seiten, Metadaten, globale Styles sowie Sitemap-, RSS- und Bildrouten.
- `src/components/`: gemeinsam verwendete Oberflächen und Animationen.
- `src/config/site.ts`: aktuelle Marke, Website-Adresse, Navigation und Dienstverknüpfungen.
- `src/content/`: historische Beiträge, externe Medienquellen und Teamprofile.
- `public/`: unmittelbar erreichbare, tatsächlich verwendete statische Dateien.
- `scripts/`: vorhandene Prüfungen für Suchmaschinenangaben und Domainwechsel.
- `docs/`: [Dateiinventur](docs/file-audit.md) und [Bildherkunft](docs/image-provenance.md).

Die Website leitet `jobbridge.app`, `www.jobbridge.app` und `www.workfa.re` dauerhaft auf `https://workfa.re` weiter. Vorhandene historische Artikelpfade und Profilweiterleitungen bleiben erhalten. Die Anwendung und interne Dienste verwenden vorerst ihre bestehenden Adressen; deren Umstellung ist ein eigener Arbeitsschritt.

Änderungen werden lokal geprüft und anschließend bewusst über Git veröffentlicht. Ein lokaler Build oder ein bearbeiteter Dateistand veröffentlicht die Website noch nicht. Der Microsoft-Chat benötigt außerdem die passende Domainfreigabe im externen Dienst; eine Quelltextänderung allein richtet diese nicht ein.

## Bilder und historische Inhalte

Neue Bilder erhalten eine nachvollziehbare Herkunft und einen konkreten Verwendungszweck. In [image-provenance.md](docs/image-provenance.md) werden Quelle, Dateipfad, vorhandene Metadaten und bekannte Bearbeitungen dokumentiert. Ein Quellenlink ersetzt keine erforderliche Nutzungserlaubnis.

Keine Entwürfe, ungenutzten Bilder, Zugangsdaten oder internen Berichte in `public/` ablegen: Dateien dort sind direkt erreichbar, auch wenn keine Seite sie verlinkt. Bestätigte generative KI-Bilder müssen als solche dokumentiert werden; das Aussehen oder fehlende Kameradaten allein beweist keine KI-Herkunft. Suchmaschinenregeln werden bei Bedarf gezielt für einzelne Inhalte festgelegt.

Historische Presseberichte, deren Originaltitel, Quellen, Personenangaben und frühere Markenbezeichnungen bleiben unverändert. Aktuelle Oberflächentexte beziehen die neue Marke möglichst aus `siteConfig`.

## Lizenz

Der Quellcode steht unter der [MIT-Lizenz mit den dort aufgeführten Ausnahmen](LICENSE). Marken, Logos und Textinhalte sind von dieser Freigabe ausgenommen. Die Umbenennung und diese Dokumentation ändern keine bestehenden Rechte oder Nutzungsbedingungen. Für fremde Pressebilder gelten die Rechte ihrer jeweiligen Urheber; die Herkunftsliste erteilt keine zusätzliche Nutzungserlaubnis.
