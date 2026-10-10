# Sattva Living — Holistic Wellness Community

A premium, international-standard fitness and wellness community web application focused on sustainable lifestyle coaching, balanced whole-food nutrition, daily gentle movement, online morning and evening circles, and mindful routines — **strictly free of gym culture, weights, or body-shaming transformations**.

---

## 🌟 Key Features

1. **Non-Gym Lifestyle Wellness**
   - Focus on gentle morning walks, joint mobility stretches, and diaphragmatic breathwork.
   - Evidence-informed whole-food plate balancing education without calorie counting or extreme diets.
   - Evening digital sundown rituals and restorative sleep hygiene sanctuaries.
   - Community habit challenges (e.g. 21-Day Mindful Morning & Walking Circle).

2. **Full Bilingual Support (English & বাংলা)**
   - True bilingual architecture covering all pages, navigation, programs, events, dashboard, forms, receipts, and policies.
   - Instant live language switcher in header and mobile drawer.
   - Language choice saved persistently in `localStorage`.

3. **Complete Membership & Auth System**
   - Full member registration (Name, Email, Mobile, Language, Wellness Interests, Password).
   - Secure login, session persistence, role-based authorization (Member vs Administrator).
   - One-click quick demo buttons for immediate testing (`Demo Member` and `Demo Admin`).

4. **Member Sanctuary Dashboard**
   - Daily healthy habit checklist (walking, wholesome meals, mindfulness, restorative sleep, water hydration, gratitude).
   - Dynamic consistency streak counter and weekly graphical habit flow visualizer.
   - Enrolled programs directory with detailed curriculum access.
   - Upcoming registered online circles with direct Google Meet/Zoom room links.
   - Community announcements and direct message connection to certified wellness mentors.

5. **Online Sessions & Event Registration**
   - Live interactive countdown clocks for upcoming circles.
   - Real-time seat availability and registration status.
   - Private Google Meet/Zoom room URLs unlocked only for confirmed registered members.

6. **Comprehensive Admin Management Suite**
   - **Overview:** Active member count, program metrics, revenue totals, and pending review alerts.
   - **Members:** Search by name/email, toggle active/inactive access, and export data to CSV.
   - **Programs:** Full CRUD operations, pricing, curriculum features, and publish/draft toggles.
   - **Events:** Scheduling, timezone coordination, participant capacities, and meeting links.
   - **Articles:** Educational guides publication with categories and read-time estimates.
   - **Gallery:** Visual community moments curation with lightbox viewer.
   - **Testimonials:** Moderation gateway to approve, reject, or remove member submissions.
   - **Enquiries:** Contact request triage with status progression.
   - **Payments:** Transaction reference tracking, manual verification, and printable receipt generation.
   - **Settings:** Live global editing of brand name, tagline, philosophy, hero imagery, and payment modes.

7. **India Payment Infrastructure**
   - Razorpay test sandbox checkout mode with simulated instant verification.
   - Support for UPI, Cards, and NetBanking methods.
   - Generation of official printable/downloadable digital receipts with unique transaction references (`PAY-2026-XXXX`).

---

## 🚀 Demo Credentials & Contact

- **Contact Phone:** `+91 94335 23525`
- **Contact Email:** `tanmoydari4@gmail.com`
- **WhatsApp Support:** `+91 94335 23525` (https://wa.me/919433523525)

- **Admin Account:**
  - Email: `tanmoydari4@gmail.com`
  - Password: `admin123`
  - Or click **"Demo Admin"** on the login page.
- **Member Account:**
  - Email: `member@sattvaliving.com`
  - Password: `member123`
  - Or click **"Demo Member"** on the login page.

---

## 🎨 Design System

- **Deep Forest Green:** `#153D32`
- **Sage Green:** `#A8BDA5`
- **Warm Cream:** `#F8F6F0`
- **Soft Charcoal:** `#252A27`
- **Muted Gold:** `#C6A66A`
- **Typography:** *Playfair Display* (Headings) and *DM Sans* / *Hind Siliguri* (Body).

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 with custom tokens and typography
- **Icons:** Lucide React
- **Persistence & Cloud DB:** Dual-layer architecture:
  - **Local-first reactive state:** Instant zero-latency responses with local resilience.
  - **Supabase PostgreSQL Cloud Storage:** Connected to Project `atmnwxgvnfsrinqrzvij` (`https://atmnwxgvnfsrinqrzvij.supabase.co`).
  - **Auto-synced Tables:** `users` (logins & profiles), `enrollments` (program bookings), `event_registrations` (appointments), `enquiries` (consultation messages), `habit_logs` (daily wellness checklists), and `payments`.
  - **SQL Schema Script:** `/supabase_schema.sql` (can be run directly in Supabase SQL editor).
- **Firebase Ready:** `firebase-blueprint.json` and strict `firestore.rules` included.

---

## 🚀 Deploying to Netlify

This project is fully configured for one-click deployment on Netlify with SPA client routing and production caching headers.

### Option 1: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account.
2. Log into [Netlify](https://app.netlify.com) and click **"Add new site" &rarr; "Import an existing project"**.
3. Select your repository.
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. *(Optional)* Under **Site configuration &rarr; Environment variables**, add:
   - `VITE_SUPABASE_URL` = `https://atmnwxgvnfsrinqrzvij.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_15I7OtmTepRBdcB8mEUG8A_t_65x7Ls`
6. Click **"Deploy site"**.

### Option 2: Deploy via Netlify Drag & Drop
1. Run `npm run build` locally to generate the `dist` folder.
2. In Netlify Dashboard, go to **Sites &rarr; "Deploy manually"** and drag and drop the `dist/` folder.
3. Client-side routing is handled by the pre-configured `dist/_redirects` file so refreshing deep links (`/programs`, `/dashboard`, etc.) works without 404 errors.

---

## 🐙 Deploying to GitHub Pages

You can deploy to GitHub Pages using either **"Deploy from a branch"** (Recommended for your setup) or **"GitHub Actions"**.

### Method 1: Deploy from a branch (`gh-pages` Branch)

The project includes an automatic build workflow that compiles the React app and automatically pushes the production files to a dedicated `gh-pages` branch.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Update for GitHub Pages deployment"
   git push origin main
   ```
2. Go to your repository on GitHub.
3. Click **Actions** tab at the top:
   - You will see the **"Build and Deploy to GitHub Pages"** workflow run.
   - Wait 1-2 minutes until it completes with a green checkmark (it automatically creates the `gh-pages` branch).
4. Go to **Settings** &rarr; **Pages** (on the left menu under "Code and automation"):
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **`gh-pages`** (NOT `main`)
   - **Folder**: Select **`/ (root)`**
   - Click **Save**
5. Your live website URL will appear at the top:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`

---

### Method 2: One-Click Deploy from Terminal (`npm run deploy`)

If you want to deploy directly from your computer without waiting for GitHub Actions:
```bash
npm run deploy
```
This runs `vite build` and instantly pushes the built files to the `gh-pages` branch using the `gh-pages` package.

---

### Why not deploy directly from `main`?
The `main` branch contains raw TypeScript/React source code (`src/`, `package.json`, `README.md`). GitHub Pages' default branch server only serves static HTML/CSS/JS. Deploying from `main` causes GitHub to display the `README.md` file via Jekyll. Using the `gh-pages` branch serves the compiled React application directly.

