import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getStore, http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { ThemAdmin } from "../models/AdminModel";
import { ThongTinNguoiDung, ThongTinNguoiDungUpdate } from "../models/AuthModel";
import { getProfileApi } from "./userReducer";

const initialState: any = {
  allUser: [],
  allService:[],
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

export const { getAllUser, getAllServiceHire, getAllJobType,getUserAction,getUserSearch } =
  adminReducer.actions;

export default adminReducer.reducer;

// -------------------------- action api ----------------------- //

// danh sách user admin
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
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users", user);
      console.log(result);
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
// sửa thông tin user
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
//  -----------------Delete, Put, Post ----------------------
export const deleteApi = (url: string, id) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(url + id);
      Swal.fire({
        icon: "success",
        title: result.data.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete fail",
      });
    }
  };
};
export const updateApi = (url: string, id, data) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(url + id, data);
      Swal.fire({
        icon: "success",
        title: result.data.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update fail",
      });
    }
  };
};
export const addApi = (url: string, data) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(url, data);
      Swal.fire({
        icon: "success",
        title: result.data.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Can't add new data !",
      });
    }
  };
};
