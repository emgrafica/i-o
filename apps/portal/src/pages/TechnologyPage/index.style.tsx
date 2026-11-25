import { Typography, Box, Button, Grid, Form } from '@lumos/core';
import styled from 'styled-components';
import { StyledXl4CenterColumn } from 'components/Layout/index.style';

export const StyledSideSheetTitle = styled(Typography).attrs({
  kind: 'h5',
})`
  color: ${props => props.theme.colors.primary[1]};
  margin-bottom: 20px;
`;

export const AlignCenter = styled(Grid)`
  justify-content: center;
  align-content: center;
  padding-top: ${props => props.theme.space[10]}px;
`;

export const StyledBox = styled(Box)`
  margin-top: ${props => props.theme.space[10]}px;
  padding-left: ${props => props.theme.space[6]}px;
  padding-right: ${props => props.theme.space[6]}px;
`;

export const ActionButton = styled(Button).attrs({
  fullWidth: true,
})`
  margin: 0;
  text-align: left;

  & > span {
    text-transform: capitalize;
  }
`;

export const FormActionGroup = styled(Grid)`
  justify-content: flex-end;
  & > * {
    margin-left: 20px;
  }
`;

export const SubTitle = styled(Typography).attrs({
  kind: 'subtitle1',
})`
  font-size: ${props => props.theme.fontSizes[2]}px;
`;

export const Paragraph = styled(Typography).attrs({
  kind: 'body1',
})`
  color: ${props => props.theme.colors.secondary[0]};
`;
export const SidesheetContent = styled.div`
  margin-top: 40px;
  margin-left: -12px;
  margin-right: -12px;
`;
export const StyledForm = styled(Form)`
  padding-left: 0;
  padding-right: 0;
  margin-left: -12px;
  margin-right: -12px;

  legend {
    color: ${props => props.theme.colors.primary[1]};
    font-size: ${props => props.theme.fontSizes[5]}px;
    font-weight: 500;
  }
`;

export const StyledFormItem = styled(Form.Item)`
  padding-left: 0;
  padding-right: 0;
  padding-top: 20px;

  label {
    color: ${props => props.theme.colors.primary[1]};
    font-size: ${props => props.theme.fontSizes[2]}px;
    font-weight: 700;
  }
`;

export const InlineCheckboxItem = styled(Form.Item)`
  align-items: flex-start;
  & > label {
    margin: 0;
    font-size: 16px;
  }
  & > div {
    min-width: 18px;
  }
`;
export const SideSheetLayout = styled(StyledXl4CenterColumn)`
  position: relative;
`;

export const SideSheetBody = styled(Box)`
  margin-top: 60px;
  margin-bottom: 84px;
`;

export const SideSheetFooter = styled(Box)`
  position: absolute;
  bottom: 24px;
  right: 0;
  display: flex;
  justify-content: flex-end;
`;
