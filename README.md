# Dialpad CRM Studio

Upload CSVs. Visualize adoption. Align design.

A live CRM integrations analytics dashboard built by the design team at Dialpad to visualize adoption and usage data for Salesforce CTI, Salesforce Sidebar, and other CRM integrations using real Tableau and Amplitude data.

---

## 📍 Project Context

This project consolidates our ongoing work on CRM analytics, combining data from **Tableau** (for adoption and usage) and **Amplitude** (for event-level behavior). It started as a static prototype but is being developed into a **living, self-updating dashboard**.

### What We’ve Done So Far
- **Audited 70+ Amplitude events** and discovered that almost all Salesforce events were tagged as `sidebar`, making CTI analysis impossible.
- **Defined a clean event taxonomy** proposal (`interaction_type = {cti, sidebar}`) to separate call-bar vs. sidebar workflows.
- Built a working **React + Tailwind + Recharts prototype** visualizing validated Tableau data for:
  - Salesforce CTI
  - Salesforce Sidebar
  - HubSpot
  - Zoho
  - Dynamics
  - Copper
  - Bullhorn
- Wired **real Tableau metrics** (not sample data) for Salesforce integrations:
  - Salesforce CTI: 17.7M events (12 months), ARR ≈ $64.8M
  - Sidebar: 1.83M events (12 months), same ARR context
- Designed UI guards — when data is missing, the dashboard shows *“No data wired”* instead of breaking.
- Documented how **design actions influence ARR** — faster note logging, clearer call matching, higher reliability → higher renewals and seat growth.

---

### What We’ll Do Next
We’re converting the static prototype into a **dynamic analytics system** with an **Admin upload interface**.

#### Key Steps Ahead
1. **Admin Upload Area:** Each CRM (Salesforce CTI, Sidebar, HubSpot, etc.) will have its own upload panel.
2. **Three standard CSV formats per CRM:**
   - `Summary` (adoption, ARR, events)
   - `MonthlyEvents` (time-series trend)
   - `EventRates` (from Amplitude, for funnel + reliability)
3. **Automatic data recognition:** The system will read file names, identify the integration, and update the relevant dashboard section.
4. **Instant updates:** Upload → Validate → Merge → Live dashboard refresh.
5. **Version history:** Keeps older uploads to compare monthly trends.
6. **Future data sources:** Once Amplitude tagging is corrected, it will join Tableau data for richer behavioral insights.

---

### Why This Matters
This dashboard is meant to **empower designers and PMs** to make product decisions based on usage, not guesses. It visualizes:
- Which integrations are adopted the most (by company and user count)
- How often and effectively they’re used (event volume, funnel, reliability)
- Where design or UX issues slow users down (failure patterns)
- How improvements could directly grow ARR

---

## 🛠 Tech Stack
- **Vite** — development/build tool  
- **React 18 + TypeScript** — component logic  
- **Tailwind CSS** — design system  
- **Recharts** — chart visualization  
- **CSV ingestion** — planned via Node/Express backend  

---

## ⚙️ Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open the app at:
   ```
   http://localhost:5173
   ```

---

## 🧩 Project Structure
```
dialpad-crm-studio/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages/
│  │  └─ App.tsx
│  └─ components/
│     └─ ui/
│        ├─ Badge.tsx
│        ├─ Button.tsx
│        ├─ Card.tsx
│        └─ Input.tsx
```

---

## 🧱 Next Milestone — Admin System
Once this repo is live, the next step is to build the **Admin Interface**:
A single, design-led analytics dashboard that continuously answers:
- Which CRM workflows drive engagement?
- How do UI changes affect adoption?
- How do improvements in CTI reliability translate to revenue growth?

This is the foundation for a scalable, self-updating system that brings design, product, and analytics into one view.

---

##  Requirements
- Node.js 18+ (LTS recommended)
- npm 9+
- Modern browser (Chrome/Edge/Safari/Firefox)

---

##  Scripts
```bash
npm run dev     # start Vite dev server
npm run build   # production build into ./dist
npm run preview # preview the production build locally
```
---

##  Path Alias
- `@` maps to `src/`
- Example: `import { Card } from '@/components/ui/Card'`
- Defined in `vite.config.ts` (`resolve.alias`) and `tsconfig.json` (`paths`)

---

##  Deployment
1. Build: `npm run build`
2. Serve the static `dist/` directory using any static host:
   - Netlify / Vercel
   - GitHub Pages
   - Any static file server (e.g., `npx serve dist`)
3. Local preview: `npm run preview`

---

##  CSV Schemas (Proposed for Admin Uploads)
These will be validated on upload. Column names may evolve as we wire the backend.

- Summary.csv
  - `events12m, events90d, companies, mau, wau, active30Rate, avgCallsPerActive30, arr`
- MonthlyEvents.csv
  - `month, events` (e.g., `Jan 25, 1560000`)
- EventRates.csv
  - `key, value` (e.g., `wrong match, 3.2`)

Back-end parsers will live under `server/ingest/` (to be added).

---

##  Troubleshooting
- Tailwind styles not applying
  - Ensure `tailwind.config.js` `content` includes `./index.html` and `./src/**/*.{ts,tsx}`
  - Restart dev server after config changes
- Port 5173 in use
  - Start with another port: `vite --port 5174` or adjust `vite.config.ts`
- Type errors before install
  - Run `npm install` to fetch dependencies and types

---

##  Dependencies & Security
- This is a front-end prototype; some transitive vulnerabilities may be flagged
- Check: `npm audit`
- Attempt fixes: `npm audit fix` (or `--force` with caution)

---

##  Screenshots (Optional)
Add `docs/screenshot.png` and embed here for a quick visual overview.
