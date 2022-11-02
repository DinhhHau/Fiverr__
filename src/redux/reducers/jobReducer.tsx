import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import JobModel, {
  CongViecChiTiet,
  CongViecViewModel,
  ThueCongViecViewModel,
} from "../models/JobModel";

const initialState: any = {
  arrLoaiCV: [],
  allCongViec: [],
  congViecDaThue: [],
  arrCategory: [],
  arrResult: [],
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
    getCategory: (state, action: PayloadAction<CongViecChiTiet[]>) => {
      state.arrCategory = action.payload;
    },
    getResult: (state, action: PayloadAction<CongViecChiTiet[]>) => {
      state.arrResult = action.payload;
    },
  },
});

export const {
  getAllMenuLoaiCvAction,
  getAllCongViecDaThueAction,
  getAllCongViecAction,
  getCategory,
  getResult,
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
//
export const getCategoryApi = (id: String | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`
      );
      const arrCategory: CongViecChiTiet[] = result.data.content;
      dispatch(getCategory(arrCategory));
    } catch (err) {
      console.log(err);
    }
  };
};
//
export const getResultApi = (name: String) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`
      );
      const arrResult: CongViecChiTiet[] = result.data.content;
      dispatch(getResult(arrResult));
    } catch (err) {
      console.log(err);
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
// Xoá công việc
export const delCongViecApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/cong-viec/${id}`);
      toast.success(result.data.message);
      dispatch(getAllCongViecApi());
    } catch (err) {
      console.log(err);
      toast.success("Error");
    }
  };
};
