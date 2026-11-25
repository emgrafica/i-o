import React from 'react';
import PropTypes from 'prop-types';
import './userInforCard.scss';
import { Card, Typography, Grid, CardActions, CardMedia, CardContent } from '@material-ui/core';
import AccountIcon from "../../../assets/icons/account_box.svg";
const UserInforCard = (props) => {
  const {
    userName,
    image,
    location,
    email,
    preferred_language
  } = props;


  return (
      <Card className="user-infor-card">
              <CardActions className="user-infor-card-body">
                <Grid container> 
                  <Grid item xs={5}>
                  <CardMedia className="user-infor-card-image-wrapper">
                  {(typeof image) == "string"? <img className="user-infor-card-image" src={image} /> : <span> {image}</span>}
                  </CardMedia>
                  </Grid>
                  <Grid item xs={7}>   
                    <CardContent> 
                    <div className="user-infor-card-body-name">
                        <span>{userName}</span>           
                    </div>
                    <Typography  paragraph={true} noWrap={true} className='user-infor-item-line'>{email}</Typography>
                    <Typography  paragraph={true} noWrap={true} className='user-infor-item-line'>{preferred_language}</Typography>
                    <Typography  paragraph={true} noWrap={true} className='user-infor-item-line'>{location}</Typography>
                    </CardContent> 
                  </Grid>
                </Grid>         
            </CardActions>
      </Card>
  );
};


UserInforCard.propTypes = {


  /**
   * What image to use
   */
image: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  userName: PropTypes.string,
  preferred_language: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
};


UserInforCard.defaultProps = {
  image: AccountIcon,
  userName: "Undefined",
  preferred_language:"",
  location:"",
  email:"",
};

export default UserInforCard;



