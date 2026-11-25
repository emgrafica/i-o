import React, { useState } from "react";
import "./editComment.scss";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { IconButton, Paper, TextField, Box } from "@material-ui/core";
import { CheckCircle, Cancel, Close } from "@material-ui/icons";
import GeneralDialog, {
  ButtonComponentDialog,
} from "../../generalDialog/generalDialog";

const generateClassName = createGenerateClassName({
  productionPrefix: "io-edit-comment",
});

const EditComment = (props) => {
  const { comment, handleCancelEdit, submitEditComment } = props;
  const [inputVal, setInputVal] = useState(
    ReactHtmlParser(comment?.comments)[0] || ""
  );
  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);
  const [hasErr, setHasErr] = useState(false);

  const ButtonActionComment = (props) => {
    const { txtCancel, txtConfirm, handleCancel, handleConfirm } = props;
    return (
      <>
        <ButtonComponentDialog
          variant="outlined"
          startIcon={<Cancel />}
          color="#000000"
          backgroundColor="#fff"
          text={txtCancel}
          onClick={handleCancel}
        />
        <ButtonComponentDialog
          startIcon={<CheckCircle />}
          color="#fff"
          backgroundColor="#000000"
          text={txtConfirm}
          onClick={handleConfirm}
        />
      </>
    );
  };

  const handleChange = (event) => {
    if (event.target.value) {
      if(event.target.value.trim() !== "") {
        setHasErr(false);
      } else {
        setHasErr(true);
      }
      setInputVal(event.target.value);
    } else {
      setInputVal("");
      setHasErr(true);
    }
  };

  const handleOnKeyPress = (e, commentVal, uid = "") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (commentVal === ReactHtmlParser(comment?.comments)[0]) {
        setInputVal("");
        handleCancelEdit();
      } else {
        if (commentVal.trim() !== "") {
          setInputVal("");
          submitEditComment(commentVal, uid);
        }
      }
    }
  };

  const handleSubmitEditComment = (commentVal, uid) => {
    if (commentVal === ReactHtmlParser(comment?.comments)[0]) {
      setInputVal("");
      handleCancelEdit();
    } else {
      if (commentVal.trim() !== "") {
        setInputVal("");
        submitEditComment(commentVal, uid);
      }
    }
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Box className="edit-comment">
        <Paper component="form" className="cmt-form">
          <IconButton
            aria-label="close"
            className="edit-button-close"
            onClick={() => setIsOpenCancelDialog(true)}
          >
            <Close />
          </IconButton>
          <TextField
            id="multiline-comment"
            multiline
            value={inputVal}
            onKeyPress={(e) => handleOnKeyPress(e, inputVal, comment.uid)}
            onChange={(event) => handleChange(event)}
          />
          {!!hasErr && (
            <p className="captionRegular">Please type a message to continue</p>
          )}
          <Box className="edit-comment-btn">
            <ButtonActionComment
              txtCancel="CANCEL"
              txtConfirm="OK"
              handleCancel={() => setIsOpenCancelDialog(true)}
              handleConfirm={() =>
                handleSubmitEditComment(inputVal, comment.uid)
              }
            />
          </Box>
        </Paper>
        <GeneralDialog
          classname="cancel-edit-dialog"
          deviders={true}
          isOpen={isOpenCancelDialog}
          content={"Do you want to discard this draft?"}
          buttonSubmit={
            <ButtonActionComment
              txtCancel="CLOSE"
              txtConfirm="DISCARD"
              handleCancel={() => setIsOpenCancelDialog(false)}
              handleConfirm={() => handleCancelEdit()}
            />
          }
          hideButtonCancel={true}
          title=""
        />
      </Box>
    </StylesProvider>
  );
};
EditComment.propTypes = {
  comment: PropTypes.object,
  handleCancelEdit: PropTypes.func,
  submitEditComment: PropTypes.func,
};
EditComment.defaultProps = {
  comment: {},
  handleCancelEdit: () => {},
  submitEditComment: () => {},
};

export default EditComment;
