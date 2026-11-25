import React, { useState } from 'react';
import OrderCard from './OrderCard';
import {
  MyRequests_myRequests,
  MyRequests_myRequests_items,
} from 'graphql/queries/gqlTypes/MyRequests';
import { ActionTypes, OrderAction } from '../../types';
import { useRequestContext } from '../../index';
import CancelModal from './CancelModal';
import { WideCard } from 'components/WideCard';

/**
 * Props for the RequestsContainer component
 * requestItem: List of all request items from GET_CATALOG_REQUESTS query
 * setViewDetails: Sets the request details to be displayed in the view details sidesheet
 * setIsViewDetailsOpen: sets open state for view details sidesheet
 */
type OrderListProps = Pick<MyRequests_myRequests, 'items'>;

/**
 * Maps through list of request items and creates card for each request
 * @param props
 */
const OrderList: React.FC<OrderListProps> = ({ items }) => {
  const { dispatch } = useRequestContext();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderIsUpdating, setOrderIsUpdating] = useState('');

  const doHandle = (
    order: MyRequests_myRequests_items,
    action: OrderAction,
  ) => {
    dispatch({
      type: ActionTypes.SET_ORDER_DATA,
      payload: { orderData: order, orderAction: action },
    });
  };

  const handleViewDetails = (order: MyRequests_myRequests_items) => {
    doHandle(order, OrderAction.ViewDetails);
  };

  const handleCancel = (order: MyRequests_myRequests_items) => {
    doHandle(order, OrderAction.Cancel);
    setIsCancelModalOpen(true);
  };

  return (
    <WideCard.List>
      {items.map(item => (
        <OrderCard
          key={item.id}
          data={item}
          isLoading={orderIsUpdating === item.id}
          onCancel={handleCancel}
          onViewDetails={handleViewDetails}
        />
      ))}
      <CancelModal
        isOpen={isCancelModalOpen}
        onUpdateOrder={setOrderIsUpdating}
        setIsCancelModalOpen={setIsCancelModalOpen}
      />
    </WideCard.List>
  );
};

export default OrderList;
