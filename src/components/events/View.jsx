import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "..";
import Sidebar from "../Sidebar";
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
      <span>
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
  const { login } = useContext(UserAuth);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/events/getById/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data["data"]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar>
        {login ? <Table dataSource={data} columns={columns} /> : navigate("/")}
      </Sidebar>
    </>
  );
};

export default View;
