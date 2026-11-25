import gql from 'graphql-tag';

export const GCOM_SITES = gql`
  query GcomSites($country: String!, $state: String!, $city: String!) {
    gcomSites(country: $country, state: $state, city: $city) {
      site
      siteCode
    }
  }
`;

export const LOCATIONS = gql`
  query Locations(
    $locationReturnType: LocationType!
    $country: String!
    $state: String
    $city: String
  ) {
    locations(
      locationReturnType: $locationReturnType
      country: $country
      state: $state
      city: $city
    )
  }
`;
