import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InternalNavItemStyled,
  StyledSubMenu,
  StyledComingSoonSubMenu,
} from '../TopNav.style';
import { showWipTopNav } from 'utils/showWorkInProgress';

// TODO: This array should be pathsInProgress, but considering everything is in Progress now, is easier to just have what is ready. So is pending to switch this in the future.
const pathsReadyToAccess = [
  '/request/computers',
  '/request/accessories',
  '/manage/personal/approvals',
  '/manage/personal/orders-incidents?type=incidents',
  '/manage/personal/technology',
];

/**
 * InternalNavItem Props
 */
interface InternalNavItemProps {
  title: string;
  internalPath: string;
  closeMobileNavMenu: () => void;
}

/**
 * Renders internal items for the navigation menu
 * @param props
 */
const InternalNavItem: React.FC<InternalNavItemProps> = ({
  title,
  internalPath,
  closeMobileNavMenu,
}) => {
  const { t } = useTranslation('temporaryText');
  return (
    <InternalNavItemStyled to={internalPath} onClick={closeMobileNavMenu}>
      <StyledSubMenu style={{ padding: '0 12px' }}>
        {title}
        {/* 
            TODO: This is the temporal treatment to display Coming Soon text on the Top Nav menu.
                  To remove Coming Soon text from any menu, just add the path to pathsReadyToAccess array.
                  In the future as I mentioned above we need to switch this array to contain only those paths that are in Coming Soon mode.
          */}
        {!showWipTopNav &&
        !Boolean(pathsReadyToAccess.indexOf(internalPath) > -1) ? (
          <StyledComingSoonSubMenu>
            {t('showWipTopNav.title')}
          </StyledComingSoonSubMenu>
        ) : null}
      </StyledSubMenu>
    </InternalNavItemStyled>
  );
};
export default InternalNavItem;
