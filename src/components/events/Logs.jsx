import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { UserAuth } from "../user/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Logs = () => {
  const columns = [
    {
      title: "Row Number",
      dataIndex: "rowNumber",
      key: "rowNumber",
    },

    {
      title: "Error Message",
      dataIndex: "errorMessage",
      key: "errorMessage",
    },
  ];
  const { login } = useContext(UserAuth);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { uploadId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/events/getByUploadId/${uploadId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [uploadId]);

  return (
    <>
      {login ? (
        <div>
          <h2>Error Details</h2>
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Logs;
