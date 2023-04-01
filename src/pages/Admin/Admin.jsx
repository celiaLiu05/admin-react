import React, { Component } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Layout } from 'antd';
import memoryUtils from "../../utils/memoryUtils"
import LeftNav from "../../components/LeftNav/LeftNav";
import Header from "../../components/Header/Header";
import Home from '../Home/Home'
import Category from '../Category/Category' 
import Product from '../Product/Product' 
import Role from '../Role/Role'
import User from '../User/User'
import Bar from '../Charts/Bar' 
import Line from '../Charts/Line' 
import Pie from '../Charts/Pie'

const { Footer, Sider, Content } = Layout;
// 后台管理的路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果内存中没有存储user == > 当前没有登陆
        if(!user || !user._id) {
            // 自动跳转到登陆（在render()中）
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor: "#fff", margin: '20px'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#ccc '}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}