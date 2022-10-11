import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import JobModel from "../models/JobModel";

const initialState: any = {
  arrLoaiCV: [],
};

const jobReducer = createSlice({
  name: "jobReducer",
  initialState,
  reducers: {
    getAllMenuLoaiCvAction: (state, action: PayloadAction<JobModel[]>) => {
      state.arrLoaiCV = action.payload;
    },
  },
});

export const { getAllMenuLoaiCvAction } = jobReducer.actions;

export default jobReducer.reducer;

// -------------------------- action api ----------------------- //
export const getMenuLoaiCv = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http(`/cong-viec/lay-menu-loai-cong-viec`);
      let arrLoaiCV: JobModel[] = result.data.content;
      const action = getAllMenuLoaiCvAction(arrLoaiCV);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
