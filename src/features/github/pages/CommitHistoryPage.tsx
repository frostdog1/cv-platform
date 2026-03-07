import React, { useEffect, useState } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';
import RepoStats from '../components/RepoStats';
import CommitTimeline from '../components/CommitTimeline';

/* ═══════════════════════════════════════════════════
   Commit History Page
   Live feed from the GitHub API showing real commits.
   ═══════════════════════════════════════════════════ */

const CommitHistoryPage: React.FC = () => {
  const { commits, groups, stats, loading, error, loadMore, hasMore } = useGitHubData();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '80px var(--page-padding) 48px',
        maxWidth: 1000,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 50% 60% at 40% 50%, black 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 60% at 40% 50%, black 10%, transparent 60%)',
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{
            opacity: pageLoaded ? 1 : 0,
            transform: pageLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.1s`,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
              textTransform: 'uppercase', color: '#a855f7', marginBottom: 16, fontWeight: 500,
            }}>Commit History</div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#e8e8e8', marginBottom: 14,
            opacity: pageLoaded ? 1 : 0,
            transform: pageLoaded ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 0.8s ${ease} 0.2s`,
          }}>
            Building in Public
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
            lineHeight: 1.7, color: '#7a7a7a', maxWidth: 600, marginBottom: 0,
            opacity: pageLoaded ? 1 : 0,
            transform: pageLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.35s`,
          }}>
            Every commit that built this site — pulled live from GitHub.
            No curation, no cherry-picking. Full transparency.
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: '0 var(--page-padding) 100px',
      }}>
        {/* Loading state */}
        {loading && commits.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '80px 0', gap: 16,
          }}>
            <div style={{
              width: 32, height: 32, border: '2px solid #1e1e1e',
              borderTopColor: '#a855f7', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3a3a3a',
              letterSpacing: 1,
            }}>Fetching commits...</span>
          </div>
        )}

        {/* Error state */}
        {error && commits.length === 0 && (
          <div style={{
            padding: '40px 24px', borderRadius: 8,
            border: '1px solid #3a1a1a', background: '#1a0e0e',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: '#f87171',
              marginBottom: 8,
            }}>API Error</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, color: '#7a4a4a',
              lineHeight: 1.6,
            }}>{error}</p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4a3a3a',
              marginTop: 12,
            }}>
              GitHub API may be rate-limited (60 req/hr for unauthenticated requests).
              Try again in a few minutes.
            </p>
          </div>
        )}

        {/* Stats banner */}
        {stats && !loading && (
          <div style={{
            opacity: pageLoaded ? 1 : 0,
            transform: pageLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.5s`,
          }}>
            <RepoStats stats={stats} commitCount={commits.length} />
          </div>
        )}

        {/* Commit timeline */}
        {groups.length > 0 && (
          <CommitTimeline groups={groups} loaded={pageLoaded} />
        )}

        {/* Load more */}
        {hasMore && commits.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              onClick={loadMore}
              disabled={loading}
              className="load-more-btn"
              style={{
                padding: '12px 32px', borderRadius: 6,
                border: '1px solid #1e1e1e', background: '#111',
                color: loading ? '#3a3a3a' : '#8a8a8a',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 13, cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.2s', letterSpacing: 0.3,
              }}
            >
              {loading ? 'Loading...' : 'Load More Commits'}
            </button>
          </div>
        )}

        {/* Empty state (no commits yet) */}
        {!loading && !error && commits.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '80px 0',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.4 }}>🔀</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, color: '#4a4a4a',
            }}>No commits found. Push a commit you fool Mr Frost!!!</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .load-more-btn:hover:not(:disabled) {
          border-color: #3a3a3a !important;
          color: #c0c0c0 !important;
          background: #161616 !important;
        }
      `}</style>
    </div>
  );
};

export default CommitHistoryPage;
