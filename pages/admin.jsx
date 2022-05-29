import Head from 'next/head';
import { useEffect, useState } from 'react';

import AdminCard from '../components/adminCard';
import Header from '../components/layout/Header';

function Admin({ account, marketContract }) {
  const [markets, setMarkets] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [end, setEnd] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  const addMarket = async () => {
    try {
      setLoading(true);
      const endTime = Math.floor(new Date(end).getTime() / 1000);

      const tx = await marketContract.methods
        .addInformation(title, description, url, endTime)
        .send({ from: account });
      console.log(tx);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Head>
        <title>PreMarket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isOwner={false} />
      <div
        className="w-9/12 my-5 mx-auto py-3 px-5 text-white text-center font-semibold rounded-xl bg-blue-500"
        style={{ backgroundImage: 'url("/assets/images/bg.jpeg")' }}
      >
        <h4>Only accessible by admin</h4>
      </div>
      <div className="w-full md:w-1/4 mx-auto grid grid-cols-2">
        <button
          className={`w-fit px-8 py-2 border rounded-xl my-4 mx-auto  hover:shadow-md hover:bg-[#1e96a6c4] hover:text-white transition-all ${
            activeTab === 1
              ? 'bg-white text-[#1e96a6]'
              : 'bg-[#1e96a6] text-white'
          }`}
          onClick={() => setActiveTab(0)}
        >
          Add
        </button>
        <button
          className={`w-fit px-8 py-2 border rounded-xl my-4 mx-auto  hover:shadow-md hover:bg-[#1e96a6c4] hover:text-white transition-all ${
            activeTab === 0
              ? 'bg-white text-[#1e96a6]'
              : 'bg-[#1e96a6] text-white'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Resolve
        </button>
      </div>

      {activeTab === 0 && (
        <div className="w-11/12 md:w-9/12 p-4 mx-auto border rounded-xl flex flex-col justify-center">
          <input
            className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
            type="text"
            placeholder="Resolver URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
            type="date"
            placeholder="Ending Date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
          <button
            className="w-1/4 px-4 py-2 border rounded-xl my-4 mx-auto bg-[#1e96a6] text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed"
            onClick={isOwner ? addMarket : null}
            disabled={loading || !isOwner}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      )}

      {activeTab === 1 && (
        <div className="w-11/12 md:w-9/12 p-4 mx-auto border rounded-xl flex flex-col justify-center">
          {markets.map((market) => (
            <AdminCard
              market={market}
              marketContract={marketContract}
              account={account}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Admin;
