import PropTypes from 'prop-types';
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const AutoComplete = (props) => {
  const { id, onChange, placeholder, options, label, onBlur, error, value } = props;
  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={(option) => option.name}
      value={value ? options.find(option => option.value === value) : { name: '', value: '' }}
      onChange={onChange}
      onBlur={onBlur}
      blurOnSelect={true}
      renderInput={(params) =>
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
          variant="standard"
          label={label}
          placeholder={placeholder}
          error={error}
        />}
    />
  );
};

AutoComplete.propTypes = {
  id: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  value: PropTypes.string
};

AutoComplete.defaultProps = {
  autoComplete: true,
  id: 'select',
  multiple: false,
  placeholder: '',
  handleChange: (e, value) => { console.log(e.target, value); },
  onBlur: (e, value) => { console.log(e, value); },
  defaultValue: {
    value: "",
    name: ""
  },
  label: "",
  options: [{
    value: "team",
    name: "Team"
  }, {
    value: "team1",
    name: "Team 1"
  }, {
    value: "team2",
    name: "Team 2"
  }]
};

export default AutoComplete;
