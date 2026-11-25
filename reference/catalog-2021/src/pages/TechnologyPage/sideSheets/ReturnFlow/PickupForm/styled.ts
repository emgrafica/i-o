import { Form, Grid } from '@lumos/core';
import styled from 'styled-components';

export const StyledGrid = styled(Grid)`
  justify-content: flex-end;
`;

export const StyledForm = styled(Form)`
  padding: 0px;
  margin-top: 62px;

  legend {
    color: ${props => props.theme.colors.primary[1]};
    font-size: ${props => props.theme.fontSizes[5]}px;
    font-weight: 500;
  }
`;

export const StyledFormItem = styled(Form.Item)`
  padding-left: 0;
  padding-right: 0;

  label {
    color: ${props => props.theme.colors.primary[1]};
    font-size: ${props => props.theme.fontSizes[0]}px;
  }
`;

export const StyledTextArea = styled(Form.Item)`
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 44px;
`;
