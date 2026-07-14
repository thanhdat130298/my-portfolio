# Dat Nguyen — Portfolio

Personal portfolio site for **Nguyen Thanh Dat (Đạt)** — a frontend-first web developer in Da Nang, growing toward fullstack.

## What it is

A Nuxt 4 + Vue 3 + TypeScript landing page that presents CV content (projects, skills, career, contact) and includes an on-page **Meet Dat AI** chat, grounded on the same portfolio data via Google Gemini.

## What it does

- Showcases hero, featured projects, profile, about, skills, career timeline, and contact
- Lets visitors ask short questions about experience, stack, and how to reach Dat
- Caps free-form chat (length, daily IP quota) and blocks abuse / spam before calling Gemini
- Suggested FAQ answers work locally even without a Gemini key
- Theme: orange → purple; content lives in `app/data/portfolio.ts`

## Run locally

```bash
npm install
cp .env.example .env
# optional: add GEMINI_API_KEY for free-form chat
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
