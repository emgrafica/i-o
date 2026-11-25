import React, { useEffect, useState } from "react";
import Favicon from 'react-favicon';
import 'antd/dist/antd.css';

function FaviconCustom() {

  const [faviconUrl, setFaviconUrl] =  useState("");
  useEffect(() => {
      const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || false;
      var setting = JSON.parse(window.localStorage.getItem('SETTINGS'));
      if(!setting){
        setting = {};
        setting.FAVICON = './../../../public/logo_favicon.svg';
        setting.FAVICON_DARK = './../../../public/logo_favicon_dark.svg';
      }

      setFaviconUrl(!usesDarkMode ? setting.FAVICON : setting.FAVICON_DARK);
      console.log('setting', setting);
  })

  return <Favicon url={faviconUrl}/>;
}


export default FaviconCustom;