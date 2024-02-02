import { useState } from "react";
import { Button } from "../../../components";
import { successMessage, errorMessage } from "../../../utils/showMessage";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../service";

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
            type="link"
            data-testid="view-btn"
            size="large"
            onClick={() => navigate(`/view/${record._id}`)}
            iconname="view"
          />
          <Button
            type="link"
            test_id="edit-btn"
            size="large"
            onClick={() => navigate(`/edit/${record._id}`)}
            iconname="edit"
          />

          <Button
            type="link"
            size="large"
            test_id="delete-btn"
            onClick={() => handleActionDelete(record)}
            danger="true"
            iconname="delete"
          />
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
      await deleteData(id);
      successMessage("Deleted Successfully");
      setIsRefresh(!isRefresh);
    } catch (error) {
      if (error.response?.status === 403) {
        navigate("/");
        errorMessage("You are Unauthorized, Please Login");
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
      const response = await getData(
        pagination.current,
        pagination.pageSize,
        query
      );
      setData(response.data["data"]);
      setPagination({
        ...pagination,
        total: response.data.datalength,
      });
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/");
        errorMessage("You are Unauthorized, Please Login");
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
