import React, {Component} from "react"
import {Card, Select, Input, Button, Icon, Table} from 'antd'
import LinkButton from '../../components/LinkButton/LinkButton'
// product的默认子路由组件
export default class ProductHome extends Component {
    state = {
        products: [ //  商品的数组
            {
                "status": 2,
                "imgs": [
                    "1578588737108-index.jpg"
                ],
                "_id": "5e12b97de31bb727e4b0e349",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 6300,
                "pCategoryId": "5e12b8bce31bb727e4b0e348",
                "categoryId": "5fc74b650dd9b10798413162",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"></span></p>\n",
                "__v": 0
            },
        ] 
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
    componentWillMount() {
        this.initColumns()
    }
    render() {
        const {products} = this.state  

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
                    dataSource={products} 
                    columns={this.columns} 
                />
            </Card>
        )
    }
}