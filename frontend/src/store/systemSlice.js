import { createSlice } from "@reduxjs/toolkit";

const savedSystem = JSON.parse(localStorage.getItem("system"));

const systemSlice = createSlice({
  name: "system",
  initialState: savedSystem || {
    system_id: null,
  },
  reducers: {
    setSystem: (state, action) => {
      state.system_id = action.payload.id;
      localStorage.setItem("system", JSON.stringify(state));
    },
    clearSystem: (state) => {
      state.system_id = null;
      localStorage.removeItem("system");
    },
  },
});

export const { setSystem, clearSystem } = systemSlice.actions;
export default systemSlice.reducer;
