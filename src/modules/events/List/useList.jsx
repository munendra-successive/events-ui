import { useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { setHeader } from "../setHeader";
import axios from "axios";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Organizer",
      dataIndex: "organizerInfo",
      key: "organizerInfo",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "View Edit Delete",
      key: "action",
      render: (record) => (
        <>
          <Button
            data-testid="view-btn"
            style={{ margin: "10px" }}
            type="link"
            size="large"
            onClick={() => navigate(`/view/${record._id}`)}
          >
            <EyeOutlined />
          </Button>
          <Button
            type="link"
            data-testid="edit-btn"
            size="large"
            onClick={() => navigate(`/edit/${record._id}`)}
          >
            <EditOutlined />
          </Button>

          <Button
            type="link"
            size="large"
            data-testid="delete-btn"
            onClick={() => handleActionDelete(record)}
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleOk = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/events/deleteById/${id}`,
        {
          headers: setHeader.json,
        }
      );

      message.success({
        type: "success",
        content: "Deleted Successfully",
        duration: 2,
      });
      setIsRefresh(!isRefresh);
    } catch (error) {
      if (error.response?.status === 403) {
        navigate("/");
        message.error({
          type: "error",
          content: "You are Unauthorized, Please Login",
          duration: 2,
        });
      } else console.error("Error in deleteing data: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleActionDelete = (record) => {
    setId(record._id);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/events/get`,
        {
          params: {
            current: pagination.current,
            pageSize: pagination.pageSize,
            query: query,
          },

          headers: setHeader.json,
        }
      );
      setData(response.data["data"]);
      setPagination({
        ...pagination,
        total: response.data.datalength,
      });
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

  return {
    fetchData,
    data,
    setData,
    id,
    setId,
    searchQuery,
    query,
    setQuery,
    setSearchQuery,
    isRefresh,
    setIsRefresh,
    pagination,
    setPagination,
    isModalOpen,
    handleActionDelete,
    handleOk,
    setIsModalOpen,
    columns,
  };
};

export default useList;
