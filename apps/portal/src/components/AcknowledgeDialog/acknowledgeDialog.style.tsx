import styled from 'styled-components';
import { Dialog } from '@material-ui/core';

export const StyleDialog = styled(Dialog)`
    .MuiDialog-container {
      .MuiDialogContent-root {
        padding: 0;
      }
      .dialog-closeBtn {
        position: absolute;
        right: 10px;
        top: 6px;
        color: white;
        height: 5px;
        width: 5px;
      }  
    }
`;
