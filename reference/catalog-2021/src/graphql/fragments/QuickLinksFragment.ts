import gql from 'graphql-tag';

const QUICK_LINKS_FRAGMENT = gql`
  fragment QuickLinks on QuickLinks {
    url
    displayName
    order
    active
  }
`;

export default QUICK_LINKS_FRAGMENT;
