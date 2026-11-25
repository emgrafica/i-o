import PropTypes from 'prop-types';
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const SelectBox = (props) => {
  const { id, multiple, handleChange, defaultValue, placeholder, options, label } = props;
  return (
    <Autocomplete
      multiple={multiple}
      id={id}
      options={options}
      getOptionLabel={(option) => option.name}
      defaultValue={defaultValue}
      onChange={handleChange}
      getOptionSelected={(option, value) => value.value === option.value}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

SelectBox.propTypes = {
  id: PropTypes.string,
  multiple: PropTypes.bool,
  defaultValue: PropTypes.array,
  options: PropTypes.array,
  label:PropTypes.string,
  placeholder:PropTypes.string,
  handleChange: PropTypes.func
};

SelectBox.defaultProps = {
  id: 'select',
  multiple: true,
  placeholder:'Please select !!!',
  handleChange: (e, value) => { console.log(e.target, value); },
  defaultValue: [{
    value: "team",
    name: "Team"
  }],
  label:"Multiple values",
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

export default SelectBox;
