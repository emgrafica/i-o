import { ConnectChatWidget } from 'azure-connect-chat-react-component-widget';
import styled from 'styled-components';
import { Grid } from '@lumos/core';
import {
  STICKY_HEADER_HEIGHT,
  MOBILE_STICKY_HEADER_HEIGHT,
} from '../../constants';

// eslint-disable-next-line no-unexpected-multiline
export const StyledAppContainer = styled(Grid) <{
  addTopMargin: boolean;
  mobileTopMargin: boolean;
}>`
  margin-top: ${({ addTopMargin }) =>
    addTopMargin ? `${STICKY_HEADER_HEIGHT}px` : '0px'};
  height: ${({ addTopMargin }) =>
    addTopMargin ? `calc(100vh - ${STICKY_HEADER_HEIGHT}px)` : '100vh'};

  margin-top: ${({ addTopMargin, mobileTopMargin }) =>
    addTopMargin && mobileTopMargin && `${MOBILE_STICKY_HEADER_HEIGHT}px`};
  height: ${({ addTopMargin, mobileTopMargin }) =>
    addTopMargin &&
    mobileTopMargin &&
    `calc(100vh - ${MOBILE_STICKY_HEADER_HEIGHT}px)`};
  .notification-container{
    top: 50px;
    .title{
      color: white;
    }
  }
`;

export const StyleConnectChatWidgetWrapper = styled.div`
  & > .connect-chat-widget > button.close > svg > path {
    fill: #fff !important;
  }

  & > .connect-chat-widget > .connect-chat-widget__maximize-button {
    bottom: 30px;
    right: 30px;
    background-color: #5f249f;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > .connect-chat-widget > .connect-chat-widget__chat-box {
    bottom: 100px;
    right: 65px;
  }

  & > .connect-chat-widget > .connect-chat-widget__maximize-button > .ms-Icon {
    color: white;
  }

  &
    > .connect-chat-widget
    > .connect-chat-widget__chat-box
    > header
    > .header-container
    > .header-logo
    > .logo {
    padding-top: 20px;
    padding-bottom: 5px;
  }

  &
    > .connect-chat-widget
    > .connect-chat-widget__chat-box
    > .landing-page-web-chat
    > form
    > div.grid-container {
    padding: 0px;

    > div.grid-item {
      margin: 5px;

      > #customUserAttribute4 {
        height: 30px;
      }
    }
  }

  & 
    > .connect-chat-widget > .connect-chat-widget__chat-box > .connect-chat-widget__footer > .button-end-chat {
      color: #fff;
      background-color: #5f249f !important;
      margin: 10px auto !important;
    }
  &
  .connect-chat-widget > .connect-chat-widget__chat-box > .react-web-chat {
    a:hover{
      color: #5f249f;
    }
  }
  & .connect-chat-widget > .connect-chat-widget__chat-box > .connect-chat-widget__header > .connect-chat-widget__header--container > .connect-chat-widget__header--logo .logo {
    width: 138px !important;
    height: 25px !important;
    margin-top: 20px;
  }

`;
