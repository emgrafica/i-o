import React, { ReactElement } from 'react';
import { Typography, Box, Button, Grid, Card } from '@lumos/core';
import { PrimaryActionButton } from './PrimaryActionButton';

/** Props type for Get Support Contact Cards */
export interface ContactCardProps {
  /** Title to be displayed on card */
  title: string;
  /** Content to be displayed on card */
  body: string;
  /** Primary action id */
  primaryActionId?: string;
  /** Label for primary action that the user can take */
  primaryActionLabel: string;
  /** Icon to be displayed alongside the primary action label */
  primaryActionLabelIcon?: ReactElement;
  /** Secondary action id */
  secondaryActionId?: string;
  /** Label for secondary action that the user can take */
  secondaryActionLabel?: string;
  /** Click handler for primary action */
  onPrimaryButtonClick: () => void;
  /** Click handler for secondary action */
  onSecondaryButtonClick?: () => void;
}
/** Get Support Contact Card */
const ContactCard: React.FC<ContactCardProps> = ({
  title,
  body,
  primaryActionId,
  primaryActionLabel,
  primaryActionLabelIcon,
  secondaryActionId,
  secondaryActionLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <Grid
      flexDirection="row"
      width={{ xs: '100%', lg: '31%' }}
      marginX="8px"
      marginY="6px"
    >
      <Card
        display="flex"
        flexDirection="column"
        width="100%"
        padding="29px 27px 33px"
      >
        <Box
          borderBottom="2px solid"
          borderColor="primary.3"
          width="fit-content"
        >
          <Typography kind="h6" fontSize="22px" fontWeight="300">
            {title}
          </Typography>
        </Box>
        <Grid flexGrow={1}>
          <Typography kind="body1">{body}</Typography>
        </Grid>

        <Grid marginTop="10px">
          <PrimaryActionButton
            withIconOnLeft={primaryActionLabelIcon}
            onClick={onPrimaryButtonClick}
            id={primaryActionId}
          >
            {primaryActionLabel}
          </PrimaryActionButton>
          {secondaryActionLabel && onSecondaryButtonClick && (
            <Button
              kind="text"
              marginLeft="22px"
              onClick={onSecondaryButtonClick}
              id={secondaryActionId}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ContactCard;
