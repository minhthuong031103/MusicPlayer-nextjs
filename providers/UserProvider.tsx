'use client';

import { MyUserContextProvider } from '@/hooks/useUser';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = function ({ children }: UserProviderProps) {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
export default UserProvider;
