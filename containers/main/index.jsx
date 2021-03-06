import Head from 'next/head';
import { useEffect, useState } from 'react';

import Header from '../../components/layout/Header';
import Card from '../../components/card';

const Main = ({ account, marketContract }) => {
  const [markets, setMarkets] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getMarkets = async () => {
      const totalGroups = await marketContract.methods
        .totalInformation()
        .call();

      const owner = await marketContract.methods
        .isOwner()
        .call({ from: account });
      setIsOwner(owner);

      const data = [];

      for (let i = 1; i <= totalGroups; i++) {
        const group = await marketContract.methods.informations(i).call();
        data.push(group);
      }
      setMarkets(data);
    };
    if (marketContract) getMarkets();
  }, [marketContract]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Head>
        <title>PreMarket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isOwner={isOwner} />
      <div className="container py-4 flex flex-col">
        <div
          className="w-11/12 md:w-full mx-auto py-3 px-5 text-white text-center font-semibold rounded-xl bg-[#031b34]"
          style={{ backgroundImage: 'url("/assets/images/bg.jpeg")' }}
        >
          <h4>
            PreMarket is the most trusted decentralized information market
            platform where you can bet on highly-debated topics and earn for
            being right.
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {markets.map((market) => (
            <Card market={market} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
