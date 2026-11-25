import { ApolloCache } from 'apollo-cache';
import { CART_INFO } from '../queries';
import {
  CartInfo,
  CartInfo_cartInfo_cartItems,
} from '../queries/gqlTypes/CartInfo';

const resolvers = {
  Query: {
    cartInfo: (_: any, __: any, { cache }: { cache: ApolloCache<any> }) => {
      return cache.readQuery({ query: CART_INFO });
    },
  },

  Mutation: {
    addToCartInfo: (
      _: any,
      { cartItem }: { cartItem: CartInfo_cartInfo_cartItems },
      { cache }: { cache: ApolloCache<any> },
    ) => {
      const previous = cache.readQuery<CartInfo>({
        query: CART_INFO,
      });

      let updatedCatalogItems = null;
      if (previous && previous.cartInfo && previous.cartInfo.cartItems) {
        updatedCatalogItems = [...previous.cartInfo.cartItems];
        updatedCatalogItems.push({
          ...cartItem,
          __typename: 'CartItem',
        });
      }

      const data = {
        ...previous,
        cartInfo: {
          ...(previous && previous.cartInfo),
          __typename: 'CartInfo',
          catalogItems: updatedCatalogItems,
        },
      };

      cache.writeQuery({ query: CART_INFO, data });

      return data.cartInfo;
    },
  },
};

export default resolvers;
