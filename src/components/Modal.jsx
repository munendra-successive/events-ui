import React from "react";
import { Modal as ModalComponent } from "antd";

const Modal = (props) => {
  return (
    <ModalComponent {...props}>
      <p>Do you want to Delete</p>
    </ModalComponent>
  );
};
export default Modal;
