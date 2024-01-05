import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const BulkList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/events/getall`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data["Data"]);
      } catch (error) {
        console.error("Error fetching data: ", error);
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
      title: "SuccessfulInserted",
      dataIndex: "successfulInserted",
      key: "successfulInserted",
    },
    {
      title: "FailedDuringInsert",
      dataIndex: "failedDuringInsert",
      key: "failedDuringInsert",
    },
    {
      title: "Date",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "View/Edit",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => handleClick(record.uploadId)}
          style={{ margin: "10px" }}
          type="primary"
        >
          View Logs
        </Button>
      ),
    },
  ];

  const handleClick = (uploadId) => {
    navigate(`/logs/${uploadId}`);
  };

  return (
    <div>
      <h2>BulkList</h2>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default BulkList;
