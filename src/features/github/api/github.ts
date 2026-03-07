/* ═══════════════════════════════════════════════════
   GitHub API Client
   Fetches commit data from the public repository.
   Before you ask, my GitHub avatar is Hannibal Barca - Please speak to me about the Punic Wars, or any kind of history; not just my Git history :)
   ═══════════════════════════════════════════════════ */

import { GitHubCommit, RepoStats } from '../types';

const REPO_OWNER = 'frostdog1';
const REPO_NAME = 'cv-platform';
const API_BASE = 'https://api.github.com';

/**
 * Parse my commit messages into title and description.
 * for example:: "feat(cv): add timeline\n\nDetails here" → { message: "feat(cv): add timeline", description: "Details here" }
 */
function parseCommitMessage(raw: string): { message: string; description?: string } {
  const lines = raw.split('\n');
  const message = lines[0].trim();
  const description = lines.slice(2).join('\n').trim() || undefined;
  return { message, description };
}

/**
 * Fetch commits from the repository.
 * Uses the public GitHub API — no token required for public repos!!   \(•◡•)/
 */
export async function fetchCommits(page = 1, perPage = 30): Promise<GitHubCommit[]> {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/commits?page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.map((item: any): GitHubCommit => {
    const { message, description } = parseCommitMessage(item.commit.message);
    return {
      sha: item.sha,
      shortSha: item.sha.substring(0, 7),
      message,
      description,
      author: item.commit.author.name,
      date: item.commit.author.date,
      url: item.html_url,
    };
  });
}

/**
 * Fetch basic repository stats.
 */
export async function fetchRepoStats(): Promise<RepoStats> {
  const [repoRes, commitsRes] = await Promise.all([
    fetch(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }),
    fetch(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=1`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }),
  ]);

  if (!repoRes.ok) throw new Error('Failed to fetch repo info');

  const repo = await repoRes.json();

  // Extract total commit count from Link header (pagination trick)
  let totalCommits = 1;
  const linkHeader = commitsRes.headers.get('Link');
  if (linkHeader) {
    const lastMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
    if (lastMatch) totalCommits = parseInt(lastMatch[1], 10);
  }

  // Language data
  let languages: RepoStats['languages'] = [];
  try {
    const langRes = await fetch(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/languages`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    });
    if (langRes.ok) {
      const langData = await langRes.json();
      const total = Object.values(langData).reduce((sum: number, val: any) => sum + val, 0) as number;
      const langColors: Record<string, string> = {
        TypeScript: '#3178c6', JavaScript: '#f1e05a', CSS: '#563d7c',
        HTML: '#e34c26', Python: '#3572A5', SCSS: '#c6538c',
        Shell: '#89e051', Dockerfile: '#384d54', HCL: '#844fba',
      };
      languages = Object.entries(langData)
        .map(([name, bytes]: [string, any]) => ({
          name,
          percentage: Math.round((bytes / total) * 100),
          color: langColors[name] || '#8b8b8b',
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 6);
    }
  } catch {
    // Language fetch is non-critical
  }

  return {
    totalCommits,
    totalFiles: repo.size || 0,
    languages,
    lastUpdated: repo.updated_at,
  };
}
