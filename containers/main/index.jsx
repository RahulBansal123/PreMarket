import Head from 'next/head';

import Header from '../../components/layout/Header';
import Card from '../../components/card';

const Main = ({ account }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Head>
        <title>PreMarket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container py-4 flex flex-col">
        <div
          className="w-11/12 md:w-full mx-auto py-3 px-5 text-white text-center font-semibold rounded-xl bg-blue-500"
          style={{ backgroundImage: 'url("/assets/images/bg.jpeg")' }}
        >
          <h4>
            PreMarket is the most trusted decentralized information market
            platform where you can bet on highly-debated topics and earn for
            being right.
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Card isEnded id={1} />
          <Card id={1} />
          <Card id={1} />
          <Card id={1} />
        </div>
      </div>
    </div>
  );
};

export default Main;
