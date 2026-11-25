import styled from 'styled-components';
import { Button, Grid, Typography } from '@lumos/core';
import { IButtonProps } from '@lumos/core/lib/components/Button/Button';

const ComButton = styled(Button)`
  display: inline-block;
  font-weight: 400;
  color: #1d2833;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: 0.0375rem;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1.5;
  border-radius: 0;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-right-radius: 1.5625rem;
`;

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
>(ComButton)`
  border-color: #1d2833;
  color: #1d2833;
  background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(50%, transparent),
      color-stop(50%, #5f249f)
    )
    100%;
  background: linear-gradient(270deg, transparent 50%, #5f249f 0) 100%;
  background-size: 201% 100%;
  -webkit-transition: background-position 0.25s ease-in-out,
    color 0.25s ease-in-out;
  transition: background-position 0.25s ease-in-out, color 0.25s ease-in-out;
  :hover {
    color: #fff;
    border-color: #5f249f;
    background-position: 0;
    background-color: transparent;
  }
`;
