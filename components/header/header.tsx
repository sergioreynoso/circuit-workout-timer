import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '../button';
import DropdownMenu from '../dropdownMenu';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const homepage = process.env.NEXTAUTH_URL;
  if (router.asPath === '/createWorkout') return null;

  return (
    <header className="flex items-center justify-between bg-gray-800 py-3 pr-3 pl-8">
      <h1 className="text-2xl font-bold leading-8 text-gray-100">Interval Workout App</h1>
      <nav>
        {session ? (
          <DropdownMenu user={session.user} />
        ) : (
          <Button
            intent="primary"
            onClick={() =>
              signIn(undefined, {
                callbackUrl: `${homepage}/dashboard`,
              })
            }
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
