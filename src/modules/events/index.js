import { List } from "./List/";
import BulkList from "./BulkList";
import BulkUplaod from "./BulkUpload";
import Edit from "./Create-Edit";
import View from "./View";
import Logs from "./Logs";
import Sidebar from "./Sidebar";
import {
  getData,
  getBulkData,
  uploadCsv,
  deleteData,
  fetchEditData,
  setFormFields,
  EditData,
  createData,
  fetchLogData,
} from "./service";
import { setJSON, setFORM } from "./setHeader";

export {
  List,
  BulkList,
  BulkUplaod,
  Edit,
  View,
  Logs,
  getData,
  getBulkData,
  uploadCsv,
  deleteData,
  fetchEditData,
  setFormFields,
  EditData,
  createData,
  fetchLogData,
  setJSON,
  setFORM,
  Sidebar,
};
