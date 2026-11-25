import { gql } from 'apollo-boost';

export const INCIDENT_FILTERS = gql`
  query IncidentFilters {
    incidentFilters {
      filterName
      displayFilterName
      filterable
      children {
        filterName
        displayFilterName
        filterable
      }
    }
  }
`;
