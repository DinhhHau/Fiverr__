import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getStore, http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { ThemAdmin } from "../models/AdminModel";
import {
  ThongTinNguoiDung,
  ThongTinNguoiDungUpdate,
} from "../models/AuthModel";
import {
  CongViecViewModel,
  LoaiCongViec,
  ThemCongViecViewModel,
  ThueCongViec,
} from "../models/JobModel";
import { getProfileApi } from "./userReducer";

const initialState: any = {
  allUser: [],
  allServiceHire: [],
  allCongViec: [],
  allJobType: [],
  user: {
    id: "",
    email: "",
    name: "",
    phone: "",
    birthday: "",
    role: "",
    certification: [],
    skill: [],
    gender: false,
  },
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    getAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    getAllCongViecAction: (
      state,
      action: PayloadAction<CongViecViewModel[]>
    ) => {
      state.allCongViec = action.payload;
    },
    getAllServiceHire: (state, action) => {
      state.allServiceHire = action.payload;
    },
    getAllJobType: (state, action) => {
      state.allJobType = action.payload;
    },
    getUserAction: (state, action) => {
      state.user = action.payload;
    },
    getUserSearch: (state, aciton) => {
      state.allUser = aciton.payload;
    },
  },
});

export const {
  getAllUser,
  getAllCongViecAction,
  getAllServiceHire,
  getAllJobType,
  getUserAction,
  getUserSearch,
} = adminReducer.actions;

export default adminReducer.reducer;

// ---------------------------------------------------- action api -------------------------------------------------

// -------------------------------  manageUser ------------------------------ //
// danh sách user
export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users`);
      let allUser: ThongTinNguoiDung[] = result.data.content;
      dispatch(getAllUser(allUser));
    } catch (err) {
      console.log(err);
    }
  };
};
// xem thông tin user
export const userIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/${id}`);
      dispatch(getUserAction(result.data.content));
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
};
// thêm admin
export const registerAdminApi = (user: ThemAdmin) => {
  console.log(user);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users", user);
      // console.log(result);
      toast.success("Thêm quản trị thành công !");
      dispatch(getUserApi());
    } catch (err: any) {
      toast.error(err.response.data.content);
    }
  };
};
// xoá user
export const delUserApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/users?id=${id}`);
      toast.success(result.data.message);
      dispatch(getUserApi());
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
};
// cập nhật user
export const updateUserApi = (data: ThongTinNguoiDungUpdate) => {
  return async (dispatch: AppDispatch) => {
    try {
      http
        .put(`/users/${getStore("id_user")}`, data)
        .finally(() => dispatch(getProfileApi()));
    } catch (err) {
      console.log(err);
    }
  };
};
// tìm user
export const searchUserApi = (key: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/search/${key}`);
      console.log(result);
      let data = result.data.content;
      let newData = [...data].map((e, index) => {
        return (e = {
          ...e,
          certification: JSON.parse(e.certification),
          skill: JSON.parse(e.skill),
        });
      });
      // console.log(newData);
      dispatch(getUserSearch(newData));
    } catch (err) {
      console.log(err);
    }
  };
};

// -------------------------------  manageJob ------------------------------ //
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
// thêm công việc
export const addJobApi = (job: ThemCongViecViewModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(`/cong-viec`, job);
      console.log(result);
      toast.success("Thêm công việc thành công!");
      dispatch(getAllCongViecApi());
    } catch (err: any) {
      toast.error(err.response.data.content);
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
      toast.error("Error");
    }
  };
};
// sửa công việc
export const updateJobApi = (jobUpdate: ThemCongViecViewModel, file: any) => {
  return async (dispatch: AppDispatch) => {
    const result = await http.put(
      `/cong-viec/${getStore("id_job")}`,
      jobUpdate
    );
    try {
      let data = new FormData();
      data.append("formFile", file);
      const avatar = await http
        .post(`/cong-viec/upload-hinh-cong-viec/${getStore("id_job")}`, data)
        .finally(() => dispatch(getAllCongViecApi()));
    } catch (err) {
      console.log(err);
    }
  };
};

// -------------------------------  manageJobType ------------------------------ //
// danh sách jobtype
export const getJobTypeApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/loai-cong-viec`);
      dispatch(getAllJobType(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
// xoá
export const delJobTypeApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/loai-cong-viec/${id}`);

      toast.success(result.data.message);

      dispatch(getJobTypeApi());
    } catch (err) {
      toast.error("Xóa không thành công");
    }
  };
};
// cập nhật
export const updateJobTypeApi = (id: number, data: LoaiCongViec) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(`/loai-cong-viec/${id}`, data);
      toast.success(result.data.message);
      dispatch(getJobTypeApi());
    } catch (err) {
      toast.error("Cập nhật không thành công");
    }
  };
};
// thêm
export const addJobTypeApi = (data: LoaiCongViec) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/loai-cong-viec", data);

      toast.success(result.data.message);
      dispatch(getJobTypeApi());
    } catch (err) {
      toast.error("Thêm mới không thành công !");
    }
  };
};

// -------------------------------  Service ------------------------------ //

export const getServiceHireApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/thue-cong-viec`);
      dispatch(getAllServiceHire(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
// xoá
export const delServiceHireApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/thue-cong-viec/${id}`);

      toast.success(result.data.message);

      dispatch(getServiceHireApi());
    } catch (err) {
      toast.error("Xóa không thành công !");
    }
  };
};
// cập nhật
export const updateServiceHireApi = (id: number, data: ThueCongViec) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(`/thue-cong-viec/${id}`, data);
      toast.success(result.data.message);

      dispatch(getServiceHireApi());
    } catch (err) {
      toast.error("Cập nhật không thành công !");
    }
  };
};
// thêm
export const addServiceHireApi = (data: ThueCongViec) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/thue-cong-viec", data);

      toast.success(result.data.message);

      dispatch(getServiceHireApi());
    } catch (err) {
      toast.error("Thêm mới không thành công !");
    }
  };
};
