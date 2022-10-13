import React from "react";

type Props = {};

export default function UserDetail({}: Props) {
  return (
    <div className="main_content my-5">
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
                      <span className="d-flex">
                        <p className="text my-0">H</p>
                      </span>
                    </label>
                  </div>
                  <div className="info_profile_label">
                    <p>User</p>
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
                  <p className="lorem"> mô tả thông tin api ở dây</p>
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
                  <p className="lorem"> Add your Skills.</p>
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
                  <p className="lorem"> Add your Certification.</p>
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
                <span>It seems that you don't have any active Gigs.</span>
                <button className="btn"> Create a new Gig</button>
              </div>
            </div>
            <div className="gigs_card_bottom">
              <div className="gigs_card">
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
