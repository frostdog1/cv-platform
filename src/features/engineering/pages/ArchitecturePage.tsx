/* Engineering page — architecture overview, ADRs, and tech stack */

import React, { useEffect, useState } from 'react';
import { ARCHITECTURE_LAYERS, ADRS, TECH_STACK } from '../content/architecture-data';
import SystemDiagram from '../components/SystemDiagram';
import ADRCard from '../components/ADRCard';
import TechStack from '../components/TechStack';

const ArchitecturePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '80px var(--page-padding) 48px',
        maxWidth: 920,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(109,213,237,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(109,213,237,0.02) 1px, transparent 1px)',
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
              textTransform: 'uppercase', color: '#6dd5ed', marginBottom: 16, fontWeight: 500,
            }}>Engineering</div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#e8e8e8', marginBottom: 14,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 0.8s ${ease} 0.2s`,
          }}>
            Architecture & Decisions
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
            lineHeight: 1.7, color: '#7a7a7a', maxWidth: 600,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.35s`,
          }}>
            How this platform is built and why. System architecture, technology
            choices, and the reasoning behind every major decision — documented
            as Architecture Decision Records.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transition: `opacity 0.7s ${ease} 0.45s`,
          }}>
            {[
              { value: ARCHITECTURE_LAYERS.length, label: 'Layers' },
              { value: ADRS.length, label: 'ADRs' },
              { value: TECH_STACK.length, label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24,
                  color: '#e8e8e8', letterSpacing: -1,
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3a3a3a',
                  letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{
        maxWidth: 920,
        margin: '0 auto',
        padding: '0 var(--page-padding) 100px',
      }}>
        {/* System Diagram */}
        <SystemDiagram layers={ARCHITECTURE_LAYERS} loaded={loaded} />

        {/* ADRs Section */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
            textTransform: 'uppercase', color: '#f59e0b', marginBottom: 20, fontWeight: 500,
          }}>Architecture Decision Records</div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14, color: '#5a5a5a',
            lineHeight: 1.7, marginBottom: 20, maxWidth: 560,
          }}>
            ADRs document the reasoning behind significant technical choices.
            Each records the context, the decision, and the trade-offs — so
            future decisions can be made with full awareness of past reasoning.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ADRS.map((adr, idx) => (
              <ADRCard key={adr.id} adr={adr} index={idx} loaded={loaded} />
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <TechStack items={TECH_STACK} loaded={loaded} />

        {/* Roadmap note */}
        <div style={{
          padding: '24px 28px',
          borderRadius: 10,
          border: '1px solid #1e1e1e',
          background: '#0e0e0e',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
            textTransform: 'uppercase', color: '#3a3a3a', marginBottom: 12, fontWeight: 500,
          }}>What's Next</div>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {[
              { text: 'Docker containerisation with multi-stage builds', status: 'planned' },
              { text: 'GitHub Actions CI/CD with lint, test, and build stages', status: 'planned' },
              { text: 'AWS deployment with Terraform (S3 + CloudFront)', status: 'planned' },
              { text: 'Unit and E2E test coverage', status: 'planned' },
              { text: 'Lighthouse performance budgets in CI', status: 'planned' },
            ].map((item) => (
              <div key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', border: '1px solid #2a2a2a',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, color: '#5a5a5a',
                }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
