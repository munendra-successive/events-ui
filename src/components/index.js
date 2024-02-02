import { lazy } from "react";

// import Button from "./Button";
// import Modal from "./Modal";
// import SearchBar from "./SearchBar";
// import Select from "./Select";
import Table from "./Table";
// import Dragger from "./Dragger";
// import Flex from "./Flex";
import { FormComp } from "./Form";
// import Input from "./Input";
// import DatePicker from "./DatePicker";
// import TextArea from "./TextArea";
// import FormItem from "./FormItem";
// import Form from "./Form";
// import InputGroup from "./InputGroup";
// import Password from "./Password";

const Password = lazy(() => import("./Password"));
const InputGroup = lazy(() => import("./InputGroup"));
const Input = lazy(() => import("./Input"));
const DatePicker = lazy(() => import("./DatePicker"));
const TextArea = lazy(() => import("./TextArea"));
const FormItem = lazy(() => import("./FormItem"));
const Button = lazy(() => import("./Button"));
const Modal = lazy(() => import("./Modal"));
const SearchBar = lazy(() => import("./SearchBar"));
const Select = lazy(() => import("./Select"));
// const Table = lazy(() => import("./Table"));
const Dragger = lazy(() => import("./Dragger"));
const Flex = lazy(() => import("./Flex"));
const Form = lazy(() => import("./Form"));

export {
  Button,
  Modal,
  SearchBar,
  Select,
  Table,
  Dragger,
  Flex,
  Form,
  FormItem,
  Input,
  TextArea,
  DatePicker,
  InputGroup,
  FormComp,
  Password,
};
