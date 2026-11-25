import { AutoComplete } from "antd";
import React, {useState} from "react";

const { Option } = AutoComplete;
const AutoCompleteContainer = (props) => {
  const [result, setResult] = useState(props.options);
  const handleSearch = (value) => {
    let res = props.options.filter(v => v.value.toLowerCase().includes(value.toLowerCase()));
    setResult(res);
  }
  return (
    <AutoComplete
      onSelect={props.onChange}
      onSearch={handleSearch}
    >
      {result.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.description}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default AutoCompleteContainer;
