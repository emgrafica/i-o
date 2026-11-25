import React from 'react';
import ApprovalCard from './ApprovalCard';
import { ApproverState } from 'gqlTypes/globalTypes';
import EmptyListMessage from './EmptyListMessage';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { MyApprovals_myOrderApprovals_items } from 'graphql/queries/gqlTypes/MyApprovals';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { WideCard } from 'components/WideCard';
import { ViewDetailsData } from '..';

/**
 * Props type for the ApprovalsList component
 */
export interface ApprovalsListProps {
  /** List of order approvals */
  orderApprovals: MyApprovals_myOrderApprovals_items[];
  /** The status of the approvals displayed in the page */
  approverState: ApproverState;
  /** Array containing selected filters */
  filteredApprovals: CatalogItemClass[];
  /** Callback for setting the data to show in the view details side sheet */
  setViewDetailsData: (viewDetailsData: ViewDetailsData | null) => void;
}

/**
 * Return the message to render when the list is empty
 * based on the approver status and internationalization.
 * If the approver status is invalid, returns an empty string.
 * @param approverState The approver status.
 * @param t translation function.
 */
const getEmptyListMessage = (
  filteredApprovals: CatalogItemClass[],
  approverState: ApproverState,
  t: TFunction,
): string => {
  if (filteredApprovals.length > 0) return t('approvals:noFilterResults');
  switch (approverState) {
    case ApproverState.Pending:
      return t('approvals:noPendingOrders');
    case ApproverState.Approved:
      return t('approvals:noApprovedOrders');
    case ApproverState.Declined:
      return t('approvals:noDeclinedOrders');
  }
  return '';
};

/**
 * Render the list of approval cards.
 *
 * @param props The props the component expect
 */
const ApprovalsList: React.FC<ApprovalsListProps> = props => {
  const { t } = useTranslation();

  if (props.orderApprovals.length === 0)
    return (
      <EmptyListMessage
        message={getEmptyListMessage(
          props.filteredApprovals,
          props.approverState,
          t,
        )}
      />
    );

  return (
    <WideCard.List>
      {props.orderApprovals.map((orderApproval, index) => {
        return (
          <ApprovalCard
            key={orderApproval.order.id}
            approverState={props.approverState}
            orderApproval={orderApproval}
            setViewDetailsData={props.setViewDetailsData}
            isLastCard={index === props.orderApprovals.length - 1}
          />
        );
      })}
    </WideCard.List>
  );
};

export default ApprovalsList;
