# IV — MVP Product Document

> **Platform**: Short-form video sharing + structured ticketed live events + live interactive challenges
> **Stage**: Frontend MVP (mock data, no backend yet)
> **Stack**: React 19 + TypeScript + Vite + Tailwind CSS + React Router

---

## 🎯 Core MVP Principle

Focus on **ticketed live events, discovery, and monetization**. Leave advanced features (Redis, multi-server scaling, AI features, complex leaderboards) for post-MVP.

The product has three distinct pillars:

| Pillar | Page | Revenue Model |
|---|---|---|
| Short-form content | Home (Reels) | Engagement / discovery |
| Live interactive challenges | Live Page | Coin prizes / participation |
| Premium ticketed events | Show Page | Ticket sales |

---

## 🏠 Home Page — Discovery & Reels

**Role**: Discovery layer — the first impression of the platform.

**Dual function**:
1. **Short-form reel feed** (primary) — TikTok/Instagram-style vertical swipe feed. Users scroll through promotional video/photo snippets uploaded by hosts. Content is random and algorithm-free at MVP stage.
2. **Event discovery** (secondary) — curated cards for upcoming and live shows.

**MVP Feature Set**:
- Vertical scroll-snap full-screen reel cards
- Right-side action bar: ❤️ Like, 💬 Comment, ↩️ Repost, ➡️ Share
- "For You / Following" tab toggle
- Mute/unmute button per card
- Creator avatar + username + caption + hashtags + sound name
- Pulsing 🔴 LIVE badge on creators currently running a live challenge
- Event discovery cards: thumbnail, title, price, countdown timer, LIVE badge
- Tapping a show card → navigates to `/show/:id`
- Tapping LIVE badge → navigates to `/live`

**MVP Goal**: Help users discover content and guide them toward a ticket purchase or live session.

**Post-MVP**: Algorithmic feed, video uploads, personalization.

---

## 🔴 Live Page — Urgency Hub

**Role**: Real-time engagement — what's happening *right now*.

**MVP Feature Set**:
- Shows **only currently live** challenges (no scheduled/upcoming)
- Live stats strip: # of live shows, total viewers, total prize pool
- Challenge cards: host avatar (with LIVE ring), challenge prompt, viewer count, queue count, coin prize, **JOIN LIVE** button
- Full-screen watch modal (opens on JOIN LIVE):
  - Host video panel (top) + competitor/stage slot (bottom)
  - Scrolling live chat with emoji reactions
  - Audience vote bar (👍/👎) with animated fill
  - Floating emoji reactions rising from bottom
  - Join Queue CTA for viewers who want to compete
- "Host a Live Challenge" CTA at top of page

**Interactive Mechanic (Core differentiator)**:
1. Host sets a challenge prompt + coin prize → goes live
2. Viewers join a queue to attempt the challenge "on stage"
3. Host selects challengers one at a time
4. Audience votes live to eliminate or advance
5. Host declares a winner → coins awarded

**MVP Goal**: Convert impulse interest into engagement; show the platform is alive and active.

**Post-MVP**: Real WebSocket/WebRTC streams, actual coin transactions, elimination tournament brackets.

---

## 🎟 Show Page — Monetization Core

**Role**: Revenue engine — where users pay for access to premium structured events.

**Two states**:

### Locked (Pre-purchase)
- Hero image with lock overlay
- Show title, description, host info (avatar, verified badge, tickets sold)
- Event date/time + live countdown timer
- Ticket price (prominent, gold)
- Circular arc progress: X/Y tickets sold (scarcity signal)
- "Get Ticket — $X.XX" CTA (full-width gold gradient button)
- Category + Global access badges

### Unlocked (Post-purchase)
- Green ✅ "Ticket Owned" badge
- If not yet live: countdown + "You're in! 🎉" confirmation card
- If live: YouTube embed fills the hero (unlisted stream URL set by host)
- Live chat below stream (Supabase Realtime in production)
- No purchase CTA — user is inside the event

**MVP Feature Set**:
- Ticket purchase flow (mocked in frontend; Stripe in production)
- Locked/unlocked state transition
- Countdown timer
- YouTube embed for stream delivery
- Host controls panel (visible to host only): set stream URL + Go Live toggle
- Ticket verification (mock in frontend; server-side in production)

**MVP Goal**: Users pay to access structured events; hosts deliver content seamlessly.

**Post-MVP**: Stripe webhooks, real ticket verification, replay access, multi-host events.

---

## 👤 Profile Page — Personal Hub

**Role**: User identity, ownership, and trust anchor.

**Two modes**:

### Viewer Mode
- Avatar, display name, @username, 👁 Viewer badge
- Coin balance pill
- Stats grid: Total Coins, Wins, Rank, Streak
- **My Tickets**: list of purchased shows with date/time and LIVE badge if active now
- "Become a Host" CTA card

### Host Mode
- Same as viewer + ✅ Verified badge + 🎙 Host badge
- **My Shows**: event management cards (title, category, date, ticket progress)
  - Edit Event / Manage buttons
- "+ New Show" button → `/create-show`

**Unauthenticated State**: Full-screen prompt with "Sign In / Sign Up" CTA.

**MVP Goal**: Give users a personal hub; encourage host upgrades; retain long-term.

**Post-MVP**: Creator earnings dashboard, analytics, fan subscriptions, show replays.

---

## ✅ MVP Feature Checklist

### Auth
- [x] Email/password sign up + sign in (mock in frontend; Supabase in production)
- [x] Mock auth context with instant login
- [ ] Supabase Auth integration (post-MVP backend sprint)

### Home
- [x] Vertical scroll-snap reel feed
- [x] Like, comment, share, repost actions
- [x] Mute/unmute toggle
- [x] LIVE badge on active creators
- [ ] Event discovery cards with countdown (to be added)

### Live
- [x] Live challenge cards
- [x] Watch modal with waveform animation
- [ ] Full on-stage split-screen UI
- [ ] Audience vote bar
- [ ] Live chat overlay
- [ ] Floating emoji reactions

### Show Page
- [x] Locked/unlocked state
- [x] Ticket purchase (mock)
- [x] Countdown timer
- [x] YouTube embed when live + ticket owned
- [x] Host controls panel
- [ ] Real Stripe checkout (backend sprint)
- [ ] Supabase Realtime chat (backend sprint)

### Profile
- [x] Viewer and host modes
- [x] Stats grid
- [x] My Tickets section
- [x] My Shows (host)
- [x] Edit profile modal
- [x] Become a Host CTA

### Create Show
- [x] 3-step wizard: Details → Schedule → Pricing
- [x] Revenue estimate calculator
- [ ] Actual submission to backend (post-MVP)

---

## 🗂 Page Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home (Reels + Discovery) | No |
| `/live` | Live Challenges | View: No / Join: Yes |
| `/show` | Premium Shows List | No |
| `/show/:id` | Show Detail + Purchase | View: No / Buy: Yes |
| `/create-show` | Create Show Wizard | Yes (host) |
| `/profile` | User Profile | Yes |
| `/auth` | Sign In / Sign Up | No |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite (port 3000) |
| Styling | Tailwind CSS v3 + custom CSS |
| Routing | React Router v7 |
| Icons | Lucide React |
| Fonts | Inter + Outfit (Google Fonts) |
| State | React local state (mock) |
| Auth (future) | Supabase Auth |
| DB (future) | Supabase Postgres |
| Realtime (future) | Supabase Realtime |
| Payments (future) | Stripe Checkout + Webhooks |
| Stream delivery | YouTube Unlisted embed (MVP) |

---

## 📁 Document Index

| File | Description |
|---|---|
| [`idea.txt`](./idea.txt) | Original concept brief |
| [`home-page.md`](./home-page.md) | Home page spec |
| [`live-page.md`](./live-page.md) | Live page spec |
| [`show-page.md`](./show-page.md) | Show page spec |
| [`profile-page.md`](./profile-page.md) | Profile page spec |
| [`MVP.md`](./MVP.md) | This document — full MVP product overview |
