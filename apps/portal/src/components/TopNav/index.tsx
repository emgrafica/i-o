import { IoTopNav } from '@i-o/design-system';
import { PunchOutModal } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InternalNavItem from './InternalNavItem';
import { GetSupportPath, HomePath } from 'utils/routes';
import ContentLanguageSelector from './ContentLanguageSelector';
import { OktaAuth } from '@okta/okta-auth-js';
import MobileNavMenu from './MobileNavMenu/index';
import RequestNavMenuItem from './RequestNavMenuItem';
import UserSection from './UserSection/index';
//import LogoIo from './../../assets/images/logo-io.png';

import { IoLogo } from 'assets/images'

import { IoMenu } from './Io.menu';
import useDevice, { Device } from 'utils/useDevice';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface TopNavProps {
  oktaAuth: OktaAuth;
  isAuthenticated: boolean;
}

const UserProfile = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
/**
 * Renders application's navigation
 */
const TopNav: React.FC<TopNavProps> = ({
  oktaAuth,
  isAuthenticated
}) => {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = React.useState(false);
  const [isPunchOutModalOpen, setIsPunchOutModalOpen] = React.useState(false);
  const [punchOutModalContent, setPunchOutModalContent] = React.useState({
    message: '',
    url: '',
  });

  const { t } = useTranslation('topNav');
  const device = useDevice();
  const history = useHistory();

  // Shared props for the RequestNavMenuItem components and Get Support actions
  const sharedProps = {
    closeMobileNavMenu: () => setIsMobileNavMenuOpen(false),
    openPunchOutModal: () => setIsPunchOutModalOpen(true),
    setPunchOutModalContent: setPunchOutModalContent,
  };

  const getSupportSubscription: any = {};
  const featureConfig = IoMenu.featureConfig;

  const menuItems = [
    {
      value: 'home',
      title: t('topNav:home'),
      url: HomePath,
      submenu: false,
    },
    {
      value: 'manageFeatureItems',
      title: t('topNav:manage'),
      url: null,
      submenu: true,
    },
    {
      value: '',
      title: t('topNav:support'),
      url: GetSupportPath,
      submenu: false,
    },
  ];

  const requestItems: any = featureConfig.requestFeatureItems
    .filter(e => e.enabled)
    .map(e => {
      return (
        <RequestNavMenuItem
          serviceSubscription={{
            __typename: 'SubscriptionInfo',
            isSubscribed: e.isSubscribed,
            punchOutLink: e.punchOutLink,
          }}
          title={e.featureValue}
          message={e.punchOutMessage || ''}
          internalPath={e.portalFeaturePath || './invalidPath'}
          {...sharedProps}
        />
      );
    });

  const manageItems: any = IoMenu.featureConfig.manageFeatureItems
    .filter(e => e.enabled)
    .map(e => {
     return (<InternalNavItem
        title={e.featureValue}
        internalPath={e.portalFeaturePath || './invalidPath'}
        closeMobileNavMenu={() => setIsMobileNavMenuOpen(false)}
      />);
    });

  const mainMenu: any = {
    requestFeatureItems: featureConfig.requestFeatureItems,
    manageFeatureItems: featureConfig.manageFeatureItems
  };

  const onMenuClick = (e: any) => {

    let path = '';
    if (e && e.url) {
      path = e.url;
    } else if (e && e.portalFeaturePath) {
      path = e.portalFeaturePath;
    }

    if (device === Device.Desktop || device === Device.Ultrawide) {
      if (path) {
        history.push(path);
      }
      
    } else {
      setIsMobileNavMenuOpen(!isMobileNavMenuOpen);
    }
  };

  return (
    <>
      {/* Mobile Navigation Menu */}
      <MobileNavMenu
        isOpen={isMobileNavMenuOpen}
        requestItems={requestItems}
        manageItems={manageItems}
        renderManageSection={true}
        renderGetSupportSection={true}
        getSupportSubscriptionInfo={getSupportSubscription}
        oktaAuth={oktaAuth}
        {...sharedProps}
      />
      <PunchOutModal
        isModalOpen={isPunchOutModalOpen}
        setIsModalOpen={setIsPunchOutModalOpen}
        title={t('punchOutModal.title')}
        message={punchOutModalContent.message}
        url={punchOutModalContent.url}
      />

      <IoTopNav
        logoImg={IoLogo}
        arrTtlMenu={isAuthenticated ? menuItems : []}
        dataMenu={isAuthenticated ? mainMenu : null}
        onClickBtnMenu={(e: any, d: any) => {
          onMenuClick(d);
        }}
      >
        <div className="lang-block">
          <ContentLanguageSelector />
        </div>
        {isAuthenticated && (
          <UserProfile className="user-profile">
            <UserSection oktaAuth={oktaAuth} />
          </UserProfile>
        )}
      </IoTopNav>
    </>
  );
};

export default TopNav;
