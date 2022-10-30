import React, { FC } from 'react';

export const SidebarContainer: FC<{ children: React.ReactNode }> = ({ children }) => <div className='ml-20 mr-8'>{children}</div>;

export const AbsoluteCenteredContainer: FC<{ children: React.ReactNode }> = ({ children }) =>
  <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>{children}</div>;