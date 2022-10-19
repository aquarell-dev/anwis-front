import { FC, PropsWithChildren } from 'react';

export const SidebarContainer: FC<PropsWithChildren> = ({ children }) => <div className='ml-20 mr-8'>{children}</div>;

export const AbsoluteCenteredContainer: FC<PropsWithChildren> = ({ children }) =>
  <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>{children}</div>;