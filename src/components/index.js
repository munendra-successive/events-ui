import { lazy } from "react";

import Button from "./Button";
import SearchBar from "./SearchBar";
import Select from "./Select";
import { FormComp } from "./Form";
import Input from "./Input";
import TextArea from "./TextArea";
import FormItem from "./FormItem";
import Form from "./Form";
import Flex from "./Flex";
import InputGroup from "./InputGroup";
import Password from "./Password";
import Dragger from "./Dragger";
import Skeleton from "./Skeleton";
import Modal from "./Modal";

const Sidebar = lazy(() => import("./Sidebar"));
const DatePicker = lazy(() => import("./DatePicker"));
const Table = lazy(() => import("./Table"));

export {
  Button,
  Modal,
  SearchBar,
  Select,
  Table,
  Skeleton,
  Dragger,
  Flex,
  Form,
  FormItem,
  Input,
  Sidebar,
  TextArea,
  DatePicker,
  InputGroup,
  FormComp,
  Password,
};
