# Hemanth Peddada — Personal Portfolio & Blog

A high-performance, premium personal portfolio and technical blog built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. It features rich interactive widgets, multi-language localization, and a local offline music player with custom glitch visual-audio effects.

## 🚀 Features

### 🎨 Design & Interaction
- **Premium Aesthetics:** Curated dark theme, glassmorphism, responsive grids, and micro-interactions.
- **Multilingual Support:** Fully translated between **English**, **Telugu**, and **Hindi** with Next.js-safe hydration syncing.
- **Glitch Tactile Portrait:** A glitch-displaced interactive profile picture that flips with custom audio click feedback.

### 🎵 Interactive Music Player
- **Local Music Streaming:** Completely offline music playing utilizing actual high-quality tracks stored in `public/songs/` (including *Blinding Lights*, Arijit's *Kesariya*, and the *Jersey BGM*).
- **Audio-Visual Glitch Effects:** Features custom audio transition sound effects and CSS keyframe slice animation overlays when switching songs or toggling playback.
- **Persistent Playback:** Utilizes a lazy-singleton audio instance to prevent media stream leaks and duplicate playing threads.
- **Dynamic Track Titles:** The song player dynamically displays current metadata labels and artists when playing or switching tracks.

### ⚙️ Auto-Closing Dock Settings
- **Lazy Hover Tunnel:** The settings dock panel remains open when moving the cursor from the dock button to the settings panel, but auto-closes smoothly with a minor delay when moving away from the settings panel onto the page canvas.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), Vanilla CSS |
| **Animation** | [Motion](https://motion.dev/) (Framer Motion) |
| **Database** | [Supabase](https://supabase.io/) (for views and subscribers) |
| **Storage** | [Cloudflare R2](https://www.cloudflare.com/r2/) (for blog MDX content) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/devndesigner6/Portfoliov2.git
cd Portfoliov2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your Supabase database and Cloudflare R2 credentials for visitor and blog view tracking:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📦 Deployment to Vercel

This repository is pre-configured with a `vercel.json` file for zero-config deployments. 

To deploy instantly:
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set up your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, etc.) in the Vercel Project Settings.
3. Click **Deploy**. Vercel will automatically compile the Next.js static production bundle and serve it at a global CDN edge.
