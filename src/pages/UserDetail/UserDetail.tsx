import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  CongViecViewModel,
  ThueCongViecViewModel,
} from "../../redux/models/JobModel";
import { getCongViecApi } from "../../redux/reducers/jobReducer";
import { getProfileApi } from "../../redux/reducers/userReducer";

type Props = {};
//
const img: string = require("../../assets/img/signup.jpg");
//
export default function UserDetail({}: Props) {
  //
  const dispatch: AppDispatch = useDispatch();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { congViecDaThue } = useSelector(
    (state: RootState) => state.jobReducer
  );
  console.log(congViecDaThue);
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
          <div className="info">
            <div className="info_sellercard_top">
              <div className="info_card">
                <div className="onl">
                  <div className="user_online">
                    <i className="dot">·</i>Online
                  </div>
                </div>
                <div className="info_profile">
                  <div className="info_profile_image">
                    <label className="info_label">
                      <div className="label_camera">
                        <span>
                          <i className="las la-camera icon" />
                        </span>
                      </div>
                      <input className="label_inp" type="file" />
                      <div className="image d-flex">
                        {userLogin?.avatar ? (
                          <img
                            src={userLogin?.avatar}
                            alt="avatar"
                            className="w-100 avatar"
                          />
                        ) : (
                          <p className="text my-0">{userLogin?.name}</p>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="info_profile_label">
                    <p>{userLogin?.email}</p>
                    <div className="btn_update">
                      <button
                        className="edit"
                        onClick={() => {
                          alert("hi");
                        }}
                      >
                        <i className="fa-solid fa-pen icon" />
                      </button>
                      {/* <form className="form">
                        <input
                          type="text"
                          maxLength={70}
                          className="one-liner"
                          placeholder="What's your story in one line?"
                          autoComplete="off"
                          defaultValue
                        />
                        <div className="controls">
                          <button className="ORLWF8p _0MkXbqi L9EM07f i6NB5Ls co-green-700 m-r-16 one-liner-button">
                            Cancel
                          </button>
                          <button className="ORLWF8p _0MkXbqi i6NB5Ls co-white one-liner-button bg-co-green-700">
                            Update
                          </button>
                        </div>
                      </form> */}
                    </div>
                  </div>
                </div>
                <div className="info_desc">
                  <div className="location">
                    <div className="location_left">
                      <i className="las la-map-marker-alt icon" />
                      <span> From</span>
                    </div>
                    <div className="location_right">
                      <span>Vietnam</span>
                    </div>
                  </div>
                  <div className="location">
                    <div className="location_left">
                      <i className="fa-solid fa-user icon" />
                      <span> Member since</span>
                    </div>
                    <div className="location_right">
                      <span className="text">Oct2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info_sellercard_bottom">
              <div className="info_card">
                <div className="inner_item">
                  <div className="inner_row">
                    <h3>Description</h3>
                    <a href="#" className="add">
                      Edit Description
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <h6>Name:</h6>
                    <p className="lorem">{userLogin?.name}</p>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <h6>Phone:</h6>
                    <p className="lorem">{userLogin?.phone}</p>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <h6>Birthday:</h6>
                    <p className="lorem">{userLogin?.birthday}</p>
                  </div>
                </div>
                <div className="inner_item">
                  <div className="inner_row">
                    <h3>Languages</h3>
                    <a href="#" className="add">
                      Add New
                    </a>
                  </div>
                  <p className="lorem">
                    English - <span>Basic</span>
                  </p>
                  <p className="lorem">
                    Vietnamese (Tiếng Việt) - <span>Native/Bilingual</span>
                  </p>
                </div>
                <div className="inner_item">
                  <div className="inner_row">
                    <h3>Skills</h3>
                    <a href="#" className="add">
                      Add New
                    </a>
                  </div>
                  <div className="d-flex flex-row flex-wrap">
                    {userLogin?.skill.map((item: string, index: number) => {
                      return (
                        <p className="lorem mx-1" key={index}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="inner_item">
                  <div className="inner_row">
                    <h3>Education</h3>
                    <a href="#" className="add">
                      Add New
                    </a>
                  </div>
                  <p className="lorem"> Add your Education.</p>
                </div>
                <div className="inner_item">
                  <div className="inner_row">
                    <h3>Certification</h3>
                    <a href="#" className="add">
                      Add New
                    </a>
                  </div>
                  <div className="d-flex flex-row flex-wrap">
                    {userLogin?.certification.map(
                      (item: string, index: number) => {
                        return (
                          <p className="lorem mx-1" key={index}>
                            {item}
                          </p>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="inner_item" style={{ border: "none" }}>
                  <div className="inner_row">
                    <h3>Linked Accounts</h3>
                  </div>
                  <p className="lorem"> mô tả thông tin api ở dây</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gigs">
            <div className="gigs_card_top">
              <div className="gigs_card">
                <span className="col-lg-8 col-xl-6 col-8 col-sm-6">
                  It seems that you don't have any active Gigs.
                </span>
                <button className="btn col-lg-3 col-xl-3 col-4 col-sm-4">
                  {" "}
                  Create a new Gig
                </button>
              </div>
            </div>
            <div className="gigs_card_bottom">
              {congViecDaThue.map(
                (congViecThue: ThueCongViecViewModel, index: number) => {
                  return (
                    <div className="gigs_card" key={index}>
                      <div className="row">
                        <div className="gigs_card_img">
                          <img
                            className="w-100"
                            src={congViecThue.congViec.hinhAnh}
                            alt="..."
                          />
                        </div>
                        <div className="gigs_card_content">
                          <h1>{congViecThue.congViec.tenCongViec}</h1>
                          <p>{congViecThue.congViec.moTaNgan}</p>
                          <div className="d-flex justify-content-between danhgia">
                            <div className="left">
                              <i className="fa-solid fa-star" />
                              <span className="saoCV">
                                {congViecThue.congViec?.saoCongViec}
                              </span>{" "}
                              <span className="danhGia">
                                ( {congViecThue.congViec?.danhGia} )
                              </span>{" "}
                            </div>
                            <div className="right">
                              <p className="giaTien">
                                ${congViecThue.congViec?.giaTien}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btn_edit">
                        <button className="viewdetail">View detail</button>
                        <div className="right">
                          <button className="edit">Edit</button>
                          <button className="delete">DEL</button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
