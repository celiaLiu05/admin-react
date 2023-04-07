import React, {Component} from "react"
import {Card, Select, Input, Button, Icon, Table} from 'antd'
import {reqProducts} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import LinkButton from '../../components/LinkButton/LinkButton'
// product的默认子路由组件
export default class ProductHome extends Component {
    state = {
        products: [], //  商品的数组
        total: 0, // 商品的总数量
        loading: false, // 加载
    }

    initColumns = () => {
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              // 当前指定了才对应的属性，传入的是对应的属性值
              render: (price) => '¥' + price
            },
            {
                title: '状态',
                width: '100px',
                dataIndex: 'status',
                render: (status ) => {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: '100px',  
                render: (product) => {
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
          ]
    }

    //  获取指定页码的数据
    getProducts = async(pageNum) => {
        this.setState({loading: true})
        const result = await reqProducts({pageNum, pageSize: PAGE_SIZE})
        this.setState({loading: false})
        if(result.status === 0) {
            console.log(result);
            const {list, total} = result.data
            this.setState({
                products: list,
                total
            })
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const {products, total, loading } = this.state  

        const title = (
            <span>
                <Select value='1' style={{width: 150}}>
                    <Select.Option value='1'>按名称搜索</Select.Option>
                    <Select.Option value='2'>按分类搜索</Select.Option>
                </Select>
                <Input placeholder="关键字" style={{width: 150, margin: '0 15px'}}/>
                <Button type="primary">搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加商品
            </Button>
        )
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    dataSource={products} 
                    columns={this.columns} 
                    Pagination={{
                        defaultPageSize: PAGE_SIZE, 
                        showQuickJumper: true,
                        total, 
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}