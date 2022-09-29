// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Container from './Container';
import { handleGoogleSignIn, handleSignOut } from '../utils/auth';

function Header() {
  const { data, status } = useSession();

  console.log({ status });
  console.log({ data });

  return (
    <header className="">
      <Container>
        <Link href="/">
          <h1 className="cursor-pointer">Snapstock</h1>
        </Link>

        <AuthButton status={status} />
      </Container>
    </header>
  );
}

function AuthButton({ status }: { status: string }) {
  const isAuthenticated = status === 'authenticated';

  return isAuthenticated ? (
    <button className="btn" onClick={handleSignOut}>
      Sign Out
    </button>
  ) : (
    <button className="btn" onClick={handleGoogleSignIn}>
      Sign In
    </button>
  );
}

export default Header;
