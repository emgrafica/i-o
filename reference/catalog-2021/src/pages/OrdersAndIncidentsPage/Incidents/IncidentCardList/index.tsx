import React, { useState } from 'react';
import {
  IncidentsByUser_incidentsSearch,
  IncidentsByUser_incidentsSearch_items,
} from 'graphql/queries/gqlTypes/IncidentsByUser';
import IncidentCard from './IncidentCard';
import { useRequestContext } from '../../index';
import { ActionTypes, IncidentAction } from '../../types';
import CancelModal from './CancelModal';
import ReopenModal from '../Reopen';
import { WideCard } from 'components/WideCard';

type CardListProps = Pick<IncidentsByUser_incidentsSearch, 'items'>;

const IncidentCardList: React.FC<CardListProps> = ({ items }) => {
  const { dispatch } = useRequestContext();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);
  const [incidentIsUpdating, setIsUpdating] = useState<string>('');

  const doHandle = (
    incident: IncidentsByUser_incidentsSearch_items,
    action: IncidentAction,
  ) => {
    dispatch({
      type: ActionTypes.SET_INCIDENT_DATA,
      payload: { incidentData: incident, incidentAction: action },
    });
  };

  const handleViewDetails = (
    incident: IncidentsByUser_incidentsSearch_items,
  ) => {
    doHandle(incident, IncidentAction.ViewDetails);
  };

  const handleComments = (incident: IncidentsByUser_incidentsSearch_items) => {
    doHandle(incident, IncidentAction.Comment);
  };

  const handleCancel = (incident: IncidentsByUser_incidentsSearch_items) => {
    doHandle(incident, IncidentAction.Cancel);
    setIsCancelModalOpen(true);
  };

  const handleReopen = (incident: IncidentsByUser_incidentsSearch_items) => {
    doHandle(incident, IncidentAction.Reopen);
    setIsReopenModalOpen(true);
  };

  return (
    <WideCard.List>
      {items.map((item, index) => (
        <IncidentCard
          key={item.incidentId}
          data={item}
          isLoading={incidentIsUpdating === item.incidentId}
          onViewDetails={handleViewDetails}
          onComment={handleComments}
          onCancel={handleCancel}
          onReopen={handleReopen}
          isLastCard={index === items.length - 1}
        />
      ))}
      <CancelModal
        isOpen={isCancelModalOpen}
        onUpdateIncident={setIsUpdating}
        setIsCancelModalOpen={setIsCancelModalOpen}
      />
      <ReopenModal
        isOpen={isReopenModalOpen}
        onUpdateIncident={setIsUpdating}
        setIsReopenModalOpen={setIsReopenModalOpen}
      />
    </WideCard.List>
  );
};

export default IncidentCardList;
