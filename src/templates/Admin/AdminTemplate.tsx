import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
import UserUpdate from "../../HOC/UserUpdate/UserUpdate";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getProfileApi, signOutAction } from "../../redux/reducers/userReducer";
import {
  ACCESS_TOKEN,
  clearStore,
  getStore,
  ID_LOGIN,
  ROLE_lOGIN,
  USER_LOGIN,
} from "../../util/setting";
import { history } from "../../index";
import { toast } from "react-toastify";

const { Header, Sider, Content } = Layout;
type Props = {};
export default function AdminTemplate({}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const refUpdateUserDialog = useRef<any>(null);
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();
  //
  useEffect(() => {
    dispatch(getProfileApi());
  }, []);
  //
  let role = getStore(ROLE_lOGIN);
  if (role !== "ADMIN" && role !== "admin") {
    alert(" Tài Khoản chưa đủ quyền truy cập Admin !");
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="ant-layout-sider-children">
          <div className="d-flex flex-column">
            <div className="title mt-3 ">
              <h4>Dashboard</h4>
            </div>
            <ul className="ul mt-3">
              <li className="li mt-5 mx-3">
                <NavLink
                  className="text-dark active"
                  to="/admin/qlnd"
                  aria-current="page"
                >
                  Quản lí người dùng
                </NavLink>
              </li>
              <li className="li mt-5 mx-3">
                <NavLink className="text-dark" to="/admin/qlcv">
                  Quản lí công việc
                </NavLink>
              </li>
              <li className="li mt-5 mx-3">
                <NavLink className="text-dark" to="/admin/qllcv">
                  Quản lí loại công việc
                </NavLink>
              </li>
              <li className="li mt-5 mx-3">
                <NavLink className="text-dark" to="/admin/qldv">
                  Quản lí dịch vụ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background d-flex justify-content-between align-items-center p-4"
          style={{ padding: 0 }}
        >
          <div className="left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <CustomLogo />
          </div>
          <div className="dropdown d-flex justify-content-between align-items-center">
            <div
              className="dropdown-toggle"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  padding: 10,
                }}
                src={userLogin?.avatar}
                alt="avatar"
              />
              <span className="mx-2">{userLogin?.name}</span>
            </div>
            <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu2">
              <li>
                <UserUpdate ref={refUpdateUserDialog} />
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/profile");
                    // refUpdateUserDialog.current.open();
                  }}
                >
                  Cập Nhập Thông Tin
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    clearStore(ACCESS_TOKEN);
                    clearStore(USER_LOGIN);
                    clearStore(ID_LOGIN);
                    clearStore(ROLE_lOGIN);
                    dispatch(signOutAction(userLogin));
                    history.push("/");
                  }}
                >
                  Đăng Xuất
                </button>
              </li>
            </ul>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

// //
// {
//   React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//     className: "trigger",
//     onClick: () => setCollapsed(!collapsed),
//   });
// }
