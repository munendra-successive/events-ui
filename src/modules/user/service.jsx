import { setHeader } from "../events/setHeader";
import axios from "axios";
import config from "../../config";
const login = async (values) => {
  return await axios.post(`${config.user_url}/login`, values, {
    headers: setHeader.json,
  });
};

const register = async (values) => {
  return await axios.post(`${config.user_url}/register`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { login, register };
