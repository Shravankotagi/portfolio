# Tech Stack Auditor — Enlight Lab

## Introduction

Tech Stack Auditor is a free AI-powered tool built by **Enlight Lab** that helps CTOs, engineering managers, and technical founders instantly evaluate the health of their technology stack.

Simply paste your tech stack description, architecture notes, or even a job listing — and the tool will analyse it across **5 engineering dimensions**:

- Scalability
- Observability
- Security
- CI/CD Maturity
- Data Architecture

Within 30 seconds you receive a full audit report with risk areas, strengths, and recommendations mapped to Enlight Lab's consulting services. Every report gets a unique shareable link — forward it to your board, your team, or your investors.

**No login required. Completely free. Shareable link included.**

---

## Getting Started

This section will walk you through everything you need to get the project running on your computer — even if you are not a developer.

---

### 1. Software Dependencies

Before you begin, make sure the following software is installed on your computer.

| Software | What it is | How to get it |
|---|---|---|
| **Node.js** (v18 or higher) | Runs the application | [nodejs.org](https://nodejs.org) → Download LTS version |
| **Git** | Downloads the code | [git-scm.com](https://git-scm.com/downloads) |
| **VS Code** (optional) | Code editor | [code.visualstudio.com](https://code.visualstudio.com) |

To check if Node.js is already installed, open a terminal and type:
```
node --version
```
If you see a version number like `v18.0.0` or higher, you are good to go.

---

### 2. External Accounts Required

You will need free accounts on these services. All have free tiers — no credit card needed.

| Service | Purpose | Sign up link |
|---|---|---|
| **Neon** or **Supabase** | Database to store audit reports | [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com) |
| **Google AI Studio** | Powers the AI analysis engine | [aistudio.google.com](https://aistudio.google.com) |
| **Upstash** | Prevents abuse (rate limiting) | [upstash.com](https://upstash.com) |
| **Vercel** | Hosts and deploys the application | [vercel.com](https://vercel.com) |
| **Resend** (optional) | Sends report emails to users | [resend.com](https://resend.com) |

---

### 3. Installation Process

Follow these steps exactly, one at a time.

---

#### Step 1 — Download the code

Open a terminal (Command Prompt on Windows, Terminal on Mac) and run:

```bash
git clone https://enlight-lab@dev.azure.com/enlight-lab/ai-agents/_git/ai-tech-stack-audit
cd ai-tech-stack-audit
```

---

#### Step 2 — Install dependencies

This downloads all the libraries the project needs:

```bash
npm install
```

Wait for it to finish. You will see a progress bar. This may take 1–2 minutes.

---

#### Step 3 — Set up your environment variables

Environment variables are secret keys that connect the app to external services. They are never shared publicly.

Copy the example file:
```bash
cp .env.example .env.local
```

Now open `.env.local` in any text editor and fill in each value:

```
# ── DATABASE ──────────────────────────────────────────────
# Get this from neon.tech or supabase.com after creating a free database
# Go to your database → Connection string → copy the full URL
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"

# ── AI ENGINE ─────────────────────────────────────────────
# Go to aistudio.google.com → Get API Key → Create API Key → copy it
GEMINI_API_KEY="your-gemini-api-key-here"

# ── RATE LIMITING ─────────────────────────────────────────
# Go to upstash.com → Create Database → REST API tab → copy both values
UPSTASH_REDIS_REST_URL="https://your-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token-here"

# ── ADMIN DASHBOARD ───────────────────────────────────────
# Make up any strong password — you will use this to access /admin
ADMIN_SECRET="make-up-a-strong-password-here"

# ── APP URL ───────────────────────────────────────────────
# For local development keep this as is
# For production change to your Vercel URL e.g. https://your-app.vercel.app
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ── EMAIL (OPTIONAL) ──────────────────────────────────────
# Only needed if you want "email this report" to work
# Go to resend.com → API Keys → Create API Key
RESEND_API_KEY="re_your-resend-key-here"
```

> **Important:** Never share this `.env.local` file with anyone. Never commit it to Git. It is already in `.gitignore` so it will not be uploaded automatically.

---

#### Step 4 — Set up the database

This creates the required tables in your database:

```bash
npm run db:push
```

You should see output ending in `✓ Your database is now in sync`.

---

#### Step 5 — Run the application locally

```bash
npm run dev
```

Open your browser and go to:
```
http://localhost:3000
```

You should see the Tech Stack Auditor landing page. The app is now running on your computer.

---

### 4. Latest Release

| Version | Date | Notes |
|---|---|---|
| v1.0.0 | May 2025 | Initial release — full audit pipeline, shareable reports, admin dashboard |

---

### 5. API References

| Endpoint | Method | Description |
|---|---|---|
| `/api/audit` | POST | Submit stack text, returns full audit report |
| `/api/share` | GET | Fetch a saved audit report by share ID |
| `/api/email-capture` | POST | Save a user's email for report delivery |
| `/api/admin` | GET | Fetch all reports and leads (requires admin key) |

**Example API call:**
```bash
curl -X POST http://localhost:3000/api/audit \
  -H "Content-Type: application/json" \
  -d '{"stackText": "Frontend: Next.js, Backend: FastAPI, DB: PostgreSQL"}'
```

---

## Build and Test

### Build for production

To create an optimised production build:

```bash
npm run build
```

If the build succeeds you will see:
```
✓ Compiled successfully
```

### Run in production mode

```bash
npm run start
```

### Deploy to Vercel (recommended)

Vercel is the easiest way to deploy this application publicly.

**Option A — Via Vercel Dashboard (easiest):**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your Azure DevOps or GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Go to **Settings → Environment Variables** and add all values from your `.env.local`
6. Click **Redeploy** — your app is now live

**Option B — Via terminal:**

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your live URL will look like:
```
https://your-project-name.vercel.app
```

### Available pages

| URL | What you see |
|---|---|
| `/` | Landing page |
| `/analyze` | Paste your stack here |
| `/audit/[id]` | Shareable audit report |
| `/admin` | Admin dashboard (enter your ADMIN_SECRET) |

### Database management

To open a visual interface for your database:
```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can browse all stored audits and email captures.

---

## Contribute

We welcome contributions from the team. Here is how to get involved.

### Reporting a bug

1. Go to the Azure DevOps repository
2. Click **Work Items → New Work Item → Bug**
3. Describe what you expected to happen and what actually happened
4. Include any error messages from the browser console

### Suggesting a feature

1. Open a **Work Item → Feature** in Azure DevOps
2. Describe the feature and why it would be valuable
3. Tag it with the relevant area (UI, AI, API, Admin)

### Making code changes

1. Create a new branch from `main`:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test locally with `npm run dev`

3. Commit your changes:
```bash
git add .
git commit -m "describe what you changed"
```

4. Push to Azure DevOps:
```bash
git push azure feature/your-feature-name
```

5. Open a **Pull Request** in Azure DevOps and assign a reviewer

### Code style guidelines

- All components go in `components/` with their category subfolder
- All API logic goes in `app/api/`
- Shared utilities go in `lib/`
- Never commit `.env.local` or any file containing API keys
- Test your changes locally before pushing

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Azure DevOps Git Guide](https://docs.microsoft.com/en-us/azure/devops/repos/git)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

*Built by Enlight Lab — Ship faster. Scale Smarter. Innovate Confidently.*
