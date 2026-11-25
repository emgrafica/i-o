import { useTranslation } from 'react-i18next';
import React from 'react';
import { Grid, Box, Typography } from '@lumos/core';
import { ClampTitle, DateLabelSlim } from 'components';
import { ApproverState } from 'gqlTypes/globalTypes';
import ShowFor from 'components/ShowFor';

/**
 * Props type for the Header component.
 */
interface HeaderProps {
  /** The status of the approvals displayed in the page. */
  approverState: ApproverState;

  /** The name of the item in the card */
  catalogItemName: string;

  /** Full name of the person for which the item was requested*/
  submittedFor: string | null;

  /** The date in which the card was approved or declined*/
  actionedOn: number | null;
  createdOn: number | null;
}

/**
 * Renders the header of the approval card.
 *
 * @param props The props the component expects.
 */
const Header: React.FC<HeaderProps> = ({
  approverState,
  catalogItemName,
  submittedFor,
  actionedOn,
  createdOn,
}) => {
  const { t } = useTranslation('approvals');

  const itemName = (
    <Box maxWidth={{ xxs: '40%', lg: '50%' }}>
      <ClampTitle text={catalogItemName} id={catalogItemName} />
    </Box>
  );

  const mobileItemName = (
    <Typography
      kind="body2"
      color="secondary.0"
      marginTop="0px"
      marginBottom="4px"
    >
      {catalogItemName}
    </Typography>
  );

  const separator = (
    <Box
      height="20px"
      width="1px"
      margin="4px 8px 8px"
      backgroundColor="state.enabled"
    />
  );

  const submittedForField = (
    <Grid margin="4px 8px 8px 0px">
      <Typography
        kind="body2"
        color="secondary.0"
        fontWeight="bold"
        marginRight="8px"
        marginY="0px"
      >
        {`${t('order.for')}`}
      </Typography>
      <Typography kind="body2" color="secondary.0" marginY="0px">
        {submittedFor}
      </Typography>
    </Grid>
  );

  const date = (
    <Box marginLeft="auto" marginTop="4px" marginBottom="8px">
      {approverState === ApproverState.Pending ? (
        <DateLabelSlim
          label={t('order.submittedLabel')}
          date={createdOn as number}
          color={'secondary.0'}
        />
      ) : (
        <DateLabelSlim
          label={
            approverState === ApproverState.Approved
              ? t('order.approvedLabel')
              : t('order.declinedLabel')
          }
          date={actionedOn as number}
          color={
            approverState === ApproverState.Approved
              ? 'state.success'
              : 'state.danger'
          }
        />
      )}
    </Box>
  );
  return (
    <>
      <ShowFor tabletAndLarger>
        <Grid alignItems="center">
          {itemName}
          {separator}
          {submittedForField}
          {date}
        </Grid>
      </ShowFor>

      <ShowFor mobile>
        <>
          {mobileItemName}
          <Grid height="26px" alignItems="center">
            {submittedForField}
          </Grid>
        </>
      </ShowFor>
    </>
  );
};
export default Header;
