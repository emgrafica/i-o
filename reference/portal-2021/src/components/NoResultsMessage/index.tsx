import React from 'react';
import { Grid, Typography } from '@lumos/core';
import styled from 'styled-components';

/** No Results Message Props */
interface NoResultsMessageProps {
  /** Message to display when no results are found */
  message: string;
  /** Icon to display when no results are found */
  icon: React.ReactElement;
}

const IconWrapper = styled.div`
  margin-right: 20px;
  & svg {
    height: 72px;
    width: 72px;
  }
`;

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  message,
  icon,
}) => (
  <Grid justifyContent="center" alignItems="center" marginTop="95px">
    <IconWrapper>{icon}</IconWrapper>
    <Typography kind="h5" color="secondary.0">
      {message}
    </Typography>
  </Grid>
);

export default NoResultsMessage;
