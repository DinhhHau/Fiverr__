import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
//
type Props = {
  fill?: string;
};
const logo: string = require("../../assets/img/logo.png");
//
export default function Header({}: Props) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_row">
          <div className="left">
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
                      // value=""
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
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li
                  className="join"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <NavLink to={"/register"}>Join</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
