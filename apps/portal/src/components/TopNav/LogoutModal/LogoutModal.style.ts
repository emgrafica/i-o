import styled from 'styled-components';
import { Modal } from '@lumos/core';

/**
 * Wraps profile name and menu chevron.
 */
export const LogoutModalWrapper = styled(Modal)`
  border-radius: 12px;
  position: absolute;
  background-color: white;
  width: 543px;
  min-height: 205px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  .gUDgpY {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;
