//@ts-nocheck
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import logoDefault from "./../../assets/images/dxcbrand.png";
import logoutIcon from "../../assets/images/pilot/Vector.png";
import pilotImage from "../../assets/images/pilot/pilot_mode.png";
import pilotImageMobile from "../../assets/images/pilot/pilot_mode_mobile.png";
import ioBrand from "../../assets/images/pilot/brand-io.svg";
import "./pilotMode.scss";
import "./../../styles/scss/common.scss";
import {Grid, Link} from "@material-ui/core";

const Pilotmode = (props) => {
  const { logoImg1, homeLink, url, logoImg2, pilotImage1, pilotImage2 } = props;
  let imageChange = pilotImage2;
  if(window.screen.width <= 607){
    imageChange = pilotImage1;
  } else {
    imageChange = pilotImage2;
  }
  const HandleLogout = () =>{
    localStorage.clear();
    window.location.href = homeLink;
  }


  return (
    <>
      <div className="top-nav-i-o">
        <div className="outer wrapper-container">
          <div className="content-left">
            <div className="logo">
              <Link href="">
                  {logoImg1? (<img src={logoImg1} alt="io" />):(<img src={logoDefault} alt="io" />)}
              </Link>
            </div>
          </div>
          <div className="content-right">
            <div className="logout-Icon">
              <Link href={homeLink} onClick={HandleLogout}>
                <img src={logoutIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pilot-container" >
        <Grid item container  direction="row">
          <Grid item xs={8} className="pilot-grid-left"> 
            <div className="pilot-image">
              <img src={imageChange} />
            </div>
          </Grid>
          <Grid item xs={4} className="pilot-grid-right">
              <div className="pilot-box">
                <Grid item xs={12}>
                  <span className="title-1">Coming soon</span>
                </Grid>
                <Grid item xs={12}>
                  {logoImg2 ? (<img src={logoImg2} />) : (<img src={ioBrand}/>)}
                </Grid>
                <Grid item xs={12}>
                <span className="title-2">Thanks for checking in!</span>
                </Grid>
                <Grid item xs={12}>
                  <div className="content">
                      <span>i-o is currently in development but we're excited about being able to share it with you soon!</span>
                  </div>
                  <div className="content">
                      <span>We are currently limiting access to make sure everything is in working order and you'll receive an email when i-o is ready for you.</span>
                  </div>
                  <div className="content">
                    <span>In the meantime, please continue to use <a href={url}>IT Connect</a> for support.</span>
                  </div>
                  <div className="content">
                    <span> Thanks,</span>
                  </div>
                  <div className="content">
                    <span>Team i-o</span>
                  </div>
                </Grid>                
              </div>
          </Grid>
        </Grid>
      </div>    
    </>
  )
};

Pilotmode.propTypes = {
  logoImg1: PropTypes.string,
  logoImg2: PropTypes.string,
  homeLink: PropTypes.string,
  pilotImage1: PropTypes.string,
  pilotImage2: PropTypes.string,
  url: PropTypes.string,
};

Pilotmode.defaultProps = {
  logoImg1: '',
  logoImg2: '',
  pilotImage1: pilotImageMobile,
  pilotImage2:pilotImage,
  homeLink: '/login',
  url: 'https://csc.service-now.com',
};

export default Pilotmode;
