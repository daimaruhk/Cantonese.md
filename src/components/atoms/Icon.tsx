import type { ReactNode } from 'react';

export const Icon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-muted mb-4 grid size-14 place-items-center rounded-xl">
      {children}
    </div>
  );
};
