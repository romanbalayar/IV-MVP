# 🎟 Show Page — Monetization & Experience Core

## Purpose
The Show page is the **heart of the platform**. This is where **monetization and content delivery** happen. Every show page represents a single structured, ticketed live event.

This page has two distinct states that completely change the experience:
1. **Pre-purchase (Locked)** — premium paywall that communicates value and drives ticket sales
2. **Post-purchase (Unlocked)** — private event space with stream, countdown, and live chat

---

## Primary Goal
Convert visitors into **paying ticket holders** and deliver a **premium, exclusive viewing experience** after purchase.

---

## Two States of the Show Page

### State 1: LOCKED (Before Purchase)
The user has not bought a ticket yet.

- Hero image with a **Lock icon overlay**
- Blurred or restricted preview of the content
- Show title, description, host info
- Event date, time, and countdown timer
- **Ticket price prominently displayed**
- Ticket availability progress bar (X/Y sold)
- Category and global access badge
- **"Get Ticket — $X.XX"** CTA button (gold gradient, high prominence)
- Host avatar + verified badge + tickets sold count
- Communicates exclusivity: *"This is a private event. Buy a ticket to get in."*

### State 2: UNLOCKED (After Purchase)
The user owns a ticket. The page transforms.

- **Green "Ticket Owned" badge** appears
- If show hasn't started yet: countdown timer + "You're in! 🎉" confirmation
- If show is live: embedded stream player (iframe) fills the hero
- **Live Chat** below the stream — real-time audience interaction
- If stream URL not yet set: spinning loader + "Stream starting soon..."
- No more purchase CTA — user is now inside the event

---

## What This Page Shows (Always Visible)
- Show title (large, bold)
- Host info panel (avatar, name, verified badge, tickets sold)
- Show description
- Date & Time details
- Ticket price
- Circular ticket sold progress arc (% sold)
- Category + "Global" badge
- Countdown or live status

---

## Design Direction
- **Feel**: Exclusive, controlled, high-value — a **ticketed digital venue**
- **Pre-purchase**: Emphasizes scarcity, value, and FOMO
- **Post-purchase**: Warm, welcoming — user feels like a VIP insider
- **Trust signals**: Verified host badge, ticket sold %, global access label
- **Color**: Gold for ticket price/purchase CTA, green for owned confirmation, red for LIVE status

---

## Show Page vs. Live Page
| | Live Page | Show Page |
|---|---|---|
| Content type | Live challenges (free improv) | Scheduled premium events |
| Monetization | Coin prizes for challengers | Ticket purchase for viewers |
| Access | Open to all viewers | Ticket-gated access |
| Duration | Short, rapid-fire | Extended, structured show |
| Examples | Comedy challenge, dance battle | Comedy night, talent show, concert |

---

## User Flow

### First-Time Visitor (No Ticket)
1. Arrives from Home page, Live page, or direct link
2. Sees locked preview + ticket price prominently
3. Reads show description and host info
4. Sees ticket scarcity (X% sold) → urgency created
5. Taps **"Get Ticket"** → purchase flow
6. Page transforms to unlocked state

### Returning Ticket Holder
1. Opens the app before show time
2. Sees countdown + "You're in! 🎉" confirmation
3. When show goes live → stream embeds automatically
4. Watches stream + participates in live chat

---

## Key UI Elements
| Element | Description |
|---|---|
| Hero image (locked) | Category background with lock overlay |
| Live badge | Pulsing red "Live Now" label when active |
| Ticket Arc | Circular SVG arc showing % of tickets sold |
| "Get Ticket" button | Gold gradient CTA, full width, prominent |
| Confirmed state card | Green border, checkmark, "You're in! 🎉" |
| Stream embed | iframe filling hero area when unlocked + live |
| Live chat | Scrolling chat below stream |
| Host panel | Avatar, name, verified badge, ticket count |
| Date/time card | Formatted event date and local time |

---

## Notes
- Show Detail page is reached via `/show/:id`
- Each show has a unique ID tied to mock data
- Purchase is mocked (no real payment in frontend-only mode)
- Host controls (Go Live / set stream URL) are visible only when `isHost === true`
