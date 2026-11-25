import { Box } from '@lumos/core';
import styled from 'styled-components';

// Styled Box that wraps override element message and checkbox
export const OverrideElementBox = styled(Box)`
  border: ${props => `1px solid ${props.theme.colors.primary[0]}`};
  box-shadow: ${props => `0 1px 2px ${props.theme.colors.primary[0]}`};
  border-radius: 3px;
`;
