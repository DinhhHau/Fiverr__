import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";

const { Header, Sider, Content } = Layout;
type Props = {};
export default function AdminTemplate({}: Props) {
  const [collapsed, setCollapsed] = useState(false);

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
                style={{ width: 60, height: 60 }}
                src="./img/avt.jpg"
                alt="avatar"
              />
              <span className="mx-2">Admin</span>
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button className="dropdown-item" type="button">
                  Cập Nhập Thông Tin
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
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
