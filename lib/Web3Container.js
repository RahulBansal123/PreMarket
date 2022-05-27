import { useLayoutEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import getContract from './getContract';
import Token from '../abis/Token.json';
import Market from '../abis/Market.json';
import { useRouter } from 'next/router';

const Web3Container = (props) => {
  const [state, setState] = useState({
    web3: null,
    tokenContract: null,
    marketContract: null,
  });

  const router = useRouter();
  const { account, library } = useWeb3React();

  useLayoutEffect(() => {
    const init = async () => {
      try {
        console.log('init', library.provider);
        const web3 = new Web3(library.provider);
        const tokenContract = await getContract(web3, Token);
        const marketContract = await getContract(web3, Market);
        setState({ web3, tokenContract, marketContract });
      } catch (error) {
        alert(`Failed to connect, Please try again.`);
        console.error(error);
      }
    };
    if (account) init();
  }, [account]);

  if (router.pathname === '/auth') {
    return props.render({
      web3: null,
      account: null,
      tokenContract: null,
      marketContract: null,
    });
  }

  if (!account) {
    router.push('/auth');
    return null;
  }

  return props.render({
    web3: state.web3,
    account,
    tokenContract: state.tokenContract,
    marketContract: state.marketContract,
  });
};

export default Web3Container;
