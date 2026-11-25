import React from 'react';
import { TopNav as LumosTopNav } from '@lumos/core';
import { NavSectionProps } from '../../types';
import { LumosTopNavDropdownItemStyled } from '../../TopNav.style';

/**
 * DesktopNavSection Props
 */
type DesktopNavSectionProps = NavSectionProps;

/**
 * Renders dropdown navigation section for the desktop navigation
 * @param props
 */
const DesktopNavSection: React.FC<DesktopNavSectionProps> = props => (
  <LumosTopNav.Dropdown title={props.title} navKey={props.title}>
    {props.items.map((item, index) => (
      <LumosTopNavDropdownItemStyled key={index}>
        {item}
      </LumosTopNavDropdownItemStyled>
    ))}
  </LumosTopNav.Dropdown>
);

export default DesktopNavSection;
