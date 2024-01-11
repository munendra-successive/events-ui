import React, { useContext, useState } from "react";
import axios from "axios";
import { UserAuth } from "../user/UserAuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const BulkUplaod = () => {
  const { login } = useContext(UserAuth);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("csvFile", file);
      formData.append("fileName", fileName);

      const response = await axios.post(
        "http://localhost:8000/events/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(
        `${response.data.message} number of items is: ${response.data.numberOfItems}`
      );
    } catch (error) {
      console.log("Upload failed", error);
      setMessage("Upload failed!");
    }
  };
  return (
    <>
      <Sidebar>
        {login ? (
          <div>
            <h1>CSV File  Uploader</h1>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <button onClick={handleUpload} disabled={!file}>
              Upload CSV
            </button>
            <p>{message}</p>
          </div>
        ) : (
          navigate("/")
        )}
      </Sidebar>
    </>
  );
};

export default BulkUplaod;
