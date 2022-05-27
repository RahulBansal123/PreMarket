import { SET_USER } from './constants';

export const fetchUserId = (contract, wallet) => {
  return async () => {
    let id;
    try {
      const user = await contract.methods.getUser(wallet).call();
      id = user.id;
    } catch (err) {
      console.error(err);
    } finally {
      return id;
    }
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
