import React from 'react';
import Header from './Header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container my-2">{children}</main>
    </>
  );
}
export default Layout;
