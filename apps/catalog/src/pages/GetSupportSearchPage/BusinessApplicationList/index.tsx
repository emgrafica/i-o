import React from 'react';
import BusinessApplicationCard from './BusinessApplicationCard';
import { GetSupportSearch_businessApplicationSearch } from 'graphql/queries/gqlTypes/GetSupportSearch';
import NoResultsMessage from '../NoResultsMessage';

/**
 * Props type for the GetSupportSearchList component
 **/
type BusinessApplicationListProps = Pick<
  GetSupportSearch_businessApplicationSearch,
  'items'
>;

/**
 * List of business applications
 **/
const BusinessApplicationList: React.FC<BusinessApplicationListProps> = ({
  items,
}) => {
  return items.length === 0 ? (
    <NoResultsMessage />
  ) : (
    <>
      {items.map(item => (
        <BusinessApplicationCard
          key={item.id}
          name={item.name}
          url={item.url}
          type={item.type}
          number={item.number}
          business={item.business}
          shortDescription={item.shortDescription}
          questionnaire={item.questionnaire}
          assignmentGroup={item.assignmentGroup}
          serviceId={item.serviceId}
          serviceOfferingId={item.serviceOfferingId}
          userDefinedShortDescription={item.userDefinedShortDescription}
        />
      ))}
    </>
  );
};

export default BusinessApplicationList;
