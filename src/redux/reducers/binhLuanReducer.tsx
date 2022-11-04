import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { http, timeout } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { BinhLuan, BinhLuanCongViec } from "../models/binhLuanModel";

type InitialState = {
  arrComment: BinhLuanCongViec[];
  jobComment: BinhLuanCongViec;
};

const initialState: InitialState = {
  arrComment: [],
  jobComment: {
    ngayBinhLuan: "",
    noiDung: "",
    saoBinhLuan: 0,
    tenNguoiBinhLuan: "",
    avatar: "",
  },
};

const binhLuanReducer = createSlice({
  name: "binhLuanReducer",
  initialState,
  reducers: {
    getJobComment: (state, action: PayloadAction<BinhLuanCongViec[]>) => {
      state.arrComment = action.payload;
    },
  },
});

export const { getJobComment } = binhLuanReducer.actions;

export default binhLuanReducer.reducer;

//----------------API------------------------
export const getJobCommentApi = (id: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/binh-luan/lay-binh-luan-theo-cong-viec/${id}`
      );
      const comments: BinhLuanCongViec[] = result.data.content;
      dispatch(getJobComment(comments));
    } catch (err) {
      console.log(err);
    }
  };
};
export const postCommentApi = (comment: BinhLuan) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/binh-luan", comment);
      await timeout(1000);
      dispatch(getJobCommentApi(comment.maCongViec));
    } catch (err) {
      console.log(err);
    }
  };
};
