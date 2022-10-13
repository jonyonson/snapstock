import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AUTHENTICATED_ROUTES, AUTH_STATUS } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === AUTH_STATUS.LOADING) {
    return null;
  }

  return (
    <>
      {AUTHENTICATED_ROUTES.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
