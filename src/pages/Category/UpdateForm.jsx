import React, {Component} from "react"
import {Form, Input} from 'antd'

// 更新分类的Form组件 
class UpdateForm extends Component {
   render() {
    const {getFieldDecorator} = this.props.form
    return(
        <Form>
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
export default Form.create()(UpdateForm)