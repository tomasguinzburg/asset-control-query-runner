import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HighlightFilled
} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CircuitsLayout from './md-circuits/CircuitsLayout';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TabNav extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  forceReRender = () => {
    this.setState({state: this.state});
  }

  render() {
    let href = window.location.href.split('/')[3];  //hack to select the key that matches the URL path on refresh
    const { collapsed } = this.state;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/'+href]} selectedKeys={['/'+href]} mode="inline">
            <SubMenu key="/order-0" icon={<HighlightFilled />} title="Order 0">
                <Menu.Item key="/types" onClick={this.forceReRender}>MD_TYPES</Menu.Item>
                <Menu.Item key="/time-zones" onClick={this.forceReRender}>MD_TIME_ZONES</Menu.Item>
                <Menu.Item key="/indicators" onClick={this.forceReRender}>MD_INDICATORS</Menu.Item>
              </SubMenu>
              <SubMenu key="/order-1" icon={<HighlightFilled />} title="Order 1">
                <Menu.Item key="/attributes" onClick={this.forceReRender}>MD_ATTRIBUTES</Menu.Item>
                <Menu.Item key="/systems" onClick={this.forceReRender}>MD_SYSTEMS</Menu.Item>
              </SubMenu>
              <Menu.Item key="/circuits" onClick={this.forceReRender} icon={<HighlightFilled />}>
              <Link to="/circuits"/>
                MD_CIRCUITS
              </Menu.Item>
              <Menu.Item key="/jobs" icon={<HighlightFilled />} onClick={this.forceReRender}>
                MD_JOBS
              </Menu.Item>
              <SubMenu key="/last-order" icon={<HighlightFilled />} title="Last Order">
                <Menu.Item key="/circuits-jobs" onClick={this.forceReRender}>MD_CIRCUITS_JOBS</Menu.Item>
                <Menu.Item key="/circuits-systems" onClick={this.forceReRender}>MD_CIRCUITS_SYSTEMS</Menu.Item>
                <Menu.Item key="/circuits-attributes" onClick={this.forceReRender}>MD_CIRCUITS_ATTRIBUTES</Menu.Item>
                <Menu.Item key="/circuit-dependencies" onClick={this.forceReRender}>MD_CIRCUIT_DEPENDENCIES</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content>
              <Route path="/circuits" component={CircuitsLayout} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Qaracter ©2020</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default TabNav;