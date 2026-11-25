import React from 'react';
import PropTypes from 'prop-types';
import logoDefault from './../../assets/images/logo_dxc_logo_horizontal.png';
import './../../styles/scss/common.scss';
import './topNav.scss';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const TopNav = (props) => {
  const { logoImg, arrTtlMenu, dataMenu, children, onClickBtnMenu } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickAway = () => {
    setExpanded(false);
  }

  const listMenu = (arrTtlMenu, dataMenu) => {
    let menu = null;
    menu = arrTtlMenu.map((item, index) => {
      let getDataSubMenu = item.submenu && !!item.value && dataMenu.hasOwnProperty(item.value) ? dataMenu[item.value] : []
      
      let subMenu = null;
      if (getDataSubMenu.length > 0) {
        subMenu = getDataSubMenu.map((subItem, subIndex) => {
          return (
            subItem.enabled && 
              <AccordionDetails key={subItem.featureValue}>
                <a 
                  onClick={(e) => {setExpanded(false);onClickBtnMenu(e, {...subItem})}}
                  title={subItem.featureValue} 
                  className="item-link"
                >
                  <span className="txt-link">{subItem.featureValue}</span> 
                </a>
              </AccordionDetails>
          );
        });
      }

      return (
        !item.url ?
          <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={`menu${index}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              {item.title}
            </AccordionSummary>
            {subMenu}
          </Accordion>
          :
          <a 
            onClick={(e) => onClickBtnMenu(e, {...item})}
            alt={item.title} className="title-no-sub" key={index}>{item.title}
          </a>
      );
    });

    return menu;
  }

  return (
    <div className="top-nav-i-o">
      <div className="outer wrapper-container">
        <div className="content-left">
          <div className="logo">
            <a href="/">
              <img src={!!logoImg.length ? logoImg : logoDefault} alt="io" />
            </a>
          </div>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="list-menu">
              {listMenu(arrTtlMenu, dataMenu)}
            </div>
          </ClickAwayListener>
        </div>
        <div className="content-right">
          {children}
          <Button variant="contained" className="btn-menu" onClick={(e) => onClickBtnMenu(e, {...props})}>&nbsp;</Button>
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
      // {
      //   featureValue: 'Approvals',
      //   enabled: true,
      //   featureType: 'manage',
      //   portalFeaturePath: '/manage/personal/approvals',
      //   isSubscribed: true,
      //   punchOutLink: null,
      //   punchOutMessage: null,
      //   __typename: 'FeatureIte'
      // },
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
