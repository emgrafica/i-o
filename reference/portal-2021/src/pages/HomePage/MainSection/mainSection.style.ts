import { Form, Box, Typography } from '@lumos/core';
import styled from 'styled-components';
import { Dialog } from '@material-ui/core';
import { color } from 'styled-system';

export const FormItemWrapper = styled(Form.Item)`
  > div > div > ul > button > div > span,
  > div > div > button > label {
    overflow: visible;
    padding: 3px 0;
    //background-color: yellow;
  }
`;

export const TicketShortcutStyle = styled(Box)`
  img {
    width: 100px;
    height: 100px;
  }
`;

export const StyleOutageNotification = styled(Box)`
  .Toastify__toast-icon {
    display: none;
  }
  .Toastify__toast-container--top-right {
    top: 5em;
    .Toastify__toast--info {
      border-radius: 6px;
    }
  }
  .outage-icon {
    img {
      width: 30px;
      margin: 0 5px;
    }
  }
  .outage-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 5px 0;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
  }
  .outage-content {
    font-size: 12px;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #ffffff;
  }
`;

export const StyleOutageDialog = styled(Dialog)`
  .MuiDialog-container {
    .MuiDialogContent-root {
      padding: 0;
    }
    .outage-closeBtn {
      position: absolute;
      right: 0;
      top: 0;
    }
    .outage-card-container {
      width: 100%;
      height: 100%;
      .outage-content {
        -webkit-line-clamp: 2;
      }
    }
  }
`;

export const StyledOutageComponent = styled(Box)`
  &.hidden-outage {
    display: none;
  }
`;

export const StyledMainSection = styled(Box)`
  .MuiPaper-elevation1 {
    cursor: pointer;
    box-shadow: 4px 10px 30px 4px rgb(36 14 47 / 6%);
    &:hover {
      box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
        0 5px 12px 4px rgb(0 0 0 / 9%);
      border-color: transparent;
    }
  }
  .ant-card.single-card,
  .my-stuff-card {
    h5 {
      font-weight: 500;
    }
  }
  .ant-card.general-card {
    h6 {
      font-weight: 500;
    }
  }
  .io-device-pc {
    .io-device-card-deviceName {
      font-weight: 500 !important;
    }
  }
  .top-knowledge-articles{
    position: initial;
    .chip{
      .eyebrow{
        position: initial;
        width: 162px;
  
      }
    }
  }

`;

export const StyledViewMoreLink = styled(Typography).attrs(_ => ({
  kind: 'body2',
}))`
  font-size: ${props => props.theme.fontSizes[1]}px;
  line-height: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
  width: fit-content;
  ${color} :hover {
    cursor: pointer;
    color: ${props => props.theme.colors.primary[1]};
  }
  :hover {
    &:after {
      opacity: 1;
    }
  }
`;
