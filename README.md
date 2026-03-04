# REMA1000-App

Én QR-kode som sender brukeren direkte til riktig butikk:
- iOS -> App Store
- Android -> Google Play
- Andre enheter -> rema.no

Løsningen bruker Cloudflare Worker med server-side `302` redirect (ingen synlig landingsside).

## Deploy

1. Installer Wrangler

```bash
npm install -g wrangler
```

2. Logg inn i Cloudflare

```bash
wrangler login
```

3. Deploy fra prosjektmappen

```bash
wrangler deploy
```

4. Kopier Worker-URL fra output (for eksempel `https://rema1000-qr-redirect.<subdomain>.workers.dev`)

5. Generer QR-koden med denne URL-en

## UTM og parametre

Worker legger til disse parametrene automatisk:
- `utm_source=qr`
- `utm_medium=offline`
- `utm_campaign=rema1000_app_download`
- `utm_content=ios|android|desktop`

Du kan overstyre ved å sende egne query-parametre i QR-URL-en.
Eksempel:

```text
https://rema1000-qr-redirect.<subdomain>.workers.dev/?utm_campaign=vaar2026&placement=butikkplakat
```