import React, { useContext, useEffect } from "react";
import { Select, Button, Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../index";
import useList from "./useList";
import Sidebar from "../../Sidebar";
const { Option } = Select;

const List = () => {
  const navigate = useNavigate();

  const {
    fetchData,
    data,
    searchQuery,
    setSearchQuery,
    setQuery,
    isRefresh,
    pagination,
    setPagination,
    handleOk,
    query,
    isModalOpen,
    setIsModalOpen,
    columns,
  } = useList();
  const { login, isAuthenticated } = useContext(UserAuth);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, query, isRefresh]);

  return (
    <Sidebar>
      {login ? (
        <div>
          <div style={{ display: "flex", margin: "10px" }}>
            <Select
              data-testid="select"
              style={{ width: 200, marginRight: "16px" }}
              placeholder="Select an Type"
              onChange={(value) => {
                setQuery(value);
                setPagination({
                  current: 1,
                  pageSize: 10,
                  total: 0,
                });
              }}
            >
              <Option value="GameFilter">Game</Option>
              <Option value="PerformanceFilter">Performance</Option>
              <Option value="ShowFilter">Show</Option>
              <Option value="ClassFilter">Class</Option>
              <Option value="TalkFilter">Talk</Option>
              <Option value="ConcertFilter">Concert</Option>
            </Select>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQuery(searchQuery);
                  setPagination({
                    current: 1,
                    pageSize: 10,
                    total: 0,
                  });
                }
              }}
              style={{
                marginRight: "16px",
                padding: "4px",
                borderRadius: "8px",
                borderBlockColor: "lightgray",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "10px",
                marginRight: "10%",
              }}
            >
              <Button type="primary" onClick={() => navigate("/create")}>
                Create
              </Button>
              <Button type="primary" onClick={() => navigate("/bulkUpload")}>
                Upload Csv
              </Button>
            </div>
          </div>
          <div style={{ minHeight: "calc(100vh - 96px)" }}>
            <Table
              data-testid="table"
              dataSource={data}
              columns={columns}
              pagination={pagination}
              onChange={(pagin) => setPagination(pagin)}
            />
          </div>

          <Modal
            title="Confirm Delete"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
          >
            <p>Do you want to Delete</p>
          </Modal>
        </div>
      ) : (
        navigate("/")
      )}
    </Sidebar>
  );
};

export default List;
