// @ts-nocheck
import React from 'react';
import {
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import styled from 'styled-components';

/** Button component that controls the show more/show less for approval cards */
export const RadioCustom = styled(Radio)`
  color: #5f249f !important;
  margin: 9px !important;
`;

export interface RadioGroupControl {
  data: any;
}

const RadioGroupControl: React.FC<RadioGroupControl> = ({
  data,
  value,
  label,
  onChange,
  style,
  error,
}) => {
  return (
    <FormControl component="fieldset" error={error} style={style}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={label}
        value={value ?? ''}
        onChange={onChange}
      >
        {data &&
          data.map((e, index) => {
            return (
              <FormControlLabel
                key={index}
                value={e.value}
                control={<RadioCustom />}
                label={e.name}
              />
            );
          })}
      </RadioGroup>
      {/* <FormHelperText>{helperText}</FormHelperText> */}
    </FormControl>
  );
};

export default RadioGroupControl;
