import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Icon, Typography } from "antd";
import KoisLogo from "./images/scvlogo.png";
import ScvLogo from "./images/koislogo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//rotes import
import Login from "./routes/Login";
import Points from "./routes/Points";
import Admins from "./routes/Admins";
import Tasks from "./routes/Tasks";
import Documentation from "./routes/Documentation";

//import forms
import FPoint from "./forms/fPoint";
import FAdmin from "./forms/fAdmin";
import FTask from "./forms/fTask";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default function() {
  const [collapsed, setCollapsed] = useState(false);
  //const [currentRoute, setCurrentRoute] = useState("points");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Router>
        <Sider
          style={{ background: "#345" }}
          width={"300"}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          {!collapsed && (
            <>
              <div style={{ padding: 20 }}>
                <img
                  style={{
                    width: "100%",
                    marginBottom: 15
                  }}
                  src={KoisLogo}
                />
                <img
                  style={{
                    width: "100%",
                    padding: 15,
                    paddingBottom: 0
                  }}
                  src={ScvLogo}
                />
              </div>
              <hr />
            </>
          )}
          <Menu theme="dark" style={{ background: "#345" }} mode="inline">
            <Menu.Item key="/points">
              <Link to="/points" />
              <Icon type="environment" />
              <span>Točke</span>
            </Menu.Item>
            <Menu.Item key="/admins">
              <Link to="/admins" />
              <Icon type="user" />
              <span>Administratorji</span>
            </Menu.Item>
            <Menu.Item key="/documentation">
              <Link to="/documentation" />
              <Icon type="file-search" />
              <span>Dokumentacija</span>
            </Menu.Item>
            <Menu.Item key="/tasks">
              <Link to="/tasks" />
              <Icon type="paper-clip" />
              <span>Zahtevki</span>
            </Menu.Item>
            <Menu.Item key="/login">
              <Link to="/login" />
              <Icon type="logout" />
              <span>Odjava</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#002140",
              padding: 10,
              borderLeft: "1px solid white",
              boxShadow: "0 4px 2px -2px gray"
            }}
          >
            <Title style={{ color: "#fff" }}>
              <Icon type="dashboard" /> Kois Administracija
            </Title>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <div
              id="container"
              style={{ padding: 24, background: "#fff", minHeight: "40vh" }}
            >
              <Switch>
                <Route path="/points">
                  <Points />
                </Route>
                <Route path="/admins">
                  <Admins />
                </Route>
                <Route path="/documentation">
                  <Documentation />
                </Route>
                <Route path="/tasks">
                  <Tasks />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/new/point">
                  <FPoint />
                </Route>
                <Route path="/new/admin">
                  <FAdmin />
                </Route>
                <Route path="/new/task">
                  <FTask />
                </Route>
                <Route path="/edit/point/:id">
                  <FPoint />
                </Route>
                <Route path="/edit/admin/:id">
                  <FAdmin />
                </Route>
                <Route path="/edit/task/:id">
                  <FTask />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Samo Pritrznik & Janez Sedeljsak 2019/20 ©
          </Footer>
        </Layout>
      </Router>
    </Layout>
  );
}
