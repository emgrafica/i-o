// @ts-nocheck
import { Box, Typography, Button } from '@lumos/core';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { HlxButton } from '@i-o/design-system';
interface NotificationForm {
  title: string;
  description: string;
  btnLbl: string;
  btnAction: Function;
  image: any;
}

const NotificationForm: React.FC<NotificationForm> = ({
  title,
  description,
  image,
  btnLbl,
  btnAction,
}) => {
  return (
    <Box>
      <Typography
        kind="h2"
        fontWeight="bold"
        color="grayScale.10"
        marginX="24px"
        textAlign="center"
      >
        {title}
      </Typography>
      <Typography
        kind="h4"
        color="grayScale.10"
        marginX="24px"
        textAlign="center"
      >
        {ReactHtmlParser(description)}
      </Typography>
      <Box justifyContent="center" display="flex">
        <img src={image} alt="Process" width="300px" />
      </Box>
      <Box justifyContent="center" display="flex" padding="20px">
        <HlxButton
          label={btnLbl.toUpperCase()}
          style={{width: 200}}
          onClick={() => {
            btnAction();
          }}
        >
        </HlxButton>
      </Box>
    </Box>
  );
};

export default NotificationForm;
