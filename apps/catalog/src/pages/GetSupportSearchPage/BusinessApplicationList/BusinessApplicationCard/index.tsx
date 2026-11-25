import React, { useState } from 'react';
import { GetSupportSearch_businessApplicationSearch_items } from 'graphql/queries/gqlTypes/GetSupportSearch';
import { UrlIcon } from './UrlIcon';
import { IncidentIcon } from './IncidentIcon';
import CardTemplate from 'pages/GetSupportSearchPage/CardTemplate';
import { BusinessApplicationType } from 'gqlTypes/globalTypes';
import { IncidentCreationPath } from 'utils/routes';
import { PunchOutModal } from 'components';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { IncidentCreationLocationState } from 'pages/IncidentCreationPage';
import { Typography } from '@lumos/core';

/**
 * Props type for the BusinessApplicationCard component
 **/
type BusinessApplicationCardProps = Pick<
  GetSupportSearch_businessApplicationSearch_items,
  | 'name'
  | 'url'
  | 'type'
  | 'number'
  | 'business'
  | 'shortDescription'
  | 'questionnaire'
  | 'assignmentGroup'
  | 'serviceId'
  | 'serviceOfferingId'
  | 'userDefinedShortDescription'
>;

/**
 * Business application card
 **/
const BusinessApplicationCard: React.FC<BusinessApplicationCardProps> = ({
  name,
  url,
  type,
  number,
  business,
  shortDescription,
  questionnaire,
  assignmentGroup,
  serviceId,
  serviceOfferingId,
  userDefinedShortDescription,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isUrlCard = type === BusinessApplicationType.Url;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory<IncidentCreationLocationState>();

  const pushToHistory = () => {
    const query = queryString.stringify({
      id: number,
    });
    history.push(`${IncidentCreationPath}?${query}`, {
      searchQuery: location.search,
      business,
      name,
      shortDescription,
      questionnaire,
      assignmentGroup,
      serviceId,
      serviceOfferingId,
      userDefinedShortDescription,
      number,
    });
  };

  return (
    <>
      {isUrlCard && url && (
        <PunchOutModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={t('getSupportSearch:punchOutModal.title')}
          message={t('getSupportSearch:punchOutModal.message')}
          url={url}
          callToAction={t('getSupportSearch:punchOutModal.action')}
        />
      )}
      <CardTemplate
        icon={isUrlCard ? <UrlIcon /> : <IncidentIcon />}
        minHeight={'67px'}
        title={name}
        onTitleClick={() => {
          isUrlCard && url ? setIsModalOpen(true) : pushToHistory();
        }}
      >
        <Typography margin="0px" kind="body3" color="secondary.1">
          {business}
        </Typography>
      </CardTemplate>
    </>
  );
};

export default BusinessApplicationCard;
