import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "View/Edit",
      key: "action",
      render: (record) => (
        <>
          <Button
            style={{ margin: "10px" }}
            type="primary"
            onClick={() => navigate(`/view/${record._id}`)}
          >
            View
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(`/edit/${record._id}`)}
          >
            Edit
          </Button>

          <Button type="primary" onClick={() => handleActionDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleChange = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/events/find/${value}`,
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

  const handleOk = async () => {
    try {
      await axios.delete(`http://localhost:8000/events/deleteById/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Deleted Successfully");
      setRefresh(!isRefresh);
    } catch (error) {
      console.error("Error in deleteing data: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleActionDelete = (record) => {
    setId(record._id);
    setIsModalOpen(true);
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/events/find/${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data["data"]);
    } catch (error) {
      setData([]);
      console.error("Error fetching data: ", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/events/get`, {
        params: {
          current: pagination.current,
          pageSize: pagination.pageSize,
        },

        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data["data"]);
      setPagination({
        ...pagination,
        total: response.data.datalength,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return {
    fetchData,
    data,
    setData,
    id,
    setId,
    searchQuery,
    setSearchQuery,
    isRefresh,
    setRefresh,
    pagination,
    setPagination,
    isModalOpen,
    handleActionDelete,
    handleSearch,
    handleChange,
    handleOk,
    setIsModalOpen,
    columns,
  };
};

export default useList;
