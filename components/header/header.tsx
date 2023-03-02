import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropdownMenu from '../dropdownMenu';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.asPath === '/createWorkout') return null;

  return (
    <div className="flex items-center justify-between bg-gray-800 p-5">
      <h1 className="text-2xl font-bold leading-8 text-gray-100">Interval Workout App</h1>

      <div>
        {session ? (
          <DropdownMenu user={session.user} />
        ) : (
          <button
            className="font-semibold text-gray-300 hover:text-gray-200"
            onClick={() =>
              signIn(undefined, {
                callbackUrl: 'http://localhost:3000/dashboard',
              })
            }
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
