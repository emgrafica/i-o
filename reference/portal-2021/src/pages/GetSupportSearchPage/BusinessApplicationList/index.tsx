import React from 'react';
import BusinessApplicationCard from './BusinessApplicationCard';
import { GetSupportSearch_businessApplicationSearch } from 'models/types/GetSupportSearch';
import NoResultsMessage from '../NoResultsMessage';
import { MuuriComponent } from 'muuri-react';

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
  const options = {
    dragEnabled: true,
  };

  return items.length === 0 ? (
    <NoResultsMessage />
  ) : (
    <MuuriComponent {...options} dragFixed>
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
    </MuuriComponent>
  );
};

export default BusinessApplicationList;
