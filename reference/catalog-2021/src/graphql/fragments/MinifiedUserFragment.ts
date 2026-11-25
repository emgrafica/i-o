import gql from 'graphql-tag';

const MINIFIED_USER_FRAGMENT = gql`
  fragment MinifiedUser on User {
    userId
    firstName
    lastName
  }
`;

export default MINIFIED_USER_FRAGMENT;
