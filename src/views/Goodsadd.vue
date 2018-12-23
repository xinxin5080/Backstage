<template>
  <div>
         <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!--  -->
    <template>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
      <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="third1">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="fourth">商品内容</el-tab-pane>
    </el-tabs>
</template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first'
    }
  },

  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
      this.active = parseInt(tab.index)
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

</style>
