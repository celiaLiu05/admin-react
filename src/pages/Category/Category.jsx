import React, {Component} from "react"
import {reqCategorys} from '../../api'
import {Card, Table, Button, Icon, message} from 'antd'
import LinkButton from "../../components/LinkButton/LinkButton";

export default class Category extends Component {
    state = {
        loading: false, // 是否正在获取数据中
        categorys: [], // 一级分类列表 
        subCategorys: [], // 二级分类列表
        parentId: '0', // 当前需要显示的分类列表的父分类ID
        parentName: '', // 当前需要显示的分类列表的父分类名称
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
              render: (category) => ( // 返回需要显示的界面
                <div>
                    <LinkButton>修改分类</LinkButton>
                    {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数中传入数据 */}
                    <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
                </div>
              )
            }
          ]
    }

    // 异步获取一级/二级分类列表显示
    getCategorys = async() => {
        // 在发请求前，显示loading
        this.setState({loading: true})
        const {parentId} = this.state
        // 发异步ajax请求， 获取数据
        const result = await reqCategorys(parentId)
        // 在请求完成后，隐藏loading
        this.setState({loading: false})
        if(result.status === 0) {
            // 取出分类数组（可能是一级也可能是二级的）
            const categorys = result.data
            if(parentId === '0') {
                // 更新一级分类状态
                this.setState({categorys})
            }else {
                // 更新二 级分类状态
                this.setState({subCategorys: categorys})
            }
        }else {
            message.error('获取分类列表失败！')
        }
    }

    // 显示一级分类对象的二级列表
    showSubCategorys = (category) => {
        // 更新状态
        this.setState({
            parentId: category._id, 
            parentName: category.name
        }, () => { // 在状态更新且重新render()后执行
            // 获取二级分类列表显示
            this.getCategorys()
        })
        // setState()不能立即获取最新的状态：因为setState()是异步更新状态的
    }

    // 为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }

    // 执行异步任务： 发异步ajax请求
    componentDidMount() {
        // 获取一级分类列表显示
        this.getCategorys()
    }
    render() {
        const {categorys, loading, subCategorys, parentId, parentName} = this.state
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
                        dataSource={parentId === '0' ? categorys : subCategorys} 
                        columns={this.columns} 
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                </Card>
            </div>
        )
    }
}