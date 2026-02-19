# IV — Live & Share MVP

Premium live event platform with ticket sales, Stripe payments, and gated YouTube streams.

## Architecture

```
frontend/   → React 19 + Vite + Tailwind + Supabase Client + Stripe.js
backend/    → Express.js + Stripe API + Supabase Admin SDK
database    → Supabase (PostgreSQL)
payments    → Stripe Checkout
streaming   → YouTube unlisted embed (gated behind ticket)
```

## Setup (Step by Step)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open **SQL Editor** and paste the contents of `supabase-schema.sql` → click **Run**
3. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **Authentication → Settings** and:
   - Enable **Email** provider
   - Disable **Confirm email** for local dev (optional but easier)

### 2. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up (use Test Mode)
2. Go to **Developers → API Keys** and copy:
   - **Publishable key** → `pk_test_...`
   - **Secret key** → `sk_test_...`
3. For webhooks (production), set up endpoint at `https://your-backend/api/webhook`
   - Listen for `checkout.session.completed`

### 3. Configure Environment Variables

**Frontend** — create `frontend/.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_API_URL=http://localhost:3001
```

**Backend** — create `backend/.env`:
```
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### 4. Install & Run

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:3001

## MVP Features

### For Viewers
- Browse premium shows
- Sign up / sign in
- Purchase tickets via Stripe Checkout
- Watch gated YouTube streams after buying a ticket

### For Hosts
- Become a host from profile page
- Create shows (title, description, cover, date, price, tickets)
- Manage shows from profile
- Add YouTube stream URL and go live
- View ticket sales

### Access Control Flow
```
User opens show page
  → Backend checks: Does user own ticket?
    → YES + show is live + YouTube URL set → show embedded video
    → YES + show not live → "You're in! Show starts soon."
    → NO → show "Get Ticket" button → Stripe Checkout → redirect back → ticket created
```
