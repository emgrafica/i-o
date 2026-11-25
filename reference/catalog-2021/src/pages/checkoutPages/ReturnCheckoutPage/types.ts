import { Dispatch } from 'react';
import { ShippingFormDataProps } from 'components/ShippingForm/types';
import { TechnologyCheckoutPage_technologyCheckoutPage_content } from 'pages/TechnologyPage/queries/gqlTypes/TechnologyCheckoutPage';

/**
 * key-value pair when shipping form input value changes
 */
export interface ShippingChangePayload {
  field: string;
  value: string;
}

interface DetailsSectionContent {
  content: Pick<
    TechnologyCheckoutPage_technologyCheckoutPage_content,
    'title' | 'body'
  >;
  agreement?: string | null;
}

/**
 * Internal state of CheckoutPage
 */
export interface CheckoutState {
  shippingAddress: ShippingFormDataProps;
  isFormValid: boolean;
  isLoading: boolean;
  content: Pick<
    TechnologyCheckoutPage_technologyCheckoutPage_content,
    'title' | 'body'
  >;
  agreement?: string | null;
}

/**
 * CheckoutPage Context
 */
export interface CheckoutContext {
  /**
   * useReducer dispatch
   */
  dispatch: Dispatch<Action>;
  /**
   * Internal state of CheckoutPage
   */
  state: CheckoutState;
}

/**
 * Types of actions
 */
export enum ActionTypes {
  SHIPPING_CHANGE,
  SET_IS_LOADING,
  SET_CONTENT,
}

/**
 * Use reducer actions
 */
export type Action =
  | {
      type: ActionTypes.SHIPPING_CHANGE;
      payload: ShippingChangePayload;
    }
  | {
      type: ActionTypes.SET_IS_LOADING;
      payload: boolean;
    }
  | {
      type: ActionTypes.SET_CONTENT;
      payload: DetailsSectionContent;
    };
