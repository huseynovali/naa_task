import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
    }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;