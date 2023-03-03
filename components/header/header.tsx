import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DropdownMenu from '../dropdownMenu';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.asPath === '/createWorkout') return null;

  return (
    <header className="flex items-center justify-between bg-gray-800 p-5">
      <h1 className="text-2xl font-bold leading-8 text-gray-100">Interval Workout App</h1>
      <nav>
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
            Log In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
