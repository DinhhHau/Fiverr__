import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./assets/scss/styles.scss";
import Index from "./pages/Index/Index";
import UserDetail from "./pages/UserDetail/UserDetail";
import HeaderHomeTemplate from "./templates/HeaderHomeTemplate";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VerifyAuth from "./guard/VerifyAuth";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
//
export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HeaderHomeTemplate />}>
          <Route index element={<Index />} />
          {/* <Route index element={<UserDetail />} /> */}
          {/* <Route path="profile" element={<UserDetail />} /> */}
          <Route path="*" element={<Navigate to="" />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path=""
          element={
            <VerifyAuth>
              <HeaderHomeTemplate />
            </VerifyAuth>
          }
        >
          <Route path="profile" element={<UserDetail />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
