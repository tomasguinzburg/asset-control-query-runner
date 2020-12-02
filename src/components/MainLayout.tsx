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
    let href = window.location.href.split('/').slice(3).reduce((acc, next) => acc += '/' + next);  //hack to select the key that matches the URL path on refresh
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider theme='dark'collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            {
              collapsed ? <div className="logo2" /> : <div className="logo" />

            }
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
                <Link to="/jobs">MD_JOBS</Link>
              </Menu.Item>
              <SubMenu key="/last-order" icon={<PullRequestOutlined />} title="Last Order">
                <Menu.Item key="/last-order/circuits-jobs" onClick={this.forceReRender}>
                  <Link to="/last-order/circuits-jobs">MD_CIRCUITS_JOBS</Link>
                </Menu.Item>
                <Menu.Item key="/last-order/circuits-systems" onClick={this.forceReRender}>
                  <Link to="/last-order/circuits-systems">MD_CIRCUITS_SYSTEMS</Link>
                </Menu.Item>
                <Menu.Item key="/last-order/circuits-attributes" onClick={this.forceReRender}>
                  <Link to="/last-order/circuits-attributes">MD_CIRCUITS_ATTRIBUTES</Link>
                </Menu.Item>
                <Menu.Item key="/circuit-dependencies" onClick={this.forceReRender}>MD_CIRCUIT_DEPENDENCIES</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: "16px" }}> 
              <Title level={3}>
                ASSET-CONTROL: QUERY-RUNNER
              </Title>  
            </Header>
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