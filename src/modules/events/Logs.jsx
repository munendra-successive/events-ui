import React, { useState, useEffect } from "react";
import { Table, Sidebar } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLogData } from "./service";
import { errorMessage } from "../../utils/showMessage";
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
        const response = await fetchLogData(
          uploadId,
          pagination.current,
          pagination.pageSize
        );
        setData(response.data.data);
        setPagination({
          ...pagination,
          total: response.data.datalength,
        });
      } catch (error) {
        if (error.response.status === 403) {
          errorMessage("You are Unauthorized, Please Login");
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
