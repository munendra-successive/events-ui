import axios from "axios";
import { setJSON, setFORM } from "./setHeader";
import moment from "moment";
import config from "../../config";
const getData = async (current, pageSize, query = null) => {
  return await axios.get(`${config.event_url}/get`, {
    params: {
      current,
      pageSize,
      query,
    },
    headers: setJSON(),
  });
};

const getBulkData = async () => {
  return await axios.get(`${config.event_url}/getBulk`, {
    headers: setJSON(),
  });
};

const uploadCsv = async (formData) => {
  return await axios.post(`${config.event_url}/upload`, formData, {
    headers: setFORM(),
  });
};

const deleteData = async (id) => {
  return await axios.delete(`${config.event_url}/deleteById/${id}`, {
    headers: setJSON(),
  });
};

const fetchEditData = async (id) => {
  return await axios.get(`${config.event_url}/getById/${id}`, {
    headers: setJSON(),
  });
};
const setFormFields = (eventData) => {
  return {
    name: eventData[0].name,
    address: {
      street: eventData[0].address.street,
      city: eventData[0].address.city,
      state: eventData[0].address.state,
      postalCode: eventData[0].address.postalCode,
      country: eventData[0].address.country,
    },
    description: eventData[0].description,
    startDate: moment(eventData[0].startDate),
    endDate: moment(eventData[0].endDate),
    category: eventData[0].category,
    organizerInfo: eventData[0].organizerInfo,
    type: eventData[0].type,
    status: eventData[0].status,
  };
};

const EditData = async (values, id) => {
  await axios.put(`${config.event_url}/updateById/${id}`, values, {
    headers: setJSON(),
  });
};

const createData = async (values) => {
  return await axios.post(`${config.event_url}/create`, values, {
    headers: setJSON(),
  });
};

const fetchLogData = async (uploadId, current, pageSize) => {
  return await axios.get(
    `${config.event_url}/getByUploadId/${uploadId}`,

    {
      params: {
        current: current,
        pageSize: pageSize,
      },
      headers: setJSON(),
    }
  );
};

export {
  getData,
  getBulkData,
  uploadCsv,
  deleteData,
  fetchEditData,
  setFormFields,
  EditData,
  createData,
  fetchLogData,
};
