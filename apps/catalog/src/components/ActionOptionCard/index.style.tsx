import styled from 'styled-components';
import { Button, Grid, Typography } from '@lumos/core';
import { IButtonProps } from '@lumos/core/lib/components/Button/Button';

export const StyledActionGrid = styled(Grid)`
  height: 100%;
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
`;

export const StyledActionTitleGrid = styled(Grid)`
  flex-direction: row;
  align-items: center;
`;

export const StyledActionTitle = styled(Typography)`
  padding-left: ${props => props.theme.space[2]}px;
  margin: ${props => props.theme.space[0]}px;
`;

export const StyledActionButtonGrid = styled(Grid)`
  justify-content: flex-end;
  align-items: center;
`;

export const StyledActionButton = styled<
  React.FC<IButtonProps & { showWipHomePageActionOptionCard: boolean }>
>(Button)`
  border-radius: 3px;
  padding: 9px 18px;
  font-size: 0.8125rem;
  font-weight: bold;
  cursor: ${({ showWipHomePageActionOptionCard }) =>
    showWipHomePageActionOptionCard ? 'pointer' : 'default'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ showWipHomePageActionOptionCard }) =>
    showWipHomePageActionOptionCard ? 'auto' : 'none'};
  min-width: 150px;
  text-align: center;
  background-image: none;
`;
