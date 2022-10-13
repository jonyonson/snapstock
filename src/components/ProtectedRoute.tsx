import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AUTH_STATUS } from '../utils/constants';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      router.push('/');
    }
  }, [router, status]);

  if (status === AUTH_STATUS.UNAUTHENTICATED) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
