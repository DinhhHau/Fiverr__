import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import JobModel, {
  CongViecViewModel,
  ThueCongViecViewModel,
} from "../models/JobModel";

const initialState: any = {
  arrLoaiCV: [],
  allCongViec: [],
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
    getAllCongViecAction: (
      state,
      action: PayloadAction<CongViecViewModel[]>
    ) => {
      state.allCongViec = action.payload;
    },
  },
});

export const {
  getAllMenuLoaiCvAction,
  getAllCongViecDaThueAction,
  getAllCongViecAction,
} = jobReducer.actions;

export default jobReducer.reducer;

// -------------------------- action api ----------------------- //
//
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
// lấy danh sách cv đã thuê
export const getCongViecApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/thue-cong-viec/lay-danh-sach-da-thue`);
      let congViecDaThue: ThueCongViecViewModel[] = result.data.content;
      const action = getAllCongViecDaThueAction(congViecDaThue);
      console.log(result);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
// Xoá Cv đã thuê
export const delCVThueApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/thue-cong-viec/${id}`);
      toast.success(result.data.message);
      dispatch(getCongViecApi());
    } catch (err) {
      console.log(err);
      toast.success("Error");
    }
  };
};
// Danh sách công việc
export const getAllCongViecApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/cong-viec`);
      let allCongViec: CongViecViewModel[] = result.data.content;
      const action = getAllCongViecAction(allCongViec);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
