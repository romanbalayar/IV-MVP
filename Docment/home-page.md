# 🏠 Home Page — Discovery & Positioning

## Purpose
The Home page is the **discovery layer** of the platform. It is the first thing users see and must immediately communicate what IV is about: **structured, premium long-form live events and real live challenges**  and random social content too base on what user want see and spending most time on(same like as tiktok and Instagram reels.) 

It serves two roles simultaneously:
1. A **short-form video reel feed** (TikTok / Instagram Reels style) - might be random videos just like tiktok and Instagram reels.
2. A **curated event discovery feed** (upcoming and live shows)

---

## Primary Goal
Help users find something interesting and push them toward a **Show Page** or **Live Page** -  where monetization happens.

---

## What This Page Shows

### Short-Form Video Feed (Reel Section)
- Vertical, swipe-based full-screen video cards (scroll-snap)
- Each card features: creator avatar, username, caption, hashtags, sound name
- Right-side action bar: ❤️ Like, 💬 Comment, ↩️ Repost, ➡️ Share
- "For You / Following" pill toggle at the top
- Mute/unmute button
- LIVE badge on creators who are currently running a live challenge

### Event Discovery Section
- Upcoming scheduled shows with: title, thumbnail, host name, category, countdown timer, ticket price
- Currently live shows clearly flagged with a red LIVE badge
- Viewer counts and ticket availability indicators

---

## Design Direction
- **Feel**: Curated, intentional, premium — not chaotic or random
- **Separation from casual apps**: Emphasize scheduled events, professionalism, and exclusivity
- **Anticipation**: Countdown timers build urgency for upcoming shows
- **Dual identity**: The reel feed keeps casual users engaged while event cards convert them to paying viewers

---

## User Flow
1. User opens the app → lands on the reel feed
2. Scrolls vertically through short-form content
3. Sees a LIVE badge or event card → curiosity triggered
4. Taps → navigates to the Live Page or Show Page
5. Monetization opportunity begins

---

## Key UI Elements
| Element | Description |
|---|---|
| Vertical scroll-snap feed | Full-screen swipe video cards |
| For You / Following tabs | Content personalization toggle |
| Right action bar | Like, Comment, Repost, Share |
| LIVE badge | Pulsing red indicator on active creators |
| Event cards | Thumbnail + title + countdown + price |
| Music disc | Spinning disc showing sound info |
| Swipe hint | Arrow animation at bottom of each card |

---

## Notes
- This page does NOT require login to view
- Clicking a LIVE creator badge should navigate to `/live`
- Clicking an event card should navigate to `/show/:id`
