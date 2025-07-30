import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const axiosInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = () => {
  refreshSubscribers.forEach(callback => callback())
  refreshSubscribers = []
}

const addRefreshSubscribers = (callback) => {
  refreshSubscribers.push(callback)
}

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          addRefreshSubscribers(() => {
            resolve(axiosInstance(originalRequest))
          });
        });
      }
      isRefreshing = true

      try {
        console.log("+++")

        const refreshRes = await axiosInstance.get("/refresh");
        onRefreshed()

        return axiosInstance(originalRequest);
      } catch (refreshError) {
     
        console.error("Refresh token invalid or expired", refreshError);
        console.log("+++")
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("persist:auth");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
      finally {
        isRefreshing = false

      }
    }

    return Promise.reject(err);
  }
);



export default axiosInstance;
