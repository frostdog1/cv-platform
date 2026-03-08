/*
 * Architecture data
 *
 * This contains the system architecture layers, all Architecture
 * Decision Records (ADRs), and the complete tech stack.
 *
 * Items marked "(planned)" in the tech stack are not yet implemented
 * but are part of the project roadmap. These will be updated as
 * each phase of the project is completed.
 */

import { ADR, TechItem, ArchitectureLayer } from '../types';

/*
 * ARCHITECTURE_LAYERS
 *
 * The system is visualised as four stacked layers. These layers appear in the interactive
 * diagram on the engineering page — users can hover each layer
 * to see its components.
 *
 * The layers are ordered top-to-bottom from what the user sees
 * (Presentation) down to what supports the project behind the
 * scenes (Version Control).
 */
export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    name: 'Presentation',
    description: 'React SPA with feature-based routing and animated page transitions.',
    components: ['React 18', 'React Router v5', 'CSS-in-JS (inline)', 'Google Fonts'],
    color: '#c8ff00', // Lime — matches the site's primary accent
  },
  {
    name: 'Data Layer',
    description: 'GitHub API integration for live commit data. Static JSON for CV content.',
    components: ['GitHub REST API', 'Custom React Hooks', 'JSON Resume Schema'],
    color: '#6dd5ed', // Cyan — used for the engineering section accent
  },
  {
    name: 'Build & Tooling',
    description: 'Vite for fast HMR and optimised production builds. TypeScript for type safety.',
    components: ['Vite 5', 'TypeScript 5.4', 'ESLint', 'Prettier'],
    color: '#a855f7', // Purple — used for the commits section accent
  },
  {
    name: 'Version Control',
    description: 'Git with conventional commits. Public GitHub repository for full transparency.',
    components: ['Git', 'GitHub', 'Conventional Commits', 'Feature Branches'],
    color: '#f59e0b', // Amber — used for the devlog section accent
  },
];

/*
 * ADRS — Architecture Decision Records
 *
 *   - Context:      Why was this decision needed?
 *   - Decision:     What was decided?
 *   - Consequences: What are the trade-offs (both positive and negative)?
 *
 * ADRs are numbered sequentially. The status field tracks whether
 * the decision is still in effect:
 *   - "accepted"   → currently in use
 *   - "proposed"   → under consideration
 *   - "rejected"   → considered but not adopted
 *   - "superseded" → replaced by a newer decision
 *
 * These appear on the engineering page as expandable cards that
 * visitors can click to read the full reasoning.
 */
export const ADRS: ADR[] = [
  {
    id: 'static-first',
    number: 1,
    title: 'Static-First Architecture',
    status: 'accepted',
    date: '2026-03-01',
    context: 'A personal CV site has no dynamic user-generated content. Server-side rendering adds complexity without meaningful benefit for a single-page portfolio.',
    decision: 'Build as a static SPA using React + Vite. Use the GitHub API client-side for dynamic data. Plan a Lambda proxy layer for future authenticated API calls.',
    consequences: {
      positive: [
        'Near-zero hosting cost when deployed to S3 + CloudFront',
        'Sub-100ms time to first byte via CDN edge caching',
        'Zero server patching or scaling concerns',
      ],
      negative: [
        'Client-side rendering requires careful SEO handling',
        'Dynamic data (commits) depends on third-party API rate limits',
      ],
    },
    tags: ['Architecture', 'Hosting', 'Performance'],
  },
  {
    id: 'feature-based-structure',
    number: 2,
    title: 'Feature-Based Folder Structure',
    status: 'accepted',
    date: '2026-03-01',
    context: 'Type-based structures (/components, /pages, /hooks) become difficult to navigate as projects grow. Cross-feature dependencies become tangled.',
    decision: 'Organise code by domain feature: /features/cv, /features/engineering, /features/devlog, /features/github. Each feature owns its pages, components, hooks, and data.',
    consequences: {
      positive: [
        'Clear ownership — all GitHub integration code lives in /features/github',
        'Easy to onboard — a developer only needs to understand one feature folder',
        'Scales naturally without becoming a maze of cross-references',
      ],
      negative: [
        'Shared components need a clear boundary (/shared) to avoid duplication',
        'Slightly deeper import paths for cross-feature references',
      ],
    },
    tags: ['Architecture', 'DX', 'Folder Structure'],
  },
  {
    id: 'vite-over-cra',
    number: 3,
    title: 'Vite Over Create React App',
    status: 'accepted',
    date: '2026-03-01',
    context: 'Create React App is effectively deprecated and unmaintained. Build times are slow and the webpack config is difficult to customise without ejecting.',
    decision: 'Use Vite as the build tool. It offers near-instant hot module replacement, native TypeScript support, and optimised production builds out of the box.',
    consequences: {
      positive: [
        'Sub-second hot reload during development',
        'Smaller production bundles via Rollup-based tree shaking',
        'Simple configuration with first-class TypeScript support',
      ],
      negative: [
        'Some older React tutorials and Stack Overflow answers assume CRA',
        'Plugin ecosystem is different from webpack',
      ],
    },
    tags: ['Tooling', 'DX', 'Build'],
  },
  {
    id: 'conventional-commits',
    number: 4,
    title: 'Conventional Commit Messages',
    status: 'accepted',
    date: '2026-03-01',
    context: 'The commits page parses commit messages to colour-code and categorise them. Unstructured messages would require manual tagging or produce an unusable feed.',
    decision: 'Adopt the conventional commit format (feat:, fix:, style:, docs:, refactor:, ci:, infra:, test:) for all commits. Parse the prefix client-side for automatic categorisation.',
    consequences: {
      positive: [
        'Commit history is structured and scannable',
        'Commits page automatically categorises entries with no manual effort',
        'Future CI/CD can auto-generate changelogs from commit messages',
      ],
      negative: [
        'Requires discipline on every commit — easy to forget the prefix',
        'Some commits span multiple categories and the prefix feels forced',
      ],
    },
    tags: ['Git', 'DX', 'CI/CD'],
  },
  {
    id: 'inline-styles-react',
    number: 5,
    title: 'Inline Styles Over CSS Modules',
    status: 'accepted',
    date: '2026-03-02',
    context: 'The project needs a styling approach. Options considered: CSS Modules, Tailwind CSS, styled-components, and inline styles.',
    decision: 'Use inline styles with CSS variables for theming. Reserve stylesheet-based CSS for global resets, animations, and print media queries.',
    consequences: {
      positive: [
        'Zero build-time CSS processing — styles are just JavaScript objects',
        'Component styles are co-located with component logic',
        'CSS variables provide theming consistency across inline styles',
      ],
      negative: [
        'No pseudo-class support (hover, focus) without a separate style tag',
        'Print styles require !important to override inline specificity',
        'Styles are not cached separately from JavaScript bundles',
      ],
    },
    tags: ['CSS', 'Architecture', 'DX'],
  },
];

/*
 * TECH_STACK
 *
 * Every tool, framework, and service used in (or planned for)
 * the project. Each item has a category so the TechStack
 * component can group them under headings.
 *
 * Categories:
 *   - frontend:       UI frameworks, languages, and libraries
 *   - backend:        APIs and server-side services
 *   - infrastructure: Hosting, containers, and IaC tools
 *   - testing:        Test runners and frameworks
 *   - tooling:        Build tools, version control, and DX utilities
 *
 * The optional "url" field links to the tool's documentation.
 * Items marked "(planned)" are on the roadmap but not yet in use.
 */
export const TECH_STACK: TechItem[] = [
  // ── Frontend ──
  { name: 'React 18', description: 'UI framework with hooks and concurrent features', category: 'frontend', url: 'https://react.dev' },
  { name: 'TypeScript 5.4', description: 'Type safety across the full codebase', category: 'frontend', url: 'https://typescriptlang.org' },
  { name: 'React Router v5', description: 'Client-side routing with Ionic compatibility', category: 'frontend' },

  // ── Backend ──
  { name: 'GitHub REST API', description: 'Live commit data for the transparency page', category: 'backend', url: 'https://docs.github.com/en/rest' },

  // ── Infrastructure (planned — not yet implemented) ──
  { name: 'GitHub Actions', description: 'CI/CD pipeline (planned)', category: 'infrastructure' },
  { name: 'Docker', description: 'Containerised dev and production environments (planned)', category: 'infrastructure' },
  { name: 'AWS S3 + CloudFront', description: 'Static hosting with global CDN (planned)', category: 'infrastructure' },
  { name: 'Terraform', description: 'Infrastructure as code for AWS resources (planned)', category: 'infrastructure' },

  // ── Testing (planned — not yet implemented) ──
  { name: 'Vitest', description: 'Unit and component testing (planned)', category: 'testing' },
  { name: 'Playwright', description: 'End-to-end browser testing (planned)', category: 'testing' },

  // ── Tooling ──
  { name: 'Vite 5', description: 'Build tool with near-instant HMR', category: 'tooling', url: 'https://vitejs.dev' },
  { name: 'Git', description: 'Version control with conventional commits', category: 'tooling' },
];