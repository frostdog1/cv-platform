/* Displays an Architecture Decision Record with expandable detail */

import React, { useState } from 'react';
import { ADR } from '../types';

interface ADRCardProps {
  adr: ADR;
  index: number;
  loaded: boolean;
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  accepted:   { color: '#10b981', label: 'Accepted' },
  proposed:   { color: '#f59e0b', label: 'Proposed' },
  rejected:   { color: '#f87171', label: 'Rejected' },
  superseded: { color: '#6a6a6a', label: 'Superseded' },
};

const ADRCard: React.FC<ADRCardProps> = ({ adr, index, loaded }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const status = STATUS_CONFIG[adr.status] || STATUS_CONFIG.proposed;

  const formattedDate = new Date(adr.date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: '22px 26px',
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
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 16, marginBottom: 8,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* ADR number + status + date */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
            fontSize: 11, fontFamily: 'var(--font-mono)',
          }}>
            <span style={{
              padding: '2px 8px', borderRadius: 3, background: '#1a1a1a',
              color: '#6a6a6a', fontWeight: 600, letterSpacing: 0.5,
            }}>ADR-{String(adr.number).padStart(3, '0')}</span>
            <span style={{
              padding: '2px 8px', borderRadius: 3,
              background: `${status.color}15`, color: status.color,
              fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 10,
            }}>{status.label}</span>
            <span style={{ color: '#3a3a3a' }}>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
            color: '#e0e0e0', letterSpacing: -0.3, lineHeight: 1.3,
          }}>{adr.title}</h3>
        </div>

        {/* Expand arrow */}
        <div style={{
          fontSize: 16, color: '#3a3a3a',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          flexShrink: 0, marginTop: 4,
        }}>▾</div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: expanded ? 16 : 0 }}>
        {adr.tags.map((tag) => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: 3, fontSize: 11,
            fontFamily: 'var(--font-mono)', color: '#4a4a4a',
            border: '1px solid #1a1a1a', background: '#0a0a0a', letterSpacing: 0.3,
          }}>{tag}</span>
        ))}
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: expanded ? 800 : 0, overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
          {/* Context */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', color: '#4a4a4a', marginBottom: 6, fontWeight: 500,
            }}>Context</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: '#8a8a8a',
            }}>{adr.context}</p>
          </div>

          {/* Decision */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', color: '#6dd5ed', marginBottom: 6, fontWeight: 500,
            }}>Decision</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: '#8a8a8a',
            }}>{adr.decision}</p>
          </div>

          {/* Consequences */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Positive */}
            <div style={{
              padding: '14px 16px', borderRadius: 6,
              borderLeft: '3px solid #10b981', background: '#10b98108',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: '#10b981', marginBottom: 8, fontWeight: 500,
              }}>Positive</div>
              {adr.consequences.positive.map((item, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.7,
                  color: '#7a7a7a', marginBottom: i < adr.consequences.positive.length - 1 ? 6 : 0,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: 6, width: 5, height: 5,
                    borderRadius: '50%', background: '#10b981', opacity: 0.4,
                  }} />
                  {item}
                </p>
              ))}
            </div>

            {/* Negative */}
            <div style={{
              padding: '14px 16px', borderRadius: 6,
              borderLeft: '3px solid #f59e0b', background: '#f59e0b08',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8, fontWeight: 500,
              }}>Trade-offs</div>
              {adr.consequences.negative.map((item, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.7,
                  color: '#7a7a7a', marginBottom: i < adr.consequences.negative.length - 1 ? 6 : 0,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: 6, width: 5, height: 5,
                    borderRadius: '50%', background: '#f59e0b', opacity: 0.4,
                  }} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ADRCard;
