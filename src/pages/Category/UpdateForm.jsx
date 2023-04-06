import React, {Component} from "react"
import PropTypes from 'prop-types'
import {Form, Input} from 'antd'

// 更新分类的Form组件 
class UpdateForm extends Component {

   static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
   }

   componentWillMount() {
    // 将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
   }

   render() {
    const {getFieldDecorator} = this.props.form
    const {categoryName} = this.props
    return(
        <Form>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: categoryName
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