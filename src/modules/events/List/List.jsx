import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Modal,
  Select,
  SearchBar,
  Button,
  Sidebar,
} from "../../../components";
import useList from "./useList";

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

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, query, isRefresh]);

  return (
    <Sidebar>
      <div>
        <div style={{ display: "flex", margin: "10px" }}>
          <Select
            onChange={(value) => {
              setQuery(value);
              setPagination({
                current: 1,
                pageSize: 10,
                total: 0,
              });
            }}
          />
          <SearchBar
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
            <Button
              type="link"
              onClick={() => navigate("/edit/create")}
              name="Create"
            />
            <Button
              type="link"
              onClick={() => navigate("/bulkUpload")}
              name="Upload Csv"
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          setPagination={setPagination}
          onChange={(pagin) => setPagination(pagin)}
        />
        <Modal
          data-testid="confirm-delete"
          title="Confirm Delete"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </Sidebar>
  );
};

export default List;
