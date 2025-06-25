import axios from "axios";


 const axiosInstance = axios.create({
    baseURL:"http://localhost:5205",
    withCredentials: true
})


export default axiosInstance;