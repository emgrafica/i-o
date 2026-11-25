import React, { useState } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import "./radioGroupComponent.scss";

const generateClassName = createGenerateClassName({
    productionPrefix: 'io-radio-group'
});

export function RadioGroupComponent(props) {
  const { data, selected, onChange, isRow } = props;
  return (
    <StylesProvider generateClassName={generateClassName}>
        <RadioGroup
        row={isRow}
        name="sortting"
        value={selected}
        onChange={onChange}
        >
        {data.map((item) => (
            <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio className="radio-node" />}
            label={item.label}
            />
        ))}
        </RadioGroup>
    </StylesProvider>
  );
}

RadioGroupComponent.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.string,
  isRow: PropTypes.bool,
};

RadioGroupComponent.defaultProps = {
  data: [
    { value: "relevancy,true", label: "Relevance" },
    { value: "sys_view_count,true", label: "Views" },
  ],
  selected: "",
  isRow: false,
  onChange: (item) => {
    console.log("selected item", item);
  },
};
export default RadioGroupComponent;
