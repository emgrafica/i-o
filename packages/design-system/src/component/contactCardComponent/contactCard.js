import {
  Button,
  Card,
  DialogTitle,
  Dialog, Select, MenuItem,
  DialogContent,
  TextField, FormControl, Grid,
  InputLabel, DialogActions,
  Box, FormHelperText, IconButton,
  CircularProgress
} from '@material-ui/core';
import { CheckCircle, Close, Cancel } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './contactCard.scss';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import HlxButton from '../input/button/button';


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
  // contactName: "",
  phoneNumber: "",
  firstName: '',
  lastName: '',
  phoneType: 'Home'

};
function AddressDialog(props) {
  const { onClose, open, addressItem, phoneType } = props;
  const [address, setAddress] = useState(addressItem);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationFields, setValidationFields] = useState({
    // contactName: true,
    phoneNumber: true,
    firstName: true,
    lastName: true,
    // phoneType: true
  });
  const handleChange = (event, fieldName) => {
    setAddress({
      ...address,
      [fieldName]: fieldName === 'phoneNumber' ? event : event.target.value

    });
  };
  const validateField = (fieldName) => {
    if (fieldName === 'phoneNumber') {
      setValidationFields({
        ...validationFields,
        [fieldName]: address[fieldName] ? isValidPhoneNumber(address[fieldName]) : !!address[fieldName]
      })
    } else {
      setValidationFields({
        ...validationFields,
        [fieldName]: !!address[fieldName]
      });
    }
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

      if (ele === 'phoneNumber' && address[ele] && !isValidPhoneNumber(address[ele])) {
        isValid = false;
        validFields = {
          ...validFields,
          [ele]: isValid
        };
      }
    });

    if (isUpdateAddress) {
      setValidationFields({
        ...validationFields,
        ...validFields
      });
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
        Update Contact
        <IconButton
          aria-label="close"
          className="simple-dialog-title-close-btn"
          onClick={(event) => handleClose(event, '', false)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
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
        </Grid>
        <Grid container>
          <Grid xs={6} md={9} item={true}>
            <Box className="phone-box" m={1}>
              <div>
                <div className="PhoneLabel">
                  Phone Number
                </div>
                <div className="PhoneInputWrapper">
                  <PhoneInput
                    className={validationFields.phoneNumber ? 'PhoneNumberDefault' : 'PhoneNumberError'}
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    defaultCountry="US"
                    country="US"
                    international
                    withCountryCallingCode
                    options={"US"}
                    value={address.phoneNumber}
                    onChange={(e) => handleChange(e, 'phoneNumber')}
                    onBlur={() => validateField('phoneNumber')}
                  />
                  {!validationFields.phoneNumber && (
                    <p className="err-msg"><i>Invalid Phone Number</i></p>
                  )}
                </div>
              </div>
            </Box>
          </Grid>
          <Grid xs={6} md={3} item={true}>
            <Box m={1}>
              <FormControl width="100%" margin="dense"
                className="select-address-dialog">
                <InputLabel id="phoneType">Phone Type</InputLabel>
                <Select
                  labelId="phoneType"
                  name="phoneType"
                  value={!!address.phoneType ? address.phoneType : ''}
                  // error={!validationFields.phoneType}
                  onChange={(e) => handleChange(e, 'phoneType')}
                  // onBlur={(e) => validateField('phoneType')}
                  fullWidth
                >
                  {phoneType.map((e, index) => <MenuItem className="io-dialog-select-item" key={index} value={e.value}>{e.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>




        {!!errorMsg && <Box m={1}>
          <FormControl error>
            <FormHelperText >{errorMsg}</FormHelperText>
          </FormControl>
        </Box>}
      </DialogContent>
      <DialogActions>
        <HlxButton
          onClick={(event, reason) => handleClose(event, reason, false)}
          label="CANCEL"
        ></HlxButton>
         <HlxButton
          onClick={(event, reason) => handleClose(event, reason, true)}
          loading={isLoading}
          label="OK"
        ></HlxButton>
      </DialogActions>
    </Dialog>
  );
}

AddressDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const ContactCard = (props) => {

  const { disabled, validationFunc, phoneType } = props;
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

  return (
    <div className="io-delivery-card">
      <h5 className="heading5">{props.title}</h5>
      <Card className="card-wrap">
        <FormControl error={error} className="io-delivery-card-body">
          <Grid container>
            <Grid xs={8}>
              <Box className="content-box">
                {/* <p key={1} className="bodyBold">{address.contactName}</p> */}
                <p key={2} className="bodyRegular">{address.firstName} {address.lastName}</p>
                {(address.phoneType && address.phoneNumber) && <p key={2} className="bodyRegular">{address.phoneType} : {formatPhoneNumberIntl(address.phoneNumber)}</p>}
              </Box>
            </Grid>
            <Grid xs={4}>
              {!disabled && <Button className="buttonLink" onClick={handleClickOpen}>
                Edit Contact
              </Button>}
            </Grid>
          </Grid>
          {error && <FormHelperText id="my-helper-text">{errorText}</FormHelperText>}
        </FormControl>
      </Card>
      <AddressDialog open={open} onClose={handleClose} addressItem={address} validationFunc={validationFunc} phoneType={phoneType} />
    </div>
  );
};

ContactCard.propTypes = {
  title: PropTypes.string,
  addressItem: PropTypes.object,
  phoneType: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  disabled: PropTypes.bool,
};



ContactCard.defaultProps = {
  title: 'Deliver Contact To:',
  phoneType: [{
    name: 'Mobile',
    value: 'Mobile'
  }, {
    name: 'Home',
    value: 'Home'
  }, {
    name: 'Work',
    value: 'Work'
  }],
  error: false,
  disabled: false,
  errorText: 'Please update your address',
  addressItem: {
    ...defaultAddress
  },
  onChange: (address) => { console.log(address) }
};

export default ContactCard;
