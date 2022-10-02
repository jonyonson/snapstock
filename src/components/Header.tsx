import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Components
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';

// Utils
import { handleGoogleSignIn } from '../utils/auth';

// Images
import SnapstockLogo from '../assets/snapstock.svg';
import Search from './Search';

function Header() {
  const { data, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <div className="navbar bg-base-200">
      <div className="container flex justify-between">
        <Link href="/">
          <a>
            <Image src={SnapstockLogo} width="180" alt="" />
          </a>
        </Link>

        <Search placeholder="Search" className="flex-1" />

        <div className="flex">
          <ThemeToggle className="mr-2" />

          {isAuthenticated ? (
            <UserDropdown data={data} />
          ) : (
            <button className="btn btn-ghost" onClick={handleGoogleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
