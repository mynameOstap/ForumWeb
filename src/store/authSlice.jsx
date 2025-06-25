import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice ({
    name:"checkAuth",
    initialState:{
      isLogged:false,
      user:null
    
    },
    reducers: {
    loginSuccess:(state,action)=>{
      state.isLogged = true,
      state.user = action.payload
    },
    logout:(state) =>{
      state.isLogged = false,
      state.user = null
    }
  },
})
export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;
