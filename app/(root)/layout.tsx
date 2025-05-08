import { FC, ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('sign-in');

  return (
    <div className="root-layout">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
