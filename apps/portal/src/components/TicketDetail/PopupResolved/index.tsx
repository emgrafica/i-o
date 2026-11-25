// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { StyledDialog } from './index.style';
import {
  Input,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AUTH } from 'constants/authConstants';
import { incidentResolved } from 'services/ticketServices';

export interface ResovledProps {
  isOpen: boolean;
  setOpenResolved: React.Dispatch<React.SetStateAction<boolean>>;
  infoTicketDetail: object;
  commentResolvedOrReopenChange: number;
  onChangeSubmitResolved: Function;
}

const ResovledPopup: React.FC<ResovledProps> = ({
  setOpenResolved,
  isOpen,
  infoTicketDetail,
  commentResolvedOrReopenChange,
  onChangeSubmitResolved,
}) => {
  const [resolvedReason, setResolvedReason] = useState('');
  const [errorBtn, setErrorBtn] = useState(false);
  const [enableComment, setEnableComment] = useState(false);
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = JSON.parse(currentUser);

  const handleClose = () => {
    setResolvedReason('');
    setOpenResolved(false);
  };

  const handleChange = event => {
    if (event.target.value) {
      setResolvedReason(event.target.value);
      setErrorBtn(true);
    } else if (event.target.value === '') {
      setResolvedReason('');
      setErrorBtn(false);
    }
  };

  const handleSubmit = async event => {
    const userName = currentUser.user_name;
    const incidentID = infoTicketDetail?.id;
    const comment = event;
    if (comment.trim() !== '') {
      if (infoTicketDetail?.id && infoTicketDetail?.actions?.canResolve) {
        const response = await incidentResolved({
          userName: userName,
          comment: comment,
          incidentId: incidentID,
        });
        if (response.status === 200) {
          onChangeSubmitResolved((commentResolvedOrReopenChange += 1));
        }
      } else {
        return 'not valued';
      }
      handleClose();
    } else {
      setResolvedReason('');
      setErrorBtn(false);
    }
  };

  useEffect(() => {
    if (infoTicketDetail?.actions.requiredResolveComment === true) {
      setEnableComment(true);
    } else {
      setEnableComment(false);
    }
  }, [infoTicketDetail]);

  return (
    <>
      <StyledDialog onClose={handleClose} id="customized-dialog" open={isOpen}>
        <DialogTitle
          className="customized-dialog-title"
          disableTypography={true}
          onClick={handleClose}
        >
          <span className="title">Mark as Resolved</span>
          {isOpen ? (
            <IconButton
              className="customized-dialog-close-button"
              onClick={handleClose}
              size="medium"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers className="customized-dialog-content">
          <Typography gutterBottom>
            You need to provide a comment before marking{' '}
            <b>{infoTicketDetail?.number}</b> as resolved.
          </Typography>
          {enableComment ? (
            <Input
              className="input-dialog"
              multiline={true}
              disableUnderline={true}
              placeholder="add comment here..."
              type="text"
              value={resolvedReason}
              onChange={event => handleChange(event)}
            />
          ) : (
            <Input
              multiline={true}
              disableUnderline={true}
              placeholder="add comment here..."
              disabled
              className="input-dialog"
            />
          )}
        </DialogContent>
        <DialogActions className="customized-dialog-actions">
          {errorBtn ? (
            <Button
              className="button-dialog"
              onClick={() => handleSubmit(resolvedReason)}
            >
              MARK RESOLVED
            </Button>
          ) : (
            <Button className="button-dialog-disabled">MARK RESOLVED</Button>
          )}
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ResovledPopup;
