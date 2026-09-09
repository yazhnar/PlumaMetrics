# PlumaMetrics

**Open source, privacy first, cookieless web analytics.**

PlumaMetrics is a lightweight, self hostable alternative to Google Analytics. No cookies, no localStorage, no personal data collection, just the metrics that matter: page views, referrers, device types, and screen sizes.

Deploy your own free instance in one click, or use our upcoming hosted plan if you'd rather not manage a server yourself.

## ✨ Features

- **No cookies. No PII.** Fully compliant with privacy expectations by design, not by policy.
- **Under 5KB tracker script**, won't slow down the sites using it.
- **Self-hostable for free** using Netlify + Supabase's free tiers.
- **Clean, modern dashboard** ~ visitors, top pages, referrers, device breakdown, and traffic trends over time.
- **Automatic 404 detection**, no setup required.
- **100% open source core**, forever.

## 🚀 Deploy Your Own Instance

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yazhnar/PlumaMetrics)

Click the button above, connect your GitHub account, and Netlify will guide you through setting up your own free instance. You'll need a free [Supabase](https://supabase.com) account for the database — full setup instructions below.

## 🗄️ Setting Up Supabase

1. Create a free account at [supabase.com](https://supabase.com) and start a new project.
2. Once your project is ready, open the **SQL Editor** and run the following to create the `events` table:

```sql
CREATE TABLE events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  site_id TEXT,
  path TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  screen_width INT8,
  country TEXT,
  is_404 BOOLEAN DEFAULT false,
  status_code INT8,
  visitor_hash TEXT
);

GRANT ALL ON TABLE public.events TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
```

3. Go to **Settings → API Keys** and copy your **Project URL**, **Publishable key**, and **Secret key** — you'll need these in the next step.

## 🔑 Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the following values in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key (safe for the browser) |
| `SUPABASE_SECRET_KEY` | Your Supabase secret key (server-only, never exposed to visitors) |
| `NEXT_PUBLIC_SITE_ID` | A name for your site, e.g. `my-blog` — shown on your dashboard and used to identify tracked events |

If deploying to Netlify, add these same four variables under **Site settings → Environment variables** in your Netlify dashboard.

## 📊 Embedding the Tracker

Once your instance is deployed, add this one line to any page you want to track, replacing `your-site.com` with your actual deployed domain and `my-site` with whatever you set as `NEXT_PUBLIC_SITE_ID`:

```html
<script src="https://your-site.com/tracker.js" data-site-id="my-site"></script>
```

That's it, no cookie banners, no configuration, no external dependencies.

## 🔓 Status Code Tracking (Optional)

By default, PlumaMetrics automatically detects 404 pages with no setup required. If you'd like precise status codes (403, 500, etc.) tracked too, add one of the following to your error pages:

**Option 1: meta tag:**
```html
<meta name="pluma-status" content="500">
```

**Option 2: JavaScript variable, set before the tracker script loads:**
```html
<script>window.__PLUMA_STATUS = 500;</script>
```

## 🛠️ Local Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/yazhnar/PlumaMetrics.git
cd PlumaMetrics
npm install
```

Run the local development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it.

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Database:** Supabase (Postgres)
- **Hosting:** Netlify

## 💛 Support This Project

PlumaMetrics is free and open source. If it's useful to you, consider supporting its development:

- GitHub Sponsors ~ *(coming soon)*
- Buy Me a Coffee ~ *(coming soon)*
- Open Collective ~ *(coming soon)*

Don't want to self-host? A hosted version is coming soon for **$5/month** ~ zero setup, fully managed. [Join the waitlist](#) to get notified.

## 📄 License

MIT
