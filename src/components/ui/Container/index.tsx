import React, { FC } from 'react';

export const ContentContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-2 lg:mx-4 xl:mx-8 my-8">{children}</div>
);

export const AbsoluteCenteredContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">{children}</div>
);
