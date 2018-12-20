import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// axiso拦截器
axios.interceptors.request.use(function (config) {
  // config里面有请求头,请求成功将token设置进请求头
  // console.log(config)
  // 获取token
  let mytoken = localStorage.getItem('mytoken')
  // console.log(mytoken)
  // 判断有无token
  if (mytoken) {
    // 设置进请求头config.headers是请求头,Authorization是后台要传递的
    config.headers.Authorization = mytoken
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
// 3.0添加用户
export const AddUsers = obj => {
  return axios.post('/users', obj)
}

// 4.0删除用户
export const getDelete = id => axios.delete(`/users/${id}`)

// 5.0修改用户状态
export const amendState = (uid, type) => axios.put(`/users/${uid}/state/${type}`)
// 6.0编辑编辑用户提交
export const editUser = (id, obj) => axios.put(`/users/${id}`, obj)
// 7.0获取角色列表
export const roleList = () => axios.get('/roles')
// 8.0 授权角色
export const accredit = (id, rid) => axios.put(`/users/${id}/role`, rid)
// 9.0获取所有权限列表
export const rolesList = (type) => axios.get(`/rights/${type}`)
// 10.删除角色指定权限
export const delRole = (roleId, rightId) => axios.delete(`roles/${roleId}/rights/${rightId}`)
