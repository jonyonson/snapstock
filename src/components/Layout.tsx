import React from 'react';
import Header from './Header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      <main className="container my-2">{children}</main>
    </div>
  );
}
export default Layout;
