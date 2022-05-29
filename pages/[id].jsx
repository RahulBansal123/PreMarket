import dynamic from 'next/dynamic';

const MarketContainer = dynamic(() => import('../containers/market'), {
  ssr: false,
});

function Market(params) {
  return (
    <MarketContainer
      account={params.account}
      tokenContract={params.tokenContract}
      marketContract={params.marketContract}
    />
  );
}

export default Market;
