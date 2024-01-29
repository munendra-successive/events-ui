import { message } from "antd";
const successMessage = (content) => {
  return message.success({
    type: "success",
    content: content,
    duration: 2,
  });
};
const errorMessage = (content) => {
  return message.error({
    type: "error",
    content: content,
    duration: 2,
  });
};
export { successMessage, errorMessage };
