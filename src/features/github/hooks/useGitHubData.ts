/* ══════════════════════════════════════════════════
   Manages commit fetching, loading states, and
   groups commits by date for timeline display.
   ═══════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from 'react';
import { GitHubCommit, CommitGroup, RepoStats } from '../types';
import { fetchCommits, fetchRepoStats } from '../api/github';

/**
 * Group an array of commits by their date (YYYY-MM-DD).
 * Returns groups with a readable label.
 */
function groupCommitsByDate(commits: GitHubCommit[]): CommitGroup[] {
  const groups: Map<string, GitHubCommit[]> = new Map();

  commits.forEach((commit) => {
    const dateKey = new Date(commit.date).toISOString().split('T')[0];
    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }
    groups.get(dateKey)!.push(commit);
  });

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  return Array.from(groups.entries()).map(([dateKey, commits]) => {
    let label: string;
    if (dateKey === today) {
      label = 'Today';
    } else if (dateKey === yesterday) {
      label = 'Yesterday';
    } else {
      label = new Date(dateKey + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    return { date: dateKey, label, commits };
  });
}

/**
 * Parse a conventional commit prefix into a category.
 */
export function getCommitType(message: string): {
  type: string;
  color: string;
  icon: string;
} {
  const lower = message.toLowerCase();
  if (lower.startsWith('feat'))     return { type: 'feature',  color: '#c8ff00', icon: '✦' };
  if (lower.startsWith('fix'))      return { type: 'fix',      color: '#f59e0b', icon: '●' };
  if (lower.startsWith('style'))    return { type: 'style',    color: '#a855f7', icon: '◆' };
  if (lower.startsWith('refactor')) return { type: 'refactor', color: '#6dd5ed', icon: '↻' };
  if (lower.startsWith('docs'))     return { type: 'docs',     color: '#10b981', icon: '▸' };
  if (lower.startsWith('ci'))       return { type: 'ci',       color: '#f472b6', icon: '⚡' };
  if (lower.startsWith('infra'))    return { type: 'infra',    color: '#fb923c', icon: '▲' };
  if (lower.startsWith('test'))     return { type: 'test',     color: '#2dd4bf', icon: '◎' };
  return { type: 'other', color: '#6a6a6a', icon: '•' };
}

interface UseGitHubDataReturn {
  commits: GitHubCommit[];
  groups: CommitGroup[];
  stats: RepoStats | null;
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

export function useGitHubData(): UseGitHubDataReturn {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [commitData, statsData] = await Promise.all([
          fetchCommits(1, 20),
          fetchRepoStats(),
        ]);
        if (!cancelled) {
          setCommits(commitData);
          setStats(statsData);
          setHasMore(commitData.length === 20);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Load more
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const moreCommits = await fetchCommits(nextPage, 20);
      setCommits((prev) => [...prev, ...moreCommits]);
      setPage(nextPage);
      setHasMore(moreCommits.length === 20);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const groups = groupCommitsByDate(commits);

  return { commits, groups, stats, loading, error, loadMore, hasMore };
}
