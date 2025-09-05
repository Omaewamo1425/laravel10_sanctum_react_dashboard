import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import systemReducer from "./systemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    system: systemReducer,
  },
});

export default store;
