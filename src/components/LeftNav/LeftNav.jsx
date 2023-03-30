import React, {Component} from "react"
import { Link } from "react-router-dom"
import { Menu, Icon } from 'antd';
import './LeftNav.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;

export default class LeftNav extends Component {
    render() {
        return(
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    >
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="mail" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="mail" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to="/user">
                            <Icon type="pie-chart" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to="/role">
                            <Icon type="pie-chart" />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}