// @ts-nocheck
import React from 'react';
import { IoCard } from '@i-o/design-system';
import { useHistory } from 'react-router-dom';
import { ManagePersonalRequestsPath, ManageApprovals } from 'utils/routes';

const TicketsCard = (props: any) => {
  const { incidents, requests } = props;
  const history = useHistory();
  const tickets = [
    {
      type: 'incidents',
      totalIssues: incidents.totalItems || 0,
    },
    // {
    //   type: 'approvals',
    //   totalIssues: 0,
    // },
    {
      type: 'requests',
      totalIssues: requests.totalItems || 0,
    },
  ];

  const viewListItem = props => {
    history.push(
      props === 'approvals'
        ? ManageApprovals
        : {
            pathname: ManagePersonalRequestsPath,
            search: `?type=${props}`,
          },
    );
  };

  return (
    <IoCard.MyOpenCard
      issues={tickets}
      viewListItem={type => viewListItem(type)}
    />
  );
};

export default TicketsCard;
