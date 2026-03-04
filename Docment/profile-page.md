# 👤 Profile Page — Identity & Personal Hub

## Purpose
The Profile page represents the **user's identity** within the platform. It is the personal hub that connects users to everything they own, have attended, or created inside IV.

It serves differently depending on the user type:
- **Viewers**: A personal hub for purchased tickets, upcoming shows, and activity history
- **Hosts**: A gateway to creator tools, their scheduled shows, and earnings dashboard

---

## Primary Goal
Build **trust and continuity** — remind users they have ownership and history inside the platform. This page anchors **long-term retention**.

---

## Two Modes of the Profile Page

### Mode 1: Viewer Profile
For regular users who attend and purchase shows.

- Avatar, display name, username, viewer badge
- Global access badge
- **Stats**: Total coins, wins, rank, streak
- **My Tickets** section: list of all purchased show tickets
- Each ticket shows: show title, date/time, LIVE badge if active now
- Tap a ticket → navigates to the show page (unlocked state)
- **"Become a Host"** CTA — encourage upgrade to creator status

### Mode 2: Host Profile
For creators who run shows and challenges.

- Avatar, display name, verified ✓ badge, **Host** label
- **Stats**: Total coins earned, wins, rank, streak
- **My Shows** section: all shows they've created
  - Each show card: title, category, date/time, ticket progress bar
  - Buttons: Edit Event / Manage
- **"+ New Show"** button to create a new event
- Access to earnings/creator dashboard (future)
- Same **My Tickets** section for shows they've purchased as a viewer

---

## Unauthenticated State
If user is not logged in:
- Full-screen centered prompt
- Large IV logo / icon
- Copy: *"Your global stage awaits"*
- Single CTA: **"Sign In / Sign Up"** → navigates to `/auth`

---

## Design Direction
- **Feel**: Clean, organized, professional — not chaotic
- **Trust signals**: Verified badges, ticket ownership cards, coin balance
- **Ecosystem identity**: Users see this as *their* space within the platform
- **Rewards focus**: Coin balance, streak, rank reinforce gamification and retention
- **Creator path**: Viewer-to-Host conversion is always visible but not intrusive

---

## What This Page Shows

### Header / Banner Area
- Gradient banner background (purple → pink)
- Avatar overlapping banner (large, with gradient ring)
- Edit profile button (pencil icon)
- Coin balance pill (top right)
- Logout button (top right)

### Identity Section
- Display name + verified badge (if host)
- @username
- Role badge: `🎙 Host` or `👁 Viewer`
- Global badge
- Email (small, muted)

### Stats Grid (2×2)
| Stat | Icon | Color |
|---|---|---|
| Total Coins | 🪙 | Yellow |
| Wins | 🏆 | Purple |
| Rank | 📈 | Teal |
| Streak (days) | ⚡ | Orange |

### Sections
- **Become a Host** CTA card (viewers only)
- **My Shows** (hosts only) — event management cards
- **My Tickets** — purchased show access cards
- **Settings Menu** — achievements, rewards, payment, global access, settings

---

## Edit Profile Modal
Accessible via the pencil icon or camera button on avatar.
- Avatar URL input with live preview
- Display name input
- Username input (with `@` prefix, alphanumeric only)
- Save Changes button

---

## User Flow

### Viewer
1. Opens Profile page
2. Sees their tickets and stats
3. Taps a ticket → show page opens in unlocked state
4. Sees "Become a Host" CTA → taps → upgrades

### Host
1. Opens Profile page
2. Sees all their created shows with ticket progress
3. Taps "+ New Show" → navigates to `/create-show`
4. Taps "Manage" on existing show → navigates to `/show/:id` with host controls

---

## Key UI Elements
| Element | Description |
|---|---|
| Gradient banner | Purple-to-pink hero banner with blur accents |
| Avatar ring | Gradient ring (purple → pink) around profile photo |
| Camera button | Quick edit avatar access |
| Role badge | Host 🎙 or Viewer 👁 |
| Coin balance pill | Always visible in top bar |
| Stats grid | 4 animated count-up stat cards |
| Become Host card | Gradient CTA for viewer-to-host upgrade |
| My Shows | Host-only event management cards |
| My Tickets | Purchased ticket list with live status |
| Settings menu | Chevron list: achievements, payments, settings |
| Edit modal | Bottom sheet slide-up for profile editing |

---

## Notes
- Stats are currently mocked at 0 (will connect to backend later)
- `is_host` flag on the profile determines which mode is shown
- "Become a Host" triggers a mock upgrade in frontend-only mode
- All navigation from tickets/shows leads back to the relevant Show Page
