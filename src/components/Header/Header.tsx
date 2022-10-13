import React from "react";
import { NavLink } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
//
type Props = {
  // logo?: string;
  fill?: string;
};
const logo: string = require("../../assets/img/logo.png");
//
export default function Header({}: Props) {
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
                  <span className="icon mx-1">
                    <i className="fa-solid fa-magnifying-glass" />
                  </span>
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
                <li>Fiverr Pro</li>
                <li>Explore</li>
                <li>Messages</li>
                <li>List</li>
                <li>Orders</li>
                {/* <li>Sign in</li> */}
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li className="join">
                  <a
                    className="FW1syM7 L1yjt43 xaFER3a p9qU5Ka co-green-700 js-open-popup-join fiverr-header-join"
                    rel="nofollow"
                    href="/join?source=top_nav"
                  >
                    Join
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
