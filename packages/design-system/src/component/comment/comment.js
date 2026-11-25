import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, InputBase, Paper } from "@material-ui/core";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import "./comment.scss";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import NavigationIcon from '@material-ui/icons/Navigation';

const generateCommentClassName = createGenerateClassName({
  productionPrefix: "io-comment"
});

const Comment = (props) => {
  return (
    <StylesProvider generateClassName={generateCommentClassName}>
      <Box className={`comments-wrap`}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Box className="avatar-input" pr={2}>
              <Avatar
                src={!!props.avatar ? props.avatar : "/broken-image.jpg"}
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Paper component="form" className="cmt-form">
              <InputBase
                className="input"
                placeholder="Add a comment"
                inputProps={{ "aria-label": "Add a comment" }}
                value={props.value}
                onKeyPress={(e) => props.onKeyPress(e)}
                onChange={(event) => props.handleChange(event)}
                disabled={!props.canComment}
                required={true}
              />
              <IconButton
                className={`submit-btn ${
                  !!props.value ? "submit-active-btn" : ""
                }`}
                type="button"
                aria-label="search"
                onClick={props.submitComment}
              >
                <NavigationIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </StylesProvider>
  );
}

Comment.propTypes = {
  submitComment: PropTypes.func,
  onKeyPress: PropTypes.func,
  handleChange: PropTypes.func,
  canComment: PropTypes.bool,
  value: PropTypes.string
}

Comment.defaultProps = {
  submitComment: () => { },
  onKeyPress: () => { },
  handleChange: () => { },
  canComment: false,
  value: 'Add a comment'
}

export default Comment