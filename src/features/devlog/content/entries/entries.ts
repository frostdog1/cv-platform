/* Dev log entries — newest first. Only includes work actually completed. */

/* Watch out for foolish mistakes MR FROST!!!, spent too long figuring out the error for the import of devlog/entries... it was a due to entries.ts being TWO folders
deep, not just ONE!!!... it's 00:08 and I'm watching UFC 326 (with a beer or two... or more ;)   ) - If you are reading this, thank you :)*/;

import { DevLogEntry } from '../../types';

export const DEV_LOG_ENTRIES: DevLogEntry[] = [
  {
    id: 'github-api-integration',
    date: '2026-03-07',
    title: 'Building the GitHub Commits Integration',
    summary: 'Wiring up live commit data from the GitHub API — and handling the rate limit wall.',
    category: 'problem',
    tags: ['GitHub API', 'React', 'Rate Limiting', 'Error Handling'],
    body: [
      'The commits page pulls live data from the GitHub API to show every commit that built this site. The public API is generous, i.e. no authentication needed for public repos — but it caps unauthenticated requests at 60 per hour.',
      'During development I was hitting that limit because hot-reload triggers re-fetches (a frustrating issue...). The fix was easy but a pain... add proper loading states and a clear error message that explains the rate limit to visitors rather than showing a generic failure.',
      'I broke the commits feature into small, focused components — types, API client, data hook, commit card, timeline grouping, then the page assembly. Each piece was committed separately to keep the git history clean and reviewable.',
    ],
    lessonLearned: 'Build error states as carefully as sucessful tests, not reading into this will drive anyone insane, so I hope this helps someone :).',
  },
  {
    id: 'conventional-commits',
    date: '2026-03-06',
    title: 'Why Conventional Commits Matter Here',
    summary: 'Choosing a commit message convention and building the UI to parse it.',
    category: 'decision',
    tags: ['Git', 'Conventional Commits', 'DX'],
    body: [
      'Every commit in this repo follows the conventional commit format: feat:, fix:, style:, docs:, refactor:. This isn\'t just for readability — the commits page parses these prefixes to colour-code and categorise each commit automatically.',
      'The commit type parser is a simple function using startsWith() — no regex needed (thankfully!). It lives in the useGitHubData hook so it\'s available to any component that needs it, this was another re=work during development.',
    ],
    lessonLearned: 'Commit conventions are free documentation. They cost nothing to maintain and they make every tool that reads your history work better. Put in real effort and the work is easy, simple as!',
  },
  {
    id: 'cv-page-print-styles',
    date: '2026-03-05',
    title: 'Print Styles vs React Inline Styles: A Specificity Battle',
    summary: 'Making the CV page printable when all styles are inline.',
    category: 'learning',
    tags: ['CSS', 'Print', 'React', 'Specificity'],
    body: [
      'The CV page needs to be printable — I assume recruiters still print CVs. But React inline styles have extremely high specificity, which means @media print rules in a stylesheet get overridden by the inline styles on every element.',
      'The solution is adding !important to every print rule. It\'s not elegant or nice to look at, but it\'s the correct approach when working with inline styles. The alternative... moving all styles to CSS modules just for print support, I will find another way as this solution is ridiculous',
      'The print stylesheet will hide the navigation, action buttons and decorative background elements. It switches the background to white, text to dark, and removes the sticky positioning from the skills sidebar so the full page flows naturally on paper.',
      'As of now, the print functionality has been abandoned as it\'s not looking as I expect, however I WILL get this working... eventually ;)',
    ],
    lessonLearned: 'If you\'re using React inline styles and need print support, accept that !important is necessary. Document why in a comment rather than fighting the specificity system. And believe me when I say I want to fight these specs, but alas, my complaints wont make Meta fix this',
  },
  {
    id: 'cv-page-layout',
    date: '2026-03-04',
    title: 'Designing the CV Page for Recruiter Scanning',
    summary: 'Layout decisions to make key information visible in under 3 seconds.',
    category: 'decision',
    tags: ['UX', 'Layout', 'CSS Grid', 'Recruiter'],
    body: [
      'From experience, I understand recruiters spend seconds on a CV before deciding to read further. The layout needed to frontload the most important information: name, title, current role, and core skills — all visible without scrolling.',
      'I chose a two-column grid: experience timeline on the left (where I find my eyes naturally go first) and a sticky skills sidebar on the right that follows as you scroll. This means a recruiter sees role, company, and tech stack simultaneously without scrolling back up.',
      'Each role in the timeline has a colour-coded accent dot and left border. The current role glows to draw attention. Tags at the bottom of each entry let technical recruiters keyword-scan instantly. The skills bars animate on page load with staggered delays to add visual interest without distraction.',
    ],
    lessonLearned: 'Design for the scanning pattern for humans, not the reading pattern. Frontload key information and use visual hierarchy to guide attention to what matters most. Recruiters are people too, they see thousands of CV\'s, be nice and make their lives easier (and HIRE ME!!!) :)',
  },
  {
    id: 'crlf-windows-git',
    date: '2026-03-03',
    title: 'The CRLF Problem: Windows and Git',
    summary: 'Line ending mismatches between Windows and Linux caused Git warnings.',
    category: 'problem',
    tags: ['Windows', 'Git', 'Line Endings'],
    body: [
      'Developing on Windows 10 (yes, you heard me right, WINDOWS, NOT LINUX), every git add produced warnings: "LF will be replaced by CRLF." This happens because Windows uses CRLF (carriage return + line feed) for line breaks while Linux and macOS use just LF.',
      'The fix is one command: git config --global core.autocrlf true. This tells Git to convert CRLF to LF on commit and back to CRLF on checkout. Files stay Windows-friendly locally but Linux-compatible in the repository.',
      'This will matter more later when Docker containers enter the picture — shell scripts with CRLF line endings fail silently inside Linux containers. Setting this early prevents a painful debugging session down the line. Thank you Docker!',
    ],
    lessonLearned: 'Set core.autocrlf at the start of any project on Windows. Fixing line ending issues retroactively is much harder than preventing them upfront, the pain is burned into my memory.',
  },
  {
    id: 'vite-path-aliases',
    date: '2026-03-02',
    title: 'Setting Up Path Aliases in Vite + TypeScript',
    summary: 'Making @features/ and @shared/ imports work required configuring two separate files.',
    category: 'learning',
    tags: ['Vite', 'TypeScript', 'Configuration'],
    body: [
      'Clean imports like @features/cv/pages/CVPage instead of ../../../features/cv/pages/CVPage make code more readable and refactor-safe. But in a Vite + TypeScript project, path aliases need to be configured in two places.',
      'First, vite.config.ts needs resolve.alias entries so Vite\'s bundler knows how to resolve the paths at build time. Second, tsconfig.json needs matching paths entries so TypeScript\'s compiler and VS Code\'s IntelliSense can resolve them for type checking and autocomplete.',
      'If you only configure one, you get confusing errors — the code might build but TypeScript shows red squiggles, or IntelliSense works but the build fails. Both files need to agree on the same alias mappings. EXTREMELY annoying if you don\'t realise this!!!',
    ],
    lessonLearned: 'Any path alias in a TS + Vite project must be declared in both vite.config.ts (for the bundler) and tsconfig.json (for the type checker). They serve different tools and neither reads the other.',
  },
  {
    id: 'project-scaffold',
    date: '2026-03-01',
    title: 'Project Scaffold: React + Vite + TypeScript',
    summary: 'Setting up the foundation — folder structure, tooling, and initial design decisions.',
    category: 'milestone',
    tags: ['React', 'Vite', 'TypeScript', 'Architecture'],
    body: [
      'The project started with a clear architectural decision: feature-based folder structure rather than type-based. Instead of top-level /components, /pages, /hooks directories, the code is organised by domain — /features/cv, /features/engineering, /features/devlog, /features/github. Each feature owns its own pages, components, hooks, and data.',
      'This mirrors how production codebases are organised in teams. A developer working on the GitHub integration only needs to look inside /features/github. Shared utilities live in /shared. The structure scales without becoming a maze of cross-references.',
      'Vite was chosen over Create React App for build speed — CRA is effectively deprecated and Vite offers near-instant hot module replacement. TypeScript is non-negotiable for anything beyond a prototype. The strict compiler catches entire categories of bugs before they reach the browser ;).',
    ],
    lessonLearned: 'Invest time in folder structure and tooling on day one. Restructuring a project after building features is always more expensive than getting the foundation right upfront. Again, put in the work and the work is easy!',
  },
];
