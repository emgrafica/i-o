import { gql } from 'apollo-boost';

export const USER_AVATAR = gql`
  query UserAvatar($userId: String) {
    userProfile(userId: $userId) {
      avatar
    }
  }
`;

/** Queries all sorting options for the Requests Page */
export const REQUESTS_SORT = gql`
  query RequestSort {
    catalogRequestSortFilters {
      sortOption
      sortValue
    }
  }
`;

export const DATE_RANGE_FILTER_OPTIONS = gql`
  query IncidentDateFilters {
    incidentDateFilters {
      rangeValue
      rangeOption
    }
  }
`;
