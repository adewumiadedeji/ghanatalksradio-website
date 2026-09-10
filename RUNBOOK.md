# Deploying to /GTR-Laravel-New (IONOS shared webspace)

Two files come with this: `gtr-laravel-deploy.tar.gz` (the app, built and
with production PHP deps already installed) and `env.production` (your
`.env` — real credentials, keep it out of any tarball/git/upload that isn't
directly onto the server).

## ⚠️ Document root — read this before pointing the domain

When you point the domain, the web root **must** be `/GTR-Laravel-New/public`,
**not** `/GTR-Laravel-New` itself. Everything outside `public/` — `.env`
(DB passwords, API keys), `app/`, `vendor/` — must never be reachable over
HTTP. This is standard for every Laravel app; getting it wrong exposes your
WordPress DB credentials and the WP_DB_PASSWORD in `.env` to the internet.

## 0. Verify prerequisites (SSH in first)

```bash
ssh u90095647@home692847230.1and1-data.host
php -v      # need 8.3+
composer -v
```

If PHP is older than that, stop here and tell me — the app won't run and
we'll need a different plan (IONOS sometimes offers multiple PHP versions
selectable per-domain in the control panel). Node is **not** required on
this box — SSR runs on a separate DigitalOcean host (see §6); a working
Node install on this specific IONOS account was checked and does exist,
but hits a reproducible, unresolved WebAssembly/memory failure on startup
that made running SSR here a dead end.

## 1. Upload and extract

From your Mac:

```bash
scp gtr-laravel-deploy.tar.gz u90095647@home692847230.1and1-data.host:~/
scp env.production u90095647@home692847230.1and1-data.host:~/
```

On the server:

```bash
mkdir -p ~/GTR-Laravel-New
tar -xzf ~/gtr-laravel-deploy.tar.gz -C ~/GTR-Laravel-New --strip-components=1
mv ~/env.production ~/GTR-Laravel-New/.env
cd ~/GTR-Laravel-New
```

## 2. Permissions

```bash
chmod -R 775 storage bootstrap/cache
```

## 3. Database (Laravel's own — sessions/cache/queue, sqlite)

```bash
touch database/database.sqlite
php artisan migrate --force
```

This is separate from the WordPress DB (`WP_DB_*` in `.env`, already
pointed at `db5000105138.hosting-data.io` — reachable now that the app runs
on IONOS's own network, which is why `.env` sets `WP_DATA_SOURCE=db`
instead of `api`).

## 4. Cache config/routes for production

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 5. Cron — one entry

Edit the crontab (`crontab -e`, or via the IONOS control panel's cron UI if
that's easier):

```cron
* * * * * cd ~/GTR-Laravel-New && php artisan schedule:run >> /dev/null 2>&1
```

This is standard Laravel — it's what actually triggers the daily sitemap
regeneration (`routes/console.php`). SSR does **not** run on this host at
all (see §6) — there used to be a second cron line here running a
`ssr-watchdog.sh` script that tried to keep an Inertia SSR Node process
alive locally on this box. That approach is abandoned and the script has
been deleted from the repo: this specific IONOS account's Node install
(whatever version the account's Node selector provided) hit a reproducible,
unresolved `RangeError: WebAssembly.instantiate(): Out of memory` from
Node's own bundled `undici`/`fetch` on every startup attempt - not a
resource ceiling we could find (checked and ruled out: `ulimit -v`,
cgroups v1/v2, `/proc/user_beancounters`, physical RAM, `/proc/meminfo`
commit limit and overcommit mode - all clean) - most likely a Node-version-
specific bug or a virtualization quirk this account's host image has, not
anything fixable from inside the account. Don't re-attempt running SSR
locally on this box without a real reason to believe that's changed.

## 6. SSR runs on a separate host (GTR-NODE-BACKEND-SERVER, DigitalOcean)

Inertia's SSR gateway just makes a plain HTTP call - it doesn't need to be
local. The SSR Node process (`bootstrap/ssr/ssr.js` + its `assets/` chunk
files - **not** a single file, despite `noExternal: true` in
`vite.config.ts` only meaning external *npm packages* get inlined; Vite
still code-splits its own build output per page) runs as a systemd service
on the existing DigitalOcean box already used for
`ghanatalksradio-portal`'s HLS transcoding/`fetch-ad-break.sh` (see that
project's own architecture docs) - a real VPS with systemd, so a proper
`Restart=always` service instead of a cron-watchdog hack.

**Deploying/redeploying the SSR bundle** (do this after every
`npm run build:ssr`, from your Mac):

```bash
rsync -avz bootstrap/ssr/ root@<DO_IP>:/opt/gtr-ssr/
ssh root@<DO_IP> systemctl restart gtr-ssr
curl http://<DO_IP>:13714/health
# should print: {"status":"OK","timestamp":...}
```

`/etc/systemd/system/gtr-ssr.service` on that box:

```ini
[Unit]
Description=GTR Inertia SSR server
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/gtr-ssr/ssr.js
Restart=always
User=www-data
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Port 13714 is firewalled (`ufw`) to only accept connections from this
IONOS box's own outbound IP - it renders arbitrary page props into HTML
and has no auth of its own, so it must never be reachable from the open
internet.

**On this IONOS side**, `.env` needs:

```
INERTIA_SSR_URL=http://<DO_IP>:13714
```

then `php artisan config:clear && php artisan config:cache` (step 4 already
covers the cache step on a fresh deploy; re-run it if `INERTIA_SSR_URL`
changes on an existing one).

If the DO box or the network path between the two ever goes down, the site
doesn't break - Inertia catches the failed SSR call and falls back to
plain client-side rendering for that window (see
`vendor/inertiajs/inertia-laravel/src/Ssr/HttpGateway.php`), same
fail-soft behavior as if SSR were local.

## 7. Verify before the domain is even pointed

```bash
curl -s -H "Host: ghanatalksradio.com" http://localhost/ | head -50
```

If your account's web server already has a vhost for the domain (common —
DNS pointing and vhost config are usually separate steps), this returns the
real rendered homepage. If it doesn't work, that's fine — just confirm
`php artisan route:list` runs cleanly and `curl http://<DO_IP>:13714/health`
is healthy from this box, and do full verification once the domain points
here.

## 8. Once the domain is live

Check a real page's source (`curl https://ghanatalksradio.com/` or
view-source in a browser) — the actual article/podcast HTML should be
present in the raw response, not just an empty `<div id="app">`. That's the
whole point of this migration (SSR'd content for Google/crawlers). Confirmed
working in production: `<div id="app">` carries the fully rendered page
(tens of KB of real HTML - header, nav, `<article>` content), not an empty
shell. Also spot-check `/sitemap-index.xml` and
`/.well-known/apple-app-site-association`.

## Future redeploys

Each time you ship changes:

1. Rebuild locally: `npm run build && npm run build:ssr`,
   `composer install --no-dev --optimize-autoloader` in a clean copy.
2. Re-upload the app tarball to IONOS, re-run steps 2–4.
3. Re-sync the SSR bundle to the DigitalOcean box and restart the service
   (§6's `rsync` + `systemctl restart gtr-ssr`) - systemd's `Restart=always`
   only keeps a crashed process alive, it doesn't pick up new files on its
   own, so this step is not optional on every redeploy that touches any
   frontend code.
