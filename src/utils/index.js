import { lazy } from "react";
// import Login from "../modules/user/Login";
// import PublicRoutes from "../modules/user/PublicAuth";
const Protected = lazy(() => import("../utils/Protected"));
const Login = lazy(() => import("../modules/user/Login"));
const Register = lazy(() => import("../modules/user/Register"));
const Logs = lazy(() => import("../modules/events/Logs"));
const List = lazy(() => import("../modules/events/List/List"));
const BulkUplaod = lazy(() => import("../modules/events/BulkUpload"));
const View = lazy(() => import("../modules/events/View"));
const Edit = lazy(() => import("../modules/events/Create-Edit"));
const NotFound = lazy(() => import("../utils/NotFound"));
const BulkList = lazy(() => import("../modules/events/BulkList"));
const PublicRoutes = lazy(() => import("../modules/user/PublicAuth"));

export {
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
};
