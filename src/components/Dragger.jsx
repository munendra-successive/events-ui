import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const DraggerComp = (props) => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <h3 className="ant-upload-text">
        Click or drag file to this area to upload, it only accepts csv file
      </h3>
    </Dragger>
  );
};

export default DraggerComp;
