import { useQuery, useMutation } from '@apollo/react-hooks';
import { CART_INFO } from '../actions/queries';
import { CartInfo } from '../actions/queries/gqlTypes/CartInfo';
import {
  AddToCartInfo,
  AddToCartInfoVariables,
} from '../actions/mutations/gqlTypes/AddToCartInfo';
import { ADD_TO_CART_INFO } from '../actions/mutations';
import { UserCartItem } from 'gqlTypes/globalTypes';

/**
 * Hook to access Cart Info state in Apollo cache.
 */
export const useCartInfoLocalState = () => {
  const { data } = useQuery<CartInfo>(CART_INFO);
  const cartInfo = data && data.cartInfo;
  return cartInfo ? cartInfo.cartItems : null;
};

/**
 * Hook to mutate Cart Info state in Apollo cache.
 */
export const useAddToCartInfoLocalState = () => {
  const [addToCartInfo] = useMutation<AddToCartInfo, AddToCartInfoVariables>(
    ADD_TO_CART_INFO,
  );

  return (cartItem: UserCartItem | null) =>
    addToCartInfo({
      variables: {
        cartItem,
      },
    });
};
