import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { history } from "../../index";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  ID_LOGIN,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";
import {
  DangNhapView,
  ThongTinNguoiDung,
  ThongTinNguoiDung1,
} from "../models/AuthModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
  //   userRegister: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

export default userReducer.reducer;

// -------------------------- action api ----------------------- //
//register
export const registerApi = (user: ThongTinNguoiDung1) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(`/auth/signup`, user);
      console.log(result);
      toast.success("Đăng kí tài khoản thành công !");
      history.push(`/login`);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.content);
    }
  };
};
//login
export const loginApi = (userLogin: DangNhapView) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(`/auth/signin`, userLogin);
      console.log(result);
      // lấy token
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
      // lấy id
      setCookie(ID_LOGIN, result.data.content.user.id, 30);
      setStore(ID_LOGIN, result.data.content.user.id);
      //
      if (result.data.content.user.role === "ADMIN") {
        history.push("/admin");
      } else {
        history.push("/profile");
      }
      //
      dispatch(getProfileApi());
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.content);
    }
  };
};
// profile
export const getProfileApi = (id_login = getStore(ID_LOGIN)) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/${id_login}`);
      console.log(result);
      const action = getProfileAction(result.data.content);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};
// update profile
export const updateProfile = (data) => {
  return async (dispatch: AppDispatch) => {
    try {
      http
        .put(`/users/${getStore(ID_LOGIN)}`, data)
        .finally(() => dispatch(getProfileApi()));
    } catch (err) {
      console.log(err);
    }
  };
};
// update avatar
export const updateAvatar = (file) => {
  return async (dispatch: AppDispatch) => {
    try {
      http
        .post(
          `/users/upload-avatar`,
          { formFile: file },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .finally(() => dispatch(getProfileApi()));
    } catch (err) {
      console.log(err);
    }
  };
};
