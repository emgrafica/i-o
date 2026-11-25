import { Grid } from '@lumos/core';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ApproverState } from 'gqlTypes/globalTypes';
import { WideCard } from 'components/WideCard';
import HorizontalLine from 'components/HorizontalLine';
import UseDevice, { Device } from 'utils/useDevice';
import {
  MyApprovals_myOrderApprovals_items_order,
  MyApprovals_myOrderApprovals_items_lineItem,
  MyApprovals_myOrderApprovals_items_approval,
  MyApprovals_myOrderApprovals_items_approver,
} from 'graphql/queries/gqlTypes/MyApprovals';

/** Props type for the Body component */
interface BodyProps
  extends Pick<MyApprovals_myOrderApprovals_items_approval, 'labelDescription'>,
    Pick<MyApprovals_myOrderApprovals_items_approver, 'comment'>,
    Pick<
      MyApprovals_myOrderApprovals_items_lineItem,
      'id' | 'reasonForRequest' | 'pricing'
    >,
    Pick<MyApprovals_myOrderApprovals_items_order, 'justification'> {
  /** The state of the approvals displayed in the page */
  approverState: ApproverState;

  /** Callback that determines whether or not the collapsible show more/less button is visible */
  onIsVisibleChange: (showButton: boolean) => void;
  /** Determines whether or not the approval card body is expanded */
  isExpanded: boolean;
}

/** Renders the body of the approval card */
const Body: React.FC<BodyProps> = ({
  labelDescription,
  comment,
  reasonForRequest,
  pricing,
  id,
  justification,
  approverState,
  onIsVisibleChange,
  isExpanded,
}) => {
  const { t } = useTranslation();
  const device = UseDevice();
  const [approvalReasonNeedsButton, setApprovalReasonNeedsButton] = useState(
    false,
  );
  const [declineReasonNeedsButton, setDeclineReasonNeedsButton] = useState(
    false,
  );
  const [justificationNeedsButton, setJustificationNeedsButton] = useState(
    false,
  );
  const showButton =
    approvalReasonNeedsButton ||
    declineReasonNeedsButton ||
    justificationNeedsButton;

  // Set the isVisible state of collapsible show more/less button
  useEffect(() => {
    onIsVisibleChange(showButton);
  }, [onIsVisibleChange, showButton]);

  return (
    <>
      <Grid flexDirection="column">
        <WideCard.Field label={t('approvals:order.orderNumber')} value={id} />
        {pricing.enabled && (
          <WideCard.Field
            label={t('approvals:order.price')}
            value={
              pricing.format === 'Numerical'
                ? `$${pricing.value}`
                : '$'.repeat(pricing.value)
            }
          />
        )}
        {reasonForRequest && (
          <WideCard.Field
            label={t('approvals:order.requestReason')}
            value={reasonForRequest}
          />
        )}
        {device === Device.Mobile && <HorizontalLine />}
        {labelDescription && (
          <WideCard.Field
            label={t('approvals:order.approvalReason')}
            value={labelDescription}
            newLineOnMobile
            clampOnMobile={!isExpanded}
            onNeedsClampButton={setApprovalReasonNeedsButton}
          />
        )}
        {approverState === ApproverState.Declined
          ? comment && (
              <WideCard.Field
                label={t('approvals:order.declineReason')}
                value={comment}
                newLineOnMobile
                clampOnMobile={!isExpanded}
                onNeedsClampButton={setDeclineReasonNeedsButton}
              />
            )
          : justification && (
              <WideCard.Field
                label={t('approvals:order.businessJustification')}
                value={justification}
                newLineOnMobile
                clampOnMobile={!isExpanded}
                onNeedsClampButton={setJustificationNeedsButton}
              />
            )}
      </Grid>
    </>
  );
};
export default Body;
