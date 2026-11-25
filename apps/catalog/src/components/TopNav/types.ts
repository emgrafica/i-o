import { ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_getSupport } from 'graphql/queries/gqlTypes/ServiceSubscriptions';

/**
 * Props for NavSection components e.g. DesktopNavSection and MobileNavSection
 */
export interface NavSectionProps {
  /** Navigation menu section title */
  title: string;
  /** List of items for navigation menu section */
  items: (JSX.Element | null)[];
}

/**
 * Props for NavMenu components e.g. DesktopNavMenu and MobileNavMenu
 */
export interface NavMenuProps {
  /**
   * Contains menu items for Request Section
   */
  requestItems: (JSX.Element | null)[];
  /**
   * Contains menu items for Manage Section
   */
  manageItems: (JSX.Element | null)[];
  /**
   * Determines if the manage section should render according to the user's rights
   */
  renderManageSection: boolean;
  /**
   * Determines if the get support section should render according to the user's rights
   */
  renderGetSupportSection: boolean;
  /**
   * Get Support service subscription information
   */
  getSupportSubscriptionInfo?: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_getSupport;
  closeMobileNavMenu: () => void;
  openPunchOutModal: () => void;
  setPunchOutModalContent: (content: { message: string; url: string }) => void;
}
