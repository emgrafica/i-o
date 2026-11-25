import { gql } from 'apollo-boost';

export const REQUESTS_BY_USER = gql`
  query RequestsByUser(
    $requestedForUserId: String!
    $categories: [CatalogItemClass!]
    $requestedFor: [RequestedForType!]
    $requestStatus: [RequestShortStatusType!]
    $sortOrder: SortOrder
    $dateRange: DateRange
    $pageSize: Float
    $pageNumber: Float
    $refine: String
  ) {
    requestsByUser(
      requestedForUserId: $requestedForUserId
      categories: $categories
      requestedFor: $requestedFor
      requestStatus: $requestStatus
      sortOrder: $sortOrder
      dateRange: $dateRange
      pageSize: $pageSize
      pageNumber: $pageNumber
      refine: $refine
    ) {
      items {
        id
        request {
          id
          workflowId
          type
          orderNumber
          status
          requestedFor
          requestedForUser {
            id
            firstName
            lastName
            nickName
            image
          }
          reasonForRequest {
            value
            label
          }
          reasonDetails
          justification
          submittedBy {
            id
            firstName
            lastName
            nickName
            image
          }
          submittedDate
          newAssignedTo {
            firstName
            lastName
          }
          closingInformation {
            date
            reason
            status
          }
          actions {
            cancelable
          }
          progress {
            currentStage
            stages
          }
        }
        product {
          ... on RequestComputer {
            id
            type
            name
            image
            deviceUsage
            price
            operatingSystem
            keyboard
          }
          ... on RequestAccessory {
            id
            type
            name
            image
            price
            plugType
            keyboard
          }
        }
        existingProduct {
          ... on ExistingComputerProduct {
            id
            name
            image
          }
        }
        approvals {
          id
          approvers {
            type
            user {
              id
              firstName
              lastName
              image
            }
          }
          approvedOn
          createdOn
          label
          policy
          status
        }
        shipping {
          contactName
          contactPhoneNumber
          company
          address1
          address2
          country
          city
          state
          zip
          additionalDeliveryInfo
        }
        trackingDetails {
          carrierName
          number
          url
        }
        _etag
      }
      totalHits
    }
  }
`;
