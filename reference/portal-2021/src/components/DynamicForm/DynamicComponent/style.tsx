import styled from 'styled-components';
import { TextField, Link } from '@material-ui/core';

export const CustomLink = styled(Link)`
  color: #5f249f !important;
  : hover {
    color: #5f249f;
  }
`;

export const CustomTextField = styled(TextField)`
  input {
    border-bottom: none !important;
  }
  input[type='number']::-webkit-inner-spin-button {
    display: none;
  }
`;
