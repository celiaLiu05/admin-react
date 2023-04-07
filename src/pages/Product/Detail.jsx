import React, {Component} from "react"
import {Card, Icon, List} from 'antd'
import LinkButton from "../../components/LinkButton/LinkButton"
const Item = List.Item
// product的详情子路由组件
export default class Detail extends Component {

    render() {
        const title = (
            <span>
                <LinkButton>
                    <Icon 
                        type="arrow-left" 
                        style={{marginRight: 10, fontSize: 18}}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情 </span>
            </span>
        )
        
        // 读取携带过来的state数据
        const {name, desc, price, imgs, detail} = this.props.location.state.product
        
        return(
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>{price}元</span>
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
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}