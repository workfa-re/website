# Kontaktseite · 15. September 2026

## Ziel und Gestaltungsreferenzen

Die Kontaktseite wird zum Verzeichnis für vier Anliegen und die persönlichen Teamkontakte. Sie verwendet den bestehenden Workfare-Header, die vorhandene Schrift und klare Glasflächen. Die Adressen sind ohne Aufklappen sichtbar; kein Formular und kein zusätzlicher Chat stehen vor dem Kontakt.

Als Referenzen dienen die Aufteilung nach Anliegen bei [Linear](https://linear.app/contact) und die Trennung von Support, Medien und allgemeiner Kommunikation bei [Stripe](https://stripe.com/contact). Übernommen wird das Ordnungsprinzip, nicht deren Markenauftritt. Die Umsetzung folgt `make-interfaces-feel-better`: klare Texthierarchie, dezente Lichtkanten, ausreichende Trefferflächen, gezielte Übergänge und reduzierte Bewegung.

## Struktur und Gestaltung

| Before | After |
| --- | --- |
| `/kontakt` zeigte einen Platzhalter mit großem Leerraum. | Ein kompakter Einstieg führt zu Allgemein, Support, Presse und Datenschutz. |
| Keine aufgabenspezifischen Kontakte auf der Seite. | Vier Glasflächen enthalten jeweils Anliegen, einen kurzen Hinweis und die direkt sichtbare E-Mail-Adresse. |
| Allgemeiner Hintergrund ohne Kontaktstruktur. | Ruhige Hintergrundbeleuchtung, klare Glasränder und abgestufte Typografie greifen die vorhandene Designsprache auf. |
| Keine separate Führung auf kleinen Bildschirmen. | Die Kontaktflächen wechseln zwischen vier, zwei und einer Spalte; lange Adressen dürfen umbrechen. |
| Statischer Platzhalter. | Titel, Einleitung und Kontaktflächen erscheinen kurz gestaffelt. Hover-Zustände verändern Licht und Kontrast; Karten springen nicht nach oben. Reduzierte Bewegung deaktiviert die Einblendung. |
| Der Footer-Chat wiederholte die Kontaktaufforderung. | Auf der Kontaktseite entfällt der doppelte Chatblock. Der gemeinsame Footer erhält einen direkten Kontakt-Link. |

## E-Mail und Teamdaten

| Before | After |
| --- | --- |
| Es waren nur allgemeiner Kontakt und Presse zentral konfiguriert. | Die vier Abteilungsadressen werden zentral konfiguriert und für Darstellung sowie Metadaten gemeinsam verwendet. |
| Persönliche E-Mail-Adressen waren nur in den Profilen sichtbar. | Die Kontaktseite liest alle `teamMembers` und deren `direct-email`-Kontakte aus `src/content/team.ts`. Namen, Rollen, Bilder und Profilpfade stammen aus demselben Bestand wie „Über uns“. |
| Keine kleine Kontaktübersicht des Teams. | Kompakte Einträge mit Porträt beziehungsweise Initialen, Rolle, persönlicher Adresse und Profil-Link. Andere Kontaktarten werden nicht als persönliche E-Mail übernommen. |
| E-Mail-Adressen mussten manuell übernommen werden. | Mailto-Links öffnen das Mailprogramm. Separate Kopierbuttons bestätigen nur einen erfolgreichen Zwischenablagezugriff; bei einem Fehler bleibt die Adresse manuell kopierbar. |

Ein neues Mitglied wird mit der nächsten Veröffentlichung der Website automatisch auf „Über uns“ und auf der Kontaktseite angezeigt. Für seine persönliche Adresse muss ein öffentlicher `direct-email`-Eintrag in den Teamdaten vorliegen. Ohne diesen Eintrag wird keine persönliche Adresse erfunden.

`kontakt@workfare.team`, `presse@workfare.team` und die drei persönlichen Teamadressen stammen aus dem vorhandenen Datenbestand. Für den Entwurf wurden `support@workfare.team` und `datenschutz@workfare.team` ergänzt und zunächst als Annahmen offengelegt. Nach Ansicht der Screenshots hat der Nutzer die gezeigte Fassung ausdrücklich für Commit und Push freigegeben. Diese Veröffentlichungserlaubnis bestätigt keine tatsächliche Zustellung: Die Website richtet keine Postfächer, Zustellregeln oder Weiterleitungen ein. Es wurde keine Testmail versandt und kein Empfang bestätigt.

## Auffindbarkeit

| Before | After |
| --- | --- |
| Die Kontakt-Metadaten nannten in Open Graph und Twitter noch JobBridge. | Titel, Beschreibung und Vorschaumetadaten verwenden Workfare. |
| Keine kontaktspezifischen strukturierten Daten. | Ein `ContactPage`-Eintrag beschreibt die sichtbaren Kontaktwege. `/kontakt` bleibt unter derselben kanonischen Adresse und dem vorhandenen Sitemap-Eintrag erreichbar. |
| Ein separater Kontakt-Platzhaltereintrag wurde gepflegt. | Der ungenutzte Eintrag entfällt; die tatsächlichen Kontaktinformationen liegen im zentralen Kontaktbestand. |

## Prüfung und Freigabestand

- Vollständiges ESLint, `tsc --noEmit`, `npm run seo:verify` und der Produktionsbuild sind erfolgreich. Die Kontaktseite wird als statisches HTML erzeugt; allein die Kopierfunktion benötigt eine kleine zusätzliche Client-Komponente.
- Das erzeugte Produktions-HTML wurde gesondert geprüft: genau eine H1, Workfare-Seitentitel, Canonical `https://workfa.re/kontakt`, sieben eindeutige Mailto-Adressen und vier dazu passende strukturierte Kontaktpunkte. Alle drei verlinkten Profile sind im Build vorhanden.
- Browserprüfung bei 1280 × 720, 390 × 844 und 320 × 568: Screenshots, kein horizontaler Überlauf, vollständige Adressen, passende Kontaktraster und geladene Porträtdatei. Für das kleine Porträt lädt der Browser eine passende 128-Pixel-Bildvariante. Das normale Browserformat wurde anschließend wiederhergestellt.
- Der Sprung zum Team funktioniert; Rezans Profil wurde über den Profil-Link geöffnet. Die übrigen Profilziele sind im Produktions-HTML und Build geprüft. Weitere wiederholte Browsernavigation war am Ende durch eine Zeitüberschreitung der Browsersteuerung unterbrochen; das ist kein beobachteter Seitenfehler.
- E-Mail-Kopieren mit Maus und Tastatur wurde nicht nur anhand der Erfolgsmeldung geprüft: Rezans und Tims Adressen wurden jeweils in ein rein lokales Testfeld eingefügt und stimmten überein. Die temporäre Testdatei wurde danach entfernt. Es wurden keine E-Mails versendet.
- Eine unabhängige Codeprüfung fand einen möglichen verspäteten Clipboard-Abschluss nach Seitenwechsel. Der korrigierte Vorgang entwertet alte Anfragen und bereinigt seine Timer; die Gegenprüfung bestätigt die Korrektur. Fehlerpfad und reduzierte Bewegung sind im Code geprüft, ohne eine abgelehnte Clipboard-Berechtigung oder eine geänderte Betriebssystemeinstellung im Browser zu erzwingen.
- `git diff --check` ist sauber. Die Search-Console-Dokumentationsänderungen aus der vorherigen Runde sind Teil des freigegebenen Änderungsstands.

## Abschließender Glasabgleich und Freigabe

| Before | After |
| --- | --- |
| Kontaktkarten hatten eigene ähnliche Glasgradienten, schwächere Randreflexe und 2 Pixel Unschärfe. | Karten und bestehende Glasbuttons verwenden dieselben zentralen `--glass-surface-*`-Werte: klare Mitte, ausgeprägte Randreflexe, 1,5 Pixel Unschärfe und dezente Innenreflexe. Die bisherigen Werte von Logo- und Menübutton bleiben erhalten. |
| Auf Karten fehlte die zusätzliche innere Reflexkante. | Ein nicht interaktiver Innenreflex liegt 2 Pixel innerhalb der 24-Pixel-Außenrundung und hat passend 22 Pixel Radius. |
| Eigener Karten-Hover ersetzte den Glasschatten. | Hover hellt nur die Fläche auf; die gemeinsamen Glasschatten bleiben bestehen. |
| Der Quelltext bezeichnete zwei Adressen als nicht zur Veröffentlichung freigegebenen Entwurf. | Nach der ausdrücklichen Freigabe der gezeigten Fassung entfällt dieser Entwurfskommentar. Die ausstehende Zustellprüfung bleibt hier dokumentiert. |

Die unabhängige Gegenprüfung bestätigt die unveränderten bisherigen Headerwerte, nicht blockierende Reflexebenen und konsistente Kontaktziele. Die Veröffentlichung umfasst die Kontaktseite, den gemeinsamen Glasabgleich sowie die vorhandenen Search-Console-Notizen. Tatsächliche Abteilungszustellung und Empfang bleiben eine gesonderte Prüfung am E-Mail-System.

Der abschließende Browservergleich bestätigt identische berechnete Hintergründe, Schatten, Filter und beide Reflexebenen für Header-Glas und Kontaktkarten. Desktop mit 1280 Pixeln und kleines Handy mit 320 Pixeln wurden erneut geprüft; kein horizontaler Überlauf. Vollständiges Lint, SEO-Prüfung und Produktionsbuild einschließlich TypeScript bestehen auch nach dem gemeinsamen Glasabgleich.
