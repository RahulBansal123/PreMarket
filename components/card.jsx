import { useRouter } from 'next/router';
import Link from 'next/link';
import CornerRibbon from 'react-corner-ribbon';

const Card = ({ isEnded, id }) => {
  const router = useRouter();
  return (
    <div
      className={`border rounded-xl m-5 overflow-hidden hover:shadow-2xl transition-all cursor-pointer ${
        isEnded ? 'relative' : ''
      }`}
      onClick={() => router.push(`/${id}`)}
    >
      {isEnded && <CornerRibbon>ENDED</CornerRibbon>}
      <div className="w-full flex items-start px-5 pt-5">
        <h4 className="flex-1 font-semibold font-sans mb-3">
          When will Ethereum Merge to Proof-of-Stake?
        </h4>
      </div>
      <p className="text-gray-600 font-sans px-5">
        Can Ethereum merge? Or is it just a myth?
      </p>
      <div className="w-full flex flex-col items-center p-5 justify-between">
        <p className="text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Ends On: November 12, 2002
        </p>
        <p className="mt-3 text-sm bg-[#f6f5f3] px-4 py-2 rounded-xl">
          Volume: $100M
        </p>
      </div>
      <div className="w-full bg-[#795d43] text-white px-5 py-3">
        Resolver: google.com
      </div>
    </div>
  );
};

export default Card;
