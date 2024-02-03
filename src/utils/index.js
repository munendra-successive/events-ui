import { lazy } from "react";
import Login from "../modules/user/Login";
import PublicRoutes from "../modules/user/PublicAuth";
import Protected from "../utils/Protected";
import Register from "../modules/user/Register";
import List from "../modules/events/List/List";
import BulkUplaod from "../modules/events/BulkUpload";
import View from "../modules/events/View";
import Edit from "../modules/events/Create-Edit";
import BulkList from "../modules/events/BulkList";
import NotFound from "../utils/NotFound";
import Logs from "../modules/events/Logs";


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
