import React, { lazy } from "react";
import Protected from "../modules/events/Protected";
import { Route, Routes } from "react-router-dom";
const Login = lazy(() => import("../modules/user/Login"));
const Register = lazy(() => import("../modules/user/Register"));
const Logs = lazy(() => import("../modules/events/Logs"));
const List = lazy(() => import("../modules/events/List/List"));
const BulkUplaod = lazy(() => import("../modules/events/BulkUpload"));
const View = lazy(() => import("../modules/events/View"));
const Edit = lazy(() => import("../modules/events/Create-Edit"));
const NotFound = lazy(() => import("../utils/NotFound"));
const BulkList = lazy(() => import("../modules/events/BulkList"));
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
