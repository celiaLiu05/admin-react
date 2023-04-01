import React, {Component} from "react"
import { Link, withRouter } from "react-router-dom"
import { Menu, Icon } from 'antd'
import './LeftNav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

// 左侧导航的组件

class LeftNav extends Component {
    // 根据menu的数据数组生成对应的标签数组
    // 使用map + 递归调用
    // getMenuNodes_map = (menuList) => {
    //     return menuList.map((item) => {
    //         if(!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         }else {
    //             return(
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                     }
    //                 >
    //                     { this.getMenuNodes(item.children) }
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    // 根据menu的数据数组生成对应的标签数组
    // 使用用reduce + 递归调用
    getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            if(!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else {
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        { this.getMenuNodes(item.children) }
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
    render() {
        //  得到当前的请求的路由路径
        const path = this.props.location.pathname
        return(
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                >
                        { this.getMenuNodes(menuList) }
                </Menu>
            </div>
        )
    }
}

// withRouter 高阶组件：
// 包装非路由组件，返回一个新的组件
// 新的组件向非路由组件传递三个属性：history/location/match
export default withRouter(LeftNav)