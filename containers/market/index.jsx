import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Share2, ThumbsUp, ThumbsDown } from 'react-feather';
import Chart from 'react-apexcharts';
import web3 from 'web3';

import Header from '../../components/layout/Header';
import Modal from '../../components/modal';
import market from '../../abis/Market.json';

const deployedMarketAddress = market.networks['80001'].address;
const textLimiter = 150;

function Market({ account, tokenContract, marketContract }) {
  const [data, setData] = useState({
    description: '',
    endTimestamp: '0',
    id: '0',
    resolveUrl: '',
    startTimestamp: '0',
    title: '',
    totalDownValue: '0',
    totalUpValue: '0',
    upVotes: 0,
    downVotes: 0,
    resolved: 0,
  });
  const [isOwner, setIsOwner] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullText, setIsFullText] = useState(false);
  const [amount, setAmount] = useState('');
  const [choice, setChoice] = useState(0);
  const [chart, setChart] = useState({ upvote: [], downvote: [], xAxis: [] });
  const router = useRouter();
  const { id } = router.query;

  const getData = useCallback(async () => {
    const marketData = await marketContract.methods.informations(id).call();
    const marketVoteData = await marketContract.methods
      .getInformation(id)
      .call();

    const owner = await marketContract.methods
      .isOwner()
      .call({ from: account });
    setIsOwner(owner);

    setData({
      ...marketData,
      upVotes: marketVoteData[2].length,
      downVotes: marketVoteData[3].length,
    });

    const X = [];
    const up = [];
    const down = [];

    marketVoteData[2].map((vote) => {
      const time = new Date(parseInt(vote.timestamp) * 1000);
      const value = web3.utils.fromWei(vote.value, 'ether');
      X.push(time.toLocaleDateString());
      up.push(parseFloat(value));
    });

    marketVoteData[3].map((vote) => {
      const time = new Date(parseInt(vote.timestamp) * 1000);
      const value = web3.utils.fromWei(vote.value, 'ether');
      X.push(time.toLocaleDateString());
      down.push(parseFloat(value));
    });

    setChart({
      upvote: up,
      downvote: down,
      xAxis: X,
    });
  }, []);

  const getBalance = useCallback(async () => {
    try {
      const balance = await tokenContract.methods.balanceOf(account).call();
      if (balance) setBalance(web3.utils.fromWei(balance.toString(), 'ether'));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (marketContract) getData();
  }, [marketContract]);

  useEffect(() => {
    if (tokenContract) getBalance();
  }, [tokenContract, account]);

  const description = data.description;

  const endDate = new Date(parseInt(data.endTimestamp) * 1000);
  const isEnded = endDate < new Date() || data.resolved == 1;

  const totalAmount =
    parseFloat(data.totalDownValue) + parseFloat(data.totalUpValue);
  const volume = parseFloat(
    web3.utils.fromWei(totalAmount.toString(), 'ether')
  ).toFixed(2);

  const options = {
    chart: {
      type: 'line',
      stacked: false,
    },
    legend: {
      horizontalAlign: 'center',
    },
    xaxis: {
      categories: chart.xAxis,
    },
    colors: ['#247BA0', '#FF1654'],
  };
  const series = [
    {
      name: 'UpVotes',
      data: chart.upvote,
    },
    {
      name: 'DownVotes',
      data: chart.downvote,
    },
  ];

  const voteMarket = async () => {
    try {
      setLoading(true);
      const balance = await tokenContract.methods.balanceOf(account).call();

      if (
        parseFloat(amount) < parseFloat(web3.utils.fromWei(balance, 'ether'))
      ) {
        await tokenContract.methods
          .approve(deployedMarketAddress, web3.utils.toWei(amount, 'ether'))
          .send({ from: account });

        await marketContract.methods
          .vote(id, web3.utils.toWei(amount, 'ether'), choice === 1)
          .send({
            from: account,
            gasLimit: 1000000,
          });

        await getData();
        await getBalance();
      } else {
        alert("You don't have enough PRE tokens");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestTokens = async () => {
    try {
      const res = await tokenContract.methods
        .giveTestTokens()
        .send({ from: account });
      console.log(res);
      await getBalance();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Head>
        <title>PreMarket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isOwner={isOwner} />
      <div className="w-full md:w-9/12 py-4 grid grid-cols-1 md:grid-cols-3">
        <Modal isOpen={isOpen} id={id} onClose={() => setIsOpen(false)} />
        <div className="border col-span-2 mx-5 p-5 rounded-2xl">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-xl font-sans">{data.title}</h3>
            <Share2
              color="#808080"
              size={20}
              className="stroke-[#0000FF] cursor-pointer z-50"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 items-center my-5 justify-between">
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">Ends On:</span>{' '}
              {endDate.toLocaleDateString()}
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">Volume:</span> {volume} PRE
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">UpVotes:</span> {data.upVotes}
            </p>
            <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
              <span className="font-bold">DownVotes:</span> {data.downVotes}
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
            <span className="font-bold">Resolver:</span> {data.resolveUrl}
          </p>
        </div>

        <div className="border mx-5 p-5 rounded-2xl">
          <div className="">
            <h5 className="text-center bg-[#f6f5f3] p-2 rounded-xl">
              Let's jump in the pool
            </h5>

            <div className="border w-full px-3 py-3 rounded-xl mt-5">
              <h5 className="mb-3 font-semibold border text-center text-[#1e96a6] p-2 rounded-xl">
                Balance: {balance} PRE
              </h5>

              <button
                className="w-full bg-[#1e96a6] py-2 px-5 text-center rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all"
                onClick={getTestTokens}
              >
                Get test PRE tokens
              </button>
            </div>

            <h5 className="mt-5 mb-5 font-semibold border text-center text-[#1e96a6] p-2 rounded-xl">
              Make a prediction
            </h5>

            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-bold">Total UpVotes Value:</p>
              <p className="text-sm">
                {parseFloat(
                  web3.utils.fromWei(data.totalUpValue.toString(), 'ether')
                ).toFixed(2)}{' '}
                PRE
              </p>
            </div>

            <div className="my-3 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-bold">Total DownVotes Value:</p>
              <p className="text-sm">
                {parseFloat(
                  web3.utils.fromWei(data.totalDownValue.toString(), 'ether')
                ).toFixed(2)}{' '}
                PRE
              </p>
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
                placeholder="Enter amount (in PRE)"
                className="w-full border px-3 py-2 rounded-xl outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed"
              disabled={isEnded || loading}
              onClick={isEnded ? null : voteMarket}
            >
              {isEnded ? 'Verrrryyyy late' : loading ? 'Loading...' : 'LFG 🚀'}
            </button>

            <p className="mt-4 mb-3 text-center text-gray-500 text-xs">
              We will be launching PRE tokens on Quickswap soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
