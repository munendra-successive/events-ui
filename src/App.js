import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useContext } from "react";
import {
  Login,
  Register,
  List,
  Create,
  BulkUplaod,
  View,
  Edit,
  NotFound,
  BulkList,
  UserAuth,
} from "./components";
import Logs from "./components/events/Logs";

function App() {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();
  const { setLogin } = useContext(UserAuth);

  const isLoginOrRegister =
    window.location.pathname === "/" ||
    window.location.pathname === "/register";

  return (
    <>
      {!isLoginOrRegister && (
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
                    navigate("/");
                  }}
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 24px" }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/list" element={<List />} />
                <Route path="/create" element={<Create />} />
                <Route path="/bulkUpload" element={<BulkUplaod />} />
                <Route path="/bulkDetails" element={<BulkList />} />
                <Route path="/view/:id" element={<View />} />
                <Route path="/logs/:uploadId" element={<Logs />} />
                <Route path="/edit/:id" element={<Edit />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
      {isLoginOrRegister && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
