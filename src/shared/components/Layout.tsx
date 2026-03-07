import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
