/* ═══════════════════════════════════════════════════
   GitHub Integration — Type Definitions
   Shared types for commit data across all components
   ═══════════════════════════════════════════════════ */

export interface GitHubCommit {
  sha: string;
  shortSha: string;
  message: string;
  description?: string;
  author: string;
  date: string;
  url: string;
  additions?: number;
  deletions?: number;
  filesChanged?: number;
}

export interface CommitGroup {
  date: string;
  label: string;
  commits: GitHubCommit[];
}

export interface RepoStats {
  totalCommits: number;
  totalFiles: number;
  languages: { name: string; percentage: number; color: string }[];
  lastUpdated: string;
}
