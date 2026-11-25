import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { REPLACE_WITHOUT_ORDER } from '../../../queries';
import WithoutOrderFlow from '../../WithoutOrderFlow';
import { ReplaceWithoutOrder } from '../../../queries/gqlTypes/ReplaceWithoutOrder';
import SkeletonLoader from '../../../SkeletonLoader';

const WithoutOrder: React.FC = () => {
  const { data, loading } = useQuery<ReplaceWithoutOrder>(
    REPLACE_WITHOUT_ORDER,
  );

  if (loading) {
    return <SkeletonLoader />;
  } else if (!data) {
    return null;
  }
  return (
    <WithoutOrderFlow
      header={data.replaceWithoutOrder.header}
      body={data.replaceWithoutOrder.body}
    />
  );
};

export default WithoutOrder;
