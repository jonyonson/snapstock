import React from 'react';

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl my-2 flex justify-between mx-auto">
      {children}
    </div>
  );
}
export default Container;
