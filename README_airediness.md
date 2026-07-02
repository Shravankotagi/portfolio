# AI Readiness Scorecard — Enlight Lab

![Enlight Lab](https://enlightlab.com/wp-content/uploads/2023/03/Layer_1.png)

A free, public web tool that helps CTOs, VP Engineers, and product leaders understand how AI-ready their company is. Users answer 12 questions, receive an instant AI maturity score (0–100), and get 3 personalised AI-generated recommendations — all before a single sales conversation.

Built by [Enlight Lab](https://enlightlab.com) as a lead generation and brand authority tool.

---

## Introduction

Most companies don't know where they stand on AI adoption. This tool solves that by:

- Asking 12 simple yes/partial/no questions across 4 business dimensions
- Calculating a real-time score out of 100
- Assigning one of 5 AI maturity tiers (Unaware → Optimised)
- Generating 3 specific, actionable recommendations using Google Gemini AI
- Capturing lead details before showing full results
- Automatically pushing leads into HubSpot CRM
- Providing a shareable results URL for LinkedIn

**The goal:** Turn website visitors into qualified sales leads automatically.

---

## Getting Started

### Who is this for?

This guide is written for anyone — technical or not. If you can copy-paste commands into a terminal, you can run this project.

---

### 1. What You Need Before Starting

Before installing anything, make sure you have the following accounts set up. All have free tiers:

| Service | What it's for | Sign up |
|---|---|---|
| [Node.js](https://nodejs.org) | Runs the application | Download LTS version |
| [Supabase](https://supabase.com) | Stores all lead data | Free account |
| [Google AI Studio](https://aistudio.google.com) | Powers AI recommendations | Free API key |
| [HubSpot](https://hubspot.com) | Receives lead data | Free CRM |
| [Vercel](https://vercel.com) | Hosts the website | Free account |

---

### 2. Installation Process

**Step 1 — Download the code**

Open your terminal (Command Prompt on Windows, Terminal on Mac) and run:

```bash
git clone https://enlight-lab@dev.azure.com/enlight-lab/ai-agents/_git/ai-readiness-assessment
cd ai-readiness-assessment
```

**Step 2 — Install dependencies**

```bash
npm install
```

This downloads all the libraries the project needs. It takes about 1–2 minutes.

**Step 3 — Set up your environment variables**

Create a file called `.env.local` in the root folder of the project. Copy and paste this into it:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_PASSWORD=choose_a_password_for_the_admin_dashboard
```

Where to find each value:

- **NEXT_PUBLIC_SUPABASE_URL** → Supabase dashboard → Settings → Data API → Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** → Supabase dashboard → Settings → API Keys → Publishable key
- **GEMINI_API_KEY** → [aistudio.google.com](https://aistudio.google.com) → Get API Key
- **HUBSPOT_ACCESS_TOKEN** → HubSpot → Settings → Integrations → Legacy Apps → Create app → copy token
- **ADMIN_PASSWORD** → Choose any password you want for the admin dashboard

**Step 4 — Set up the database**

Go to your Supabase project → SQL Editor → paste and run this:

```sql
create table submissions (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text,
  email text,
  company text,
  role text,
  answers jsonb,
  score integer,
  tier text,
  breakdown jsonb,
  recommendations jsonb,
  created_at timestamp with time zone default now()
);
```

**Step 5 — Set up HubSpot custom properties**

In HubSpot → Settings → Contact Properties → Create property:
- Property name: `ai_readiness_score` → Field type: Single-line text
- Property name: `ai_maturity_tier` → Field type: Single-line text

---

### 3. Running the Project Locally

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000`

You should see the Enlight Lab AI Readiness Scorecard landing page.

---

### 4. Pages Overview

| URL | What it is |
|---|---|
| `localhost:3000` | Landing page |
| `localhost:3000/assessment` | The 12-question assessment |
| `localhost:3000/results/[slug]` | Shareable results page |
| `localhost:3000/admin` | Admin dashboard (password protected) |

---

### 5. Software Dependencies

| Package | Version | Purpose |
|---|---|---|
| Next.js | 15 | Web framework |
| Tailwind CSS | 3 | Styling |
| shadcn/ui | latest | UI components |
| Supabase JS | latest | Database client |
| @google/generative-ai | latest | Gemini AI API |
| nanoid | latest | Unique result URL slugs |
| zod | latest | Form validation |

---

## Build and Test

### Build for production

```bash
npm run build
```

This checks for any errors and prepares the project for deployment. You will see a list of all pages and their sizes.

### Deploy to Vercel (recommended)

**Option 1 — Vercel CLI:**
```bash
npx vercel
```

Follow the prompts. When asked for environment variables, add all 6 from your `.env.local`.

**Option 2 — Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from Git → connect your Azure DevOps or GitHub repo
3. Add all environment variables in the dashboard
4. Click Deploy

> **Important:** After deploying, update `NEXT_PUBLIC_BASE_URL` in Vercel environment variables to your live URL (e.g. `https://ai-readiness-scorecard.vercel.app`) and redeploy.

### Testing the full flow

1. Go to `/assessment`
2. Answer all 12 questions
3. Fill in the email gate with real details
4. Check results page loads with score + recommendations
5. Check HubSpot CRM → Contacts → new contact should appear
6. Check Supabase → Table Editor → submissions → new row should appear
7. Go to `/admin` → enter your admin password → submission should appear

---

## Project Structure

```
ai-readiness-scorecard/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── assessment/
│   │   └── page.tsx              # 12-question assessment UI
│   ├── results/
│   │   └── [slug]/
│   │       └── page.tsx          # Shareable results page
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   └── api/
│       ├── submit/
│       │   └── route.ts          # Scoring + Gemini + HubSpot + Supabase
│       ├── admin/
│       │   └── route.ts          # Admin password check + data fetch
│       └── og/
│           └── route.tsx         # OG image for LinkedIn sharing
├── lib/
│   └── scoring.ts                # Scoring engine (0–100, 5 tiers)
├── .env.local                    # Your secret keys (never commit this)
└── README.md
```

---

## Contribute

We welcome contributions from the Enlight Lab team and trusted collaborators.

### How to contribute

1. Clone the repository
2. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes
4. Commit with a clear message:
```bash
git commit -m "feat: description of what you added"
```
5. Push and create a Pull Request on Azure DevOps

### Commit message format

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | UI/design changes |
| `docs:` | README or documentation |
| `chore:` | Config or dependency updates |

### Reporting issues

Create a Work Item in Azure DevOps with:
- What you expected to happen
- What actually happened
- Steps to reproduce

---

## API Reference

### POST `/api/submit`
Accepts assessment answers and lead details. Returns score, tier, recommendations, and a unique slug.

**Request body:**
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "company": "Acme Inc",
  "role": "CTO / CIO",
  "gdpr_consent": true,
  "answers": {
    "data_centralized": "yes",
    "data_structured": "partial",
    ...
  }
}
```

**Response:**
```json
{
  "slug": "abc123xyz",
  "score": 68,
  "tier": "Scaling",
  "breakdown": { "data": 20, "team": 18, "automation": 15, "strategy": 15 },
  "recommendations": [...]
}
```

### POST `/api/admin`
Password-protected endpoint that returns all submissions.

### GET `/api/og`
Returns a dynamic OG image for LinkedIn sharing. Pass `?slug=abc123` to get a score-specific image.

---

## Latest Release

**v1.0.0 — MVP Launch**
- 12-question AI maturity assessment
- Real-time scoring engine (0–100, 5 tiers)
- Gemini 2.5 Flash AI recommendations
- HubSpot CRM integration
- Shareable results page
- Admin dashboard with CSV export
- OG image for LinkedIn sharing

---

*Built with by Enlight Lab — [enlightlab.com](https://enlightlab.com)*
