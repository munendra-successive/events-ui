import React from "react";
import { Button as ButtonComponent } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const iconMapping = {
  delete: <DeleteOutlined />,
  edit: <EditOutlined />,
  view: <EyeOutlined />,
};

const Button = (props) => {
  const { name, iconname, danger } = props;
  const iconComponent = iconname ? iconMapping[iconname] : null;
  return (
    <ButtonComponent
      icon={iconComponent}
      {...(danger ? { danger: true } : null)}
      {...props}
    >
      {name}
    </ButtonComponent>
  );
};

export default Button;
