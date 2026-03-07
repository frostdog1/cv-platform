import React from 'react';
import { RepoStats as RepoStatsType } from '../types';

interface RepoStatsProps {
  stats: RepoStatsType;
  commitCount: number;
}

const RepoStats: React.FC<RepoStatsProps> = ({ stats, commitCount }) => {
  const repoUrl = 'https://github.com/frostdog1/cv-platform';

  // function to get the dateStr into a readable format for the latest commits
  const timeSince = (dateStr: string): string => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000); // Calculate what 1 second is from Milliseconds
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`; // returns something like 5m ago
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`; // returns something like 3h ago
    return `${Math.floor(seconds / 86400)}d ago`; // returns something like 2d ago (divide seconds by 86400 to get the days)
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 12,
      marginBottom: 40,
    }}>
      {/* Total Commits */}
      <div style={{
        padding: '18px 20px',
        borderRadius: 8,
        border: '1px solid #1e1e1e',
        background: '#111',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#3a3a3a',
          marginBottom: 8,
        }}>Total Commits</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 28,
          color: '#c8ff00',
          letterSpacing: -1,
        }}>{commitCount}</div>
      </div>

      {/* Languages */}
      <div style={{
        padding: '18px 20px',
        borderRadius: 8,
        border: '1px solid #1e1e1e',
        background: '#111',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#3a3a3a',
          marginBottom: 10,
        }}>Languages</div>
        {/* Language bar */}
        <div style={{
          display: 'flex',
          height: 6,
          borderRadius: 3,
          overflow: 'hidden',
          marginBottom: 8,
        }}>
          {stats.languages.map((lang) => (
            <div key={lang.name} style={{
              width: `${lang.percentage}%`,
              background: lang.color,
              minWidth: 3,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
          {stats.languages.slice(0, 4).map((lang) => (
            <span key={lang.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: '#6a6a6a',
              fontFamily: 'var(--font-body)',
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: lang.color,
                flexShrink: 0,
              }} />
              {lang.name}
              <span style={{ color: '#3a3a3a', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                {lang.percentage}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Last Updated + Repo Link */}
      <div style={{
        padding: '18px 20px',
        borderRadius: 8,
        border: '1px solid #1e1e1e',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#3a3a3a',
            marginBottom: 8,
          }}>Last Updated</div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 500,
            color: '#aaa',
          }}>{timeSince(stats.lastUpdated)}</div>
        </div>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 12,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: '#6a6a6a',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          {/* GitHub logo svg created via Figma */}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View Source
        </a>
      </div>

      <style>{`
        .repo-link:hover { color: #c8ff00 !important; }
      `}</style>
    </div>
  );
};

export default RepoStats;
