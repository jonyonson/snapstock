import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { handleGoogleSignIn } from '../utils/auth';
import SnapstockLogo from '../assets/snapstock.svg';
import UserDropdown from './UserDropdown';

function Header() {
  const { data, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  console.log({ status });
  console.log({ data });

  return (
    <header className="container flex w-full justify-between py-4">
      <Link href="/">
        <a>
          <Image src={SnapstockLogo} width="180" alt="" />
        </a>
      </Link>

      {isAuthenticated ? (
        <UserDropdown data={data} />
      ) : (
        <button className="btn btn-ghost" onClick={handleGoogleSignIn}>
          Sign In
        </button>
      )}
    </header>
  );
}

export default Header;
