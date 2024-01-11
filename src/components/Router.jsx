import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  List,
  Create,
  BulkUplaod,
  View,
  Edit,
  NotFound,
  BulkList,
} from "./index";
import Logs from "./events/Logs";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/list" element={<List />} />
      <Route path="/create" element={<Create />} />
      <Route path="/bulkUpload" element={<BulkUplaod />} />
      <Route path="/bulkDetails" element={<BulkList />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/logs/:uploadId" element={<Logs />} />
      <Route path="*"  element={<NotFound />} />
    </Routes>
  );
};

export default Router;
