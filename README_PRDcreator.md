# Tech Stack Auditor — Enlight Lab

AI-powered tech stack risk and gap analysis tool. Paste your stack, get an instant audit.

## Setup

### 1. Clone and install
```bash
git clone <your-repo>
cd stack-auditor
npm install
```

### 2. Set environment variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

Required:
- `DATABASE_URL` — PostgreSQL connection string (Neon/Supabase free tier)
- `GEMINI_API_KEY` — From Google AI Studio (aistudio.google.com)
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — From upstash.com
- `ADMIN_SECRET` — Any strong random string
- `NEXT_PUBLIC_APP_URL` — Your deployed URL

### 3. Set up database
```bash
npm run db:push
```

### 4. Run locally
```bash
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in Vercel dashboard → Settings → Environment Variables.

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/analyze` | Stack input interface |
| `/audit/[shareId]` | Shareable results page |
| `/admin` | Admin dashboard (password protected) |
| `POST /api/audit` | Run AI audit |
| `GET /api/share` | Fetch audit by shareId |
| `POST /api/email-capture` | Save email lead |
| `GET /api/admin` | Admin data (requires x-admin-key header) |

---

## Project Structure

```
app/           → Next.js pages + API routes
components/    → React components
lib/           → Gemini, Prisma, prompt, schema, utilities
types/         → TypeScript types
prisma/        → Database schema
```