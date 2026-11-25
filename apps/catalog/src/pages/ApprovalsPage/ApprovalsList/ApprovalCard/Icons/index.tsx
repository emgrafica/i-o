import {
  StyledCheckCircleIcon,
  StyledCancelIcon,
  useStyles,
} from './index.style';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography } from '@lumos/core';
import React from 'react';

/**
 * Prop type for the Icons component
 */
interface IconsProps {
  status: 'approved' | 'declined';
}

/**
 * Renders the buttons of the approval card.
 */
const Icons: React.FC<IconsProps> = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const color = props.status === 'approved' ? 'state.success' : 'state.muted';
  const text =
    props.status === 'approved'
      ? t('approvals:approved')
      : t('approvals:declined');
  const icon =
    props.status === 'approved' ? (
      <StyledCheckCircleIcon className={classes.root} />
    ) : (
      <StyledCancelIcon className={classes.root} />
    );

  return (
    <Grid
      flexDirection={{ xxs: 'row', md: 'column' }}
      justifyContent={{ xxs: 'flex-end', md: 'center' }}
      padding={0}
      margin={0}
      height="100%"
      width="min-content"
    >
      <Box flexDirection="column" display="inherit" margin="24px">
        <Typography kind="buttonSmall" color={color} textAlign="center">
          {icon}
          {text}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Icons;
