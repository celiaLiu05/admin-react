/*
要求： 能根据接口文档定义接口请求函数
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from './ajax'
const BASE = ''
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
// 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')
// 获取商品分页列表
export const reqProducts = ({pageNum, pageSize}) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})
// 搜索商品分页列表
// searchType: productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax(BASE + '/manage/product/search', {
    pageNum, 
    pageSize, 
    [searchType]: searchName
})