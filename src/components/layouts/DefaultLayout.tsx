import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
