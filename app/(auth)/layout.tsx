import { FC, ReactNode } from 'react';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect('/');

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
