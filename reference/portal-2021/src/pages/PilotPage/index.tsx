import React, { useEffect } from 'react';
import { IoPilotMode } from '@i-o/design-system';
import BrandIo from '../../assets/images/pilotPage/brand-io.svg';
import ImgPilotMobile from '../../assets/images/pilotPage/pilot_mode_mobile.png';
import ImgPilotDesktop from '../../assets/images/pilotPage/pilot_mode.png';
import LogoIo from '../../assets/images/logo-io.svg';

const PilotPage = () => {
  const loginLink = '/login';
  const url = 'https://csc.service-now.com';

  return (
    <>
      <IoPilotMode
        homeLink={loginLink}
        url={url}
        logoImg1={LogoIo}
        logoImg2={BrandIo}
        pilotImage1={ImgPilotMobile}
        pilotImage2={ImgPilotDesktop}
      />
    </>
  );
};

export default PilotPage;
