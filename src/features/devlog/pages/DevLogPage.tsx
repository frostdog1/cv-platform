/* Dev Log — chronological journal of building this platform */

import React, { useEffect, useState } from 'react';
import { DEV_LOG_ENTRIES } from '../content/entries/entries';
import LogEntry from '../components/LogEntry';

const CATEGORIES = [
  { key: 'all',       label: 'All',       color: '#8a8a8a' },
  { key: 'decision',  label: 'Decisions',  color: '#c8ff00' },
  { key: 'problem',   label: 'Problems',   color: '#f59e0b' },
  { key: 'learning',  label: 'Learnings',  color: '#6dd5ed' },
  { key: 'milestone', label: 'Milestones', color: '#a855f7' },
];

const DevLogPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = activeFilter === 'all'
    ? DEV_LOG_ENTRIES
    : DEV_LOG_ENTRIES.filter((e) => e.category === activeFilter);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '80px var(--page-padding) 48px',
        maxWidth: 860,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 50% 60% at 40% 50%, black 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 60% at 40% 50%, black 10%, transparent 60%)',
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.1s`,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
              textTransform: 'uppercase', color: '#f59e0b', marginBottom: 16, fontWeight: 500,
            }}>Dev Log</div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#e8e8e8', marginBottom: 14,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 0.8s ${ease} 0.2s`,
          }}>
            Building Journal
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
            lineHeight: 1.7, color: '#7a7a7a', maxWidth: 560,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.35s`,
          }}>
            Things I broke, things I learned and unfiltered notes from building this site.
          </p>

          {/* Entry count */}
          <div style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: loaded ? 1 : 0,
            transition: `opacity 0.7s ${ease} 0.45s`,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3a3a3a',
            }}>
              {DEV_LOG_ENTRIES.length} entries
            </span>
            <span style={{ color: '#1e1e1e' }}>·</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3a3a3a',
            }}>
              {filtered.length} showing
            </span>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '0 var(--page-padding) 100px',
      }}>

        {/* Category filter tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 32,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(12px)',
          transition: `all 0.7s ${ease} 0.5s`,
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className="filter-btn"
              style={{
                padding: '7px 16px',
                borderRadius: 6,
                border: `1px solid ${activeFilter === cat.key ? cat.color + '44' : '#1e1e1e'}`,
                background: activeFilter === cat.key ? cat.color + '12' : 'transparent',
                color: activeFilter === cat.key ? cat.color : '#5a5a5a',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: 0.3,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Log entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((entry, idx) => (
            <LogEntry
              key={entry.id}
              entry={entry}
              index={idx}
              loaded={loaded}
            />
          ))}
        </div>

        {/* Empty filter state */}
        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }}>📝</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, color: '#4a4a4a',
            }}>No entries in this category yet.</p>
          </div>
        )}
      </div>

      <style>{`
        .filter-btn:hover {
          border-color: #3a3a3a !important;
          color: #aaa !important;
        }
      `}</style>
    </div>
  );
};

export default DevLogPage;
