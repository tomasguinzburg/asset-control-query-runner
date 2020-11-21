import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HighlightFilled
} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import FormCircuit from './FormCircuit';


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

  render() {
    const { collapsed } = this.state;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline">
            <SubMenu key="sub1" icon={<HighlightFilled />} title="Orden 0">
                <Menu.Item key="1">MD_TYPES</Menu.Item>
                <Menu.Item key="2">MD_TIME_ZONES</Menu.Item>
                <Menu.Item key="3">MD_INDICATORS</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<HighlightFilled />} title="Orden 1">
                <Menu.Item key="4">MD_ATTRIBUTES</Menu.Item>
                <Menu.Item key="5">MD_SYSTEMS</Menu.Item>
              </SubMenu>
              <Menu.Item key="6" icon={<HighlightFilled />}>
              <Link to="/circuit"/>
                MD_CIRCUITS
              </Menu.Item>
              <Menu.Item key="7" icon={<HighlightFilled />}>
                MD_JOBS
              </Menu.Item>
              <SubMenu key="sub3" icon={<HighlightFilled />} title="Last Order">
                <Menu.Item key="8">MD_CIRCUITS_JOBS</Menu.Item>
                <Menu.Item key="9">MD_CIRCUITS_SYSTEMS</Menu.Item>
                <Menu.Item key="10">MD_CIRCUITS_ATTRIBUTES</Menu.Item>
                <Menu.Item key="11">MD_CIRCUIT_DEPENDENCIES</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content>
              <Route path="/circuit" component={FormCircuit} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Qaracter ©2020</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default TabNav;