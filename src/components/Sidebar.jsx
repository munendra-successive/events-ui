import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserAuth } from "./index";

const Sidebar = ({ children }) => {
  const { setLogin } = useContext(UserAuth);
  const navigate = useNavigate();
  const { Sider, Content } = Layout;
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["list"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="list">
              <Link to="/list">List</Link>
            </Menu.Item>
            <Menu.Item key="bulkUpload">
              <Link to="/bulkDetails">Bulk Listing</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link
                to="/"
                onClick={() => {
                  setLogin(false);
                  localStorage.removeItem("authorization");
                  navigate("/");
                }}
              >
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "0 24px" }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Sidebar;
