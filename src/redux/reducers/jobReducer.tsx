import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import JobModel, { ThueCongViecViewModel } from "../models/JobModel";

const initialState: any = {
  arrLoaiCV: [],
  congViecDaThue: [],
};

const jobReducer = createSlice({
  name: "jobReducer",
  initialState,
  reducers: {
    getAllMenuLoaiCvAction: (state, action: PayloadAction<JobModel[]>) => {
      state.arrLoaiCV = action.payload;
    },
    getAllCongViecDaThueAction: (
      state,
      action: PayloadAction<ThueCongViecViewModel[]>
    ) => {
      state.congViecDaThue = action.payload;
    },
  },
});

export const { getAllMenuLoaiCvAction, getAllCongViecDaThueAction } =
  jobReducer.actions;

export default jobReducer.reducer;

// -------------------------- action api ----------------------- //
export const getMenuLoaiCv = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/cong-viec/lay-menu-loai-cong-viec`);
      let arrLoaiCV: JobModel[] = result.data.content;
      const action = getAllMenuLoaiCvAction(arrLoaiCV);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
//
export const getCongViecApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/thue-cong-viec/lay-danh-sach-da-thue`);
      let congViecDaThue: ThueCongViecViewModel[] = result.data.content;
      const action = getAllCongViecDaThueAction(congViecDaThue);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
