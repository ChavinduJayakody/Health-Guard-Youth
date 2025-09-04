import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_URL
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:5000/api",
  withCredentials: true,
});

export default api;