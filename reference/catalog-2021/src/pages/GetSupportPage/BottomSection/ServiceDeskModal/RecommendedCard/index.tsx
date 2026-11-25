import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Box, Grid, Typography } from '@lumos/core';
import Badge from 'components/Badge';
import { FileIcon } from './FileIcon';
import { ChatIcon } from './ChatIcon';
import { TextButton } from '../../MDPModal/index.style';
import { openChat } from 'utils/chat';

export interface RecommendedCardProps {
  type: 'search' | 'chat';
  closeModal: () => void;
}
/** Card to display recommended action */
const RecommendedCard: React.FC<RecommendedCardProps> = ({
  type,
  closeModal,
}) => {
  const { t } = useTranslation('getSupport');

  return (
    <Card
      margin="10px"
      display="flex"
      flexDirection="column"
      width={{ xxs: 'auto', sm: '100%' }}
    >
      <Box marginTop="-12px" marginLeft="-12px">
        <Badge text={t('bottomSection.serviceDesk.modal.recommendedLabel')} />
      </Box>
      <Typography kind="body3">
        {type === 'search'
          ? t('bottomSection.serviceDesk.modal.searchArticleContent')
          : t('bottomSection.serviceDesk.modal.chatNowContent')}
      </Typography>
      <Box marginTop={{ xxs: '8px', sm: 'auto' }}>
        <Grid marginTop="auto" alignItems="center">
          {type === 'search' ? <FileIcon /> : <ChatIcon />}
          <TextButton
            onClick={() => {
              closeModal();
              if (type === 'search') {
                const searchBar = document.getElementById('search');
                if (searchBar) searchBar.focus();
                else console.error('"search" id missing from page');
              } else {
                openChat();
              }
            }}
            id="supportLink"
          >
            {type === 'search'
              ? t('bottomSection.serviceDesk.modal.searchArticleAction')
              : t('common:chatNow')}
          </TextButton>
        </Grid>
      </Box>
    </Card>
  );
};
export default RecommendedCard;
