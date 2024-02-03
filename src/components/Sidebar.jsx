import React from "react";
import {  useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { Sider, Content } = Layout;

  const menuItems = [
    {
      key: "list",
      label: "List",
      path: "/list",
      onClick: () => navigate("/list"),
    },
    {
      key: "bulkUpload",
      label: "Bulk Listing",
      path: "/bulkDetails",
      onClick: () => navigate("/bulkDetails"),
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("authorization");
        navigate("/");
      },
    },
  ];

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            items={menuItems}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["list"]}
            style={{ height: "100%", borderRight: 0 }}
          />
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
