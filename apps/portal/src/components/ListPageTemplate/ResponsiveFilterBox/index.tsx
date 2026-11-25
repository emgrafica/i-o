import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@lumos/core';
import useDevice, { Device } from 'utils/useDevice';

/**
 * Props for ResponsiveFilterBox component
 */
export interface ResponsiveFilterBoxProps {
  /**
   * Filter List to render for certain breakpoints
   */
  filtersBox: React.ReactElement;
  /**
   * Function to trigger when view filters button is clicked
   */
  handleViewFiltersClick: () => void;
}

/**
 * ResponsiveFilterBox component will return a FilterBox or Button component depending of current breakpoint.
 */
const ResponsiveFilterBox: React.FC<ResponsiveFilterBoxProps> = ({
  filtersBox,
  handleViewFiltersClick,
}) => {
  const { t } = useTranslation('common');
  // const device = useDevice();
  // return device >= Device.Desktop ? (
  //   filtersBox
  // ) : (
  //   <Button kind="text" onClick={handleViewFiltersClick}>
  //     {t('filter')}
  //   </Button>
  // );
  return (
    <Button kind="text" onClick={handleViewFiltersClick}>
      {t('filter')}
    </Button>
  );
};

export default ResponsiveFilterBox;
