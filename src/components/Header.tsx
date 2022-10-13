import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Components
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

// Images
import SnapstockLogo from './SnapstockLogo';

// Utils
import { handleGoogleSignIn } from '../utils/auth';

// Constants
import { AUTH_STATUS } from '../utils/constants';

function Header() {
  const { data, status } = useSession();
  const isAuthenticated = status === AUTH_STATUS.AUTHENTICATED;

  return (
    <div className="navbar bg-base-200 app-header">
      <div className="container flex justify-between">
        <Link href="/">
          <SnapstockLogo className="logo" />
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
