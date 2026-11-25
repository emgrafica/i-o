import PropTypes from "prop-types";
import React from "react";
import "./dateTimePicker.scss";
import TextField from '@material-ui/core/TextField';

const DateTimePicker = (props) => {
  const { label, onChange, defaultValue, disabled, error } = props;

  return (
    <div className="date-picker-block">
      <TextField
        id="date"
        disabled={disabled}
        label={label}
        error={error}
        type="date"
        defaultValue={defaultValue ? defaultValue : ''}
        className="text-date"
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  disable: PropTypes.bool,
  defaultValue: PropTypes.string,
};

DateTimePicker.defaultProps = {
  label: 'When did it go missing?',
  onChange: (() => { }),
  disabled: false,
  defaultValue: '',
  error: false
};

export default DateTimePicker;
