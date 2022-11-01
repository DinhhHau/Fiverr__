import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

const initialState: any = {
  allUser: [],

  allJobType: [],
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
  },
});

export const { getAllUser, getAllServiceHire, getAllJobType } =
  adminReducer.actions;

export default adminReducer.reducer;

// -------------------------- action api ----------------------- //

export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users`);
      dispatch(getAllUser(result.data.content));
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
