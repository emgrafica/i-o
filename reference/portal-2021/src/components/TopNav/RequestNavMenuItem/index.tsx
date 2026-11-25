import React from 'react';
import { ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestAccessories } from 'models/types/ServiceSubscriptions';
import InternalNavItem from '../InternalNavItem';

/**
 * RequestNavMenuItem Props
 */
interface RequestNavMenuItemProps {
  serviceSubscription: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestAccessories;
  title: string;
  message: string;
  internalPath: string;
  closeMobileNavMenu: () => void;
  openPunchOutModal: () => void;
  setPunchOutModalContent: (content: { message: string; url: string }) => void;
}

/**
 * Renders Request items for the Request section in the navigation
 * @param props
 */
const RequestNavMenuItem: React.FC<RequestNavMenuItemProps> = ({
  serviceSubscription: { isSubscribed, punchOutLink },
  title,
  message,
  internalPath,
  closeMobileNavMenu,
  openPunchOutModal,
  setPunchOutModalContent,
}) => {
  if (isSubscribed) {
    return (
      <InternalNavItem
        title={title}
        internalPath={internalPath}
        closeMobileNavMenu={closeMobileNavMenu}
      />
    );
  }
  if (punchOutLink) {
    return (
      <InternalNavItem
        title={title}
        internalPath={''}
        closeMobileNavMenu={() => {
          setPunchOutModalContent({
            message: message,
            url: punchOutLink,
          });
          openPunchOutModal();
          closeMobileNavMenu();
        }}
      />
    );
  }
  return null;
};
export default RequestNavMenuItem;
