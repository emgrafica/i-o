import { gql } from 'apollo-boost';

export const TECHNOLOGY_ASSETS = gql`
  query TechnologyAssets(
    $keywords: String
    $pageSize: Int!
    $pageNumber: Int!
  ) {
    myTechnologyAssets(
      keywords: $keywords
      pageSize: $pageSize
      pageNumber: $pageNumber
      activeState: "Active"
    ) {
      totalItems
      computers {
        id
        productName
        image
        serialNumber
        usage
        expires
        issued
        catalogItemId
        _etag
        refreshEligible
        refreshEligibleDate
        actions {
          showReturn
          showReplaceable
          showReportBroken
          showEditUsage
          canReassign
          canRegisterOwnership
          canReportMissing
          canReportOwnershipError
          canWipe
        }
      }
    }
  }
`;

export const TECHNOLOGY_CHECKOUT_PAGE = gql`
  query TechnologyCheckoutPage {
    technologyCheckoutPage {
      content {
        title
        body
      }
      agreement
    }
  }
`;

export const RECOMMENDED_REPLACEMENT = gql`
  query RecommendedReplacement($assetId: String!) {
    recommendedReplacement(assetId: $assetId) {
      catalogItemImage
      catalogItemName
      model
    }
  }
`;

export const RETURN_WITHOUT_ORDER = gql`
  query returnWithoutOrder {
    returnWithoutOrder(type: Computer) {
      body
      header
    }
  }
`;

export const REASSIGN_WITHOUT_ORDER = gql`
  query ReassignWithoutOrder {
    reassignWithoutOrder(type: Computer) {
      body
      header
    }
  }
`;

export const REPLACE_WITHOUT_ORDER = gql`
  query ReplaceWithoutOrder {
    replaceWithoutOrder(type: Computer) {
      body
      header
    }
  }
`;

export const REPORT_BROKEN_SUPPORT = gql`
  query ReportBrokenSupport {
    reportBrokenSupport(type: Computer) {
      header
      supportMessage
    }
  }
`;

// New endpoint to determine what asset action variation the user is going to get
// Currently, only working with reassign, replace, and return
export const ASSET_ACTION_VARIATION = gql`
  query AssetActionVariation(
    $assetId: String!
    $action: String!
    $assetType: AssetType!
  ) {
    assetActionVariation(
      assetId: $assetId
      action: $action
      assetType: $assetType
    ) {
      variation
    }
  }
`;

export const TENANT_ACTION_VARIATION = gql`
  query tenantActionVariation {
    tenantActionVariation {
      reportBrokenActionVariation
      reportOwnershipErrorActionVariation
      editUsageActionVariation
      reportMissingActionVariation
      registerOwnershipActionVariation
    }
  }
`;

export const REPORT_OWNERSHIP_ERROR = gql`
  mutation ReportOwnershipError($data: ReportOwnershipErrorArgs!) {
    reportOwnershipError(data: $data) {
      ticketId
    }
  }
`;

export const UPDATE_ASSET_USAGE = gql`
  mutation updateComputerUsage($assetId: ID!, $_etag: String!, $usage: String) {
    updateAsset(assetId: $assetId, _etag: $_etag, usage: $usage)
  }
`;

export const EDIT_USAGE_REASONS = gql`
  query EditUsageGlobal {
    editUsageGlobal(type: Computer) {
      usageTypes
    }
  }
`;

export const REPORT_OWNERSHIP_ERROR_CONTENT = gql`
  query GetReportOwnershipErrorContent {
    reportOwnershipErrorGlobal(type: Computer) {
      questions {
        id
        label
        options {
          label
          value
        }
      }
    }
  }
`;
