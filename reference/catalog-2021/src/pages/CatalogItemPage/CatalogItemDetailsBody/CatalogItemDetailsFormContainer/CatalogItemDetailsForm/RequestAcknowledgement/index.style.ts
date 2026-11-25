import styled from 'styled-components';
import { Form } from '@lumos/core';

// eslint-disable-next-line no-unexpected-multiline
export const InlineCheckboxItem = styled(Form.Item)<{
  justifyContent: string;
}>`
  justify-content: ${({ justifyContent }) => justifyContent};
  label {
    cursor: pointer;
  }
`;
