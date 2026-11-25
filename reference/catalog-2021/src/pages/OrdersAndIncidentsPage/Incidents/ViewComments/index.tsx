import React, { useReducer } from 'react';
import { StyledXlGrid4Tracks } from 'components/Layout/index.style';
import { Header } from 'components/ViewDetails/index.style';
import { Button } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { ActionTypes, IncidentAction } from '../../types';
import { useRequestContext } from '../../index';
import CommentCardList from './CommentCardList';
import CommentForm from './CommentForm';
import {
  SideSheetBody,
  SideSheetFooter,
  SideSheetLayout,
} from 'pages/TechnologyPage/index.style';

const ViewComments: React.FC = () => {
  const { t } = useTranslation('requests');
  const { state, dispatch } = useRequestContext();
  const [commentAdded, setCommentAdded] = useReducer((x: number) => x + 1, 0);

  const handleSideSheetClose = () => {
    dispatch({
      type: ActionTypes.SET_INCIDENT_DATA,
      payload: { incidentData: null, incidentAction: IncidentAction.None },
    });
  };

  // todo - Invalid state, may be we should throw?
  if (!state.incidentData) {
    return null;
  }

  return (
    <StyledXlGrid4Tracks data-testid="incidents-comments-sidesheet">
      <SideSheetLayout>
        <SideSheetBody>
          <Header>{t('incident.commentsTitle')}</Header>
          <CommentCardList
            incidentId={state.incidentData.incidentId}
            commentAdded={commentAdded}
          />
          <CommentForm
            canAddComment={state.incidentData.actions.canAddComment}
            incidentId={state.incidentData.incidentId}
            incidentNumber={state.incidentData.incidentNumber}
            dispatchCommentAdded={setCommentAdded}
          />
        </SideSheetBody>
        <SideSheetFooter>
          <Button
            kind="secondary"
            size="small"
            data-testid="close"
            onClick={handleSideSheetClose}
            aria-label={t('common:closeBtn')}
          >
            {t('common:close')}
          </Button>
        </SideSheetFooter>
      </SideSheetLayout>
    </StyledXlGrid4Tracks>
  );
};

export default ViewComments;
