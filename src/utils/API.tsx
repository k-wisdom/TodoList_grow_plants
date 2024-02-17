import axios from "axios";

//dev
const url = "http://localhost:3001";

const API = axios.create({
  baseURL: `${url}/`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // return console.error(error.message);
    return Promise.reject(error);
  },
);

export default API;
