# RepoScope

**Developer analytics from any GitHub profile.**

RepoScope is a GitHub profile and repository analytics dashboard built with React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, Recharts, and the GitHub REST API.

> **Status:** Phase 1 Complete — Project setup, routing, layout, and placeholder pages are in place. Real GitHub integration and analytics are coming in later phases.

---

## Live Demo

Coming soon

## Screenshots

Coming soon

---

## Features (Phase 1)

- App shell with sidebar navigation and top navbar
- Collapsible desktop sidebar with tooltip support
- Mobile-responsive drawer navigation
- Dark / Light / System theme toggle with persistence
- Client-side routing across all pages
- Framer Motion page transitions
- Reusable state components (Loading, Error, Empty)
- Search bar integrated with Zustand store
- TanStack Query provider configured
- Zustand store for theme, sidebar, search history, bookmarks, and active user
- GitHub REST API client scaffold (Axios)
- LocalStorage utility for future bookmarks and recent searches
- Utility functions for number formatting, repo sorting, and analytics calculation
- shadcn/ui components installed and ready to use
- TypeScript strict mode with zero build errors

## Planned Features

- GitHub username search with live results
- User profile dashboard with avatar, bio, and stats
- Repository list with sorting, filtering, and search
- Language breakdown charts (Recharts)
- Stars and forks analytics
- Individual repository details page
- Side-by-side developer comparison
- Bookmarks and recent search history
- Rate limit handling and error recovery
- Fully responsive, portfolio-ready UI

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
| [TanStack Query](https://tanstack.com/query) | Server state and caching |
| [Zustand](https://zustand.docs.pmnd.rs) | Client state management |
| [Axios](https://axios-http.com) | HTTP client |
| [Recharts](https://recharts.org) | Charting library |
| [Framer Motion](https://motion.dev) | Animations and transitions |
| [Lucide React](https://lucide.dev) | Icon library |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form validation |

---

## Folder Structure

```
src/
├── api/                  # GitHub API client and type definitions
│   ├── githubApi.ts
│   └── githubTypes.ts
├── assets/               # Static assets
├── components/
│   ├── common/           # Reusable components (LoadingState, ErrorState, etc.)
│   ├── layout/           # AppLayout, Sidebar, Navbar, MobileSidebar
│   ├── ui/               # shadcn/ui components
│   ├── user/             # User profile components (future)
│   ├── repos/            # Repository components (future)
│   ├── analytics/        # Analytics components (future)
│   ├── compare/          # Comparison components (future)
│   └── bookmarks/        # Bookmark components (future)
├── hooks/                # Custom React hooks
│   ├── useGithubUser.ts
│   ├── useGithubRepos.ts
│   └── useLocalStorage.ts
├── lib/                  # Shared utilities (cn helper)
├── pages/                # Route page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Compare.tsx
│   ├── Bookmarks.tsx
│   ├── Settings.tsx
│   ├── RepoDetails.tsx
│   └── NotFound.tsx
├── store/                # Zustand state store
│   └── appStore.ts
├── utils/                # Utility functions
│   ├── formatNumber.ts
│   ├── sortRepos.ts
│   └── calculateAnalytics.ts
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

## Phase Roadmap

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Project Setup | ✅ Complete |
| Phase 2 | GitHub User Search | Planned |
| Phase 3 | Repository Dashboard | Planned |
| Phase 4 | Developer Analytics | Planned |
| Phase 5 | Repo Details Page | Planned |
| Phase 6 | Compare Developers | Planned |
| Phase 7 | Bookmarks and Recent Searches | Planned |
| Phase 8 | UI Polish and Responsiveness | Planned |
| Phase 9 | Error Handling and API Limits | Planned |
| Phase 10 | Final Resume Version | Planned |

---

## Future Improvements

- GitHub OAuth for higher API rate limits
- Export analytics as PDF or image
- Repository activity timeline
- Contribution heatmap visualization
- PWA support for offline access
- Shareable profile links

---

## Author

**haruto69**

- GitHub: [github.com/haruto69](https://github.com/haruto69)

---

## License

This project is open source and available under the [MIT License](LICENSE).
