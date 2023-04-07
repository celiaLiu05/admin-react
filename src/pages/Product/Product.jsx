import React, {Component} from "react";
import { Route, Switch, Redirect } from "react-router-dom"
import ProductHome from "./ProductHome"
import ProductAddUpdate from "./ProductAddUpdate"
import Detail from "./Detail"

export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* 路径完全匹配 */}
                    <Route path='/product' component={ProductHome} exact/> 
                    <Route path='/product/addupdate' component={ProductAddUpdate}/>
                    <Route path='/product/detail' component={Detail}/>
                    <Redirect to='/product' />
                </Switch>
            </div>
        )
    }
}