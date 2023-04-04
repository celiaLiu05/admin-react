import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {Modal} from 'antd';
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from '../../utils/storageUtils'
import menuList from "../../config/menuConfig"
import './Header.less'
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now())
    }

    getTime = () => {
        // 每隔一秒获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach((item) => {
            if(item.key === path) { // 如果当前item对象的key和path一样，item的title就是需要显示的title
                title = item.title
            }else if(item.children) {
                // 在所有的子item中查找匹配的
                const cItem = item.children.find((cItem) => cItem.key === path)
                // 如果有值说明有匹配的
                if(cItem) {
                    // 取出它的title
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            content: '确认退出吗？',
            onOk: () => {
                // 删除保存的用户数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                // 跳转到登陆界面
                this.props.history.replace('/login')
            }
          });
    }
    // 在第一次render之后执行一次
    // 一般在此执行异步操作：发ajax请求/启动定时器
    componentDidMount() {
        // 获取当前时间
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
    render() {
        const {currentTime} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript:;" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)