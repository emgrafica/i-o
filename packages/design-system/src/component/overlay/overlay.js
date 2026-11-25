import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import "./overlay.scss";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';

const Overlay = (props) => {
  return (
    <div className='container-overlay'>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={12} className="overlay-header"> 
          <Grid item xs={3}>
            <Avatar width={30} src={!!props.imgAvatar ? props.imgAvatar : "/broken-image.jpg"} />
          </Grid>
          <Grid item xs={9} className='overlay-header__right'>
            <div>{props.userInfo.avatar_name}</div>
          </Grid>
        </Grid>
        <hr />
        <Grid container direction="row" alignItems="center" className='overlay-content'>
          <Grid item xs={12} className='overlay-line'>
            <Grid item xs={6} className='overlay-line__left'>
              <div><LocationOnIcon /></div> Location
            </Grid>
            <Grid item xs={6} className='overlay-line__right'>{props.userInfo.location}</Grid>
          </Grid>
          <Grid item xs={12} className='overlay-line'>
            <Grid item xs={6} className='overlay-line__left'>
              <div><LanguageIcon /></div> Language
            </Grid>
            <Grid item xs={6} className='overlay-line__right'>{!!props.language ? props.language : 'English'}</Grid>
          </Grid>
          <Grid item xs={12} className='overlay-line'>
            <Grid item xs={6} className='overlay-line__left'>
              <div><PersonIcon /></div> Reports to
            </Grid>
            <Grid item xs={6} className='overlay-line__right'>{props.userInfo.manager_name}</Grid>
          </Grid>
          <Grid item xs={12} className='overlay-line'>
            <button className='overlay-line__signout' onClick={props.handleLogout}>Sign Out</button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

Overlay.propTypes = {
  userInfo: PropTypes.object,
  handleLogout: PropTypes.func
}

Overlay.defaultProps = {
  userInfo: {
    avatar_name: "Bang Nguyen",
    city: "Ho Chi Minh City",
    country: "VNM",
    email: "bnguyen42@dxc.com",
    employee_number: "1122493",
    first_name: "Cong Bang",
    last_name: "Nguyen",
    location: "5 Building",
    locationId: "c38d1cbedb16b85018e16462ca9619c6",
    manager_name: "Dac Lam Ngo",
    mobile_phone: "",
    name: "Cong Bang Nguyen",
    state: "SG",
    uid: "f41cf45edbe23010bf85ce1c299619eb",
    user_name: "bnguyen42@dxc.com"
  },
  handleLogout: () => {}
}

export default Overlay;