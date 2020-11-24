import React from 'react';
import { Layout, Menu } from 'antd';
import {
    BoxPlotOutlined
  , ScheduleOutlined
  , PullRequestOutlined
  , ContainerOutlined
  , SisternodeOutlined
} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import AppRouter from './AppRouter';
import QueryList from './QueryList';
import Title from 'antd/lib/typography/Title';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  forceReRender = () => {
    this.setState({state: this.state});
  }

  render() {
    let href = window.location.href.split('/')[3];  //hack to select the key that matches the URL path on refresh
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/'+href]} selectedKeys={['/'+href]} mode="inline">
            <SubMenu key="/order-0" icon={<ContainerOutlined />} title="Order 0">
                <Menu.Item key="/types" onClick={this.forceReRender}>MD_TYPES</Menu.Item>
                <Menu.Item key="/time-zones" onClick={this.forceReRender}>MD_TIME_ZONES</Menu.Item>
                <Menu.Item key="/indicators" onClick={this.forceReRender}>MD_INDICATORS</Menu.Item>
              </SubMenu>
              <SubMenu key="/order-1" icon={<SisternodeOutlined />} title="Order 1">
                <Menu.Item key="/attributes" onClick={this.forceReRender}>MD_ATTRIBUTES</Menu.Item>
                <Menu.Item key="/systems" onClick={this.forceReRender}>MD_SYSTEMS</Menu.Item>
              </SubMenu>
              <Menu.Item key="/circuits" onClick={this.forceReRender} icon={<BoxPlotOutlined />}>
                <Link to="/circuits">MD_CIRCUITS</Link>
              </Menu.Item>
              <Menu.Item key="/jobs" icon={<ScheduleOutlined />} onClick={this.forceReRender}>
                MD_JOBS
              </Menu.Item>
              <SubMenu key="/last-order" icon={<PullRequestOutlined />} title="Last Order">
                <Menu.Item key="/circuits-jobs" onClick={this.forceReRender}>MD_CIRCUITS_JOBS</Menu.Item>
                <Menu.Item key="/circuits-systems" onClick={this.forceReRender}>MD_CIRCUITS_SYSTEMS</Menu.Item>
                <Menu.Item key="/circuits-attributes" onClick={this.forceReRender}>MD_CIRCUITS_ATTRIBUTES</Menu.Item>
                <Menu.Item key="/circuit-dependencies" onClick={this.forceReRender}>MD_CIRCUIT_DEPENDENCIES</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: "16px" }}> <Title level={3}>ASSET-CONTROL: QUERY-RUNNER</Title>  </Header>
            <Content style={{ margin: '0 16px' }}>
              <AppRouter/>
              <QueryList/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Qaracter ©2020</Footer>
          </Layout>
        </Layout>
    );
  }
}

export default MainLayout;