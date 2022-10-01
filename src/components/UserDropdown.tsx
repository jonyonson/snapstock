import Image from 'next/image';
import { Session } from 'next-auth';
import Link from 'next/link';
import { handleSignOut } from '../utils/auth';

// Icons
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';

function UserDropdown({ data }: { data: Session | null }) {
  const initials = userInitials(data?.user?.name);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {data?.user?.image ? (
            <Image height={48} width={48} src={data.user.image} alt="" />
          ) : (
            <div className="bg-primary flex h-10 w-10 items-center justify-center">
              <span className="text-xl tracking-wider text-white">
                {initials}
              </span>
            </div>
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content bg-base-100 rounded-box w-44 p-2 shadow"
      >
        <li>
          <Link href="/profile">
            <div className="flex justify-between">
              <FaRegEdit size={20} />
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <div className="divider mb-0 mt-0" />
        <li>
          <div className="flex justify-between" onClick={handleSignOut}>
            <IoExitOutline size={20} />
            <span>Sign Out</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

function userInitials(name: string | null | undefined) {
  if (!name) return '';

  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  const initials = [...name.matchAll(rgx)] || [];

  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
}

export default UserDropdown;
