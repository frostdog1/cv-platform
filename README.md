# CV Platform

> A production-grade personal CV site where the infrastructure _is_ the portfolio.

## Quick Start (Windows 10)

### Prerequisites

-   [Node.js 20+](https://nodejs.org/) (LTS recommended)
-   [Git](https://git-scm.com/download/win)

### Setup

```bash
# Clone and install
git clone https://github.com/frostdog1/cv-platform.git
cd cv-platform
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start Vite dev server with hot reload |
| `npm run build`     | TypeScript check + production build   |
| `npm run preview`   | Preview production build locally      |
| `npm run lint`      | Run ESLint                            |
| `npm run typecheck` | TypeScript type checking              |
| `npm run test`      | Run Vitest unit tests                 |

## Project Structure

```
src/
├── app/            # App shell, routes, theme
├── features/       # Feature-based modules
│   ├── cv/         # Recruiter-facing CV
│   ├── engineering/# Architecture & DevOps docs
│   ├── devlog/     # Development journal
│   └── github/     # GitHub integration
├── shared/         # Shared components, hooks, utils
└── lambda/         # API backend (co-located)
```

## Architecture

See the [Architecture Document](./docs/ARCHITECTURE.md) for full system design, or visit the `/engineering` section of the live site.

## License

MIT
