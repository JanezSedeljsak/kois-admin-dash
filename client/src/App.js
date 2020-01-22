import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon, Typography  } from 'antd';
import KoisLogo from './images/scvlogo.png';
import ScvLogo from './images/koislogo.png';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default class App extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider style={{ background: "#345" }} width={"300"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div style={{ padding: 20 }}>
                        <img style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 15
                        }} src={ScvLogo} />
                        <img style={{
                            width: "100%",
                            marginBottom: 15
                        }} src={KoisLogo} />
                    </div>
                    <hr/>
                    <Menu theme="dark" style={{ background: "#345" }} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="environment" />
                            <span>Points</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <span>Admins</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="file-search" />
                            <span>Documentation</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="paper-clip" />
                            <span>Tasks</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="logout" />
                            <span>Logout</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ 
                        background: "#002140", 
                        padding: 10, 
                        borderLeft: "1px solid white",
                        boxShadow: "0 4px 2px -2px gray"
                    }} >
                        <Title style={{ color: "#fff" }}><Icon type="dashboard" /> Kois Administracija</Title>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Samo Pritrznik & Janez Sedeljsak 2019/20 ©</Footer>
                </Layout>
            </Layout>
        );
    }
}