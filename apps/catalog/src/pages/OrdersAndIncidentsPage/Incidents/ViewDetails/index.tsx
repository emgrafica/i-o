import { Button } from '@lumos/core';
import { StyledXlGrid4Tracks } from 'components/Layout/index.style';
import { useRequestContext } from 'pages/OrdersAndIncidentsPage';
import {
  BottomRightActions,
  Header,
  ViewDetailsContent,
} from 'components/ViewDetails/index.style';
import {
  ActionTypes,
  IncidentAction,
} from 'pages/OrdersAndIncidentsPage/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RequestSectionIncident from './RequestSection';

const ViewDetails: React.FC = () => {
  const { t } = useTranslation('requests');
  const { state, dispatch } = useRequestContext();
  const { incidentData } = state;

  if (!incidentData) return null;

  const handleSideSheetClose = () => {
    dispatch({
      type: ActionTypes.SET_INCIDENT_DATA,
      payload: { incidentData: null, incidentAction: IncidentAction.None },
    });
  };

  return (
    <>
      <StyledXlGrid4Tracks data-testid="incidents-sidesheet">
        <ViewDetailsContent>
          <Header>{t('incident.sideSheetTitle')}</Header>
          <RequestSectionIncident incident={incidentData} />
          <BottomRightActions>
            <Button
              kind="primary"
              size="small"
              data-testid="close"
              onClick={handleSideSheetClose}
            >
              {t('common:close')}
            </Button>
          </BottomRightActions>
        </ViewDetailsContent>
      </StyledXlGrid4Tracks>
    </>
  );
};

export default ViewDetails;
