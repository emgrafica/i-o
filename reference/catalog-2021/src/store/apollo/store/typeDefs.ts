import { gql } from 'apollo-boost';

export const typeDefs = gql`
  type ReplacementInfo {
    id: String!
    productName: String
    image: String
    serialNumber: String
    usage: String
    expires: Int
    catalogItemId: String
    _etag: String!
  }

  input ProductInfo {
    id: String!
    productName: String
    image: String
    serialNumber: String
    usage: String
    expires: Int
    catalogItemId: String
    _etag: String!
  }

  type ReportBrokenInfo {
    id: String!
    productName: String
    image: String
    serialNumber: String
    usage: String
    expires: Int
    catalogItemId: String!
    incidentNumber: String!
    details: String!
    _etag: String!
  }

  input ReportBrokenInput {
    id: String!
    productName: String
    image: String
    serialNumber: String
    usage: String
    expires: Int
    catalogItemId: String!
    incidentNumber: String!
    details: String!
    _etag: String!
  }

  type OboInfo {
    user: User
    userRights: [UserRights]
  }

  type UserRights {
    id: String!
    featureCode: String
    enabled: Boolean
  }

  type RequestConfigOptions {
    selectedConfiguration: String
    catalogItemId: String
    osType: String
    businessJustification: String!
    requestReason: String!
    deviceUsage: String!
    isAcknowledged: Boolean
    keyboardLanguage: String
    plugType: String
  }

  type CatalogCartItem {
    catalogItemImage: String
    catalogItemName: String
    description: String
  }

  type CartInfo {
    cartItems: [CartItem]
  }

  type CartItem {
    checkoutType: String
    requestConfigOptions: RequestConfigOptions
    catalogItem: CatalogCartItem
  }

  input OboUser {
    userId: String!
    firstName: String
    lastName: String
  }

  input OboUserRights {
    id: String!
    featureCode: String
    enabled: Boolean
  }

  input UserRequestConfigOptions {
    selectedConfiguration: String
    catalogItemId: String
    osType: String
    businessJustification: String!
    requestReason: String!
    deviceUsage: String!
    isAcknowledged: Boolean
    keyboardLanguage: String
    plugType: String
  }

  input UserCatalogItem {
    catalogItemImage: String
    catalogItemName: String
    description: String
  }

  input UserCartInfo {
    cartItems: [UserCartItem]
  }

  input UserCartItem {
    checkoutType: String
    requestConfigOptions: UserRequestConfigOptions
    catalogItem: UserCatalogItem
  }

  extend type Query {
    cartInfo: CartInfo
    oboInfo: OboInfo
    replacementInfo: ReplacementInfo
    reportBrokenInfo: ReportBrokenInfo
    tenantId: String!
  }

  extend type Mutation {
    addToCartInfo(cartItem: UserCartItem): CartInfo
    submitOboInfo(user: OboUser, userRights: [OboUserRights]): OboInfo
    setReplacementInfo(productInfo: ProductInfo): ReplacementInfo
    setReportBrokenInfo(reportBrokenInput: ReportBrokenInput): ReportBrokenInfo
  }
`;
