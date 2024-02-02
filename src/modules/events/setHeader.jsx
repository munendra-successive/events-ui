const setJSON = () => {
  return {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("authorization"),
  };
};

const setFORM = () => {
  return {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("authorization"),
  };
};

export { setJSON, setFORM };
