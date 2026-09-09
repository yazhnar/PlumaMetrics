# PlumaMetrics

**Open source, privacy first, cookieless web analytics.**

aLT-tab is a lightweight, self hostable alternative to Google Analytics. No cookies, no localStorage, no personal data collection; Just the metrics that matter: page views, referrers, device types, and screen sizes.

Deploy your own free instance in one click, or use our upcoming hosted plan if you'd rather not manage a server yourself.

## ✨ Features

- **No cookies. No PII.** Fully compliant with privacy expectations by design, not by policy.
- **Under 5KB tracker script** — won't slow down the sites using it.
- **Self-hostable for free** using Netlify + Supabase's free tiers.
- **Clean, modern dashboard** — visitors, top pages, referrers, device breakdown.
- **100% open source core**, forever.

## 🚀 Deploy Your Own Instance

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository==https://github.com/yazhnar/PlumaMetrics)

Click the button above, connect your GitHub account, and Netlify will guide you through setting up your own free instance. You'll need a free [Supabase](https://supabase.com) account for the database — setup instructions below.

## 🛠️ Local Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/yazhnar/PlumaMetrics.git
cd PlumaMetrics
npm install
```

Copy the example environment file and fill in your own Supabase credentials:

```bash
cp .env.example .env.local
```

Run the local development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it.

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres)
- **Hosting:** Netlify

## 💛 Support This Project

aLT-tab is free and open source. If it's useful to you, consider supporting its development:

- GitHub Sponsors — *(coming soon)*
- Buy Me a Coffee — *(coming soon)*
- Open Collective — *(coming soon)*

Don't want to self-host? A hosted version is coming soon for **$5/month** — zero setup, fully managed.

## 📄 License

MIT