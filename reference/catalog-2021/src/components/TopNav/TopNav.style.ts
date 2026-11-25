import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CloseBox } from '@lumos/core/lib/components/SideSheet/SideSheet.style';
import { TopNav as LumosTopNav } from '@lumos/core';

/**
 * Components.
 */
import { Grid, Typography, Box } from '@lumos/core';

/**
 * Wraps profile name and menu chevron.
 */
export const ProfileWrapper = styled(Grid)`
  cursor: pointer;
  user-select: none;
`;
/**
 * Divider for mobile menu content.
 */
export const MobileMenuDivider = styled.div`
  margin: ${props => props.theme.space[1]}px 0px
    ${props => props.theme.space[2]}px 0px;
  height: 1px;
  background-color: ${props => props.theme.colors.secondary[3]};
`;
/**
 * Styled button for the mobile nav menu
 */
export const MobileNavButton = styled(Typography).attrs(_ => ({
  kind: 'h6',
}))`
  height: 40px;
  margin: 0px;
  color: ${props => props.theme.colors.secondary[0]};
`;

export const StyledSubMenu = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${props => props.theme.colors.impact[0]};
  }
`;

export const StyledComingSoonSubMenu = styled(Typography).attrs(_ => ({
  kind: 'hint',
}))`
  padding-left: 5px;
  color: ${props => props.theme.colors.grayScale[9]};
  height: 20px;
  font-family: Muli;
  letter-spacing: 0;
  line-height: 20px;
`;

/**
 * Styled 'X' for closing mobile nav menu
 */
export const MobileNavCloseButton = styled(CloseBox)`
  as: button;
  position: absolute;
  background-color: transparent;
  color: ${props => props.theme.colors.secondary[0]};
`;
/**
 * Styled menu item for subscribed services that route to internal page
 */
export const InternalNavItemStyled = styled(Link)`
  color: ${props => props.theme.colors.secondary[0]};
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.secondary[0]};
  }
`;
/**
 * Styled top nav dropdown item to give style to each item of the menu
 */
export const LumosTopNavDropdownItemStyled = styled(LumosTopNav.DropdownItem)`
  min-width: 280px;
`;
