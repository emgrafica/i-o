import gql from 'graphql-tag';

const LOCATION_FRAGMENT = gql`
  fragment LocationInfo on LocationInfo {
    address1
    address2
    city
    state
    zip
    country
  }
`;

export default LOCATION_FRAGMENT;
