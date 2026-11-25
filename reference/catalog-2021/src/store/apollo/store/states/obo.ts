import { OBO_INFO } from '../actions/queries';

const states = [
  {
    query: OBO_INFO,
    data: {
      oboInfo: {
        __typename: 'OboInfo',
        user: null,
        userRights: null,
      },
    },
  },
];

export default states;
