import styled from 'styled-components';
import { Grid } from '@lumos/core';
import {
  STICKY_HEADER_HEIGHT,
  MOBILE_STICKY_HEADER_HEIGHT,
} from '../../constants';

// eslint-disable-next-line no-unexpected-multiline
export const StyledAppContainer = styled(Grid)<{
  addTopMargin: boolean;
  mobileTopMargin: boolean;
}>`
  margin-top: ${({ addTopMargin }) =>
    addTopMargin ? `${STICKY_HEADER_HEIGHT}px` : '0px'};
  height: ${({ addTopMargin }) =>
    addTopMargin ? `calc(100vh - ${STICKY_HEADER_HEIGHT}px)` : '100vh'};

  margin-top: ${({ addTopMargin, mobileTopMargin }) =>
    addTopMargin && mobileTopMargin && `${MOBILE_STICKY_HEADER_HEIGHT}px`};
  height: ${({ addTopMargin, mobileTopMargin }) =>
    addTopMargin &&
    mobileTopMargin &&
    `calc(100vh - ${MOBILE_STICKY_HEADER_HEIGHT}px)`};
`;
