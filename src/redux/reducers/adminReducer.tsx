import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { history } from "../../index";
import { getStore, http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { ThemAdmin } from "../models/AdminModel";
import {
  ThongTinNguoiDung,
  ThongTinNguoiDungUpdate,
} from "../models/AuthModel";
import { getProfileApi } from "./userReducer";

const initialState: any = {
  allUser: [],
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
    getAllUser: (state, action: PayloadAction<ThongTinNguoiDung[]>) => {
      state.allUser = action.payload;
    },
    getUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getAllUser, getUserAction } = adminReducer.actions;

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
export const updateUser = (data: ThongTinNguoiDungUpdate) => {
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
