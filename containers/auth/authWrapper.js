import React from 'react';

import Web3Container from '../../lib/Web3Container';

function Web3Wrapper({ user, children }) {
  return (
    <Web3Container
      render={({ account, tokenContract, marketContract }) => (
        <>
          {React.cloneElement(children, {
            account,
            tokenContract,
            marketContract,
          })}
        </>
      )}
    />
  );
}

export default Web3Wrapper;
