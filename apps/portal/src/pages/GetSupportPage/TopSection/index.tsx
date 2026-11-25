import React from 'react';
import { Box, Container } from '@lumos/core';
import useBreakpoint from 'utils/useBreakpoint';
import { useTranslation } from 'react-i18next';
import BackButton from 'components/BackButton';

/** Props for PageTitle */
interface TopSectionProps {
  /** Path of back button */
  backPath?: string;
}

/**
 * Banner component used internally by the PageTemplate component
 *
 * @param props
 */

const TopSection: React.FC<TopSectionProps> = props => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation('getSupport');

  return (
    <div
      className='wrapper-container'
      // width="100%"
      // background={`url(${dxcImage})`}
      // backgroundPosition={{
      //   xxs: '0px 100px',
      //   sm: '0px 60px',
      //   md: '0px 40px',
      //   lg: '0px -10px',
      // }}
      // backgroundSize="cover"
      // minHeight={{
      //   xxs: '240px',
      //   md: '300px',
      //   lg: '320px',
      //   xl: '360px',
      //   xxl: '400px',
      // }}
    >
      <div
        style={{paddingTop: '14px'}}
        // flexDirection="column"
        // width="100%"
        // paddingTop={{ xxs: '14px' }}
        // paddingX={{ xxs: '15px', sm: '25px', lg: '100px' }}
      >
        <BackButton/>
        {props.children}
      </div>
    </div>
  );
};

export default TopSection;
