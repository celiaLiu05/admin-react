import React, {Component} from "react"
import {reqCategorys} from '../../api'
import {Card, Table, Button, Icon, message} from 'antd'
import LinkButton from "../../components/LinkButton/LinkButton";

export default class Category extends Component {
    state = {
        categorys: [], // 一级分类列表 
        loading: false // 是否正在获取数据中 
    }

    // 初始化Table所有列的数组
    initColumns = () => {
        this.columns = [
            {
              title: '分类名称',
              dataIndex: 'name', // 显示数据对应的属性名  
            },
            {
              title: '操作',
              width: 300,
              render: () => ( // 返回需要显示的界面
                <div>
                    <LinkButton>修改分类</LinkButton>
                    <LinkButton>查看子分类</LinkButton>
                </div>
              )
            }
          ]
    }

    // 异步获取一级分类列表显示
    getCategorys = async() => {
        // 在发请求前，显示loading
        this.setState({loading: true})
        // 发异步ajax请求， 获取数据
        const result = await reqCategorys("0")
        // 在请求完成后，隐藏loading
        this.setState({loading: false})
        if(result.status === 0) {
            const categorys = result.data
            // 更新状态
            this.setState({categorys})
        }else {
            message.error('获取分类列表失败！')
        }
    }

    // 为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }

    // 执行异步任务： 发异步ajax请求
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        const {categorys, loading} = this.state
        const title = '一级分类列表'
        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        bordered
                        rowKey="_id"
                        loading={loading}
                        dataSource={categorys} 
                        columns={this.columns} 
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                </Card>
            </div>
        )
    }
}