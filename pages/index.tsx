import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '../components/button';
import { ladingPageData } from '../lib/landingPageData';
import hero from '../public/hero.png';

const Home: NextPage = () => {
  const { title, subtitle, bullets } = ladingPageData;
  const homepage = process.env.NEXTAUTH_URL;

  return (
    <>
      <div className="flex h-full flex-col items-center overflow-auto py-8 px-8 lg:flex-row lg:items-center lg:justify-center">
        <div className="max-w-lg">
          <Image src={hero} priority={true} alt="image of the workout app gauges" className=" md:translate-y-8" />
        </div>
        <div className="flex max-w-lg flex-col items-start gap-8">
          <header className="">
            <h1 className="mb-4 text-2xl font-black leading-10 text-yellow-400">{title}</h1>
            <p className="text-lg font-bold leading-8 text-gray-300">{subtitle}</p>
          </header>
          <ul className="flex list-disc flex-col gap-4">
            {bullets.map(item => {
              return (
                <li key={item} className="text-lg font-light leading-6">
                  {item}
                </li>
              );
            })}
          </ul>
          <Button
            intent="primary"
            className="w-full"
            onClick={() =>
              signIn(undefined, {
                callbackUrl: `${homepage}/dashboard`,
              })
            }
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
