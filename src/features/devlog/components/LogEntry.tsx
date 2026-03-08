/* Renders a single dev log entry with expandable content, pulled from content folder*/

import React, { useState } from 'react';
import { DevLogEntry } from '../types';

interface LogEntryProps {
  entry: DevLogEntry;
  index: number;
  loaded: boolean;
}

const CATEGORY_CONFIG: Record<string, { color: string; label: string; icon: string }> = {
  decision: { color: '#c8ff00', label: 'Decision', icon: '◆' },
  problem:  { color: '#f59e0b', label: 'Problem',  icon: '●' },
  learning: { color: '#6dd5ed', label: 'Learning', icon: '▸' },
  milestone:{ color: '#a855f7', label: 'Milestone',icon: '✦' },
  setup:    { color: '#10b981', label: 'Setup',    icon: '▲' },
};

const LogEntry: React.FC<LogEntryProps> = ({ entry, index, loaded }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_CONFIG[entry.category] || CATEGORY_CONFIG.learning;

  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: '24px 28px',
        borderRadius: 10,
        border: `1px solid ${hovered ? '#2a2a2a' : '#1a1a1a'}`,
        background: hovered ? '#121212' : '#0e0e0e',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(16px)',
        transitionDelay: `${0.15 + index * 0.06}s`,
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Category + Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{
              padding: '2px 8px',
              borderRadius: 3,
              background: `${cat.color}15`,
              color: cat.color,
              fontWeight: 500,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontSize: 10,
            }}>
              {cat.icon} {cat.label}
            </span>
            <span style={{ color: '#3a3a3a' }}>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 18,
            color: '#e0e0e0',
            letterSpacing: -0.3,
            lineHeight: 1.3,
            marginBottom: 6,
          }}>
            {entry.title}
          </h3>

          {/* Summary */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: '#7a7a7a',
            lineHeight: 1.6,
          }}>
            {entry.summary}
          </p>
        </div>

        {/* Expanding/responsivity */}
        <div style={{
          fontSize: 16,
          color: '#3a3a3a',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          flexShrink: 0,
          marginTop: 4,
        }}>
          ▾
        </div>
      </div>

      {/* Tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: expanded ? 20 : 0,
      }}>
        {entry.tags.map((tag) => (
          <span key={tag} style={{
            padding: '3px 10px',
            borderRadius: 3,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: '#4a4a4a',
            border: '1px solid #1a1a1a',
            background: '#0a0a0a',
            letterSpacing: 0.3,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable body */}
      <div style={{
        maxHeight: expanded ? 800 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          paddingTop: 16,
          borderTop: '1px solid #1a1a1a',
        }}>
          {entry.body.map((paragraph, pi) => (
            <p key={pi} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              lineHeight: 1.8,
              color: '#8a8a8a',
              marginBottom: pi === entry.body.length - 1 && !entry.lessonLearned ? 0 : 14,
            }}>
              {paragraph}
            </p>
          ))}

          {/* Lesson learned callout */}
          {entry.lessonLearned && (
            <div style={{
              marginTop: 8,
              padding: '14px 18px',
              borderRadius: 6,
              borderLeft: `3px solid ${cat.color}`,
              background: `${cat.color}08`,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: cat.color,
                marginBottom: 6,
                fontWeight: 500,
              }}>
                Lesson Learned
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.7,
                color: '#9a9a9a',
              }}>
                {entry.lessonLearned}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default LogEntry;
