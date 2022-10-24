import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
import { AppDispatch, RootState } from "../../redux/configStore";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import JobModel, {
  DsChiTietLoai,
  DsNhomChiTietLoai,
} from "../../redux/models/JobModel";

//
type Props = {
  fill?: string;
};
const logo: string = require("../../assets/img/logo.png");
//
export default function Header({}: Props) {
  const [Mobile, setMobile] = useState(false);
  //
  const navigate = useNavigate();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  // console.log(userLogin);
  //
  const renderItem = () => {
    if (userLogin == null) {
      return <NavLink to={"/login"}>Sign in</NavLink>;
    } else {
      return (
        <NavLink to={"/profile"}>
          {/* <i className="fa-regular fa-user" /> {userLogin.name} */}
          {userLogin?.avatar ? (
            <figure className="mb-0">
              <img
                src={userLogin?.avatar}
                alt="avatar"
                className="avatar"
                style={{ borderRadius: 50, width: 50, height: 50 }}
              />
            </figure>
          ) : (
            <p className="text my-0">
              <i className="fa-regular fa-user" /> {userLogin?.name}
            </p>
          )}
        </NavLink>
      );
    }
  };
  const renderItem2 = () => {
    if (userLogin == null) {
      return (
        <li
          className="join"
          onClick={() => {
            navigate("/register");
          }}
        >
          <NavLink to={"/register"}>Join</NavLink>
        </li>
      );
    } else {
      return (
        <li
          className="join d-none"
          onClick={() => {
            navigate("/register");
          }}
        >
          <NavLink to={"/register"}>Join</NavLink>
        </li>
      );
    }
  };
  const renderItemNav = () => {
    if (userLogin == null) {
      return (
        <NavLink className="btn btn-success w-100" to={"/login"}>
          Sign in
        </NavLink>
      );
    } else {
      return (
        <NavLink to={"/profile"}>
          {userLogin?.avatar ? (
            <figure className="mb-0 d-flex">
              <img
                src={userLogin?.avatar}
                alt="avatar"
                className="nav_avatar"
                style={{ borderRadius: 50, width: 50, height: 50 }}
              />
              <div className="d-flex flex-column align-items-start  mx-3">
                <h6>{userLogin?.name}</h6>
                <p>{userLogin?.email}</p>
              </div>
            </figure>
          ) : (
            <div className="d-flex flex-column align-items-start">
              <h6>{userLogin?.name}</h6>
              <p>{userLogin?.email}</p>
            </div>
          )}
        </NavLink>
      );
    }
  };
  //
  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_row">
          <div className="left">
            {/* <button
              className="mobile_menu_icon btn_nav"
              onClick={() => setMobile(!Mobile)}
            >
              {Mobile ? <ImCross /> : <FaBars />}
            </button> */}
            <div className="d-flex">
              <div>
                <button
                  className="nav_icon"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <FaBars />
                </button>
                <div
                  className="offcanvas offcanvas-start"
                  tabIndex={-1}
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div className="offcanvas-header align-items-center">
                    <div className="d-flex gap-3">{renderItemNav()}</div>
                    <button
                      type="button"
                      className="btn-close text-reset d-flex align-items-center"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      style={{ boxShadow: "none" }}
                    >
                      {/* <ImCross /> */}
                    </button>
                  </div>
                  <div className="offcanvas-body">
                    <div className="nav_item">
                      <div className="nav_item_ul d-flex flex-column ">
                        <NavLink to={""} style={{ color: "#1bdf73" }}>
                          Fiverr Pro
                        </NavLink>
                        <NavLink to={""}>Explore</NavLink>
                        <NavLink to={""}>Messages</NavLink>
                        <NavLink to={""}>List</NavLink>
                        <NavLink to={""}>Orders</NavLink>
                      </div>
                    </div>
                    <div className="dropdown mt-3">
                      <div
                        className=" dropdown-toggle"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                      >
                        Help & Resources
                      </div>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Help Center
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Fiverr Forum
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Fiverr Blogs
                          </a>
                        </li>
                        <div className="tW6GKQA">
                          <div className="Wb8wmFx" />
                        </div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Ask the Community
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Contact Support
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <NavLink to={""} className="logo">
                <CustomLogo />
              </NavLink>
            </div>
            <div className="header_search">
              <form className="search_form">
                <div className="search">
                  <span>
                    <input
                      type="search"
                      className="inp"
                      placeholder="Find Services"
                    />
                  </span>
                </div>
                <button className="btn">Search</button>
              </form>
            </div>
          </div>
          <div className="right">
            <nav className="header_navbar">
              <ul className="ul">
                <li className="li_1" style={{ color: "#1bdf73" }}>
                  Fiverr Pro
                </li>
                <li className="li_1">Explore</li>
                <li className="li_1">Messages</li>
                <li className="li_1">List</li>
                <li className="li_1">Orders</li>
                <li>{renderItem()}</li>
                {renderItem2()}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
