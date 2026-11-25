import gql from 'graphql-tag';

const USER_RIGHTS_FRAGMENT = gql`
  fragment UserRights on UserRights {
    id
    featureCode
    enabled
  }
`;

export default USER_RIGHTS_FRAGMENT;
