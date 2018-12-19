<template>
<div class="home">
 <el-container>
  <el-aside width=auto>
 <div class="logo"></div>
   <!-- 折叠collapse, 宽改为auto-->
   <!-- 修改点击项的颜色background-color -->
   <!-- 开启router router index改为路由path跳转-->
    <el-menu
      background-color="#f9f9f9"
      router
      class="el-menu-admin"
      @open="handleOpen"
      @close="handleClose"
      :collapse="iscollapse"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/users">
               <i class="el-icon-menu"></i>
               用户列表
            </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <div class="el-icon-menu toggle-btn" @click="getcollapse"></div>
      <span class="system-title">后台管理系统</span>
      <div>
        <span class="welcome">你好{{username}}</span>
       <el-button type="warning" plain @click="del">退出</el-button>
      </div>
    </el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
</div>
</template>
<script>
// 注意export default是一定要是使用
export default {
  data () {
    return {
      iscollapse: false,
      username: ''
    }
  },
  methods: {
    // 切换
    getcollapse () {
      this.iscollapse = !this.iscollapse
    },
    // 退出
    del () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 回到首页
      this.$router.push({ name: '/' })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    // 获取用户名
    let myusername = localStorage.getItem('username')
    // 赋值
    this.username = myusername
  }
}
</script>
<style lang="scss" scoped>
  .home {
    height: 100vh;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-container {
      height: 100%;
    }
    .el-aside {
      background-color: #f9f9f9;
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2f4050;
    }
    .logo {
      height: 140px;
      background: url(../assets/logo.jpg);
      background-size: cover;
      background-color: white;
    }
    .toggle-btn {
      padding: 0 15px;
      margin-left: -20px;
      font-size: 36px;
      color: white;
      cursor: pointer;
      line-height: 60px;
      &:hover {
        background-color: #4292cf;
      }
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome {
      color: white;
      padding-right: 10px;
    }
  }
</style>
