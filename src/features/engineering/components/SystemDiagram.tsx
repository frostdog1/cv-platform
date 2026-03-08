/* Visual system architecture diagram built with styled divs */

import React, { useState } from 'react';
import { ArchitectureLayer } from '../types';

interface SystemDiagramProps {
  layers: ArchitectureLayer[];
  loaded: boolean;
}

const SystemDiagram: React.FC<SystemDiagramProps> = ({ layers, loaded }) => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
        textTransform: 'uppercase', color: '#6dd5ed', marginBottom: 20, fontWeight: 500,
      }}>System Architecture</div>

      {/* Diagram container */}
      <div style={{
        border: '1px solid #1e1e1e',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#0c0c0c',
      }}>
        {/* Header bar */}
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid #1e1e1e',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
          <span style={{
            marginLeft: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3a3a3a',
          }}>architecture.diagram</span>
        </div>

        {/* Layers */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {layers.map((layer, idx) => (
            <div
              key={layer.name}
              onMouseEnter={() => setActiveLayer(idx)}
              onMouseLeave={() => setActiveLayer(null)}
              style={{
                padding: '18px 22px',
                borderRadius: 8,
                border: `1px solid ${activeLayer === idx ? layer.color + '44' : '#1a1a1a'}`,
                background: activeLayer === idx ? layer.color + '08' : '#0e0e0e',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${0.3 + idx * 0.08}s`,
              }}
            >
              {/* Layer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: activeLayer === idx ? 12 : 0,
                transition: 'margin 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 2,
                    background: layer.color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
                    color: '#e0e0e0', letterSpacing: -0.3,
                  }}>{layer.name}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3a3a3a',
                }}>{layer.components.length} components</span>
              </div>

              {/* Expanded content */}
              <div style={{
                maxHeight: activeLayer === idx ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, color: '#7a7a7a',
                  lineHeight: 1.6, marginBottom: 12,
                }}>{layer.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {layer.components.map((comp) => (
                    <span key={comp} style={{
                      padding: '4px 12px', borderRadius: 4, fontSize: 11,
                      fontFamily: 'var(--font-mono)', color: layer.color,
                      border: `1px solid ${layer.color}22`,
                      background: `${layer.color}08`, letterSpacing: 0.3,
                    }}>{comp}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Connection arrows */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 0, margin: '-4px 0',
          }}>
            {layers.slice(0, -1).map((_, idx) => (
              <div key={idx} style={{
                width: 1, height: 0, background: '#2a2a2a',
              }} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid #1a1a1a',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2a2a2a',
        }}>
          <span>cv-platform v1.0</span>
          <span>hover layers to explore</span>
        </div>
      </div>
    </div>
  );
};

export default SystemDiagram;
