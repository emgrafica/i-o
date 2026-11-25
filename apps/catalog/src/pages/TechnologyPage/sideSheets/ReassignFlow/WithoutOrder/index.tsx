import React from 'react';
import WithoutOrderFlow from '../../WithoutOrderFlow';
import { REASSIGN_WITHOUT_ORDER } from '../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { ReassignWithoutOrder } from '../../../queries/gqlTypes/ReassignWithoutOrder';
import SkeletonLoader from '../../../SkeletonLoader';

const WithoutOrder: React.FC = () => {
  const { data, loading } = useQuery<ReassignWithoutOrder>(
    REASSIGN_WITHOUT_ORDER,
  );

  if (loading) {
    return <SkeletonLoader />;
  } else if (!data) {
    return null;
  }
  return (
    <WithoutOrderFlow
      header={data.reassignWithoutOrder.header}
      body={data.reassignWithoutOrder.body}
    />
  );
};

export default WithoutOrder;
