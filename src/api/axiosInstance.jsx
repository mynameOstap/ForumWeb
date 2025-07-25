import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = ()=> {
  refreshSubscribers.forEach(callback => callback())
  refreshSubscribers = []
}

const addRefreshSubscribers = (callback)=>{
  refreshSubscribers.push(callback)
}

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if(isRefreshing)
      {
        return new Promise(resolve => {
          addRefreshSubscribers(()=>{
            resolve(axiosInstance(originalRequest))
          });
        });
      }
      isRefreshing = true

      try {
        const refreshRes = await axiosInstance.get("http://localhost:5205/refresh");
        onRefreshed()

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("persist:auth");

        return Promise.reject(refreshError);
      }
      finally
      {
        isRefreshing = false
      }
    }

    return Promise.reject(err);
  }
);



export default axiosInstance;
