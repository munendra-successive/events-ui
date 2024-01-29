import { lazy } from "react";

// import Button from "./Button";
// import Modal from "./Modal";
// import SearchBar from "./SearchBar";
// import Select from "./Select";
// import Table from "./Table";
// import Dragger from "./Dragger";
// import Flex from "./Flex";

const Button = lazy(() => import("./Button"));
const Modal = lazy(() => import("./Modal"));
const SearchBar = lazy(() => import("./SearchBar"));
const Select = lazy(() => import("./Select"));
const Table = lazy(() => import("./Table"));
const Dragger = lazy(() => import("./Dragger"));
const Flex = lazy(() => import("./Flex"));

export { Button, Modal, SearchBar, Select, Table, Dragger, Flex };
