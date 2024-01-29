import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    },
    {
      key: "bulkUpload",
      label: "Bulk Listing",
      path: "/bulkDetails",
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
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["list"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} onClick={item.onClick}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
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
