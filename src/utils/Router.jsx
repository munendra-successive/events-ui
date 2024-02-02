import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  PublicRoutes,
  Protected,
  Login,
  Register,
  Logs,
  List,
  BulkUplaod,
  View,
  Edit,
  NotFound,
  BulkList,
} from "./index";
const Router = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Protected />}>
        <Route path="/list" element={<List />} />
        <Route path="/bulkUpload" element={<BulkUplaod />} />
        <Route path="/bulkDetails" element={<BulkList />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/logs/:uploadId" element={<Logs />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
