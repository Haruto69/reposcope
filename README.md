# RepoScope

**Developer analytics from any GitHub profile.**

RepoScope is a professional GitHub developer analytics dashboard built to explore profiles, repositories, languages, activity, bookmarks, and developer comparisons.

Built with **React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, Recharts, and the GitHub REST API.**

---

## Live Demo

Live Demo: Coming soon

## Screenshots

Screenshots: Coming soon

---

## Features

- **Profile & Dashboard**: Search any GitHub username to instantly load their profile, follower stats, and bio.
- **Repository Analytics**: View public repositories with advanced sorting, language filtering, and live search.
- **Data Visualizations**: Recharts integration for language breakdowns, top starred repositories, and forks charts.
- **Repository Details & READMEs**: Dive into individual repositories with real-time markdown rendering of READMEs.
- **Compare Developers**: Side-by-side analysis of two GitHub profiles to compare languages, stats, and top repositories.
- **Bookmarks & Persistence**: Save favorite profiles, repositories, and view recent searches (persisted via LocalStorage).
- **Graceful Error Handling**: Robust Axios and TanStack Query integration to handle rate limits, 404s, offline states, and partial data failures elegantly without crashing the app.
- **Responsive & Accessible**: Mobile-friendly design featuring dark mode, Framer Motion page transitions, and shadcn/ui accessible components.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | Accessible component library |
| [React Router](https://reactrouter.com) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Server state, caching, and retries |
| [Zustand](https://zustand.docs.pmnd.rs) | Client state management (Bookmarks/Theme) |
| [Axios](https://axios-http.com) | HTTP client |
| [Recharts](https://recharts.org) | Charting library |
| [Framer Motion](https://motion.dev) | Animations and transitions |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Rendering GitHub READMEs |

---

## Folder Structure

```
src/
├── api/                  # GitHub API client, types, and centralized error parser
├── assets/               # Static assets
├── components/
│   ├── common/           # Error states, Loading states, Retry buttons, Rate Limit banners
│   ├── layout/           # AppLayout, Sidebar, Navbar, MobileSidebar
│   ├── ui/               # shadcn/ui components
│   ├── user/             # User profile and search history
│   ├── repos/            # Repository grids, filters, and README previews
│   ├── analytics/        # Recharts visualizations
│   ├── compare/          # Developer comparison components
│   └── bookmarks/        # Bookmarked users and repos
├── hooks/                # TanStack Query hooks
├── lib/                  # Shared utilities (cn helper)
├── pages/                # Route page components (Dashboard, Compare, RepoDetails, etc.)
├── store/                # Zustand state store
├── utils/                # Utility functions (sorting, calculating analytics, API error handling)
├── App.tsx
├── main.tsx
└── index.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check with TypeScript and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment & API Notes

RepoScope currently uses the public GitHub REST API without authentication. 
- Unauthenticated requests are subject to GitHub's rate limit of **60 requests per hour**.
- The app handles rate limits gracefully by surfacing the exact reset time to the user.

*(Future Improvement: Support for GitHub Personal Access Tokens (PAT) to increase rate limits to 5,000 requests per hour.)*

---

## Deployment Instructions for Vercel

RepoScope is ready to be deployed to [Vercel](https://vercel.com/).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect **Vite**.
4. Leave the default build command (`npm run build`) and output directory (`dist`).
5. A `vercel.json` file is already included to handle SPA routing fallback for React Router.

---

## Phase Roadmap

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Project Setup | ✅ Complete |
| Phase 2 | GitHub User Search | ✅ Complete |
| Phase 3 | Repository Dashboard | ✅ Complete |
| Phase 4 | Developer Analytics | ✅ Complete |
| Phase 5 | Repo Details Page | ✅ Complete |
| Phase 6 | Compare Developers | ✅ Complete |
| Phase 7 | Bookmarks and Recent Searches | ✅ Complete |
| Phase 8 | UI Polish and Responsiveness | ✅ Complete |
| Phase 9 | Error Handling and API Limits | ✅ Complete |
| Phase 10| Final Resume Version | ✅ Complete |

---

## Future Improvements

- GitHub OAuth/Token support for higher API rate limits.
- Timeline of repository activity.
- Export analytics as PDF or image.
- PWA support for offline access.
- Shareable dashboard links.

---

## Author

**haruto69**

- GitHub: [github.com/haruto69](https://github.com/haruto69)

---

## License

This project is open source and available under the [MIT License](LICENSE).
