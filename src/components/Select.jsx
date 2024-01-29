import React from "react";
import { Select as SelectComponent } from "antd";
const { Option } = SelectComponent;

const Select = (props) => {
  return (
    <SelectComponent
      style={{ width: 200, marginRight: "16px" }}
      placeholder="Select an Type"
      {...props}
    >
      <Option value="GameFilter">Game</Option>
      <Option value="PerformanceFilter">Performance</Option>
      <Option value="ShowFilter">Show</Option>
      <Option value="ClassFilter">Class</Option>
      <Option value="TalkFilter">Talk</Option>
      <Option value="ConcertFilter">Concert</Option>
    </SelectComponent>
  );
};
export default Select;
