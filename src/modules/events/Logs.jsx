import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Table, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { setHeader } from "./setHeader";
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { uploadId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/events/getByUploadId/${uploadId}/?current=${pagination.current}&pageSize=${pagination.pageSize}`,

          {
            headers: setHeader.json,
          }
        );
        setData(response.data.data);
        setPagination({
          ...pagination,
          total: response.data.datalength,
        });
      } catch (error) {
        if (error.response.status == 403) {
          message.error({
            type: "error",
            content: "You are Unauthorized, Please Login",
            duration: 2,
          });
          navigate("/");
        } else console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  return (
    <Sidebar>
      <div>
        <h2>Error Details</h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={(pagin) => setPagination(pagin)}
        />
      </div>
    </Sidebar>
  );
};

export default Logs;
