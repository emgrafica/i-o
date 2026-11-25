import {
  Button,
  Card,
  DialogTitle,
  Dialog,
  DialogContent,
  TextField, Grid,
  Select, MenuItem, FormControl,
  InputLabel, DialogActions,
  Box, FormHelperText, IconButton,
  CircularProgress
} from '@material-ui/core';
import { CheckCircle, Close, Cancel } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import HlxButton from '../input/button/button';
import './deliveryCard.scss';
import AutoComplete from '../input/autoComplete/autoComplete';

export function ButtonComponent(props) {
  const { onClick, loading, text, icon, startIcon, endIcon, disabled } = props;
  return (
    <Button
      variant="contained"
      className="loading-custome-button"
      color="primary"
      startIcon={loading && !!startIcon ? <CircularProgress size={16} /> : startIcon}
      endIcon={loading && !!endIcon ? <CircularProgress size={16} /> : endIcon}
      onClick={onClick}
      disabled={loading || disabled}>
      {text}
    </Button>

  );
};

const defaultAddress = {
  // companyName: 'DXC',
  // firstName: '',
  // lastName: '',
  country: '',
  street: '',
  city: '',
  state: '',
  zipCode: ''
};
function AddressDialog(props) {
  const { onClose, selectedValue, open, addressItem, stateData, countryData, validationFunc } = props;
  const [address, setAddress] = useState(addressItem);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationFields, setValidationFields] = useState({
    // companyName: true,
    // firstName: true,
    // lastName: true,
    country: true,
    street: true,
    city: true,
    state: true,
    zipCode: true
  });

  const handleChange = (event, fieldName) => {
    let val = '';
    if (event) {
      val = event.target ? event.target.value : event.value;
    }
    setAddress({
      ...address,
      [fieldName]: val
    });    
  };
  const validateField = (fieldName) => {
    setValidationFields({
      ...validationFields,
      [fieldName]: !!address[fieldName]   
    });
  };

  const handleClose = async (event, reason, isUpdateAddress = false) => {
    let isValid = true,
      validFields = {};
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
    Object.keys(validationFields).forEach(ele => {
      if (!address[ele]) isValid = false;
      validFields = {
        ...validFields,
        [ele]: !!address[ele]
      };
    });
    if (isUpdateAddress) {
      setValidationFields({
        ...validationFields,
        ...validFields
      });
    }
    if (isValid && validationFunc && isUpdateAddress) {
      setIsLoading(true);
      const result = await validationFunc(address);
      if (result && !result.isValid) {
        isValid = false;
        setErrorMsg(result.message);
      } else {
        setErrorMsg('');
      }
      setIsLoading(false);
    }
    if (reason !== 'backdropClick') {
      if (isUpdateAddress) {
        if (isValid) onClose(address, isUpdateAddress);
      } else {
        onClose(address, isUpdateAddress);
      }
    }
  };

  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      className="delivery-address-dialog"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Update Address
        <IconButton
          aria-label="close"
          className="simple-dialog-title-close-btn"
          onClick={(event) => handleClose(event, '', false)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* <Box m={1}>
          <TextField
            margin="dense"
            id="company-name"
            label="Company name"
            disabled
            type="text"
            value={address.companyName}
            onChange={(e) => handleChange(e, 'companyName')}
            onBlur={(e) => validateField('companyName')}
            name="companyName"
            error={!validationFields.companyName}
            fullWidth
          />
        </Box> */}
        {/* <Grid container>
          <Grid xs={6} item={true}>
            <Box m={1}>
              <TextField
                autoFocus
                margin="dense"
                id="first-name"
                label="First name"
                type="text"
                name="firstName"
                value={address.firstName}
                error={!validationFields.firstName}
                onChange={(e) => handleChange(e, 'firstName')}
                onBlur={(e) => validateField('firstName')}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid xs={6} item={true}>
            <Box m={1}>
              <TextField
                margin="dense"
                id="last-name"
                label="Last name"
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={(e) => handleChange(e, 'lastName')}
                onBlur={(e) => validateField('lastName')}
                error={!validationFields.lastName}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid> */}
        <Grid container className="form-container">
        <Grid container>
          <Grid xs={4} className="form-left-title">
            {validationFields.street? <label>Address Line 1</label> : <label className="title-validated">Address Line 1</label>}
          </Grid>
          <Grid xs={8}>
            <TextField
                margin="dense"
                id="street-address"
                // helperText="House, apartment, suite, floor."
                // label="House"
                type="text"
                name="street"
                value={address.street}
                error={!validationFields.street}
                onChange={(e) => handleChange(e, 'street')}
                onBlur={(e) => validateField('street')}
                fullWidth
                required
              />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} className="form-left-title">
            <label className="label-optional">Address Line 2</label>
          </Grid>
          <Grid xs={8}>
            <TextField
                margin="dense"
                id="street-address2"
                // label="Street"
                name="address2"
                // helperText="Building or street name."
                type="text"
                value={address.address2 ? address.address2 : ''}
                onChange={(e) => handleChange(e, 'address2')}
                fullWidth
              />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} className="form-left-title">
            {validationFields.city? <label>City</label> : <label className="title-validated">City</label>}
          </Grid>
          <Grid xs={8}>
            <TextField
                margin="dense"
                id="city"
                // label="City"
                type="text"
                // name="city"
                value={address.city}
                onChange={(e) => handleChange(e, 'city')}
                onBlur={(e) => validateField('city')}
                error={!validationFields.city}
                fullWidth
              />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} className="form-left-title">
            {address.state || validationFields.state ? <label>State/Province Region</label> : <label className="title-validated">State/Province Region</label>}
          </Grid>
          <Grid xs={8}>
            <FormControl margin="dense" className="select-address-dialog">
                    <AutoComplete
                      id="state"
                      name="state"
                      onChange={(e, val) => handleChange(val, 'state')}
                      // label={'State'}
                      options={stateData}
                      onBlur={(e) => validateField('state')}
                      value={!!address.state ? address.state : ''}
                      error={address.state ? false : !validationFields.state}
                    ></AutoComplete>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} className="form-left-title">
            {validationFields.zipCode? <label>Zip/Postal Code</label> : <label className="title-validated">Zip/Postal Code</label>}
          </Grid>
          <Grid xs={8}>
            <TextField
                    margin="dense"
                    id="zipCode"
                    // label="Zip code"
                    type="text"
                    value={address.zipCode}
                    name="zipCode"
                    error={!validationFields.zipCode}
                    onChange={(e) => handleChange(e, 'zipCode')}
                    onBlur={(e) => validateField('zipCode')}
                    fullWidth
                  />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} className="form-left-title">
            { address.country || validationFields.country? <label>Country</label> : <label className="title-validated">Country</label>}
          </Grid>
          <Grid xs={8}>
             <FormControl width="100%" margin="dense" error={address.country ? false : !validationFields.country}

            className="select-address-dialog">
            {/* <InputLabel id="contry"></InputLabel> */}
            <Select
              labelId="contry"
              name="contry"
              value={!!address.country ? address.country : ''}
              onChange={(e) => handleChange(e, 'country')}
              onBlur={(e) => validateField('country')}
              fullWidth
            >
              {countryData.map((e, index) => <MenuItem className="io-dialog-select-item" key={index} value={e.value}>{e.name}</MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
        </Grid>
        <Grid container>
        {!!errorMsg && <Box m={1}>
          <FormControl error>
            <FormHelperText >{errorMsg}</FormHelperText>
          </FormControl>
        </Box>}
        </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <HlxButton
          onClick={(event, reason) => handleClose(event, reason, false)}
          label="CANCEL"
        ></HlxButton>
        <HlxButton
          loading={isLoading}
          onClick={(event, reason) => handleClose(event, reason, true)}
          label="OK"
        ></HlxButton>
      </DialogActions>
    </Dialog >
  );
}

AddressDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const DeliveryCard = (props) => {
  const { stateData, countryData, disabled, validationFunc } = props;
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState(!!props.addressItem ? props.addressItem : defaultAddress);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { error, errorText } = props;
  const handleClose = (address, isUpdateAddress = true) => {
    setOpen(false);
    if (isUpdateAddress) {
      setAddress(address);
      props.onChange(address);
    }
  };
  const getCountryLabelByCode = (code) => {
    return countryData.find(function (element) {
      return element.value === code;
    })?.name;
  }

  return (
    <div className="io-delivery-card">
      <h5 className="heading5">{props.title}</h5>
      <Card className="card-wrap">
        <FormControl error={error} className="io-delivery-card-body">
          <Grid container >
            <Grid item xs={8}>
              {address.country === "" ? (
                <Box className="content-box">
                  <p key={3} className="bodyRegular"> House number, building or street name, city</p>
                  <p key={4} className="bodyRegular">State, zip code</p>
                  <p key={5} className="bodyRegular">Country</p>
                </Box>
              ) : (
                <Box className="content-box">
                  {/* <p key={1} className="bodyBold">{address.companyName}</p> */}
                  {/* <p key={2} className="bodyRegular">{address.firstName} {address.lastName}</p> */}
                  <p key={3} className="bodyRegular">{address.street} {address.address2 ? address.address2 : ''} {address.city}</p>
                  <p key={4} className="bodyRegular">{address.state} {address.zipCode}</p>
                  <p key={5} className="bodyRegular">{getCountryLabelByCode(address.country)}</p>
                </Box>
              )}
            </Grid>
            <Grid item xs={4}>
              {!disabled && <Button className="buttonLink" onClick={handleClickOpen}>
                {address.country === "" ? "Add Address +" : "Edit Address"}
              </Button>}
            </Grid>
          </Grid>

          {error && <FormHelperText id="my-helper-text">{errorText}</FormHelperText>}
        </FormControl>
      </Card>
      <AddressDialog open={open} onClose={handleClose} addressItem={address} stateData={stateData} countryData={countryData} validationFunc={validationFunc} />
    </div>
  );
};

DeliveryCard.propTypes = {
  title: PropTypes.string,
  addressItem: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  disabled: PropTypes.bool,
};



DeliveryCard.defaultProps = {
  title: 'Delivery Method',
  error: false,
  disabled: false,
  validationFunc: async () => { },
  errorText: 'Please update your address',
  stateData: [{
    name: 'Austin',
    value: 'Austin'
  }, {
    name: 'Texas',
    value: 'Texas'
  }, {
    name: 'Cali',
    value: 'Cali'
  }],
  countryData: [{
    name: 'USA',
    value: 'USA'
  }],
  addressItem: {
    ...defaultAddress
  },
  onChange: (address) => { console.log(address) }
};

export default DeliveryCard;
