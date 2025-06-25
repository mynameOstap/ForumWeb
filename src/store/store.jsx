import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";



const persistConfig = {
  key:"auth",
  storage
}
const persistedAuthReducer = persistReducer(persistConfig,authSlice)

export const store = configureStore({
  reducer: {
    authCheck: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);