import React from 'react';
import { Box, Grid, Typography } from '@lumos/core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InlineAvatar } from 'components/ViewDetails/index.style';
import { IncidentComments_incidentComments_items } from '../../../../../../graphql/queries/gqlTypes/IncidentComments';
import useLocaleDate from 'utils/useLocaleDate';

const CommentBox = styled(Box)`
  background-color: #f8f8f9;
  padding: 10px 8px 25px 8px;
  margin-bottom: 0 !important;

  & > div:first-child,
  & > div:first-child > div {
    display: flex;
    align-items: center;
  }
  & > div:first-child {
    justify-content: space-between;
    margin-bottom: 12px;
  }
`;

interface CommentCardProps {
  item: Omit<IncidentComments_incidentComments_items, '__typename'>;
}

const CommentCard: React.FC<CommentCardProps> = ({ item }) => {
  const { comment, createdOn, createdBy, userImage } = item;
  const { t } = useTranslation('requests');
  const formattedDate = useLocaleDate(createdOn, 'datetime');

  return (
    <CommentBox>
      <Grid justifyContent="space-between">
        <Box>
          <InlineAvatar
            imagePath={userImage}
            alt={t('requests:incident.altImage')}
          />
          <Typography kind="subtitle2">{createdBy.name}</Typography>
        </Box>
        <Box>
          <Typography kind="subtitle2">{formattedDate}</Typography>
        </Box>
      </Grid>
      <Box>
        <Typography kind="subtitle2">{comment}</Typography>
      </Box>
    </CommentBox>
  );
};

export default CommentCard;
