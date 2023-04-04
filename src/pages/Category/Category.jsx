import React, {Component} from "react";
import {Card, Table, Button, Icon} from 'antd'
import LinkButton from "../../components/LinkButton/LinkButton";

export default class Category extends Component {
    render() {
        const title = '一级分类列表'
        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        const dataSource = [
            {
                "parentId": "0",
                "_id": "5e12b8bce31bb727e4b0e348",
                "name": "家用电器",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5e130ec7e31bb727e4b0e34c",
                "name": "洗衣机",
                "__v": 0
            }
        ]
          
          const columns = [
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
              ),
            }
          ]
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered
                        rowKey="_id"
                    />;
                </Card>
            </div>
        )
    }
}