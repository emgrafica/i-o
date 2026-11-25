import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, SideSheet } from '@lumos/core';
import { Close } from '@material-ui/icons';
import UserSection from '../UserSection/index';
import MobileNavSection from './MobileNavSection/index';
import {
  MobileNavCloseButton,
  MobileNavButton,
  MobileMenuDivider,
  InternalNavItemStyled,
  StyledSubMenu,
} from '../TopNav.style';
import { NavMenuProps } from '../types';
import { GetSupportPath } from 'utils/routes';

/**
 * MobileNavMenu Props
 */
export interface MobileNavMenuProps extends NavMenuProps {
  /** Determines if the mobile navigation menu sidesheet is open */
  isOpen: boolean;
}
/**
 * Renders mobile navigation menu sidesheet on click of hamburger menu
 */
const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  setPunchOutModalContent,
  openPunchOutModal,
  closeMobileNavMenu,
  getSupportSubscriptionInfo,
  manageItems,
  renderGetSupportSection,
  renderManageSection,
  requestItems,
  isOpen,
}) => {
  const { t } = useTranslation();
  return (
    <SideSheet
      isOpen={isOpen}
      onRequestClose={closeMobileNavMenu}
      closeBox={
        <MobileNavCloseButton>
          <Close />
        </MobileNavCloseButton>
      }
    >
      {/* Mobile Menu Header */}
      <Grid height="79px" padding={4} alignItems="center" color="secondary.0">
        <UserSection />
      </Grid>

      {/* Mobile Menu Body */}
      <Box marginX={4} marginBottom={4}>
        <MobileMenuDivider />
        {/* Request */}
        <MobileNavSection title={t('topNav:request')} items={requestItems} />

        {/* Manage */}
        {renderManageSection && (
          <MobileNavSection title={t('topNav:manage')} items={manageItems} />
        )}
        {/* Get Support */}
        {renderGetSupportSection &&
          getSupportSubscriptionInfo &&
          (getSupportSubscriptionInfo.isSubscribed ? (
            <MobileNavButton>
              <InternalNavItemStyled
                to={GetSupportPath}
                onClick={() => closeMobileNavMenu()}
              >
                <StyledSubMenu>{t('topNav:getSupport')}</StyledSubMenu>
              </InternalNavItemStyled>
            </MobileNavButton>
          ) : (
            getSupportSubscriptionInfo.punchOutLink && (
              <>
                <Grid width="100%">
                  <MobileNavButton
                    onClick={() => {
                      setPunchOutModalContent({
                        message: t('topNav:punchOutModal.getSupportMessage'),
                        url: getSupportSubscriptionInfo.punchOutLink!,
                      });
                      openPunchOutModal();
                      closeMobileNavMenu();
                    }}
                  >
                    <StyledSubMenu>{t('topNav:getSupport')}</StyledSubMenu>
                  </MobileNavButton>
                </Grid>
                <MobileMenuDivider />
              </>
            )
          ))}
      </Box>
    </SideSheet>
  );
};

export default MobileNavMenu;
