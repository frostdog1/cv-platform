import React from 'react';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: string;
  accentColor?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  icon,
  accentColor = 'var(--color-accent)',
}) => {
  return (
    <div style={{
      minHeight: 'calc(100vh - var(--nav-height))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--page-padding)',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Background subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(200,255,0,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,255,0,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 40% 40% at 50% 50%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 40% 40% at 50% 50%, black 20%, transparent 70%)',
      }} />

      <div style={{ position: 'relative' }} className="animate-fade-up">
        {/* Icon */}
        <div style={{
          fontSize: 48,
          marginBottom: 24,
          filter: 'grayscale(0.5)',
        }}>{icon}</div>

        {/* Section label */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: accentColor,
          marginBottom: 16,
        }}>
          Under Construction
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 300,
          color: 'var(--color-text-secondary)',
          maxWidth: 440,
          lineHeight: 1.7,
          margin: '0 auto',
        }}>
          {subtitle}
        </p>

        {/* Progress bar */}
        <div style={{
          marginTop: 40,
          width: 200,
          height: 3,
          background: 'var(--color-border)',
          borderRadius: 2,
          overflow: 'hidden',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            width: '30%',
            height: '100%',
            background: accentColor,
            borderRadius: 2,
            animation: 'progressPulse 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes progressPulse {
          0%, 100% { width: 20%; opacity: 0.6; }
          50% { width: 45%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PlaceholderPage;
