import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  getStoreJson,
  http,
  setCookie,
  setStore,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";
import { DangNhapView } from "../models/AuthModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

export default userReducer.reducer;

// -------------------------- action api ----------------------- //

export const loginApi = (userLogin: DangNhapView) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(`/auth/signin`, userLogin);
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
    } catch (err) {
      console.log(err);
    }
  };
};
