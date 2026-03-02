# IV — Product Definition

> **A Mobile-First Global Live Entertainment Platform**

---

## 🌍 Overview

IV is a **mobile-first live entertainment network** where creators grow through short-form content, compete in real-time challenges, and host premium long-form global shows — all inside one ecosystem.

This is not just a livestream app.

It is a **three-layer creator economy platform** built around:

- **Discovery** — Short-form viral content
- **Real-Time Engagement** — Interactive live challenges
- **Structured Monetization** — Ticketed long-form global shows

Together, they form a complete entertainment funnel.

---

## 🧠 Core Identity

| Layer | Format | Comparable To |
|---|---|---|
| Short-Form Social Engine | Vertical swipe videos | TikTok, Instagram Reels, YouTube Shorts |
| Live Challenge Engine | Real-time competitive livestreams | Twitch (but interactive & structured) |
| Premium Shows Engine | Ticketed long-form global performances | Eventbrite + YouTube Live (but unified) |

> **Key difference:** These three layers are not separate products. They form a single, connected funnel.

---

## 🔺 The Three Core Engines

---

### 1️⃣ Short-Form Social Engine — *Discovery Engine*

**Purpose:** This is the entry point into the entire ecosystem.

The Home feed functions like a Reels-style interface but serves a deeper strategic role: it solves the **cold start problem** for new creators.

**Features:**
- Vertical swipe auto-play videos
- Music overlay
- Like / Comment / Share
- Follow creators
- Profile previews
- Trending discovery

**Strategic Role:**
- Helps creators get discovered
- Builds follower base
- Drives traffic to Live Challenges
- Drives traffic to Premium Shows

> Without this engine, creators cannot grow. Without creator growth, there is no platform.

---

### 2️⃣ Live Challenge Engine — *Engagement & Virality Engine*

**Purpose:** Structured competitive live entertainment that replaces passive livestreaming with active participation.

**How It Works:**

1. Anyone can host a live challenge
2. Host sets a **prompt** (e.g., *"Make me laugh in 10 seconds"*)
3. Host sets a **coin prize pool**
4. Users join a **queue**
5. Only **one participant** appears live with the host at a time
6. Others wait in queue (muted, camera off)
7. Viewers watch and react in real-time
8. Host selects winner
9. Coins are distributed
10. Summary screen appears

**What This Creates:**
- Competitive energy
- High viewer retention
- Viral moments
- Repeat usage habits
- Strong social loops

> This is the platform's **engagement engine** — the mechanism that keeps users coming back.

---

### 3️⃣ Premium Shows Engine — *Global Digital Stage & Monetization Engine*

**Purpose:** Turn local performers into global performers by eliminating geography as a barrier to live entertainment.

#### The Core Problem Solved

> You are in the United States. Your favorite comedian is in India or Nepal.
>
> **Normally:** You cannot attend. You miss out.
>
> **With IV:** You buy a ticket, join securely, and experience the show live — from anywhere in the world.

---

#### Feature Breakdown

**1. Scheduled Long-Form Events**

Hosts can:
- Create a show title
- Upload a banner / poster
- Set date & time
- Add a description
- Set ticket price
- Limit ticket quantity (optional)

This builds anticipation like a real physical venue.

---

**2. Ticket Purchase via Stripe**

- Users purchase tickets via Stripe Checkout
- Payment is secure and PCI-compliant
- Platform collects a percentage fee
- Ticket ownership is stored in Supabase

*This is the primary direct monetization mechanism.*

---

**3. Ticket-Gated Access via Supabase**

- When a show starts, only verified ticket holders can enter
- Access is checked against the database in real-time
- Unauthorized users are blocked

*This creates exclusivity and a premium experience.*

---

**4. Global Streaming via YouTube Unlisted Embed**

Instead of building custom video infrastructure:
- Host streams to YouTube (unlisted link)
- IV embeds the stream inside the platform
- Only ticket holders can view it

**Why this approach:**
| Benefit | Explanation |
|---|---|
| Scalability | YouTube handles millions of concurrent viewers |
| Reliability | Battle-tested global CDN |
| Cost Efficiency | No custom streaming server costs |
| Global Reach | Works in virtually every country |

*Leveraging existing infrastructure smartly.*

---

**5. Revenue & Analytics Dashboard**

Hosts can see:
- Tickets sold
- Gross revenue
- Platform fee deducted
- Net payout
- Viewer count

> This makes creators feel like **business owners**, not just performers.

---

## 🪙 Coin System — Internal Economy

**Current Role:** Coins are rewards distributed in Live Challenges.

**Future Potential:**
- Tipping creators
- Challenge entry fees
- Payout / withdrawal system
- Battle pools
- Leaderboards
- Premium feature unlocks
- Full creator monetization layer

> Coins are the foundation of IV's **future internal economy**.

---

## 🔄 Full Ecosystem Flow

This is where IV's real power lies — the three engines are not isolated features. They form a complete creator-to-revenue funnel.

```
Step 1 — DISCOVERY
  └─ User scrolls the Reels feed
  └─ Discovers a creator

Step 2 — ENGAGEMENT
  └─ Sees that creator running a Live Challenge
  └─ Joins the queue or watches live

Step 3 — CONNECTION
  └─ Follows the creator

Step 4 — MONETIZATION
  └─ Creator announces a Premium Show
  └─ User purchases a ticket
```

**Most platforms separate these steps. IV combines them.**

| Stage | Mechanism |
|---|---|
| Discovery | Short-Form Social Engine |
| Engagement | Live Challenge Engine |
| Revenue | Premium Shows Engine |

---

## 🏗 Technical Architecture

### Frontend

| Technology | Role |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Mobile-First (max-width: 430px) | Layout Constraint |
| Dark Theme + Purple/Pink/Gold Accents | Design System |

### Backend

| Technology | Role |
|---|---|
| Supabase | Auth + Postgres Database + Realtime |
| Express.js | Stripe Webhooks & Server Logic |
| Stripe | Payment Processing |
| YouTube (Unlisted Embed) | Video Streaming Infrastructure |

> **Philosophy:** Lean and startup-efficient. We do not build what already exists at scale.

What we are **not** building:
- ❌ Custom streaming servers
- ❌ Custom payment systems
- ❌ Unnecessarily complex backend infrastructure

---

## 🎯 Target Users

**Creator Types:**
- Independent comedians
- Singers and dancers
- Cultural performers
- International entertainers
- College talent hosts
- Micro-celebrities
- Niche educators

**Geographic Focus:**
Creators from countries where their **fans are global but their local venues are limited**.

Examples: India, Nepal, Southeast Asia, Africa, Latin America — performers with international diaspora audiences.

---

## 💰 Revenue Model

| Stream | Description |
|---|---|
| Ticket Sales | Platform takes a % of each ticket sold |
| Coin Purchases | Users buy coins with real money |
| Challenge Entry Fees | Hosts charge coins to participate |
| Tipping (Future) | Fans tip creators with coins |
| Premium Features (Future) | Enhanced tools for power creators |

> Long-term, IV operates at the intersection of **Entertainment + Social + Fintech**.

---

## 🧠 Strategic Positioning

**IV is not:**

| ❌ Platform | Why We're Different |
|---|---|
| TikTok | We have live monetization and structured events |
| Twitch | We have competitive structure and tickets, not just passive streaming |
| Eventbrite | We have social discovery and engagement built in |
| YouTube | We are interactive, not passive |

**IV is:**

> A **live-first interactive entertainment marketplace** — a **digital venue network for global performers**.

---

## ⚠️ Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Scope explosion | Enforce strict MVP boundaries |
| Realtime complexity | Leverage Supabase Realtime rather than custom WebSocket infra |
| Content moderation | Implement host controls and reporting early |
| Scaling concurrency | Delegate video to YouTube; scale Supabase as needed |
| Feature overload before launch | Phase releases (see MVP Priority below) |

---

## 🚀 MVP Priority Order

> **You cannot monetize without engagement first.**

| Phase | Focus | Why |
|---|---|---|
| Phase 1 | Short-Form Reels + Live Challenges | Build audience, create engagement habits |
| Phase 2 | Premium Shows + Ticketing | Monetize the audience already built |
| Phase 3 | Coin Economy expansion | Layer in advanced creator economics |

---

## 🎯 Final Product Statement

> **IV is a mobile-first global live entertainment platform where creators grow through short-form videos, engage audiences through real-time interactive challenges, and monetize through ticketed long-form performances accessible worldwide.**

This is not just an app idea. This is a **structured startup-level product architecture**.

---

*Document last updated: March 2026*
