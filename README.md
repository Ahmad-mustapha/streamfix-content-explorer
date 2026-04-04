# 🎬 StreamFix: Movie & Series Explorer

A lightweight movie discovery tool built with **Next.js 15**, **React 19**, and **Zustand**.

**Live Demo:** [https://frontend-assessment-mustapha.ahmadishola12.workers.dev](https://frontend-assessment-mustapha.ahmadishola12.workers.dev)

---

## 🚀 Setup Instructions
I've made the setup process simple. Run these 4 commands to get the app running locally:

1. `git clone [repo-url]` 
2. `npm install`
3. Create `.env.local` and add `NEXT_PUBLIC_TMDB_ACCESS_TOKEN=[your_token]`
4. `npm run dev`

---

## 🛠 My Architecture Decisions
I chose a **Hybrid Fetching** strategy to balance speed and interactivity:
- **Server Components:** I use these for the main movie galleries. This ensures the initial page load is incredibly fast because the data is fetched at the Edge (Cloudflare).
- **Zustand:** I used Zustand for the Watchlist because it's predictable, has zero boilerplate compared to Redux, and is easy for other developers to read.
- **URL-State:** For searching and filtering, I used the URL bar as my "source of truth." This makes every search shareable and allows the back button to work naturally.

## ⚡ Performance Optimizations
- **Edge Caching:** By deploying on a Cloudflare Worker, the app is physically closer to the user, reducing latency.
- **Image Priority:** I used the `priority` attribute in `next/image` for "above-the-fold" movie posters to improve the LCP (Largest Contentful Paint).
- **ISR (Incremental Static Regeneration):** I set a 1-hour revalidation time for my API calls so that repeated visits don't need to hit the TMDB API every single time.

## ⚖️ Trade-offs & Limitations
- **Testing Coverage:** Because of the tight timeline, I focused my unit tests on core components like the MovieCard rather than full end-to-end flows. Given more time, I would add Playwright tests for the full user journey.
- **Styling:** I chose Tailwind CSS for speed of development. While it's great for rapid prototyping, in a massive team project I might consider CSS Modules for more scoped styles.
- **Loading Skeletons:** I used basic loading states; with more time, I’d build more polished skeleton screens.

## 🌟 Bonus Tasks Attempted
- **Unit Testing:** I implemented a testing suite using **Vitest** and **React Testing Library**. You can verify these by running `npm test`.
- **Responsive Design:** The app is fully responsive from mobile up to ultra-wide monitors.
- **Dark Mode Aesthetic:** I implemented a custom dark theme with high-contrast elements for a premium feel.
