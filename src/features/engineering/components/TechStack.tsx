/* Displays the project tech stack grouped by category */

import React from 'react';
import { TechItem } from '../types';

interface TechStackProps {
  items: TechItem[];
  loaded: boolean;
}

const CATEGORY_CONFIG: Record<string, { color: string; label: string }> = {
  frontend:       { color: '#c8ff00', label: 'Frontend' },
  backend:        { color: '#6dd5ed', label: 'Backend' },
  infrastructure: { color: '#f59e0b', label: 'Infrastructure' },
  testing:        { color: '#a855f7', label: 'Testing' },
  tooling:        { color: '#10b981', label: 'Tooling' },
};

const TechStack: React.FC<TechStackProps> = ({ items, loaded }) => {
  const grouped = items.reduce<Record<string, TechItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryOrder = ['frontend', 'backend', 'infrastructure', 'testing', 'tooling'];

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
        textTransform: 'uppercase', color: '#10b981', marginBottom: 20, fontWeight: 500,
      }}>Tech Stack</div>

      {categoryOrder.map((catKey) => {
        const catItems = grouped[catKey];
        if (!catItems) return null;
        const cat = CATEGORY_CONFIG[catKey];

        return (
          <div key={catKey} style={{ marginBottom: 24 }}>
            {/* Category header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 2, background: cat.color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                color: cat.color, letterSpacing: 0.5, textTransform: 'uppercase',
              }}>{cat.label}</span>
              <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
            </div>

            {/* Items grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 8,
            }}>
              {catItems.map((item, idx) => (
                <div
                  key={item.name}
                  className="tech-card"
                  style={{
                    padding: '14px 18px',
                    borderRadius: 8,
                    border: '1px solid #1a1a1a',
                    background: '#0e0e0e',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${0.4 + idx * 0.04}s`,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                    color: '#d0d0d0', marginBottom: 4,
                  }}>
                    {item.name}
                    {item.url && (
                      <span style={{ color: '#3a3a3a', fontSize: 11, marginLeft: 6 }}>↗</span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, color: '#5a5a5a', lineHeight: 1.5,
                  }}>{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        .tech-card:hover {
          border-color: #2a2a2a !important;
          background: #121212 !important;
        }
      `}</style>
    </div>
  );
};

export default TechStack;
