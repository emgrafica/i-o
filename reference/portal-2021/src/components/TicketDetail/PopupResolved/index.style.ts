import styled from 'styled-components';
import { Button, Dialog } from '@material-ui/core';

export const StyledButton = styled(Button)`
  background-color: $color-purple-main;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.3;
  width: 100px;
  height: 45px;
  border-radius: 6px;
`;

export const StyledDialog = styled(Dialog)`
  z-index: 13000000000000 !important;
  .MuiPaper-rounded {
    border-radius: 40px !important;
    width: 375px;
  }
  .MuiDialogContent-dividers {
    border-top: 1px solid black;
    border-bottom: none;
    margin: 0 15px;
    padding: 16px 10px;
  }
  .customized-dialog-title {
    .title {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 24px !important;
      color: #5f249f;
      font-weight: bold !important;
    }
    text-align: center;
    border-bottom: none;
    .customized-dialog-close-button {
      position: absolute;
      right: 15px;
      top: 20px;
      color: #5f249f;
      font-size: 40px !important;
    }
  }
  .customized-dialog-actions {
    margin: 0;
    padding: 0px 8px 16px 8px;
    justify-content: center !important;
    .button-dialog {
      background-color: #5f249f;
      color: #fff;
      font-weight: bold;
      line-height: 1.3;
      border-radius: 6px;
      width: 100px;
      height: 45px;
      font-size: 14px;
    }
    .button-dialog-disabled {
      cursor: not-allowed;
      background-color: #5f249f;
      color: #fff;
      font-weight: bold;
      line-height: 1.3;
      border-radius: 6px;
      width: 100px;
      height: 45px;
      font-size: 14px;
    }
  }
  .input-dialog {
    width: 100%;
    min-height: 70px;
    margin-top: 5px;
    border: 1px solid black;
    background-color: #f0f0f0;
    .MuiInputBase-input {
      height: 40px !important;
      padding: 5px;
    }
  }
`;
