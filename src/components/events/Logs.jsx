import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { UserAuth } from "../user/UserAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
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
          `http://localhost:8000/events/getByUploadId/${uploadId}/?current=${pagination.current}&pageSize=${pagination.pageSize}`,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.data);
        setPagination({
          ...pagination,
          total: response.data.datalength,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [uploadId, pagination.current, pagination.pageSize]);

  return (
    <Sidebar>
      {login ? (
        <div>
          <h2>Error Details</h2>
          <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={(pagin) => setPagination(pagin)}
          />
        </div>
      ) : (
        navigate("/")
      )}
    </Sidebar>
  );
};

export default Logs;
