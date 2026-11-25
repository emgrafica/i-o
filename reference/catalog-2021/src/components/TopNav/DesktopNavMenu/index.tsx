import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopNav as LumosTopNav } from '@lumos/core';
import DesktopNavSection from './DesktopNavSection/index';
import { NavMenuProps } from '../types';
import { GetSupportPath } from 'utils/routes';

/**
 * DesktopNavMenu Props
 */
type DesktopNavMenuProps = NavMenuProps;

/**
 * Renders desktop navigation menu
 */
const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({
  setPunchOutModalContent,
  openPunchOutModal,
  getSupportSubscriptionInfo,
  manageItems,
  renderGetSupportSection,
  renderManageSection,
  requestItems,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Request */}
      <DesktopNavSection title={t('topNav:request')} items={requestItems} />
      {/* Manage */}
      {renderManageSection && (
        <DesktopNavSection title={t('topNav:manage')} items={manageItems} />
      )}
      {/* Support */}
      {renderGetSupportSection &&
        getSupportSubscriptionInfo &&
        (getSupportSubscriptionInfo.isSubscribed ? (
          <LumosTopNav.Link navKey="get support">
            <Link to={GetSupportPath}>{t('topNav:getSupport')}</Link>
          </LumosTopNav.Link>
        ) : (
          getSupportSubscriptionInfo.punchOutLink && (
            <LumosTopNav.Button
              color="primary.0"
              onClick={() => {
                setPunchOutModalContent({
                  message: t('topNav:punchOutModal.getSupportMessage'),
                  url: getSupportSubscriptionInfo.punchOutLink!,
                });
                openPunchOutModal();
              }}
              id="support"
            >
              {t('topNav:getSupport')}
            </LumosTopNav.Button>
          )
        ))}
    </>
  );
};

export default DesktopNavMenu;
