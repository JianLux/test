import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import './Navi.css'
import Products from '../Content/Products'
import Page1 from '../Content/Page1'
import Page2 from '../Content/Page2'


const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1" className="nav-item">
                                <NavLink to="/" activeClassName="ant-menu-item-selected ant-menu-item:hover" exact strict className="nav-link">
                                    <Icon type="user" />
                                    <span className="nav-text">nav 1</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" className="nav-item">
                                <NavLink to="/nav2" activeClassName="ant-menu-item-selected ant-menu-item:hover" exact strict className="nav-link">
                                    <Icon type="video-camera" />
                                    <span className="nav-text">nav 2</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" className="nav-item">
                                <NavLink to="/nav3" activeClassName="ant-menu-item-selected ant-menu-item:hover" exact strict className="nav-link">
                                    <Icon type="upload" />
                                    <span className="nav-text">nav 3</span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                        
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#000', padding: 0 }}>
                            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                    style={{cursor: 'pointer'}}
                                />
                            </span>
                            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                            <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                                <img src={logo} className="App-logo" alt="logo" />
                            </span>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                                <Route path="/" exact component={Page1} />
                                <Route path="/nav2" exact component={Page2} />
                                <Route path="/nav3" exact component={Products} />
                            
                            {/* 问题：刷新后显示样式存在问题 */}

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default SiderDemo;