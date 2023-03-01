import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropdownMenu from '../dropdownMenu';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.asPath === '/createWorkout') return null;

  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() =>
          signIn(undefined, {
            callbackUrl: 'http://localhost:3000/dashboard',
          })
        }
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 p-5">
      <Link href={'/'}>
        <h1 className="text-2xl font-extrabold leading-8 text-gray-100">Workout Timer</h1>
      </Link>
      <div>
        {/* <Link href={'/dashboard'}>Workouts</Link> */}
        {session ? <DropdownMenu user={session.user} /> : null}
      </div>
    </div>
  );
};

export default Header;
