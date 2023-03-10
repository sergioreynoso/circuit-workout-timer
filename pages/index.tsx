import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/button/button';
import mock from '../public/mock.png';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center  gap-5 p-6 sm:gap-10">
        <p className="text-center text-2xl font-black leading-10 text-gray-200 sm:text-4xl">Interval Workout App</p>
        <Image src={mock} priority alt="workout out displayed on an mobile phone" className="w-56 sm:w-72" />
        <Button
          intent="primary"
          onClick={() =>
            signIn(undefined, {
              callbackUrl: `${NEXTAUTH_URL}/dashboard`,
            })
          }
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Home;
