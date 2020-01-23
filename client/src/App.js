import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Icon, Typography } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

import KoisRouter from "./common/router";
import KoisLogos from "./common/logos";

//import navigation
import IsAuthNav from "./navs/isauth";
import NonAuthNav from "./navs/nonauth";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default function() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuth, setAuth] = useState(true);

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
          {!collapsed && <KoisLogos />}
          {isAuth ? <IsAuthNav /> : <NonAuthNav/>}
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
              <KoisRouter />
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
