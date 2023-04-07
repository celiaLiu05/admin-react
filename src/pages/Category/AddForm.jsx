import React, {Component} from "react"
import PropTypes from 'prop-types'
import {Form, Select, Input} from 'antd'

// 添加分类的Form组件 
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 传递form对象的函数
        categorys: PropTypes.array.isRequired, // 一级分类的数组
        parentId: PropTypes.string.isRequired // 父分类ID 
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

   render() {
    const {getFieldDecorator} = this.props.form
    const {categorys, parentId} = this.props
    return(
        <Form>
            <Form.Item>
                {
                    getFieldDecorator('parentId', {
                        initialValue: parentId
                    })(
                        <Select>
                            <Select.Option value='0'>一级分类</Select.Option>
                            {
                                categorys.map(c => (<Select.Option value={c._id}>{c.name}</Select.Option>))
                            }
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: '',
                        rules: [
                            { required: true, message: '分类名称不能为空！'}
                        ]
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