import React from "react";
import { Input } from "antd";
const SearchBar = (props) => {
  return (
    <Input.Search style={{ width: 200 }} placeholder="Search" {...props} />
  );
};
export default SearchBar;
