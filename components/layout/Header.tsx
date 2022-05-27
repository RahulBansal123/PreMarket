import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const Header = () => {
  const router = useRouter();
  const { account } = useWeb3React();

  return (
    <div className="w-full border bg-[#1e96a6] text-white rounded-b-3xl">
      <div className="flex mx-auto flex-col md:flex-row items-center md:justify-between py-5 px-10">
        <div className="flex flex-row space-x-2 items-center">
          <p
            className="text-2xl font-bold  cursor-pointer"
            onClick={() => router.push('/')}
          >
            PreMarket
          </p>
        </div>
        <div className="flex flex-row space-x-2 items-center cursor-pointer">
          <span className="overflow-ellipsis overflow-hidden">
            {account?.slice(0, 12)}...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
