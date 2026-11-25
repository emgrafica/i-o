import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TopNav as LumosTopNav } from '@lumos/core';

/**
 * Components.
 */
import { Grid, Typography, Box } from '@lumos/core';
import { IGridProps } from '@lumos/core/lib/components/Grid';

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
  font-weight: 500;
  font-size: 16px;
`;

export const StyledSubMenu = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  &:hover,
  &:focus {
    cursor: pointer;
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
 * //styled(Box)`
 */
export const MobileNavCloseButton = styled(Grid)<
  IGridProps & React.HTMLProps<HTMLDivElement>
>`
  appearance: none;
  border: none;
  transition: all 0.1s ease-in;
  ${({ theme }) => `
    top: ${theme.space[4]}px;
    right: ${theme.space[4]}px;

    @media screen and (min-width: ${theme.breakpoints.sm}) {
      top: ${theme.space[5]}px;
      right: ${theme.space[5]}px;
    }

    & > svg {
        font-size: 41px;
    }
  `}

  &:hover {
    cursor: pointer;
  }
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

export const LumosTopNavDropdownTitleStyled = styled(LumosTopNav.Dropdown)`
  color: red;
`;
