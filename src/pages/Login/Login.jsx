import React, { Component } from "react";
import { Redirect } from "react-router-dom";  
import { Form, Icon, Input, Button, message } from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import logo from '../../assets/images/bg.jpg'
import './Login.less'
// 登陆的路由组件
class Login extends Component {
    handleSubmit = (e) => {
        // 阻止事件的默认行为
        e.preventDefault()
        // 检验成功·
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const {username, password} = values
                const result = await reqLogin(username, password) // {status: 0, data: user} {status: 1, msg: 'xxx'}
                // console.log('请求成功', result);
                if(result.status === 0) { // 登陆成功
                    // 提示登陆成功
                    message.success('登陆成功！')

                    // 保存user
                    const user = result.data
                    memoryUtils.user = user // 保存在内存中
                    storageUtils.saveUser(user) // 保存到local中

                    // 跳转到管理界面（不需要再退回到登陆界面）
                    this.props.history.replace('/')
                }else { // 登陆失败
                    // 提示错误信息
                    message.error(result.msg)
                }
            }else {
                console.log("校验失败");
            }
        });


        //  得到具有强大功能的form对象
        // const form = this.props.form
        // 获取表单项的输入数据
        // const values = form.getFieldsValue()
        // console.log(values);
    }
    // 对密码进行自定义校验
    /* 用户名/密码的的合法性要求
        1). 必须输入
        2). 必须大于等于 4 位
        3). 必须小于等于 12 位
        4). 必须是英文、数字或下划线组成
    */ 
    validatePwd = (rule, value, callback) => {
        if(!value) {
            callback('密码必须输入')
        }else if(value.length < 4) {
            callback('密码至少4位')
        }else if(value.length > 12) {
            callback('密码最多12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是数字、字母、下划线组成')
        }else {
            callback() // 验证通过
        }
        // callback("xxx") 表示不通过 并提示
    }
    render() {
        // 如果用户已经登陆
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/'/>
        }
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
                                /* 用户名/密码的的合法性要求
                                    1). 必须输入
                                    2). 必须大于等于 4 位
                                    3). 必须小于等于 12 位
                                    4). 必须是英文、数字或下划线组成
                                */  
                            }
                            {
                                getFieldDecorator("username", { // 配置对象： 属性名是特定的一些名称
                                    //声明式验证：直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: false, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是数字、字母、下划线组成' }
                                    ],
                                    initialValue: 'admin'
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {
                                    rules: [
                                        {validator: this.validatePwd}
                                    ]
                                })(
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

/* 处理表单数据的三步
    1. 前台表单验证
    2. 收集表单输入数据
    3. 发送请求
*/

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

/*
async和await
1. 作用？
    简化promise对象的使用：不再使用then()来指定成功或失败的回调函数
    以同步编码（没有回调函数了）方式实现异步流程
2. 哪里写await？
    在返回promixe的表达式左侧写await：不想要promise，想要promise异步执行成功的value数据
3. 哪里写async？
    await所在函数（最近的）定义的左侧写async
*/