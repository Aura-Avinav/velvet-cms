# Velvet CMS — Editorial Dark Headless & Visual Studio Platform

A landing page and full-stack MERN application for **Velvet CMS**, engineered specifically around the strict 5-color palette:

| Swatch | Color Name | Hex Code | Purpose in Design |
|---|---|---|---|
| ![#2274A5](https://via.placeholder.com/15/2274A5/000000?text=+) | **Rich Cerulean** | `#2274A5` | Vibrant brand signature, primary CTA buttons, active state accents, interactive highlights |
| ![#E7DFC6](https://via.placeholder.com/15/E7DFC6/000000?text=+) | **Sand Dune** | `#E7DFC6` | Warm elegant badges, secondary button highlights, subtle structural borders, warm text |
| ![#E9F1F7](https://via.placeholder.com/15/E9F1F7/000000?text=+) | **Alice Blue** | `#E9F1F7` | Crisp high-contrast typography, primary headlines, elevated contrast elements |
| ![#131B23](https://via.placeholder.com/15/131B23/000000?text=+) | **Ink Black** | `#131B23` | Deep midnight ink foundational canvas, ambient backdrops, primary dark surfaces |
| ![#2A140E](https://via.placeholder.com/15/2A140E/000000?text=+) | **Coffee Bean** | `#2A140E` | Rich espresso depth, warm dark gradients, atmospheric glow, dark contrast accents |

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
