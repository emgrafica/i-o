import PropTypes from "prop-types";
import React from "react";
import "./secretKeyExpiredCard.scss";
import { Card, Grid, Box, Typography, Link } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import LaptopMacOutlinedIcon from "@material-ui/icons/LaptopMacOutlined";

import KeysLock from '../../../assets/icons/KeysLocks_Key2.svg';

import TimeHourglass from '../../../assets/icons/Time_Hourglass.svg';

const SecrectKeyExpiredCard = (props) => {
    const { urlChangePass, reminderExpiredDays, titleCard, titleLink, day } = props;
    return (

        <Card className="pw-expire">
            <Grid container className="pw-status-container">
                <Grid item xs={3}>
                    <Box className="progress-status action-required">

                        <span>ACTION REQUIRED</span>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box className="pc-timeStamp">
                    <Typography className="pc-timeStamp-title">
                        {titleCard}
                    </Typography>
                    </Box>
                    
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>

            <Grid container className="pc-status-container">
                <Grid item xs={3}>
                    <span className="keys-lock">

                        <img src={KeysLock} alt='keys-lock'></img>
                    </span>

                </Grid>
                <Grid item xs={6}>
                    <Box className="pc-timeStamp">

                        <Box className="number-date-expire">
                            <span>{reminderExpiredDays}</span> <span className="word-expire">{day}</span>
                        </Box>
                        <Link href={urlChangePass} target="_blank" onClick={props.onClick}>
                            {titleLink}
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <span className="time-hourglass">
                        <img src={TimeHourglass} alt='time-hourglass'></img>
                    </span>
                </Grid>
            </Grid>


        </Card>
    );
};

SecrectKeyExpiredCard.propTypes = {
    reminderSecrectKeyExpired: PropTypes.object
};

// SecrectKeyExpiredCard.defaultProps = {
//     state: "ACTION REQUIRED",
//     title: "Your pasword will expire in",
//     actionName: "Reset Password",
//     numberDate: "13",
//     url: "",
// };

export default SecrectKeyExpiredCard;
