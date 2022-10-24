import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

const initialState: any = {
  allUser: [],
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    getAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { getAllUser } = adminReducer.actions;

export default adminReducer.reducer;

// -------------------------- action api ----------------------- //

export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users`);
      dispatch(getAllUser(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
