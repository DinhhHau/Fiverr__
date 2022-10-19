import { createSlice } from "@reduxjs/toolkit";
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
import { DangNhapView, ThongTinNguoiDung } from "../models/AuthModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
  // userLogin: {},
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

export const loginApi = (userLogin: DangNhapView) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(`/auth/signin`, userLogin);
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
      //
      setCookie(ID_LOGIN, result.data.content.user.id, 30);
      setStore(ID_LOGIN, result.data.content.user.id);
      //
      history.push("/profile");
      //
      dispatch(getProfileApi());
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.content);
    }
  };
};

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
