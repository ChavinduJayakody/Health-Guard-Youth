import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_URL
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`Added Authorization header for ${config.url}: Bearer ${token.slice(0, 10)}...`);
  } else {
    console.warn(`No token found for request to ${config.url}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn(`401 Unauthorized for ${error.config.url}`);
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;