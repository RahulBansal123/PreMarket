import { useRouter } from 'next/router';
import web3 from 'web3';
import CornerRibbon from 'react-corner-ribbon';

const textLimiter = 150;

const Card = ({ market }) => {
  const router = useRouter();
  const endDate = new Date(parseInt(market.endTimestamp) * 1000);
  const isEnded = endDate < new Date() || market.resolved == 1;

  const totalAmount =
    parseFloat(market.totalDownValue) + parseFloat(market.totalUpValue);
  const volume = parseFloat(
    web3.utils.fromWei(totalAmount.toString(), 'ether')
  ).toFixed(2);
  return (
    <div
      className={`border rounded-xl m-5 overflow-hidden hover:shadow-2xl transition-all cursor-pointer ${
        isEnded ? 'relative' : ''
      }`}
      onClick={() => router.push(`/${market.id}`)}
    >
      {isEnded && <CornerRibbon>ENDED</CornerRibbon>}
      <div className="w-full flex items-start px-5 pt-5">
        <h4 className="flex-1 font-semibold font-sans mb-3">{market.title}</h4>
      </div>
      <p className="text-gray-600 font-sans px-5">
        {market.description.length > textLimiter ? (
          <span className="font-sans text-gray-600">
            {market.description.substring(0, textLimiter)} ...{' '}
          </span>
        ) : (
          <span className="font-sans text-gray-600">{market.description}</span>
        )}
      </p>
      <div className="w-full flex flex-col items-center p-5 justify-between">
        <p className="text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Ends On: {endDate.toLocaleDateString()}
        </p>
        <p className="mt-3 text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Volume: {volume} PRE
        </p>
      </div>
      <div className="w-full bg-[#795d43] text-white px-5 py-3">
        Resolver: {market.resolveUrl}
      </div>
    </div>
  );
};

export default Card;
