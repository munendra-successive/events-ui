const setHeader = {
  json: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("authorization"),
  },
  form: {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("authorization"),
  },
};

export { setHeader };
