import React, {Component} from "react"
import {Card, Icon, List} from 'antd'

const Item = List.Item
// product的详情子路由组件
export default class Detail extends Component {
    render() {
        const title = (
            <span>
                <Icon type="arrow-left"/>
                <span>商品详情 </span>
            </span>
        )
        return(
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>aaaaaaaaaaaaaa</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>aaaaaaaaaaaaaa</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>aaaaaaaaaaaaaa</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>aaaaaaaaaaaaaa</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            <img className="product-img" src="https://th.bing.com/th/id/R.8e5e293cae342149832fff96bb4c8caa?rik=dbonSUJuDVqx5A&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f8%2fd7%2f6527dce099.jpg%3fdown&ehk=E9%2bVucd%2fent1hsPcwHCre695jRwtoRQJzu1ymZuXJL0%3d&risl=&pid=ImgRaw&r=0" alt="img" />
                            <img className="product-img" src="https://th.bing.com/th/id/R.8e5e293cae342149832fff96bb4c8caa?rik=dbonSUJuDVqx5A&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f8%2fd7%2f6527dce099.jpg%3fdown&ehk=E9%2bVucd%2fent1hsPcwHCre695jRwtoRQJzu1ymZuXJL0%3d&risl=&pid=ImgRaw&r=0" alt="img" />
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red">aaa</h1>'}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}