import _ from "lodash";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { ThueCongViecViewModel } from "../../redux/models/JobModel";
import { delCVThueApi, getCongViecApi } from "../../redux/reducers/jobReducer";
import { getProfileApi } from "../../redux/reducers/userReducer";
import GigsProfile from "./GigsProfile";
import InfoProfile from "./InfoProfile";
type Props = {};
//
const img: string = require("../../assets/img/signup.jpg");
//
export default function UserDetail({}: Props) {
  //
  const refUpdateUserDialog = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { congViecDaThue } = useSelector(
    (state: RootState) => state.jobReducer
  );
  //
  useEffect(() => {
    dispatch(getProfileApi());
  }, []);
  useEffect(() => {
    dispatch(getCongViecApi());
  }, []);
  //
  return (
    <div className="main_content my-3">
      <div className="main_wrapper">
        <div className="main_row row">
          <InfoProfile />
          <GigsProfile />
        </div>
      </div>
    </div>
  );
}
