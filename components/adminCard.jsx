import { useRouter } from 'next/router';
import web3 from 'web3';
import CornerRibbon from 'react-corner-ribbon';
import { useState } from 'react';

const AdminCard = ({ account, market, marketContract }) => {
  const router = useRouter();
  const [choice, setChoice] = useState(0);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const endDate = new Date(parseInt(market.endTimestamp) * 1000);
  const isEnded = endDate < new Date() || market.resolved == 1;

  const totalAmount =
    parseFloat(market.totalDownValue) + parseFloat(market.totalUpValue);
  const volume = parseFloat(
    web3.utils.fromWei(totalAmount.toString(), 'ether')
  ).toFixed(2);

  const push = async () => {
    try {
      setLoading(true);
      const res = await marketContract.methods
        .distribute(market.id, choice === 1)
        .send({ from: account, gasLimit: 1000000 });
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(0);
      setLoading(false);
    }
  };
  return (
    <div
      className={`border rounded-xl my-5 md:m-5 overflow-hidden ${
        isEnded ? 'relative' : ''
      }`}
    >
      {isEnded && <CornerRibbon>ENDED</CornerRibbon>}
      <div className="w-full flex items-center px-5 pt-5 mb-3">
        <h4 className="font-semibold font-sans">{market.title}</h4>
        <button
          className="border px-4 py-1 rounded-xl mx-2 hover:shadow-md"
          onClick={() => router.push(`/${market.id}`)}
        >
          View
        </button>
      </div>
      <p className="text-gray-600 font-sans px-5">{market.description}</p>
      <div className="w-full flex flex-col items-center p-5 justify-between">
        <p className="text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Ends On: {endDate.toLocaleDateString()}
        </p>
        <p className="mt-3 text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Volume: {volume} PRE
        </p>
        <p className="w-full md:w-fit truncate text-center mt-3 text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Resolver: {market.resolveUrl}
        </p>
      </div>
      {status === 1 && (
        <div className="w-full flex justify-center items-center">
          <button
            className={`bg-[#1e96a6] py-2 px-5 text-center rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all mx-2 ${
              choice === 1 ? 'border-2 border-yellow-400' : ''
            }`}
            onClick={() => setChoice(1)}
          >
            True
          </button>

          <button
            className={`bg-[#f6f5f3] py-2 px-5 text-center rounded-xl text-black hover:shadow-md hover:bg-[#ebebeb] transition-all mx-2 ${
              choice === 0 ? 'border-2 border-yellow-400' : ''
            }`}
            onClick={() => setChoice(0)}
          >
            False
          </button>
        </div>
      )}
      {!isEnded && (
        <div className="w-full flex justify-center">
          <button
            className={`bg-[#1e96a6] w-fit !mx-auto py-2 px-5 text-center rounded-xl text-white my-3 hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed`}
            disabled={loading}
            onClick={() => {
              if (status === 0) setStatus(1);
              else push();
            }}
          >
            {status === 0
              ? "Let's Resolve It 🚀"
              : loading
              ? 'Loading...'
              : 'Push'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
