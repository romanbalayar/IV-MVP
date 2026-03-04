# 🔴 Live Page — Urgency & Social Proof

## Purpose
The Live page is about **urgency and momentum**. It only displays what is **currently happening right now**. This page creates a psychological trigger — *"this is live, I need to join before I miss it."*

Unlike the Home page (which focuses on upcoming discovery), the Live page is focused entirely on **immediate participation**.

---

## Primary Goal
Drive **impulse decisions** — get users to join, watch, or compete in something happening live right now.

---

## What This Page Shows

### Live Challenge Feed
- List of all **currently active** live challenges
- Each challenge card shows:
  - Host avatar (with pulsing LIVE ring)
  - Host name + challenge category badge
  - Challenge prompt text (e.g. "Make me laugh in 10 seconds")
  - 👁 Viewer count (e.g. 12.5K watching)
  - 🧑‍🤝‍🧑 Queue count (e.g. 7 in queue)
  - 🏆 Coin prize amount
  - **JOIN LIVE** button

### Live Stats Bar
- Total live shows running right now
- Total viewers watching across all challenges
- Total prizes available

### Watch Modal (when user taps JOIN LIVE)
- Full-screen takeover
- Host video panel (top half) with LIVE badge + viewer count
- Competitor "on stage" slot (bottom half — filled or waiting)
- **Live Chat** — scrolling real-time messages with emoji reactions
- **Audience Vote bar** — binary vote (👎 / 👍) with animated fill
- Floating emoji reactions that float upward
- "Join Queue" CTA for viewers who want to participate

### Host a Challenge Button
- Prominent CTA at the top of the page
- Opens a creation flow for hosts to set up their own live challenge

---

## Design Direction
- **Feel**: Energetic, dynamic, electric — high-stakes and immediate
- **Color signals**: Red for LIVE, orange for queue, yellow for coins/prizes
- **Animations**: Pulsing live badges, floating reactions, animated vote bars
- **Urgency cues**: Real-time viewer counts, live timers, queue numbers

---

## Interactive Livestream System
The core mechanic of this page:
1. A **host starts a live challenge** with a prompt and a coin prize
2. **Viewers join the queue** to attempt the challenge "on stage"
3. The host **picks challengers** to come on stage one at a time
4. **Audience votes** live (👍/👎) to eliminate or advance challengers
5. The host **declares a winner** who receives the coin prize

---

## User Flow
1. User lands on Live page
2. Sees live challenge cards with viewer counts and prize amounts
3. Taps **JOIN LIVE** on an interesting challenge
4. Full-screen watch modal opens
5. User watches host + active challenger
6. User votes in the audience, chats, reacts
7. User taps **Join Queue** to go on stage themselves

---

## Key UI Elements
| Element | Description |
|---|---|
| Challenge card | Host info, prompt, viewers, queue, prize, join button |
| LIVE ring avatar | Pulsing red animated ring around host avatar |
| Stats bar | Live count, viewer total, prize pool |
| Watch modal | Full-screen host + stage view |
| Vote bar | Animated binary vote (👍/👎) with fill animation |
| Live chat | Scrolling messages with timestamps |
| Floating reactions | Emojis (❤️🔥😂) float up from bottom |
| Queue indicator | Shows how many are waiting to go on stage |

---

## Notes
- Only currently live content appears on this page — no scheduled future events
- Joining the queue requires login
- Hosting a challenge requires login and host status
- Viewer count and queue numbers update in real-time (mocked in frontend)
