import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '../components/button';
import { Header } from '../components/header';
import { ladingPageData } from '../lib/landingPageData';
import gauge from '../public/gauge.svg';

const Home: NextPage = () => {
  const { title, subtitle, bullets } = ladingPageData;
  const homepage = process.env.NEXTAUTH_URL;

  return (
    <>
      <div className="mb-8 h-full p-6">
        <div className=" mx-auto  flex max-w-sm  flex-col-reverse gap-10 md:h-full md:max-w-4xl md:flex-row md:items-center">
          <div className="flex max-w-lg flex-col gap-10 ">
            <header className="flex flex-col items-start gap-2">
              <h1 className="text-3xl font-black leading-10 text-yellow-400">{title}</h1>
              <p className="text-lg font-bold leading-8 text-gray-300">{subtitle}</p>
            </header>
            <ul className="flex list-disc flex-col gap-5">
              {bullets.map(item => {
                return (
                  <li key={item} className="ml-3 text-base font-light leading-6">
                    {item}
                  </li>
                );
              })}
            </ul>
            <Button
              intent="primary"
              className="mx-auto mt-4 mb-14 w-72 md:mx-0"
              onClick={() =>
                signIn(undefined, {
                  callbackUrl: `${homepage}/dashboard`,
                })
              }
            >
              Login
            </Button>
          </div>
          <div className="flex justify-center">
            <Image src={gauge} priority alt="image of the workout app gauges" className="w-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
