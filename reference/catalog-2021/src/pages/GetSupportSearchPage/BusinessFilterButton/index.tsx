import styled from 'styled-components';
import { Button } from '@lumos/core';

/** Button to open sidesheet to filter Business Applications by business **/
export const BusinessFilterButton = styled(Button).attrs(_ => ({
  kind: 'secondary',
  id: 'businessFilter',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
`;
