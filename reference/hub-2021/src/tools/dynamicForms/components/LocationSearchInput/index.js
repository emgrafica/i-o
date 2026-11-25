import {  AutoComplete } from "antd";
import React from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const { Option } = AutoComplete;
const LocationSearchInput = (wrapperProps) => {
  const {
    placePredictions,
    getPlacePredictions
  } = useGoogle({
    apiKey: "AIzaSyCzfxQSzHljOldKih7neyGyBIElw5Sveuc"
  });
  return (
    <AutoComplete
      onSelect={(val) => {
        getPlacePredictions({ input: val });
        wrapperProps.onChange(val);
      }}
      onSearch={(val) => {
        getPlacePredictions({ input: val });
        if(!val){
          wrapperProps.onChange(val);
        }
      }}
    >
      {placePredictions.map((opt) => (
        <Option key={opt.place_id} value={opt.description}>
          {opt.description}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default LocationSearchInput;
