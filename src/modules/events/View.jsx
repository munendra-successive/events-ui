import React, { useContext, useEffect, useState } from "react";
import { Table, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { setHeader } from "./setHeader";
const columns = [
  {
    title: "Event Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (_, record) => (
      <span data-testid="view">
        {record.address.street}
        <br />
        {record.address.city}
        <br />
        {record.address.state}
        <br />
        {record.address.postalCode}
        <br />
        {record.address.country}
      </span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const View = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/events/getById/${id}`,
          {
            headers: setHeader.json,
          }
        );
        setData(response.data["data"]);
      } catch (error) {
        if (error.response.status === 403) {
          message.error({
            type: "error",
            content: "You are Unauthorized, Please Login",
            duration: 2,
          });
          navigate("/");
        } else console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Sidebar>
      <Table dataSource={data} columns={columns} />
    </Sidebar>
  );
};

export default View;
