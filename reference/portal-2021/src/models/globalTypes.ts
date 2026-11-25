/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Different States of Approval:
 * Pending: Request is pending action from the assigned approvers. Approved:
 * Request has been approved.Declined: Request has been declined by one of the
 * approvers. Cancelled: Request was cancelled before approvals took place, this
 * means approvals are no longer required. On hold: Approval level is on a standby
 * mode, pending the completion of the previous level.
 */
export enum ApprovalStatusType {
  Approved = 'Approved',
  Cancelled = 'Cancelled',
  Declined = 'Declined',
  OnHold = 'OnHold',
  Pending = 'Pending',
}

/**
 * The different types of approvals
 */
export enum ApprovalType {
  Group = 'Group',
  Manager = 'Manager',
  User = 'User',
}

/**
 * The Approver actions that can be performed on an approval request
 */
export enum ApproverAction {
  Approved = 'Approved',
  Declined = 'Declined',
}

/**
 * State of the approver in context of approval workflow
 */
export enum ApproverState {
  Approved = 'Approved',
  Cancelled = 'Cancelled',
  Declined = 'Declined',
  Hold = 'Hold',
  Pending = 'Pending',
}

/**
 * Asset Type
 */
export enum AssetType {
  Computers = 'Computers',
  Gcom = 'Gcom',
  MobileDevice = 'MobileDevice',
  Software = 'Software',
  Vpn = 'Vpn',
}

/**
 * Enumeration of incident urgency
 */
export enum BusinessApplicationIncidentUrgency {
  One = 'One',
  Three = 'Three',
  Two = 'Two',
}

/**
 * Enumeration of the types of a business application record
 */
export enum BusinessApplicationType {
  Incident = 'Incident',
  Url = 'Url',
}

/**
 * Catalog class
 */
export enum CatalogItemClass {
  accessory = 'accessory',
  computer = 'computer',
  gcom = 'gcom',
  mobility = 'mobility',
}

/**
 * Catalog pricing type
 */
export enum CatalogPricingType {
  Numerical = 'Numerical',
  Symbols = 'Symbols',
}

/**
 * Catalog Request types
 */
export enum CatalogRequestType {
  AdditionalDevice = 'AdditionalDevice',
  BrokenReplacementDevice = 'BrokenReplacementDevice',
  Loaner = 'Loaner',
  LostReplacementDevice = 'LostReplacementDevice',
  NewHire = 'NewHire',
  NonStandardRefresh = 'NonStandardRefresh',
  PCReturn = 'PCReturn',
  PickupReturn = 'PickupReturn',
  PrimaryDevice = 'PrimaryDevice',
  RefreshReplacement = 'RefreshReplacement',
  ShortTermDevice = 'ShortTermDevice',
  StandardRefresh = 'StandardRefresh',
  StandardReturn = 'StandardReturn',
}

/**
 * The various closed states
 */
export enum ClosingStatus {
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Declined = 'Declined',
}

export enum DateRange {
  lastMonth = 'lastMonth',
  lastSixMonths = 'lastSixMonths',
  lastThreeMonths = 'lastThreeMonths',
  lastYear = 'lastYear',
  thisYear = 'thisYear',
}

/**
 * The tenant configured edit usage variation
 */

export interface TenantConfigQuickLink {
  url: string;
  displayName: string;
  order: number;
  active: boolean;
}
export interface TenantConfig {
  id: string;
  type: string;
  value: {
    quickLinks: TenantConfigQuickLink[];
  };
}

export enum EditUsageActionVariation {
  EditUsageGlobal = 'EditUsageGlobal',
}

/**
 * The type of helpdesk that the user is aligned to
 */
export enum HelpDeskType {
  external = 'external',
  internal = 'internal',
}

export enum IncidentClosingStatus {
  cancelled = 'cancelled',
  closed = 'closed',
  resolved = 'resolved',
}

export enum IncidentStage {
  cancelled = 'cancelled',
  closed = 'closed',
  inProgress = 'inProgress',
  new = 'new',
  onHold = 'onHold',
  resolved = 'resolved',
}

export enum IncidentStatus {
  cancelled = 'cancelled',
  closed = 'closed',
  inProgress = 'inProgress',
  new = 'new',
  onHold = 'onHold',
  resolved = 'resolved',
  unknown = 'unknown',
}

export enum IncidentStatusFilter {
  closed = 'closed',
  open = 'open',
}

/**
 * Enumeration of the languages supported by the knowledge articles search
 */
export enum KnowledgeArticleLanguageCode {
  de = 'de',
  en = 'en',
  es = 'es',
  fr = 'fr',
  hu = 'hu',
  it = 'it',
  ja = 'ja',
  ko = 'ko',
  pl = 'pl',
  pt_BR = 'pt_BR',
  ru = 'ru',
  zh = 'zh',
}

/**
 * Location type
 */
export enum LocationType {
  City = 'City',
  Site = 'Site',
  State = 'State',
}

/**
 * Sort by option for orderApprovals query
 */
export enum OrderApprovalsSearchSortBy {
  ApprovalCreatedOn = 'ApprovalCreatedOn',
  ApproverActionedOn = 'ApproverActionedOn',
}

/**
 * Sort direction for orderApprovals query
 */
export enum OrderApprovalsSearchSortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/**
 * Defines what attribute to be used to sort the search. Defaults to first name
 */
export enum OrderByOptions {
  Email = 'Email',
  FirstName = 'FirstName',
  LastName = 'LastName',
  UserId = 'UserId',
}

/**
 * Defines the sort direction of the search. Defaults to asc
 */
export enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Type of order being placed
 */
export enum OrderType {
  Accessory = 'Accessory',
  Computer = 'Computer',
}

/**
 * The reason for request. Replacement for the RequestType
 */
export enum ReasonForRequest {
  Additional = 'Additional',
  Broken = 'Broken',
  ChangeSku = 'ChangeSku',
  DeviceBroken = 'DeviceBroken',
  DeviceNotRequired = 'DeviceNotRequired',
  Missing = 'Missing',
  NewAccessory = 'NewAccessory',
  Other = 'Other',
  OwnerInactive = 'OwnerInactive',
  Primary = 'Primary',
  Provisioning = 'Provisioning',
  Reassign = 'Reassign',
  Refresh = 'Refresh',
  Service = 'Service',
  Special = 'Special',
  Temporary = 'Temporary',
}

/**
 * UI label ident for reason for request
 */
export enum ReasonForRequestLabel {
  additional = 'additional',
  brokenReplacement = 'brokenReplacement',
  changeExistingService = 'changeExistingService',
  earlyReplacement = 'earlyReplacement',
  missingReplacement = 'missingReplacement',
  newAccessory = 'newAccessory',
  newGcomService = 'newGcomService',
  primary = 'primary',
  reassign = 'reassign',
  refreshReplacement = 'refreshReplacement',
  return = 'return',
  specialChangeRequest = 'specialChangeRequest',
  specialRequest = 'specialRequest',
  temporary = 'temporary',
  terminateService = 'terminateService',
}

/**
 * Return reasons, part of ReasonForRequest type
 */
export enum ReasonForReturn {
  DeviceBroken = 'DeviceBroken',
  DeviceNotRequired = 'DeviceNotRequired',
  Other = 'Other',
  OwnerInactive = 'OwnerInactive',
}

/**
 * The asset ownership registration action
 */
export enum RegisterOwnershipVariation {
  Global = 'Global',
}

/**
 * The report broken work flow to determine the tenant's asset report broken variation
 */
export enum ReportBrokenActionVariation {
  GetSupport = 'GetSupport',
  Order = 'Order',
}

/**
 * The report missing action variations
 */
export enum ReportMissingVariation {
  Global = 'Global',
}

/**
 * The action to report an error in asset ownership
 */
export enum ReportOwnerShipErrorActionVariation {
  Global = 'Global',
}

/**
 * Reference to the origin of this request
 */
export enum RequestOrigin {
  Catalog = 'Catalog',
  Technology = 'Technology',
}

/**
 * Type of the request reason
 */
export enum RequestReasonType {
  Additional = 'Additional',
  Primary = 'Primary',
  Replacement = 'Replacement',
}

/**
 * Order service request types
 */
export enum RequestServiceCategoryType {
  accessory = 'accessory',
  computer = 'computer',
  gcom = 'gcom',
}

/**
 * Request status that identifies items Open or Closed
 */
export enum RequestShortStatusType {
  Closed = 'Closed',
  Open = 'Open',
}

/**
 * Stage that describes the progress of the request
 */
export enum RequestStageType {
  Approval = 'Approval',
  Cancelled = 'Cancelled',
  Declined = 'Declined',
  OnHold = 'OnHold',
  PickedUp = 'PickedUp',
  Processing = 'Processing',
  Reassigned = 'Reassigned',
  Shipped = 'Shipped',
}

/**
 * Status of the request
 */
export enum RequestStatusType {
  Approval = 'Approval',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Declined = 'Declined',
  Error = 'Error',
  InProgress = 'InProgress',
  OnHold = 'OnHold',
  Pending = 'Pending',
}

/**
 * Request type
 */
export enum RequestType {
  Change = 'Change',
  Reassign = 'Reassign',
  Replace = 'Replace',
  Request = 'Request',
  Return = 'Return',
  Terminate = 'Terminate',
}

/**
 * Describes if the request was placed by other or self
 */
export enum RequestedForType {
  Myself = 'Myself',
  Other = 'Other',
}

/**
 * The carrier the asset is being shipped by
 */
export enum ShippingCarrier {
  DHL = 'DHL',
  FedEx = 'FedEx',
  TNT = 'TNT',
}

/**
 * Sort order of the returned approvals
 */
export enum SortBy {
  NameAtoZ = 'NameAtoZ',
  NameZtoA = 'NameZtoA',
  PriceHightoLow = 'PriceHightoLow',
  PriceLowtoHigh = 'PriceLowtoHigh',
}

/**
 * Sort order of the returned approvals
 */
export enum SortOrder {
  Newest = 'Newest',
  Oldest = 'Oldest',
}

/**
 * The asset usage options
 */
export enum UsageType {
  Application = 'Application',
  EnablingTool = 'EnablingTool',
  EngineeringComputer = 'EngineeringComputer',
  KioskOrMeetingRoom = 'KioskOrMeetingRoom',
  LaboratoryOrDevelopment = 'LaboratoryOrDevelopment',
  ManufacturingOrProduction = 'ManufacturingOrProduction',
  MonitoringOrRobot = 'MonitoringOrRobot',
  PersonalComputer = 'PersonalComputer',
  Product = 'Product',
  Regulated = 'Regulated',
  TrainingOrDemonstration = 'TrainingOrDemonstration',
}

/**
 * Type of the user approving
 */
export enum approverType {
  Group = 'Group',
  User = 'User',
}

export interface AccessoryDetailsInput {
  assetId: string;
  keyboardLanguage?: string | null;
}

export interface AddressInfoInput {
  name: string;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  additionalDeliveryInfo?: string | null;
  overrideValidation?: boolean | null;
}

export interface ApproverActionArgs {
  action: ApproverAction;
  orderId: string;
  lineItemId: string;
  approvalId: string;
  approverId: string;
  comment?: string | null;
  _etag: string;
}

export interface ComputerDetailsInput {
  assetId?: string | null;
  keyboardLanguage?: string | null;
  operatingSystemLanguage?: string | null;
  operatingSystemName?: string | null;
  msOfficeLanguage?: string | null;
  domain?: string | null;
  softwareImageName?: string | null;
}

export interface CreateCatalogOrderInput {
  catalogItemId: string;
  quantity?: number | null;
  requestedFor: string;
  origin?: RequestOrigin | null;
  shippingInfo: AddressInfoInput;
  reason: string;
  subReason?: string | null;
  returnDate?: string | null;
  deviceUsage: string;
  businessJustification?: string | null;
  acknowledgment?: boolean | null;
  requestType?: CatalogRequestType | null;
  expeditedDelivery: boolean;
  computerDetails?: ComputerDetailsInput | null;
  accessoryDetails?: AccessoryDetailsInput | null;
  validateAddress?: boolean | null;
}

/**
 * Input for return orders. 'Pickup' means the item being returned will be picked up instead of being shipped.
 */
export interface CreateCatalogReturnOrderInput {
  assetId: string;
  catalogItemId?: string | null;
  quantity?: number | null;
  orderType: OrderType;
  requestedFor: string;
  address: AddressInfoInput;
  reason: ReasonForReturn;
  reasonDetails?: string | null;
  returnDate?: string | null;
  businessJustification?: string | null;
}

export interface CreateGComCatalogOrderInput {
  sku: string;
  skuFollowUps: SkuFollowUps[];
  assignedTo: string;
  billedTo: string;
  locationCode: string;
  origin?: RequestOrigin | null;
  shippingInfo?: AddressInfoInput | null;
  reason: string;
  deviceUsage: string;
  businessJustification?: string | null;
  quantity: number;
  acknowledgment?: boolean | null;
  expeditedDelivery?: boolean | null;
  validateAddress?: boolean | null;
}

export interface CreateMobilityCatalogOrderInput {
  hardwareSku: string;
  planSku: string;
  features: Features[];
  requestedFor: string;
  origin?: RequestOrigin | null;
  shippingInfo?: AddressInfoInput | null;
  reason: string;
  deviceUsage: string;
  businessJustification?: string | null;
  quantity: number;
  acknowledgment?: boolean | null;
  expeditedDelivery?: boolean | null;
  validateAddress?: boolean | null;
}

export interface Features {
  id: string;
  value: string;
}

export interface OboUser {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface OboUserRights {
  id: string;
  featureCode?: string | null;
  enabled?: boolean | null;
}

export interface ProductInfo {
  id: string;
  productName?: string | null;
  image?: string | null;
  serialNumber?: string | null;
  usage?: string | null;
  expires?: number | null;
  catalogItemId?: string | null;
  _etag: string;
}

export interface QuestionSubmission {
  id: string;
  value: string;
}

export interface ReassignAssetInput {
  assetId: string;
  assignToId: string;
  onBehalfOfId: string;
}

export interface RegisterAssetOwnershipArgs {
  assetId: string;
  createdBy: string;
  onBehalfOf: string;
}

export interface ReportBrokenArgs {
  assetId: string;
  caseReference: string;
  usage: string;
  requestedById: string;
  requestDetails: string;
  requestedForId: string;
  shippingDetails: ShippingDetailsInput;
}

export interface ReportBrokenInput {
  id: string;
  productName?: string | null;
  image?: string | null;
  serialNumber?: string | null;
  usage?: string | null;
  expires?: number | null;
  catalogItemId: string;
  incidentNumber: string;
  details: string;
  _etag: string;
}

export interface ReportOwnershipErrorArgs {
  assetId: string;
  description?: string | null;
  questions?: QuestionSubmission[] | null;
  onBehalfOf: string;
}

export interface ShippingDetailsInput {
  contactName: string;
  contactPhoneNumber: string;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  additionalDeliveryInfo?: string | null;
}

export interface SkuAnswer {
  id?: string | null;
  label?: string | null;
  input: string;
}

export interface SkuFollowUps {
  id: string;
  label: string;
  value: string;
  protected: boolean;
}

export interface UserCartItem {
  checkoutType?: string | null;
  requestConfigOptions?: UserRequestConfigOptions | null;
  catalogItem?: UserCatalogItem | null;
}

export interface UserCatalogItem {
  catalogItemImage?: string | null;
  catalogItemName?: string | null;
  description?: string | null;
}

export interface UserRequestConfigOptions {
  selectedConfiguration?: string | null;
  catalogItemId?: string | null;
  osType?: string | null;
  businessJustification: string;
  requestReason: string;
  deviceUsage: string;
  isAcknowledged?: boolean | null;
  keyboardLanguage?: string | null;
  plugType?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
