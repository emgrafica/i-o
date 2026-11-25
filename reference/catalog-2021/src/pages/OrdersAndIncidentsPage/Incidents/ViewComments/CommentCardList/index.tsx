import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@lumos/core';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { INCIDENT_COMMENTS } from 'graphql/queries/incidentComments';
import {
  IncidentComments,
  IncidentComments_incidentComments_items,
  IncidentCommentsVariables,
} from 'graphql/queries/gqlTypes/IncidentComments';
import ErrorScreen from 'components/ErrorScreen';
import CommentCard from './CommentCard';
import { useTranslation } from 'react-i18next';
import SkeletonChat from './CommentCard/SkeletonChat';

const CardListBox = styled(Box)`
  max-height: 446px;
  overflow-y: auto;
`;

const EmptyBox = styled(Box)`
  height: 446px;
  background-color: #f8f8f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sortByDateOldest = (
  a: IncidentComments_incidentComments_items,
  b: IncidentComments_incidentComments_items,
) => a.createdOn - b.createdOn;

interface CommentCardListProps {
  incidentId: string;
  commentAdded: number;
}

const CommentCardList: React.FC<CommentCardListProps> = ({
  incidentId,
  commentAdded,
}) => {
  const { t } = useTranslation('requests');
  const elm = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery<
    IncidentComments,
    IncidentCommentsVariables
  >(INCIDENT_COMMENTS, {
    variables: {
      incidentId,
    },
  });

  // scroll to the bottom when that a comment is added is signalled.
  useEffect(() => {
    if (elm.current && commentAdded) {
      elm.current.scrollTop = elm.current.scrollHeight;
    }
  }, [commentAdded]);

  if (loading) {
    return (
      <>
        <SkeletonChat /> <SkeletonChat />
      </>
    );
  }
  if (!data || error) {
    return <ErrorScreen />;
  }

  return (
    <CardListBox tabIndex={0} ref={elm}>
      {data.incidentComments.items.length === 0 ? (
        <EmptyBox>
          <Typography kind="body1" color="secondary.0">
            {t('incident.noComments')}
          </Typography>
        </EmptyBox>
      ) : (
        data.incidentComments.items.sort(sortByDateOldest).map((item, idx) => (
          // todo - comment doesn't have id yet, it is not optimal to always
          //  rerender them as comment stay immutable. we could use a hash
          //  algo based on all fields of the comment to make id.
          <CommentCard key={idx} item={item} />
        ))
      )}
    </CardListBox>
  );
};
export default CommentCardList;
