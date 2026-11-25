import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RETURN_WITHOUT_ORDER } from '../../../queries';
import WithoutOrderFlow from '../../WithoutOrderFlow';
import SkeletonLoader from '../../../SkeletonLoader';

const WithoutOrder: React.FC = () => {
  const { data, loading } = useQuery(RETURN_WITHOUT_ORDER);

  if (loading) {
    return <SkeletonLoader />;
  } else if (!data) {
    return null;
  }
  return (
    <WithoutOrderFlow
      header={data.returnWithoutOrder.header}
      body={data.returnWithoutOrder.body}
    />
  );
};

export default WithoutOrder;
