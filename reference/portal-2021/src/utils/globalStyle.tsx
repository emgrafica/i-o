// @ts-nocheck
import { DefaultLumosTheme } from '@lumos/core';
// import lumosTheme from './lumosTheme';
import { createGlobalStyle } from 'styled-components';

/**
 * Global styles for the entire app
 */
const GlobalStyle = createGlobalStyle<{ theme: typeof DefaultLumosTheme }>`
  /*make the chat tooltip fixed so it scrolls with the page*/
  #chatTooltip[role=tooltip] {
    position: fixed;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      top: 550px;
      margin-top: 100px;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      top: 745px;
      margin-top: 90px;
    }
  }

  /* anchor tags */
  a {
    color: ${({ theme }) => theme.colors.impact[0]};
    text-decoration: none;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.impact[2]};
  }
  a::disabled{
    color: ${({ theme }) => theme.colors.state.disabled};
  }

  /* welcome modal */
  .welcome-modal {
    position: absolute;
    background-color: white;
    min-width: 1024px;
    /* ------------------------------------------------------------------ */
    /* This will add an scroll to the modal if window height is too small */
    max-height: 95vh;
    overflow-y: auto;
    /* ------------------------------------------------------------------ */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    :focus {
        outline: none;
    }
  }
  .welcome-modal-overlay {
    ${({ theme }) => `
      z-index: ${theme.zIndices[4]};
    `}
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export default GlobalStyle;
