import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/',              label: 'Home' },
  { path: '/cv',            label: 'CV' },
  { path: '/engineering',   label: 'Engineering' },
  { path: '/devlog',        label: 'Dev Log' },
  { path: '/commits',       label: 'Commits' },
  { path: '/contact',       label: 'Contact' },
];

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--page-padding)',
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}>
        {/* Logo / Name */}
        <NavLink to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text-inverse)',
            letterSpacing: -1,
          }}>{'<>'}</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--color-text-primary)',
            letterSpacing: -0.5,
          }}>
            Sean Frost
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }} className="nav-desktop">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              exact={item.path === '/'}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                transition: 'var(--transition-fast)',
                textDecoration: 'none',
                letterSpacing: 0.2,
              }}
              activeStyle={{
                color: 'var(--color-accent)',
                background: 'var(--color-accent-dim)',
              }}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Status indicator — shows the site is "live" */}
          <div style={{
            marginLeft: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid var(--color-border)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e66',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            LIVE
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            padding: 8,
          }}
        >
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--color-text-primary)',
            borderRadius: 1,
            transition: 'var(--transition-fast)',
            transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--color-text-primary)',
            borderRadius: 1,
            transition: 'var(--transition-fast)',
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--color-text-primary)',
            borderRadius: 1,
            transition: 'var(--transition-fast)',
            transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10, 10, 10, 0.97)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          className="animate-fade-in"
        >
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              exact={item.path === '/'}
              style={{
                padding: '16px 32px',
                fontSize: 24,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                letterSpacing: -0.5,
                animationDelay: `${i * 60}ms`,
              }}
              activeStyle={{
                color: 'var(--color-accent)',
              }}
              className="animate-fade-up"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Responsive + hover styles */}
      <style>{`
        .nav-desktop a:hover {
          color: var(--color-text-primary) !important;
          background: var(--color-bg-hover) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navigation;
