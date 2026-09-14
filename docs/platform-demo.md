# Plattformvorschau und vollständige Live-Demo

Stand: 14. September 2026. Die Startseite zeigt jetzt eine gestaltete, statische Momentaufnahme des Plattform-Startbildschirms. Die vollständige Plattformdemo bleibt lokal verfügbar und öffnet erst auf der separaten Website-Seite `/demo`. Commit und Push sind anschließend freigegeben; die öffentliche Demo bleibt bis zu ihrer getrennten Bereitstellung deaktiviert.

## Startseite: inszenierter Einblick

Direkt nach dem Hero steht eine nachgebaute Ansicht des Plattform-Startbildschirms mit vier erfundenen Jobs. Navigation, Karten, Schrift und Brückenasset orientieren sich an der aktuellen Anwendung. Einzelne Jobkarten erscheinen einmalig beim Scrollen; bei reduzierter Bewegung oder deaktiviertem JavaScript bleiben sie ohne diesen Effekt lesbar. Die sichtbaren Beispiele enthalten keine E-Mail-Adressen.

Diese Vorschau ist bewusst eine gepflegte Momentaufnahme, keine laufende Anwendung und keine Zusage pixelgenauer Gleichheit. Änderungen am Plattformdesign müssen anschließend auch in der Vorschau nachvollzogen werden. Die Startseite lädt keinen Plattform-iframe, legt keine Demositzung an und stellt keine Verbindung zur Demo-Anwendung oder deren Datenbank her. Reguläre Website-Ressourcen werden weiterhin geladen.

Der kurze Link „Live-Demo“ öffnet die Website-Route `/demo`. `prefetch={false}` verhindert, dass Next.js diesen Einstieg bereits vor dem Klick vorlädt. Die vollständige Anwendung bleibt damit eine bewusste nächste Aktion.

## Live-Demo auf `/demo`

Die eigene Website-Seite verwendet den gemeinsamen Workfare-Header, einen kurzen Titel und die drei Rollenbuttons. Sie ist nicht in der Sitemap enthalten und erhält `noindex`/`nofollow`. Hier öffnet der iframe die reguläre Plattform. Nach einem kontrollierten Einstieg unter `/demo` werden die normalen Seiten unter `/app-home` geladen: dieselbe Navigation, Joblisten, Angebote, Aktivitäten, Profile und Serveraktionen. Die zuvor gebaute Sondervorschau mit lokalen Ersatzdialogen wurde verworfen und entfernt.

Die drei Schaltflächen wechseln zwischen Suchenden, privaten Anbietern und Unternehmen. Unternehmen nutzt die tatsächlich vorhandene Anbieterrolle der Plattform. Es gibt keine separat gestaltete Unternehmensvorschau. Funktionsänderungen an der Plattform kommen über denselben Quellstand auch in die Demo; dafür müssen beide Bereitstellungen aus derselben Version gebaut werden.

## Gemeinsame Farbe

Startseitenvorschau und Live-Demo folgen dem zentralen Website-Modus. Aktuell ist das `dark`; `light` ist für den späteren Website-Hellmodus vorbereitet. Der iframe bekommt die Startfarbe über einen geprüften Theme-Parameter. Ein getrennter Farb-Cookie sorgt für passende serverseitige Darstellung, und spätere Änderungen kommen über eine auf Parent und Herkunft beschränkte Nachricht ohne Neuladen an. Die Kopplung schreibt keine Profilfarbe in die Datenbank und verändert das Farbsystem der normalen Plattform nicht. Einzelheiten und Prüfgrenzen: `changes-demo-theme-2026-09-14.md`.

## Wo die Daten liegen

Die Demo verwendet eine eigene Supabase-Instanz. Es werden ausschließlich die Plattformstruktur und erfundene Beispieldaten übernommen, keine echten Benutzer oder deren Inhalte. Die normale Plattformkonfiguration wird nicht verändert.

Jeder Besuch bekommt eine eigene kleine Beispielwelt mit drei auswählbaren Profilen und zwei erfundenen Begleitprofilen. Die Begleitprofile liefern Bewerbungen, Gespräche und die vorhandene Elternfreigabe. Der Rollenwechsel verändert daher kein globales Konto und keine andere Besuchssitzung. Änderungen bleiben in der eigenen Beispielwelt.

Ein geheimer Browsercookie ordnet den Besuch zu; in der Datenbank steht nur dessen Hash. Der Server erlaubt ausschließlich die drei festgelegten Profile dieses Besuchs und meldet sie über Supabase an. Verwaltungsschlüssel und Anmelde-OTPs werden nicht an die Website weitergegeben.

## Schutz der vollständigen Live-Demo

Die folgende Tabelle dokumentiert die zuvor umgesetzte Datenbankdemo. Ihre Schutzregeln und Rollenabläufe werden durch die jetzige Trennung von Startseite und `/demo` nicht verändert.

| Before | After |
|---|---|
| Eigene Demoseiten mit nachgebildeten Aktivitäten und lokalen Ersatzaktionen. | Reguläre Plattformseiten und echte Datenbankabläufe. |
| Statische Beispiele im Frontend. | Erfundenes Profil-, Job-, Bewerbungs-, Gesprächs- und Terminmaterial in der separaten Datenbank. |
| Die Rollenbuttons schalteten nur eine Ansicht um. | Kontrollierte Anmeldung als besuchergebundenes Suchenden-, Privat- oder Unternehmensprofil. |
| Die Demo sollte denselben Host wie die normale Anwendung verwenden. | Eigene Bereitstellung mit eigenen Datenbankzugängen und Sitzungscookies. |
| Verbindungen und Formulare waren im iframe vollständig blockiert. | Die echte Demo darf ihre eigene Datenbank und ihre eigenen Formularziele verwenden. Übergeordnete Navigation und Popups bleiben gesperrt. |
| Ein internes Demo-Kennzeichen übersprang die Profilabfrage. | Das reguläre Layout lädt immer das tatsächliche angemeldete Profil. Die Ladebestätigung enthält die daraus abgeleitete Rolle. |
| Keine separate Besuchsgrenze in der Produktionsstruktur. | Zusätzliche Regeln auf allen Geschäftstabellen der Demo; auch Geschäftsfunktionsaufrufe laufen unter einem eingeschränkten Datenbankkonto. |
| Standardports der lokalen Entwicklungsdienste waren netzweit gebunden. | API, Datenbank und Testpostfach sind ausdrücklich auf localhost beschränkt. |
| Normale und Demo-Anmeldung konnten lokal denselben Standard-Cookienamen verwenden. | Einheitlicher eigener Demo-Cookiename in Browser, Server und Sitzungsaktualisierung. |
| Direkter Start mit einer Node-Umgebungsdatei scheiterte am Next-Kindprozess. | Start über einen kleinen Umgebungsloader und regulären Next-Prozess. |
| Gescheiterte Profilerstellung konnte Profilreste hinterlassen. | Sitzung wird widerrufen; die Datenbank entfernt den gesamten zugehörigen Datensatz einschließlich Auth-Resten. |
| Keine dauerhafte Bereinigung der Beispiele. | Zugriff endet nach 24 Stunden; ein Datenbankauftrag entfernt abgelaufene Besuche alle fünf Minuten. |
| Democharakter im Rahmen nicht ausdrücklich benannt. | Die separate Live-Demo-Seite benennt Beispieldaten direkt unter ihrem Titel; die statische Startseitenvorschau erhält ebenfalls einen kurzen Beispielhinweis. |

Die Konfigurationsprüfung weist die bekannte Produktionsdatenbank und widersprüchliche Demo-Einstellungen ab. Die zusätzlichen Tabellenregeln trennen Besuche auch bei direkten API-Aufrufen. Serverfunktionen zur Profilerstellung sind ausschließlich für den Demo-Server erreichbar. Einmal abgelaufene oder widerrufene Besuche verlieren ihren Datenzugriff auch mit zuvor ausgestellten Anmeldungstokens.

**Prüfstand der vorherigen vollständigen Datenbankdemo:** 58 echte API-Prüfungen und drei SQL-Prüfsuiten haben unter anderem Besuchstrennung, Bewerbung, Gespräch, Termin, Widerruf und vollständige Bereinigung nachgewiesen. Alle drei Rollen wurden eingebettet angezeigt; die Darstellung wurde bei 390 × 844 und 1440 × 900 Pixeln geprüft. Eine Testnachricht wurde in der normalen Plattformansicht gespeichert und nach Neuladen wieder angezeigt. Die genauen Nachweise und Prüfgrenzen stehen in `changes-platform-demo-2026-09-14.md`. Die Browser- und Build-Prüfung der neuen Startseitenvorschau und separaten Website-Route ist abgeschlossen; der Nachweis steht in `changes-platform-preview-2026-09-14.md`.

## Lokal starten

Website: Port 3000. Plattform: Port 3001. Getrennte Demo-API: Port 55321. Für Website und eingebettete Plattform denselben Hostnamen verwenden, beispielsweise überall `localhost`. Die eigentlichen Dienste binden ausschließlich auf `127.0.0.1`.

Die Plattform erhält eine eigene, nicht versionierte `.env.demo.local`; `.env.local` bleibt erhalten. Startwerkzeuge und die genaue Betriebsanleitung werden im Plattformprojekt gepflegt.

Die Website-Seite `http://localhost:3000/demo` verwendet im iframe lokal `http://localhost:3001/demo`. Die Startseite benötigt den Plattformdienst nicht für ihre Vorschau. Ein abweichender Einstieg wird über `NEXT_PUBLIC_PLATFORM_DEMO_URL` gesetzt; er muss ohne Zugangsdaten und feste Rollenparameter auf `/demo` enden. Die Website akzeptiert Bereitschaftsmeldungen ausschließlich vom ausgewählten iframe, dessen konfigurierter Herkunft und der ausgewählten Rolle.

## Öffentlich bereitstellen

Für den öffentlichen Betrieb ist eine dauerhaft getrennte Demo-Instanz unter `demo.workfa.re` vorgesehen. Diese Adresse ist im Code vorbereitet, aber durch diese Arbeit noch nicht eingerichtet oder veröffentlicht. Die normale App wird nicht zum öffentlich nutzbaren Testkonto umgewandelt.

Der öffentliche Einstieg ist deshalb standardmäßig deaktiviert. Erst ein Produktionsbuild mit gesetztem `NEXT_PUBLIC_PLATFORM_DEMO_URL` zeigt den Demo-Link und lädt die Anwendung; ohne Konfiguration bleibt `/demo` eine kurze Vorbereitungsseite ohne iframe. In der lokalen Entwicklung bleibt der Einstieg auf Port 3001 aktiv. Die Freigabevariable erst nach erfolgreicher Bereitstellung und Prüfung der getrennten Instanz setzen.

Plattform und Demo verwenden denselben Quellstand, jedoch eigene Builds, weil die öffentliche Supabase-Konfiguration beim Bauen eingebunden wird. Datenbankänderungen brauchen einen entsprechenden Demo-Rollout mit erneut geprüften Besuchsgrenzen. Neue Tabellen und Funktionen dürfen nicht unbemerkt außerhalb dieser Grenzen erreichbar werden.

Vor dem Website-Rollout müssen Demo-Hosting, eigene Schlüssel, ausschließlich synthetische Daten, Sitzungsbereinigung, Versandblockade, Produktionsschutz und die Einbettung auf der späteren Domain nachgewiesen sein. Die aktuelle lokale Supabase-Konfiguration mit Entwicklungszugängen ist kein öffentliches Hostingpaket.

Die Glaskarten und die Migration der übrigen Appdomains bleiben ausdrücklich spätere Aufgaben.

Grundlagen: [Supabase-Umgebungen](https://supabase.com/docs/guides/deployment/managing-environments), [Supabase-Serveranmeldung](https://supabase.com/docs/guides/auth/server-side/creating-a-client), [Next-Proxy-Konvention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy).
