import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
import { AppDispatch, RootState } from "../../redux/configStore";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

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
      return <NavLink to={"/login"}>Login</NavLink>;
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
  //
  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_row">
          <div className="left">
            <button
              className="mobile_menu_icon btn_nav"
              onClick={() => setMobile(!Mobile)}
            >
              {Mobile ? <ImCross /> : <FaBars />}
            </button>
            <NavLink to={""} className="logo">
              <CustomLogo />
            </NavLink>
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
                <li className="li_1">Fiverr Pro</li>
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
