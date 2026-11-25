import React from 'react';
import { Button, Grid, Popover, Typography, Box } from '@lumos/core';
import ContactUsIcon from 'assets/images/getSupport/contactUsIcon.svg';
import { GET_CHAT_CONFIG } from 'graphql/queries/ChatConfiguration';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  ChatConfiguration,
  ChatConfigurationVariables,
} from 'graphql/queries/gqlTypes/ChatConfiguration';
import { HelpDeskType } from 'gqlTypes/globalTypes';
import { useLocation } from 'react-router-dom';
import { openChat } from 'utils/chat';
import { useTranslatedQuery } from 'hooks/useTranslatedQuery';

/** Button to open the chat windows */
const ChatButton: React.FC = () => {
  const { t } = useTranslation();
  const userId = useUserId();
  const location = useLocation();

  const { data } = useTranslatedQuery<
    ChatConfiguration,
    ChatConfigurationVariables
  >(GET_CHAT_CONFIG, {
    variables: {
      userId: userId ? userId : '',
    },
  });
  const isGetSupportPage = location.pathname.includes('/get-support');

  const chatConfig = data && data.chatConfiguration;

  const disableTooltip =
    chatConfig && chatConfig.helpdesk === HelpDeskType.internal;

  const tooltipDescription = (
    <>
      {chatConfig && chatConfig.description
        ? (chatConfig.description as Array<string>).map((item: string) => {
            return (
              <Typography key={item} kind="body2">
                {item}
              </Typography>
            );
          })
        : null}
    </>
  );

  const tooltipContent = (
    <Grid height="fit-content" margin="16px">
      {chatConfig && (
        <Box>
          <Typography kind="body1" fontSize="18px">
            {chatConfig.title}
          </Typography>
          {tooltipDescription}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={chatConfig.url ? chatConfig.url : '.'}
          >
            <Typography kind="body1">{chatConfig.urlName}</Typography>
          </a>
        </Box>
      )}
    </Grid>
  );

  if (!chatConfig || !isGetSupportPage) return null;
  return (
    <Grid
      position="sticky"
      bottom="10px"
      top="100px"
      marginTop="-55px"
      justifyContent="flex-end"
    >
      <Box position="relative" right="40px" bottom="10px">
        <Popover
          disabled={disableTooltip}
          right="50px"
          trigger="click"
          height="fit-content"
          maxWidth="250px"
          id="chatTooltip"
          content={tooltipContent}
          placement="top"
        >
          <Button
            kind="primary"
            onClick={() => disableTooltip && openChat()}
            marginLeft="auto"
            marginRight={{ xxs: '10px', xs: '20px' }}
            backgroundColor="secondary.0"
            borderRadius="100px"
            fontSize="18px"
            fontWeight="bold"
            style={{ outline: 'none' }}
            textTransform="none"
            width="178px"
            height="54px"
            id="contactUs"
          >
            <Grid
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={ContactUsIcon}
                alt="chat icon"
                height="31px"
                width="27px"
              />
              <Grid paddingLeft="12px">{t('common:contactUs')}</Grid>
            </Grid>
          </Button>
        </Popover>
      </Box>
    </Grid>
  );
};

export default ChatButton;
