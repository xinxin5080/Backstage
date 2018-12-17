import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 导出,箭头函数参数(括号前,一个函数不用看好)是函数名,后面是函数体
// 一句话是可以去掉return,大括号
export const Login = obj => axios.post('/login', obj)
