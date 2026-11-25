import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { LeaveModal, PageTemplate } from 'components';
import LoaderWithBackdrop from 'components/LoaderWithBackdrop';

import OrderDetails from './OrderDetails';
import ShippingForm from './ShippingForm';
import { Action, ActionTypes, CheckoutContext, CheckoutState } from './types';
import { ShippingFormDataProps } from 'components/ShippingForm/types';
import CheckoutActions from './CheckoutActions';
import { useQuery } from '@apollo/react-hooks';
import { TECHNOLOGY_CHECKOUT_PAGE } from 'pages/TechnologyPage/queries';
import { TechnologyCheckoutPage } from 'pages/TechnologyPage/queries/gqlTypes/TechnologyCheckoutPage';
import BaseCheckoutTemplate from '../templates/BaseCheckoutTemplate';

const Context = createContext<CheckoutContext | null>(null);

/**
 * Hook that returns a CheckoutPage context
 * If null throw
 *
 * @return ICheckoutContext
 */
export const useCheckoutContext = (): CheckoutContext => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Must be used within the "CheckoutPage"');
  }
  return context;
};

const isFormValid = ({
  name,
  company,
  address1,
  city,
  state: shippingState,
  phone,
  zip,
}: ShippingFormDataProps): boolean => {
  return Boolean(
    name && company && address1 && city && shippingState && phone && zip,
  );
};

const initialState: CheckoutState = {
  shippingAddress: {
    name: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    additionalDeliveryInfo: '',
  },
  isFormValid: false,
  isLoading: false,
  content: {
    title: '',
    body: '',
  },
};

const reducer = (state: CheckoutState, action: Action): CheckoutState => {
  switch (action.type) {
    case ActionTypes.SHIPPING_CHANGE:
      const { field, value } = action.payload;
      const nextShippingAddress = {
        ...state.shippingAddress,
        [field]: value,
      };
      return {
        ...state,
        shippingAddress: nextShippingAddress,
        isFormValid: isFormValid(nextShippingAddress),
      };
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_CONTENT:
      return {
        ...state,
        ...action.payload,
      };
  }
};

/**
 * Checkout page for the return flow
 *
 * @remark
 * CheckoutPage is responsible for storing and distributing all internal state
 * through context
 */
const ReturnCheckoutPage: React.FC = () => {
  const { t } = useTranslation('technology');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = useQuery<TechnologyCheckoutPage>(TECHNOLOGY_CHECKOUT_PAGE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: ActionTypes.SET_CONTENT,
        payload: data.technologyCheckoutPage,
      });
    }
  }, [data]);

  /**
   * Only rerender when state changes.
   */
  const context = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [state],
  );

  return (
    <PageTemplate
      hasBanner
      title={t('checkout.title')}
      subtitle={t('checkout.subtitle')}
    >
      <Context.Provider value={context}>
        {state.isLoading ? (
          <LoaderWithBackdrop size="lg" />
        ) : (
          <BaseCheckoutTemplate
            shipping={<ShippingForm />}
            orderDetails={<OrderDetails />}
            actionButtons={<CheckoutActions />}
          />
        )}
      </Context.Provider>
      <LeaveModal
        title={t('checkout.leaveModal.title')}
        content={t('checkout.leaveModal.content')}
      />
    </PageTemplate>
  );
};

export default ReturnCheckoutPage;
