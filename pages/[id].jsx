import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Share2, ThumbsUp, ThumbsDown } from 'react-feather';
import Chart from 'react-apexcharts';

import Main from '../containers/main';
import Header from '../components/layout/Header';
import Modal from '../components/modal';

function Market(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullText, setIsFullText] = useState(false);
  const [amount, setAmount] = useState('');
  const [choice, setChoice] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const textLimiter = 150;

  const description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, ducimus aperiam consectetur cum culpa eius laboriosam eum perferendis illum ut aliquam adipisci autem voluptatum ad laborum voluptate nobis molestias! Illo.';

  const options = {
    chart: {
      type: 'line',
      stacked: false,
    },
    legend: {
      horizontalAlign: 'center',
    },
    colors: ['#FF1654', '#247BA0'],
  };

  const series = [
    {
      name: 'UpVotes',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: 'DownVotes',
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Head>
        <title>PreMarket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-full md:w-9/12 py-4 grid grid-cols-1 md:grid-cols-3">
        <Modal isOpen={isOpen} id={id} onClose={() => setIsOpen(false)} />
        <div className="border col-span-2 mx-5 p-5 rounded-2xl">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-xl font-sans">
              When will Ethereum Merge to Proof-of-Stake?
            </h3>
            <Share2
              color="#808080"
              size={20}
              className="stroke-[#0000FF] cursor-pointer z-50"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-5 items-center my-5 justify-between">
            <p className="md:col-span-2 text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">Ends On:</span> November 12, 2002
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">Volume:</span> $100M
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">UpVotes:</span> 1000
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">DownVotes:</span> 10
            </p>
          </div>

          {description.length > textLimiter && !isFullText ? (
            <span className="font-sans text-gray-600">
              {description.substring(0, textLimiter)} ...{' '}
              <span
                className="cursor-pointer text-blue-400"
                onClick={() => setIsFullText(true)}
              >
                more
              </span>
            </span>
          ) : (
            <span className="font-sans text-gray-600">{description}</span>
          )}

          <div className="w-full my-5">
            <Chart options={options} series={series} />
          </div>

          <p className="text-center text-sm bg-[#f6f5f3] p-2 rounded-xl">
            <span className="font-bold">Resolver:</span> google.com
          </p>
        </div>

        <div className="border mx-5 p-5 rounded-2xl">
          <div className="">
            <h5 className="text-center bg-[#f6f5f3] p-2 rounded-xl">
              Let's jump in the pool
            </h5>

            <h5 className="mt-8 mb-5 font-semibold border text-center text-[#1e96a6] p-2 rounded-xl">
              Make a prediction
            </h5>

            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-bold">Total UpVotes Value:</p>
              <p className="text-sm">$100</p>
            </div>

            <div className="my-3 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-bold">Total DownVotes Value:</p>
              <p className="text-sm">$100</p>
            </div>

            <h5 className="mt-10 mb-5 font-semibold border text-center text-[#1e96a6] p-2 rounded-xl">
              Select amount
            </h5>

            <button
              className={`mt-5 bg-[#1e96a6] w-full py-2 px-5 text-center rounded-xl text-white flex items-center justify-between hover:shadow-md hover:bg-[#1e96a6c4] transition-all ${
                choice === 1 ? 'border-4 border-yellow-400' : ''
              }`}
              onClick={() => setChoice(1)}
            >
              Upvote
              <ThumbsUp size={20} />
            </button>

            <button
              className={`bg-[#f6f5f3] w-full py-2 px-5 text-center rounded-xl text-black my-3 flex items-center justify-between hover:shadow-md hover:bg-[#ebebeb] transition-all ${
                choice === 0 ? 'border-4 border-yellow-400' : ''
              }`}
              onClick={() => setChoice(0)}
            >
              Downvote
              <ThumbsDown size={20} />
            </button>

            <div className="w-full">
              <input
                placeholder="Enter amount (in ETH)"
                className="w-full border px-3 py-2 rounded-xl outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all">
              LFG 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Market;
