import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { handleGoogleSignIn } from '../utils/auth';
import SnapstockLogo from '../assets/snapstock.svg';
import UserDropdown from './UserDropdown';

function Header() {
  const { data, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  console.log({ status });
  console.log({ data });

  return (
    <header>
      <Container>
        <div className="flex w-full justify-between">
          <Link href="/">
            <a>
              <Image src={SnapstockLogo} width="180" alt="" />
            </a>
          </Link>

          {isAuthenticated ? (
            <UserDropdown data={data} />
          ) : (
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
