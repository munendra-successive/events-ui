import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Sidebar } from "../../components";
import { getBulkData } from "./service";
import { errorMessage } from "../../utils/showMessage";
const BulkList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBulkData();
        setData(response.data["data"]);
      } catch (error) {
        if (error.response.status === 403) {
          navigate("/");
          errorMessage("You are Unauthorized, Please Login");
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
          name="View Log"
        ></Button>
      ),
    },
  ];

  const handleClick = (uploadId) => {
    navigate(`/logs/${uploadId}`);
  };

  return (
    <Sidebar>
      <h2>BulkList</h2>
      <Table columns={columns} dataSource={data} />
    </Sidebar>
  );
};

export default BulkList;
