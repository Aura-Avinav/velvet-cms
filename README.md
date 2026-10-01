# Velvet CMS — Editorial Dark Headless & Visual Studio Platform

A landing page and full-stack MERN application for **Velvet CMS**, engineered specifically around the strict 5-color palette:

| Swatch | Color Name | Hex Code | Purpose in Design |
|---|---|---|---|
| ![#090302](https://via.placeholder.com/15/090302/000000?text=+) | **Pitch Black** | `#090302` | Deep foundational canvas, ambient backdrops, primary dark surfaces |
| ![#5A2328](https://via.placeholder.com/15/5A2328/000000?text=+) | **Night Bordeaux** | `#5A2328` | Luxury cards, gradients, ambient atmospheric glow, key accents |
| ![#8A7E72](https://via.placeholder.com/15/8A7E72/000000?text=+) | **Grey Olive** | `#8A7E72` | Subtle borders, structural dividers, secondary body typography |
| ![#7A9B76](https://via.placeholder.com/15/7A9B76/000000?text=+) | **Sage Green** | `#7A9B76` | Primary action buttons, active indicators, live edge status, badges |
| ![#C8BFC7](https://via.placeholder.com/15/C8BFC7/000000?text=+) | **Pale Slate** | `#C8BFC7` | Primary luxury typography, headlines, elevated contrast elements |

---

## Interactive Features Included

1. **Interactive CMS Studio Mock (`#studio`)**
   - Live visual block editing (click and type into titles or body text).
   - Insert new blocks (*Hero Headline, Editorial Article, Quote Spotlight, Call to Action*).
   - Move blocks up/down or remove blocks.
   - Live accent color switching (Bordeaux, Sage, Olive).
   - Real-time JSON schema inspection.
   - **"Push to Edge"** button that persists changes to the Express/Mongoose backend (`PUT /api/studio/blocks`) with toast notification.

2. **Developer API Engine & Playground (`#apis`)**
   - Multi-tab language switcher for:
     - `GraphQL Query`
     - `REST API v2 (cURL)`
     - `TypeScript SDK`
     - `Next.js 15 App Router`
   - One-click copy with feedback.
   - **"Test Live API"** runner that makes a real request to the MERN backend and displays roundtrip millisecond latency and JSON payload.

3. **Interactive Pricing Calculator (`#pricing`)**
   - Annual / Monthly billing switch with 20% discount calculation.
   - Interactive slider simulating 1M to 10M+ monthly content queries.
   - 3 distinct tiers: *Pioneer*, *Studio Scale*, and *Enterprise DXP*.

4. **Verified Case Studies & Testimonial Carousel (`#testimonials`)**
   - High-impact metrics (+340% velocity, 36ms latency).
   - Auto-rotating carousel with pause/play toggle and chevron controls.

5. **VIP Demo Reservation Modal**
   - Connected to Express `POST /api/leads`.
   - Generates reservation ticket IDs with instant validation and confirmation screen.

6. **Full-Stack MERN Architecture**
   - **Backend**: Express + Mongoose + Node.js (with automatic resilient in-memory storage fallback if MongoDB service is not started locally).
   - **Frontend**: React 19 + Vite + Vanilla CSS design system + Lucide icons.

---

## How to Run

```bash
# Start both backend and frontend concurrently
npm run dev

# Or run them individually:
npm run dev:backend   # Runs Express API on http://localhost:5001
npm run dev:frontend  # Runs Vite React app on http://localhost:5173
```
