import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import questionLaptop from './../../assets/device/questionLaptop.png';
import "./../../styles/scss/common.scss";
import "./unListedDevices.scss";
import EyeBrow from "../cardComponent/eyeBrow/eyeBrow";
import HlxButton from "../input/button/button";

const UnListedDevices = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const [serialNumberValid, setSerialNumberValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const onChangeSerialNumber = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setSerialNumber(e.target.value);

    if (e.target.value) {
      setIsDisabled(false);
    }

  }
  return (
    <div className="unlisted-device">
      <div className="unlisted-device-content">
        <Grid item xs={12}>
          <Card className={"card card-wrap"} >
            <Grid container direction="row">
              <Grid item xs={5} sm={3} md={2}>
                <div className="cardMedia">
                  <Grid
                    container
                    direction="row"
                    alignContent="center"
                    className="h-100"
                  >
                  <div className="eyebrow-unlisted-device">
                    <EyeBrow color='#000000' backgroundColor='#ebebeb' text='unlisted'/>                      
                  </div>
                    <img src={questionLaptop} alt="unlisted device" />
                  </Grid>
                </div>
              </Grid>
              {/* //card content */}
              <Grid item xs={7} sm={6} md={8}>
                <div className="cardDetails">
                  <Grid container direction="row">
                    <Grid item xs={9} sm>
                      <div className={"cardContent"}>
                        <Typography className="heading5">
                          Input the serial number and click <b>Return</b> to continue.
                        </Typography>
                        <TextField fullWidth
                          id="outlined-error-helper-text"
                          label="Provide the serial number"
                          placeholder="Input Number"
                          variant="standard"
                          onChange={e => onChangeSerialNumber(e)}
                          disable={isSubmitted}
                          value={serialNumber}
                        />
                        {!serialNumberValid
                          && <Typography className="errorMessage">
                            The serial number is not valid.
                          </Typography>}
                      </div>
                    </Grid>

                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12} sm={3} md={2}>
                <div className="cardButton">
                  <HlxButton label="Return"
                    onClick={() => props.handleReturnActions({
                      serialNumber: serialNumber,
                      serialNumberValid: serialNumberValid,
                      setSerialNumberValid: setSerialNumberValid,
                      isSubmitted: isSubmitted,
                      setIsSubmitted: setIsSubmitted
                    })}
                    disabled={isDisabled || isSubmitted}
                  >
                  </HlxButton>
                </div>
              </Grid>
            </Grid>

          </Card>
        </Grid>
      </div>

    </div>
  );
};

UnListedDevices.propTypes = {
  handleReturnActions: PropTypes.func,
};



UnListedDevices.defaultProps = {
};
export default UnListedDevices;
