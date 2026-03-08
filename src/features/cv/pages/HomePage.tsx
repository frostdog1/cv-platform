import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Animated Grid Background ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 70%)',
      }} />

      {/* ── Gradient orb (top-right) ── */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 var(--page-padding)',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Status line */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s var(--ease-out-expo)',
          transitionDelay: '0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 32,
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px rgba(200,255,0,0.4)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--color-text-muted)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            Available for opportunities
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 8vw, 96px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          marginBottom: 0,
        }}>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s var(--ease-out-expo)',
            transitionDelay: '0.35s',
          }}>
            Software
          </span>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s var(--ease-out-expo)',
            transitionDelay: '0.45s',
          }}>
            Engineer<span style={{ color: 'var(--color-accent)' }}>.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          maxWidth: 540,
          marginTop: 28,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s var(--ease-out-expo)',
          transitionDelay: '0.6s',
        }}>
          Building production systems with intent. This site is its own
          portfolio — every line of infrastructure, every pipeline stage,
          every architectural decision is documented and verifiable.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 48,
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s var(--ease-out-expo)',
          transitionDelay: '0.75s',
        }}>
          <Link to="/cv" className="cta-primary" style={{
            padding: '14px 32px',
            background: 'var(--color-accent)',
            color: 'var(--color-text-inverse)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 8,
            letterSpacing: 0.3,
            textDecoration: 'none',
            transition: 'var(--transition-fast)',
          }}>
            View CV
          </Link>
          <Link to="/engineering" className="cta-secondary" style={{
            padding: '14px 32px',
            background: 'transparent',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            letterSpacing: 0.3,
            textDecoration: 'none',
            transition: 'var(--transition-fast)',
          }}>
            Explore Architecture
          </Link>
        </div>

        {/* ── Stats row ── */}
        <div style={{
          display: 'flex',
          gap: 48,
          marginTop: 80,
          paddingTop: 40,
          borderTop: '1px solid var(--color-border)',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s var(--ease-out-expo)',
          transitionDelay: '0.9s',
        }}>
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '98+', label: 'Lighthouse Score' },
            { value: '<£2', label: 'Monthly Infra Cost' },
            { value: '100%', label: 'Infrastructure as Code' },
          ].map((stat, i) => (
            <div key={i} style={{ minWidth: 100 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 28,
                color: 'var(--color-text-primary)',
                letterSpacing: -1,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--color-text-muted)',
                marginTop: 4,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tech stack pills ── */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginTop: 40,
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s var(--ease-out-expo)',
          transitionDelay: '1.05s',
        }}>
          {['React', 'TypeScript', 'Docker', 'AWS', 'Terraform', 'GitHub Actions', 'Ionic'].map((tech) => (
            <span key={tech} style={{
              padding: '6px 14px',
              borderRadius: 4,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-elevated)',
              letterSpacing: 0.3,
            }}>{tech}</span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ──
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: loaded ? 0.4 : 0,
        transition: 'opacity 1s var(--ease-out-expo)',
        transitionDelay: '1.5s',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--color-text-muted)',
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: 1,
          height: 32,
          background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div> */}

      {/* Hover styles + keyframes */}
      <style>{`
        .cta-primary:hover {
          background: var(--color-accent-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(200,255,0,0.2);
        }
        .cta-secondary:hover {
          border-color: var(--color-text-muted) !important;
          background: var(--color-bg-hover) !important;
          transform: translateY(-1px);
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); transform-origin: top; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
