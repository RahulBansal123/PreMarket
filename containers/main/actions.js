import { TEMP_ACTION } from './constants';

export const tempAction = (payload) => {
  return {
    type: TEMP_ACTION,
    payload: payload,
  };
};
