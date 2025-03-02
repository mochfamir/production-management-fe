import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, useLocation, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = AntLayout;

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.3)",
          }}
        />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/work-orders">
            <Link to="/work-orders">Work Orders</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <AntLayout>
        {/* Header */}
        <Header style={{ background: "#fff", padding: 0 }} />

        {/* Content */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Outlet /> {/* Render konten rute anak di sini */}
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>My Refine App ©2023</Footer>
      </AntLayout>
    </AntLayout>
  );
};
