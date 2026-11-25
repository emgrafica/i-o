import { Button, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import logoDefault from './../../../assets/images/logo_dxc_logo_horizontal.png';
import './topNav.scss';

const { SubMenu } = Menu;

const TopNav = (props) => {
  const { logoImg, arrTtlMenu, dataMenu, children, onClickBtnMenu } = props;
  
  const [openKeys, setOpenKeys] = useState([]);
  const rootSubmenuKeys = ['userInfo'];
  if (arrTtlMenu.length > 0) {
    for(let i = 0; i < arrTtlMenu.length; i++) {
      rootSubmenuKeys.push(`menu${i}`);
    }
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const listMenu = (arrTtlMenu, dataMenu) => {
    let menu = null;
    menu = arrTtlMenu.map((item, index) => {
      let getDataSubMenu = item.submenu && !!item.value && dataMenu.hasOwnProperty(item.value) ? dataMenu[item.value] : []
      let subMenu = null;
      if (getDataSubMenu.length > 0) {
        subMenu = getDataSubMenu.map((subItem, subIndex) => {
          return (
            subItem.enabled && <Menu.Item key={subItem.featureValue}><a href={subItem.portalFeaturePath} title={subItem.featureValue} className="item-link">{subItem.featureValue} {['Mobility', 'Remote Access'].includes(subItem.featureValue) && <span>Coming Soon</span>}</a></Menu.Item>
          );
        });
      }

      return (
        !item.url ?
          <SubMenu key={`menu${index}`} title={item.title}>
            {subMenu}
          </SubMenu>
          :
          <li className="li-link" key={index}>
            <a href={item.url} alt={item.title} className="title-no-sub">{item.title}</a>
          </li>
      );
    });

    return menu;
  }

  return (
    <div className="top-nav-i-o">
      <div className="outer">
        <div className="content-left">
          <div className="logo">
            <a href="/">
              <img src={!!logoImg.length ? logoImg : logoDefault} alt="io" />
            </a>
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys} 
            onOpenChange={onOpenChange}
            subMenuOpenDelay={0.3}
            className="list-menu"
          >
            {listMenu(arrTtlMenu, dataMenu)}
          </Menu>
        </div>
        <div className="content-right">
          {children}
          <Button className="btn-menu" onClick={(e) => onClickBtnMenu(e, {...props})}>&nbsp;</Button>
        </div>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  logoImg: PropTypes.string,
  arrTtlMenu: PropTypes.array,
  dataMenu: PropTypes.object,
  onClickBtnMenu: PropTypes.func
};

TopNav.defaultProps = {
  logoImg: '',
  arrTtlMenu: [
    {
      value: 'requestFeatureItems',
      title: "Request",
      url: null,
      submenu: true
    },
    {
      value: 'manageFeatureItems',
      title: "Manage",
      url: null,
      submenu: true
    },
    {
      value: '',
      title: "Get Support",
      url: 'http://',
      submenu: false
    }
  ],
  dataMenu: {
    requestFeatureItems: [
      {
        featureValue: 'Accessories',
        enabled: true,
        featureType: 'request',
        portalFeaturePath: '/request/accessories',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'Computers',
        enabled: true,
        featureType: 'request',
        portalFeaturePath: '/request/computers',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'Conferencing',
        enabled: false,
        featureType: 'request',
        portalFeaturePath: '/request/conferencing',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'GCom',
        enabled: false,
        featureType: 'request',
        portalFeaturePath: '/request/gcom',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'Mobility',
        enabled: true,
        featureType: 'request',
        portalFeaturePath: '/request/mobility',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'Remote Access',
        enabled: true,
        featureType: 'request',
        portalFeaturePath: '/request/remoteAccess',
        isSubscribed: false,
        punchOutLink: 'https://www.gecapital.com/',
        punchOutMessage: 'Requesting Remote Access is available for your business or region outside of GE Exp. Click Continue to access this service in a new tab.',
        __typename: 'FeatureItem'
      },
      {
        featureValue: 'Software',
        enabled: false,
        featureType: 'request',
        portalFeaturePath: '/request/software',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureItem'
      }
    ],
    manageFeatureItems: [
      {
        featureValue: 'Approvals',
        enabled: true,
        featureType: 'manage',
        portalFeaturePath: '/manage/personal/approvals',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureIte'
      },
      {
        featureValue: 'Order & Incidents',
        enabled: true,
        featureType: 'manage',
        portalFeaturePath: '/manage/personal/orders-incidents',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureIte'
      },
      {
        featureValue: 'Technology',
        enabled: true,
        featureType: 'manage',
        portalFeaturePath: '/manage/personal/technology',
        isSubscribed: true,
        punchOutLink: null,
        punchOutMessage: null,
        __typename: 'FeatureIte'
      }
    ]
  },
  onClickBtnMenu: () => {}
};

export default TopNav;
