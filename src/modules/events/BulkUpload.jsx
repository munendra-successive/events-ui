import React, { useContext, useState } from "react";
import axios from "axios";
import { setHeader } from "./setHeader";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button, Upload, Spin, Flex, message } from "antd";
const { Dragger } = Upload;

const BulkUplaod = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    const fileList = event.fileList;

    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0].originFileObj;
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("");
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("csvFile", file);
      formData.append("fileName", fileName);

      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/events/upload`,
        formData,
        {
          headers: setHeader.form,
        }
      );
      setLoading(false);
      setFile(null);
      setFileName(null);
      message.success({
        type: "success",
        content: "File uploaded Successfully",
        duration: 2,
      });
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/");

        message.error({
          type: "error",
          content: "You are Unauthorized, Please Login",
          duration: 2,
        });
      } else {
        console.log("error is:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <div>
        <h2>CSV File Uploader</h2>
        {loading && (
          <div style={{ marginLeft: "40%", marginBottom: "100px" }}>
            <Flex gap="large">
              <Spin size="large">
                <div className="content" />
              </Spin>
            </Flex>
          </div>
        )}
        <Dragger
          accept=".csv"
          onChange={handleFileChange}
          data-testid="choose-file"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload, it only accepts csv file
          </p>
        </Dragger>
        <div
          style={{
            marginLeft: "40%",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
        <Button
          data-testid="upload-button"
          type="primary"
          style={{ marginLeft: "40%" }}
          onClick={handleUpload}
          disabled={!file}
        >
          Upload Csv
        </Button>
      </div>
    </Sidebar>
  );
};

export default BulkUplaod;
