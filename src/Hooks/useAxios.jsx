import axios from "axios";
import { useEffect } from "react";

const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  useEffect(() => {
    // Request interceptor
    instance.interceptors.request.use((config) => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("auth");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return instance;
};

export default useAxios;