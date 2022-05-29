import React, { useState } from 'react';
import Modal from '../../utils/modal';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import dynamic from 'next/dynamic';
const WalletModal = dynamic(() => import('./walletModal'), {
  ssr: false,
});

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 1.6rem 0 1.6rem;
`;

const Auth = () => {
  const [isOpen, toggle] = useState(false);

  const handleClick = () => {
    toggle(true);
  };

  const config = {
    supportedChainIds: [137, 80001], //  137 - polygon mainnet, 80001 - polygon testnet
    connectors: {
      walletconnect: {
        qrcode: true,
      },
      walletlink: {
        qrcode: true,
      },
    },
  };
  return (
    <div>
      <div className="flex flex-wrap md:justify-center w-full">
        <div className="relative flex flex-col bg-white rounded-2xl border-0 shadow-md top-1/2 translate-y-3/4 md:translate-y-1/2 w-11/12 mx-auto md:w-1/3 text-center">
          <div className="flex-1 p-10">
            <div className="text-center">
              <img
                src="/assets/images/logo.png"
                alt="PreMarket"
                width="100%"
                className="mx-auto hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="text-center my-5 text-base">
              <p>Please connect your wallet</p>
            </div>
            <div className="flex">
              <button
                className="btn bg-[#1e96a6] text-white w-full hover:shadow-md hover:bg-[#1e96a6c4]"
                onClick={handleClick}
              >
                Connect to a wallet
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        width={isMobile ? 85 : 35}
        height={isMobile ? 60 : 80}
        title="Connect to a wallet"
      >
        <ModalContent className="flex-column">
          <WalletModal
            isOpen={isOpen}
            onClose={() => toggle(false)}
            config={config}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Auth;
