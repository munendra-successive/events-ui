import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";

const Sidebar = ({ children }) => {
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
            <Menu.Item key="list" onClick={() => navigate("/list")}>
              <Link to="/list">List</Link>
            </Menu.Item>
            <Menu.Item
              key="bulkUpload"
              onClick={() => navigate("/bulkDetails")}
            >
              <Link to="/bulkDetails">Bulk Listing</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link
                to="/"
                onClick={() => {
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

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
