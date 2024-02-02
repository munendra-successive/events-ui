import { setJSON } from "../events/setHeader";
import axios from "axios";
import config from "../../config";
const login = async (values) => {
  return await axios.post(`${config.user_url}/login`, values, {
    headers: setJSON(),
  });
};

const register = async (values) => {
  return await axios.post(`${config.user_url}/register`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const validateToken = async (token) => {
  return await axios.get(`${config.user_url}/verify-token`, {
    headers: {
      Authorization: token,
    },
  });
};

export { login, register, validateToken };
