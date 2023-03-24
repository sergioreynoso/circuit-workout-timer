import type { NextPage } from 'next';
import Image from 'next/image';
import { Header } from '../components/header';
import mock from '../public/mock.png';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center  gap-5 p-6 sm:gap-10">
          <Image src={mock} priority alt="workout out displayed on an mobile phone" className="w-56 sm:w-72" />
        </div>
      </div>
    </>
  );
};

export default Home;
