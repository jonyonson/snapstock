// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Container from './Container';
import { handleGoogleSignIn } from '../utils/auth';

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

        <button onClick={handleGoogleSignIn}>Sign In</button>
      </Container>
    </header>
  );
}

export default Header;
