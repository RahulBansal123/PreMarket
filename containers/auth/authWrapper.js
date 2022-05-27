import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';

import Web3Container from '../../lib/Web3Container';
import { setUser } from './actions';

const Wrapper = ({ children, user, account }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (account && account !== '0x0') {
        // let fetchedUser;
        // try {
        //   fetchedUser = await contract.methods.getUser(account).call();
        // } catch (error) {
        //   console.error('Error occured while fetching user', error);
        // }
        // if (fetchedUser && fetchedUser.id !== 0) {
        //   dispatch(setUser(fetchedUser));
        // } else {
        //   try {
        //     await contract.methods
        //       .createUser('John Doe')
        //       .send({ from: account, gasLimit: 100000 });
        //   } catch (error) {
        //     console.error('Error occured while creating user', error);
        //   }
        // }
      }
    };
    fetchUser();
  }, [router.pathname]);

  return <>{children}</>;
};

function Web3Wrapper({ user, children }) {
  return (
    <Web3Container
      render={({ account, tokenContract, marketContract }) => (
        <Wrapper account={account} user={user}>
          {React.cloneElement(children, {
            account,
            tokenContract,
            marketContract,
          })}
        </Wrapper>
      )}
    />
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Web3Wrapper);
