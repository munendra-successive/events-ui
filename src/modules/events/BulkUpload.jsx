import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCsv } from "./service";
import { Button, Dragger, Flex, Sidebar } from "../../components";
import { errorMessage, successMessage } from "../../utils/showMessage";

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
      await uploadCsv(formData);
      setLoading(false);
      setFile(null);
      setFileName(null);
      successMessage("File uploaded Successfully");
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/");
        errorMessage("You are Unauthorized, Please Login");
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
            <Flex />
          </div>
        )}
        <Dragger
          accept=".csv"
          data-testid="choose-file"
          onChange={handleFileChange}
        />

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
          name="Upload Csv"
        />
      </div>
    </Sidebar>
  );
};

export default BulkUplaod;
