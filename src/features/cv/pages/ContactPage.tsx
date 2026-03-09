/* Contact page — form, social links, and availability status */

import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sean-frost-software/',
    color: '#0a66c2',
    /* LinkedIn SVG icon */
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/frostdog1',
    color: '#8a8a8a',
    /* GitHub SVG icon */
    icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
  },
  {
    name: 'Email',
    url: 'frostsean35@gmail.com',
    color: '#10b981',
    /* Mail SVG icon */
    icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
  },
];

const ContactPage: React.FC = () => {
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
        maxWidth: 860,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(16,185,129,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.02) 1px, transparent 1px)',
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
              textTransform: 'uppercase', color: '#10b981', marginBottom: 16, fontWeight: 500,
            }}>Contact</div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#e8e8e8', marginBottom: 14,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 0.8s ${ease} 0.2s`,
          }}>
            Get in Touch
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
            lineHeight: 1.7, color: '#7a7a7a', maxWidth: 500,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.7s ${ease} 0.35s`,
          }}>
            Interested in working together or have a question about
            the architecture behind this site? Drop me a message.
          </p>
        </div>
      </header>

      {/* ── Content: Two-column layout ── */}
      <div className="contact-layout" style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '0 var(--page-padding) 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: 56,
      }}>
        {/* Left: Form */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: `all 0.7s ${ease} 0.45s`,
        }}>
          <ContactForm />
        </div>

        {/* Right: Sidebar */}
        <aside style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: `all 0.7s ${ease} 0.55s`,
        }}>
          {/* Availability status */}
          <div style={{
            padding: '20px 22px', borderRadius: 10,
            border: '1px solid #1e1e1e', background: '#0e0e0e',
            marginBottom: 20,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 8px #22c55e66',
                animation: 'contactPulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5,
                textTransform: 'uppercase', color: '#22c55e', fontWeight: 500,
              }}>Available</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#6a6a6a',
              lineHeight: 1.6,
            }}>
              Open to full-time roles, contract work, and consulting
              opportunities in software engineering.
            </p>
          </div>

          {/* Social links */}
          <div style={{
            padding: '20px 22px', borderRadius: 10,
            border: '1px solid #1e1e1e', background: '#0e0e0e',
            marginBottom: 20,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', color: '#3a3a3a', marginBottom: 14, fontWeight: 500,
            }}>Find Me</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 6,
                    border: '1px solid #1a1a1a', background: 'transparent',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  <svg width={link.name === 'Email' ? 20 : 16} height={link.name === 'Email' ? 20 : 16}
                    viewBox={link.name === 'Email' ? '0 0 20 20' : link.name === 'LinkedIn' ? '0 0 24 24' : '0 0 16 16'}
                    fill={link.color}>
                    <path d={link.icon} />
                  </svg>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 13,
                    fontWeight: 500, color: '#aaa',
                  }}>{link.name}</span>
                  <span style={{
                    marginLeft: 'auto', fontSize: 12, color: '#2a2a2a',
                  }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Response time */}
          <div style={{
            padding: '20px 22px', borderRadius: 10,
            border: '1px solid #1e1e1e', background: '#0e0e0e',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', color: '#3a3a3a', marginBottom: 10, fontWeight: 500,
            }}>Response Time</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#6a6a6a',
              lineHeight: 1.6,
            }}>
              I typically respond within 24 hours during the working week.
            </p>
          </div>
        </aside>
      </div>

      <style>{`
        .social-link:hover { border-color: #2a2a2a !important; background: #111 !important; }
        @keyframes contactPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 700px) { .contact-layout { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </div>
  );
};

export default ContactPage;
