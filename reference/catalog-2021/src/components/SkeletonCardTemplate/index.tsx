import { Grid } from '@lumos/core';
import styled from 'styled-components';

export default styled(Grid)`
  border: 1px solid ${props => props.theme.colors.grayScale[2]};
`;
