import React, {Component} from "react"
import {Form, Select, Input} from 'antd'

// 添加分类的Form组件 
class AddForm extends Component {
   render() {
    const {getFieldDecorator} = this.props.form
    return(
        <Form>
            <Form.Item>
                {
                    getFieldDecorator('parentId', {
                        initialValue: '0'
                    })(
                        <Select>
                            <Select.Option value='0'>一级列表</Select.Option>
                            <Select.Option value='1'>家具</Select.Option>
                            <Select.Option value='2'>电器</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: ''
                    })(
                        <Input placeholder="请输入分类名称"/>
                    )
                }
            </Form.Item>
        </Form>
    )
   }
}
export default Form.create()(AddForm)