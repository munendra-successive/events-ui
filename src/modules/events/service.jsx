import axios from "axios";
import { setHeader } from "./setHeader";
const getData = async (current, pageSize, query = null) => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/events/get`, {
    params: {
      current,
      pageSize,
      query,
    },

    headers: setHeader.json,
  });
};

export { getData };
