<template>
  <div>
         <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 搜索框 -->
   <el-button type="primary" plain @click="add" class="add">添加用户</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    add () {
      this.$router.push({ name: 'add' })
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-breadcrumb {
    background-color: #f5f5f5;
    height: 45px;
    line-height: 45px;
    margin-bottom: 15px;
  }
  .add {
    margin-left: 5px;
  }
</style>
