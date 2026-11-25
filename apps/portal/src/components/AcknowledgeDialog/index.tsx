//@ts-nocheck
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, IconButton } from '@material-ui/core';
import { StyleDialog } from './acknowledgeDialog.style';
import { IoAcknowledgeDialog } from '@i-o/design-system';

const AcknowledgeDialog = (props: any) => {
  const { open, handleClose, handleFinish } = props;
  return (
    <StyleDialog open={open} onClose={handleClose} disableEnforceFocus style={{zIndex: "10000000000"}}>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="dialog-closeBtn"
        >
          <CloseIcon />
        </IconButton>
        <IoAcknowledgeDialog handleFinish={handleFinish} />
      </DialogContent>
    </StyleDialog>
  );
};

export default AcknowledgeDialog;
