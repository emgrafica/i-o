import styled from 'styled-components';
import { Button } from '@lumos/core';

/** Button component that controls the show more/show less for approval cards */
export const CollapsibleButton = styled(Button)`
  padding: 4px 1px;
  margin: 10px 0px;

  : hover {
    background: none;
  }
  : focus {
    background: none;
  }
`;
