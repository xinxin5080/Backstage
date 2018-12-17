<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginRef" class="container">
      <img src="../assets/logo.jpg" alt="" class="avatar">
  <el-form-item  prop="name">
    <el-input v-model="loginForm.name" placeholder="用户名"  prefix-icon="iconfont icon-dashujukeshihuaico-"></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <!-- 封装的input绑定keydown事件，必须加native修饰符 -->
    <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="iconfont icon-3" @keydown.enter.native="headLogin('loginRef')"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="login-btn" @click="headLogin('loginRef')">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
// import axios from 'axios'
import { Login } from '@/api'
export default {
  data () {
    return {
      loginForm: {
        name: 'admin',
        password: '123456'
      },
      rules: {
        // rules名字和用户/密码名一样才有效果
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // str是形参，是点击传递过来的ref dom元素
    // $refs[str] 相当于$ref.str，他传递的是字符串，所以用[]
    // validate是封装了的方法是用来效验，里面有一个形参，为布尔值
    headLogin (str) {
      this.$refs[str].validate(isOk => {
        if (isOk) {
          // 调用传递过来的接口,以对象的形式传递参数(post)
          Login({ username: this.loginForm.name, password: this.loginForm.password })
          // 用.then来接收
            .then(res => {
              console.log(res.data)
              if (res.data.meta.status === 200) {
                // 本地存储token,参数1:名字自定义,参数2:获取的token
                localStorage.setItem('mytoken', res.data.data.token)
                // 从后台获取名字,本地存储
                localStorage.setItem('username', res.data.data.username)
                this.$message(res.data.meta.msg)
                // 跳转
                this.$router.push({ name: 'home' })
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
        } else {
          console.log(111)
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4050;

    .container {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 0px 40px 15px 40px;
      margin: 200px auto;
      background: white;
      .avatar {
        position: relative;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
