# Plattformdomain – Stand 16. September 2026

Die öffentliche Plattform verwendet `https://app.workfa.re`. Die Website bleibt
unter `https://workfa.re`. Der bestehende Verwaltungszugang ist weiterhin
`https://deploy.jobbridge.team`; `deploy.workfare.team` wurde nicht eingerichtet.

## Routing und HTTPS

- Cloudflare-Konto **Workfare**, Zone `workfa.re`: `app` ist ein proxied CNAME
  auf `4bd98475-e446-4411-892e-e06e4ad5cbb4.cfargotunnel.com`.
- Der vorhandene Tunnel **workfare-website** hat eine zusätzliche, exakt auf
  `app.workfa.re` begrenzte Route zum internen Dienst `http://dokploy-traefik:80`.
- Dokploy-Projekt **Plattform**, Umgebung **production**, Anwendung **app**
  (`app-apefld`): Host `app.workfa.re`, Pfad `/`, Container-Port `3000`.
- Öffentliches TLS endet bei Cloudflare. Zwischen Cloudflare und dem Server
  besteht der verschlüsselte Tunnel; nur innerhalb des vorhandenen Docker-Netzes
  wird HTTP verwendet. Es wurden keine Firewall-Ports geöffnet. In der internen
  Dokploy-Domain ist deshalb kein zusätzliches Let's-Encrypt-Zertifikat aktiv.
  Siehe [Dokploy-Anleitung](https://docs.dokploy.com/docs/core/guides/cloudflare-tunnels).
- Der zunächst geprüfte direkte A-Eintrag wurde vollständig durch den CNAME
  ersetzt, weil der direkte Zugriff einen Verbindungs-Timeout lieferte.
- HTTP auf der neuen öffentlichen Domain wird bereits zu HTTPS weitergeleitet.

## Alte Plattformadresse

Cloudflare-Konto **Mail@r-yalcin.de's Account**, Zone `jobbridge.app`:

- Regel: **Plattform dauerhaft zu app.workfa.re**
- Bedingung: `(http.host eq "app.jobbridge.app")`
- Ziel: `concat("https://app.workfa.re", http.request.uri.path)`
- Status: **308**, Abfragezeichenfolge beibehalten.

Die vorhandene Website-Weiterleitung bleibt unverändert. DNS und TLS der alten
Plattformdomain müssen erhalten bleiben, solange alte Links weiterleiten sollen.
Keine globale Subdomain-Wildcard verwenden: Verwaltung und andere Dienste sind
nicht Teil dieser Migration.

## Anwendung und Authentifizierung

Dokploy speichert beide Variablen mit `https://app.workfa.re`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_URL`

Die Anwendung wurde damit neu gebaut. Datenbank, Konten, Schlüssel und
Demo-Konfiguration wurden nicht geändert.

Im vorhandenen Supabase-Produktionsprojekt wurde die Site URL auf die neue
Adresse gesetzt. Zusätzlich sind diese exakten Redirect-Ziele erlaubt:

- `https://app.workfa.re/auth/callback`
- `https://app.workfa.re/auth/update-password`

Der bisherige Callback und der vorhandene lokale Entwicklungs-Callback bleiben
vorerst in der Allowlist. Eine Anmeldung auf der neuen Domain benötigt eine neue
Browsersitzung; Cookies werden nicht zwischen den Domains übertragen. Bereits
begonnene Anmeldevorgänge sollten auf der neuen Domain neu gestartet werden.

Der Live-Test fand einen bestehenden Proxy-Fehler: `/auth/callback` leitete nach
`https://localhost:3000` weiter. Plattform-Commit
`843b02862a5424c7abd21d9dbb6619584bb1add6` verwendet für Callback und Logout jetzt
die konfigurierte öffentliche URL. Logout antwortet nach dem POST mit 303.
Der Commit wurde von GitHub Autor und Committer `r-yalcin` zugeordnet.

## Prüfung und weitere Arbeit

- Plattform: 303 Tests einschließlich sechs neuer Auth-Regressionstests;
  Produktionsbuild einschließlich TypeScript erfolgreich.
- Live: Startseite, Onboarding und Passwortseiten erreichbar; Callback und
  Rechtsweiterleitung bleiben auf `app.workfa.re`.
- Alte HTTP- und HTTPS-Links liefern 308; Pfad und auch kodierte Query-Parameter
  bleiben erhalten. Die neue Domain liefert 200 mit gültigem öffentlichem TLS.
- Browser: bestehende Kontoanmeldung bis zum Formular geöffnet. Kein echtes
  Benutzerpasswort verwendet, keine Bestätigungs-/Reset-E-Mail versendet.
- Die direkten Plattformlinks dieser Website verwenden zentral `siteConfig.appUrl`.
- Sichtbare JobBridge-Texte innerhalb der Plattform gehören zur nächsten
  Überarbeitung. Die öffentliche Live-Demo bleibt ein eigenes, späteres Vorhaben.
- Beim Plattform-Push meldete GitHub bestehende Dependabot-Warnungen. Diese wurden
  hier nicht bewertet oder durch den Domainwechsel behoben; separat prüfen.

## Rücknahme bei einer Störung

Zuerst die neue Route und den Tunnelzustand prüfen. Als kurzfristige Rücknahme
kann die neue Plattform-Weiterleitungsregel in Cloudflare deaktiviert werden;
der alte Dokploy-Host wurde erhalten. Bei einer vollständigen Rückkehr zusätzlich
die Supabase-Site-URL und beide Dokploy-Variablen zurückstellen und die Plattform
neu bauen. Einen 308 können Browser bereits gespeichert haben – deshalb die neue
Adresse weiter erreichbar halten. Den Auth-Proxy-Fix nicht zurücknehmen.
