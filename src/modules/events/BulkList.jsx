import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./setHeader";
import Sidebar from "./Sidebar";
import { UserAuth } from "../user";

const BulkList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(UserAuth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/events/getBulk`,
          {
            headers: setHeader.json,
          }
        );
        setData(response.data["data"]);
      } catch (error) {
        if (error.response.status === 403) {
          navigate("/");
          message.error({
            type: "error",
            content: "You are Unauthorized, Please Login",
            duration: 2,
          });
        } else console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Filename",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Successful Inserted",
      dataIndex: "successfulInserted",
      key: "successfulInserted",
    },
    {
      title: "Failed During Insert",
      dataIndex: "failedDuringInsert",
      key: "failedDuringInsert",
    },
    {
      title: "Date",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Logs",
      key: "action",
      render: (text, record) => (
        <Button
          data-testid="view-log-button"
          onClick={() => handleClick(record.uploadId)}
          style={{ margin: "10px" }}
          type="link"
        >
          View Log
        </Button>
      ),
    },
  ];

  const handleClick = (uploadId) => {
    navigate(`/logs/${uploadId}`);
  };

  return (
    <Sidebar>
      {login ? (
        <>
          <h2>BulkList</h2>
          <Table dataSource={data} columns={columns} />
        </>
      ) : (
        navigate("/")
      )}
    </Sidebar>
  );
};

export default BulkList;
