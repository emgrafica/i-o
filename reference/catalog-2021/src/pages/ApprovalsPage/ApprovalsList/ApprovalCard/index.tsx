import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts, Button, Grid, Popover } from '@lumos/core';
import Thumbnail from './Thumbnail';
import Header from './Header';
import Body from './Body';
import Icons from './Icons';
import { ApproverState, ApproverAction } from 'gqlTypes/globalTypes';
import { useMutation } from '@apollo/react-hooks';
import { APPROVER_ACTION } from 'graphql/mutations/approverAction';
import {
  approverAction,
  approverActionVariables,
} from 'graphql/mutations/gqlTypes/approverAction';
import DeclineModal, { ApprovalDeclineModalState } from './DeclineModal';
import { MyApprovals_myOrderApprovals_items } from 'graphql/queries/gqlTypes/MyApprovals';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { WideCard } from 'components/WideCard';
import { Placement } from '@lumos/core/lib/components/Popover/Popover.style';
import useDevice from 'utils/useDevice';
import { ViewDetailsData } from 'pages/ApprovalsPage';

/**
 * Props type for the ApprovalCard component. Describe the
 * information must be displayed in the card.
 */
export interface ApprovalCardProps {
  /** The status of the approvals displayed in the page. */
  approverState: ApproverState;
  /**
   * Contain the information to display the approval card.
   * Is part of the data returned by the GraphQL query.
   */
  orderApproval: MyApprovals_myOrderApprovals_items;
  /** Callback for setting the data to show in the view details side sheet */
  setViewDetailsData: (viewDetailsData: ViewDetailsData | null) => void;
  /** Set to true when the card is the last in the page, used to set the position of the actions popover*/
  isLastCard: boolean;
}

/**
 * Enumerates all the different states in which a card in
 * the pending could be. Notice that a card remains in the
 * pending tab after approval or decline, until the list
 * is refreshed
 */
enum PendingTabCardState {
  /** The card is still pending */
  Pending,
  /** The card was approved but the list has not been refreshed */
  Approved,
  /** The card was declined but the list has not been refreshed */
  Declined,
}

/**
 * Render an approval card.
 *
 * Handles the general layout of a card.
 *
 * @param props The props the component expects.
 */
const ApprovalCard: React.FC<ApprovalCardProps> = ({
  orderApproval,
  approverState,
  setViewDetailsData,
  isLastCard,
}) => {
  const { t } = useTranslation();
  const { addToast } = useToasts();
  const order = orderApproval.order;
  const lineItem = orderApproval.lineItem;
  const firstName = order.requestedForFirstName;
  const lastName = order.requestedForLastName;
  const fullName = firstName && lastName && firstName + ' ' + lastName;
  const userId = useUserId();
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineModalState, setDeclineModalState] = useState(
    ApprovalDeclineModalState.Normal,
  );
  const [pendingTabCardState, setPendingCardTabState] = useState(
    PendingTabCardState.Pending,
  );
  const disabled = pendingTabCardState !== PendingTabCardState.Pending;
  const [isLoadingApprovalMutation, setIsLoadingApprovalMutation] = useState(
    false,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [approveOrDecline] = useMutation<
    approverAction,
    approverActionVariables
  >(APPROVER_ACTION);

  // Data passed to the mutation (both approve and decline)
  const mutationData = {
    lineItemId: lineItem.id,
    approvalId: orderApproval.approval.id,
    approverId: userId as string,
    _etag: orderApproval._etag,
    orderId: order.id,
  };

  const device = useDevice();
  const popoverPlacement: Placement = WideCard.getPopoverPlacement(
    device,
    isLastCard,
  );

  const thumbnail = <Thumbnail image={lineItem.catalogItemImage || ''} />;
  const header = (
    <Header
      catalogItemName={lineItem.catalogItemName || ''}
      submittedFor={fullName}
      approverState={approverState}
      actionedOn={orderApproval.approver.actionedOn}
      createdOn={order.createdOn}
    />
  );
  const body = (
    <Body
      id={lineItem.id}
      pricing={lineItem.pricing}
      reasonForRequest={lineItem.reasonForRequest}
      labelDescription={orderApproval.approval.labelDescription}
      approverState={approverState}
      comment={orderApproval.approver.comment}
      justification={order.justification}
      onIsVisibleChange={setIsVisible}
      isExpanded={isExpanded}
    />
  );

  const icons = (
    <Icons
      status={
        pendingTabCardState === PendingTabCardState.Approved
          ? 'approved'
          : 'declined'
      }
    />
  );

  const price =
    lineItem.pricing.enabled && lineItem.pricing.format === 'Numerical'
      ? `$${lineItem.pricing.value}`
      : '$'.repeat(lineItem.pricing.value);

  const handleApprove = () => {
    document.body.click();
    setIsLoadingApprovalMutation(true);
    approveOrDecline({
      variables: {
        data: {
          ...mutationData,
          action: ApproverAction.Approved,
        },
      },
    })
      .then(() => {
        setPendingCardTabState(PendingTabCardState.Approved);
      })
      .catch(error => {
        if (error) {
          addToast(t('approvals:approvalError'), {
            // Lumos typing issue, will be removed when fixed there
            // @ts-ignore
            kind: 'danger',
            autoDismiss: true,
          });
        }
      })
      .finally(() => setIsLoadingApprovalMutation(false));
  };

  const handleDecline = () => {
    document.body.click();
    setDeclineModalState(ApprovalDeclineModalState.Normal);
    setIsDeclineModalOpen(true);
  };

  const handleViewDetails = () => {
    document.body.click();
    setViewDetailsData({
      requestSection: {
        requestedForUser: {
          firstName,
          lastName,
        },
        orderNumber: lineItem.id,
        submittedDate: order.createdOn,
      },
      productSection: {
        price,
        reasonForRequest: lineItem.reasonForRequest,
        productName: lineItem.catalogItemName,
        justification: order.justification,
      },
    });
  };

  const buttons = approverState === ApproverState.Pending && (
    <Popover
      id={lineItem.id}
      placement={popoverPlacement}
      content={
        <Grid flexDirection="column">
          <Button kind="text" onClick={handleApprove}>
            {t('approvals:approve')}
          </Button>
          <Button kind="text" onClick={handleDecline}>
            {t('approvals:decline')}
          </Button>
          <Button kind="text" onClick={handleViewDetails}>
            {t('common:viewDetails')}
          </Button>
        </Grid>
      }
      maxHeight="345px"
    >
      <Button width="100%">{t('common:actions')}</Button>
    </Popover>
  );

  return (
    <>
      <DeclineModal
        state={declineModalState}
        isModalOpen={isDeclineModalOpen}
        setIsModalOpen={setIsDeclineModalOpen}
        onRequestClose={() => setIsDeclineModalOpen(false)}
        onDeclineClick={declineReason => {
          setDeclineModalState(ApprovalDeclineModalState.Loading);
          approveOrDecline({
            variables: {
              data: {
                ...mutationData,
                action: ApproverAction.Declined,
                comment: declineReason,
              },
            },
          })
            .then(() => {
              setIsDeclineModalOpen(false);
              setPendingCardTabState(PendingTabCardState.Declined);
              addToast(t('approvals:declineSuccess'), {
                // Lumos typing issue, will be removed when fixed there
                // @ts-ignore
                kind: 'success',
                autoDismiss: true,
              });
            })
            .catch(() => {
              setDeclineModalState(ApprovalDeclineModalState.Error);
            });
        }}
      />

      <WideCard.Template
        data-testid="approval-card"
        loading={isLoadingApprovalMutation}
        thumbnail={thumbnail}
        header={header}
        body={body}
        showOverlay={disabled}
        collapsibleButtonProps={{
          isVisible,
          isExpanded,
          onClick: () => setIsExpanded(!isExpanded),
        }}
        buttons={disabled ? icons : buttons}
      />
    </>
  );
};

export default ApprovalCard;
