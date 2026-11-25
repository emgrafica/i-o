import { Grid, Form } from '@lumos/core';
import styled from 'styled-components';

export const AgreementForm = styled(Form)`
  padding: 0;
`;

export const CheckboxWrapper = styled(Form.Item)`
  padding-left: 0;
  padding-right: 0;

  label {
    font-size: ${props => props.theme.fontSizes[1]}px;
  }
`;

export const CheckoutActionsContainer = styled(Grid)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
