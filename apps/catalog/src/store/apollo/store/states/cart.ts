import { CART_INFO } from '../actions/queries';

const states = [
  {
    query: CART_INFO,
    data: {
      cartInfo: {
        __typename: 'CartInfo',
        cartItems: [],
      },
    },
  },
];

export default states;
