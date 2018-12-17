import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// axiso拦截器
axios.interceptors.request.use(function (config) {
  // config里面有请求头,请求成功将token设置进请求头
  // console.log(config)
  // 获取token
  let mytoken = localStorage.getItem('mytoken')
  console.log(mytoken)
  // 判断有无token
  if (mytoken) {
    config.headers.Authorization = mytoken
    // 设置进请求头config.headers是请求头,Authorization是后台要传递的
  }

  return config
}, function (error) {
  return Promise.reject(error)
})
// 1.0登陆请求
// 导出,箭头函数参数(括号前,一个函数不用看好)是函数名,后面是函数体
// 一句话是可以去掉return,大括号
export const Login = obj => axios.post('/login', obj)
// 2.0用户数据列表
export const getUser = obj => {
  return axios.get('/users', { params: obj })
}
