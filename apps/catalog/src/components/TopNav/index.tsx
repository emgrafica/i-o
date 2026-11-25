import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopNav as LumosTopNav, Box, Container, Grid } from '@lumos/core';
import { Menu } from '@material-ui/icons';
import { useQuery } from '@apollo/react-hooks';
import {
  AVAILABLE_FEATURE_CONFIG,
  SERVICE_SUBSCRIPTIONS,
} from 'graphql/queries';
import { ServiceSubscriptions } from 'graphql/queries/gqlTypes/ServiceSubscriptions';
import { AvailableFeatureConfig } from 'graphql/queries/gqlTypes/AvailableFeatureConfig';
import ioLogo from 'assets/images/branding/io_logo.png';
import { ProfileWrapper } from './TopNav.style';
import { PunchOutModal } from 'components';
import RequestNavMenuItem from './RequestNavMenuItem';
import DesktopNavMenu from './DesktopNavMenu/index';
import MobileNavMenu from './MobileNavMenu/index';
import UserSection from './UserSection/index';
import ShowFor from 'components/ShowFor';
import { HomePath } from 'utils/routes';
import {
  useOBOInfoLocalState,
  MANAGE_FEATURE_CODE,
  GET_ASSISTANCE_FEATURE_CODE,
} from 'store/apollo/store/hooks';
import { APP_MAX_WIDTH } from 'constants/index';
import InternalNavItem from './components/InternalNavItem';
import ContentLanguageSelector from './ContentLanguageSelector';
import { useTranslatedQuery } from 'hooks/useTranslatedQuery';

/**
 * Renders application's navigation
 */
const TopNav: React.FC = () => {
  const { data: subscriptionsData } = useQuery<ServiceSubscriptions>(
    SERVICE_SUBSCRIPTIONS,
  );
  const { data: featureConfigData } = useTranslatedQuery<
    AvailableFeatureConfig
  >(AVAILABLE_FEATURE_CONFIG);

  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = React.useState(false);
  const [isPunchOutModalOpen, setIsPunchOutModalOpen] = React.useState(false);
  const [punchOutModalContent, setPunchOutModalContent] = React.useState({
    message: '',
    url: '',
  });
  const oboInfoLocalState = useOBOInfoLocalState();
  const renderManageSection = oboInfoLocalState.hasOBOUserRightFor(
    MANAGE_FEATURE_CODE,
  );
  const renderGetSupportSection = oboInfoLocalState.hasOBOUserRightFor(
    GET_ASSISTANCE_FEATURE_CODE,
  );
  const { t } = useTranslation('topNav');

  // Shared props for the RequestNavMenuItem components and Get Support actions
  const sharedProps = {
    closeMobileNavMenu: () => setIsMobileNavMenuOpen(false),
    openPunchOutModal: () => setIsPunchOutModalOpen(true),
    setPunchOutModalContent: setPunchOutModalContent,
  };

  const getSupportSubscription =
    subscriptionsData &&
    subscriptionsData.retrieveTenantConfig.serviceSubscriptions.getSupport;

  // Creates and contains menu items for Request section
  const requestItems = !featureConfigData
    ? []
    : featureConfigData.featureConfig.requestFeatureItems
        .filter(({ enabled }) => enabled)
        .map(
          ({
            isSubscribed,
            punchOutLink,
            featureValue,
            punchOutMessage,
            portalFeaturePath,
          }) => {
            return (
              <RequestNavMenuItem
                serviceSubscription={{
                  __typename: 'SubscriptionInfo',
                  isSubscribed: isSubscribed,
                  punchOutLink: punchOutLink,
                }}
                title={featureValue}
                message={punchOutMessage || ''}
                internalPath={portalFeaturePath || './invalidPath'}
                {...sharedProps}
              />
            );
          },
        );

  // Creates and contains menu items for Manage section
  const manageItems = !featureConfigData
    ? []
    : featureConfigData.featureConfig.manageFeatureItems.map(
        ({ enabled, featureValue, portalFeaturePath }) => {
          if (enabled) {
            return (
              <InternalNavItem
                title={featureValue}
                internalPath={portalFeaturePath || './invalidPath'}
                closeMobileNavMenu={() => setIsMobileNavMenuOpen(false)}
              />
            );
          }
          return null;
        },
      );

  return (
    <>
      {/* Mobile Navigation Menu */}
      <MobileNavMenu
        isOpen={isMobileNavMenuOpen}
        requestItems={requestItems}
        manageItems={manageItems}
        renderManageSection={renderManageSection}
        renderGetSupportSection={renderGetSupportSection}
        getSupportSubscriptionInfo={getSupportSubscription}
        {...sharedProps}
      />
      <PunchOutModal
        isModalOpen={isPunchOutModalOpen}
        setIsModalOpen={setIsPunchOutModalOpen}
        title={t('punchOutModal.title')}
        message={punchOutModalContent.message}
        url={punchOutModalContent.url}
      />

      <LumosTopNav
        label="global"
        backgroundColor="primary.0"
        borderColor="primary.1"
      >
        <Container width="100%" justifyContent="center">
          <Grid
            width="100%"
            maxWidth={`${APP_MAX_WIDTH}px`}
            justifyContent="space-between"
            paddingLeft={{
              xxs: '40px',
              xs: '40px',
              sm: '60px',
              md: '60px',
              lg: '152px',
              xl: '152px',
              xxl: '152px',
            }}
            paddingRight={{
              xxs: '18px',
              xs: '18px',
              sm: '18px',
              md: '40px',
              lg: '80px',
              xl: '0px',
              xxl: '0px',
            }}
          >
            <LumosTopNav.Menu>
              {/* Logo */}
              <Box
                paddingRight={{
                  xxs: '0px',
                  sm: '0px',
                  md: '10px',
                  lg: '107px',
                  xl: '107px',
                  xxl: '107px',
                }}
              >
                <LumosTopNav.Logo>
                  <Link to={HomePath}>
                    <img src={ioLogo} alt="io" height="38px" />
                  </Link>
                </LumosTopNav.Logo>
              </Box>
              {/* Desktop and Ultrawide Navigation Menu */}
              <ShowFor desktopAndLarger>
                <DesktopNavMenu
                  requestItems={requestItems}
                  manageItems={manageItems}
                  renderManageSection={renderManageSection}
                  renderGetSupportSection={renderGetSupportSection}
                  getSupportSubscriptionInfo={getSupportSubscription}
                  {...sharedProps}
                />
                <Box marginLeft="auto"></Box>
              </ShowFor>
            </LumosTopNav.Menu>

            {/* Actions */}
            <Box flexDirection="row" alignItems="center" display="flex">
              <LumosTopNav.Actions>
                {/* Mobile navigation menu for mobile & tablet*/}
                <ShowFor tabletAndSmaller>
                  <ProfileWrapper
                    marginRight={0}
                    onClick={() => {
                      setIsMobileNavMenuOpen(!isMobileNavMenuOpen);
                    }}
                  >
                    <Menu titleAccess="menu" />
                  </ProfileWrapper>
                </ShowFor>

                {/* User Profile Section for Desktop */}
                <ShowFor desktopAndLarger>
                  <Grid alignItems="center" marginRight="20px">
                    <ContentLanguageSelector />
                  </Grid>
                  <UserSection />
                </ShowFor>
              </LumosTopNav.Actions>
            </Box>
          </Grid>
        </Container>
      </LumosTopNav>
    </>
  );
};

export default TopNav;
