import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
import './Login.less'
import logo from './images/logo.png'
// 登陆的路由组件
class Login extends Component {
    handleSubmit = (e) => {
        // 阻止事件的默认行为
        e.preventDefault()
        //  得到具有强大功能的form对象
        const form = this.props.form
        // 获取表单项的输入数据
        const values = form.getFieldsValue()
        console.log(values);
    }
    render() {
        //  得到具有强大功能的form对象
        const form = this.props.form
        const {getFieldDecorator} = form 
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {})(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {})(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// 包装 包含Form组件 的组件生成一个新的组件：Form（Login）
// 新组件会向Form组件传递一个强大的对象属性：form
const WrapLogin = Form.create()(Login)
export default WrapLogin

// 处理表单数据的三步
// 1. 前台表单验证
// 2. 收集表单输入数据
// 3. 发送请求

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接收函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */