// authThunks.js
import axiosInstance from "../../api/axiosInstance";
import { logout  } from "../../store/authSlice";

export const logoutThunk  = () => async dispatch => {
  try {
    await axiosInstance.post("/logout");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("persist:auth");   
    dispatch(logout()); 
     window.location.reload();             
  } catch (e) {
    console.error("Logout error", e);
  }
};
