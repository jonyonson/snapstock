import React from 'react';

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-2 mx-auto flex max-w-3xl justify-between px-4">
      {children}
    </div>
  );
}
export default Container;
