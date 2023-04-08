import React, {Component} from "react"
import {Card, Select, Input, Button, Icon, Table, message} from 'antd'
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import LinkButton from '../../components/LinkButton/LinkButton'
// product的默认子路由组件
export default class ProductHome extends Component {
    state = {
        products: [], //  商品的数组
        total: 0, // 商品的总数量
        loading: false, // 加载
        searchType: 'productName', // 搜索的类型
        searchName: '', //搜索的关键字
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
                // dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status === 1 ? 2 : 1 
                    return (
                        <span>
                            <Button 
                                type="primary"
                                onClick={() => this.updateStatus(_id, newStatus)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>
                                {status === 1 ? '在售' : '已下架'}
                            </span>
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
                            {/* 将prodyct对象使用state传递给目标路由组件 */}
                            <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
          ]
    }

    //  获取指定页码的数据
    getProducts = async(pageNum) => {
        // 保存当前页码
        this.pageNum = pageNum
        const {searchType, searchName} = this.state
        // 显示loading
        this.setState({loading: true})
        let result
        // 如果搜索关键词有值，进行搜索分页
        if(searchName) {
            result =  await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchType, searchName})
        }else { // 一般分页
            result = await reqProducts({pageNum, pageSize: PAGE_SIZE})
        }
        // 隐藏loading
        this.setState({loading: false})
        if(result.status === 0) {
            // 取出分页数据，更新状态，显示分页列表
            const {list, total} = result.data
            this.setState({
                products: list,
                total
            })
        }
    }

    // 更新指定商品的状态 
    updateStatus = async(productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if(result.status === 0) {
            message.success('修改商品状态成功！')
            this.getProducts(this.pageNum)
        }
    }
    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        const {products, total, loading, searchType, searchName} = this.state  

        const title = (
            <span>
                <Select 
                    value={searchType} 
                    style={{width: 150}}
                    onChange={(value) => {this.setState({searchType: value})}}
                >
                    <Select.Option value='productName'>按名称搜索</Select.Option>
                    <Select.Option value='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input 
                    placeholder="关键字" 
                    style={{width: 150, margin: '0 15px'}} 
                    value={searchName}
                    onChange={(e) => {this.setState({searchName: e.target.value})}}
                />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
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
                    pagination={{
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