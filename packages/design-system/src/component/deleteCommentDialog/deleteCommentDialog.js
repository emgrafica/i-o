import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import Typography from "@material-ui/core/Typography";
import "./deleteCommentDialog.scss";
import PropTypes from "prop-types";
import GeneralDialog, {
  ButtonComponentDialog,
} from "../generalDialog/generalDialog";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "io-delete-comment-dialog",
});

const DeleteCommentDialog = (props) => {
  const { isOpen, handleDelete, handleClose } = props;

  const content = (
    <>
      <WarningIcon />
      <Typography gutterBottom>Are you sure want to delete?</Typography>
    </>
  );

  const buttonSubmit = (
      <ButtonComponentDialog
        classname="button-default-1"
        color="#fff"
        backgroundColor="#333333"
        text="Delete"
        onClick={handleDelete}
      />
  );

  return (
    <StylesProvider generateClassName={generateClassName}>
      <GeneralDialog
        classname="delete-comment-dialog"
        deviders={true}
        isOpen={isOpen}
        content={content}
        buttonSubmit={buttonSubmit}
        handleClose={handleClose}
        disableBackdropClick={true}
        title=""
      />
    </StylesProvider>
  );
};
DeleteCommentDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleClose: PropTypes.func,
};
DeleteCommentDialog.defaultProps = {
  isOpen: false,
  handleDelete: () => {},
  handleClose: () => {},
};

export default DeleteCommentDialog;
