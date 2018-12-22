<template>
  <div>
         <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="seekVal" class="input">
    <el-button slot="append" icon="el-icon-search" ></el-button>
  </el-input>
   <el-button type="primary" plain class="add">添加用户</el-button>
   <!-- 表格 -->
     <el-table
      v-loading="loading"
     class="mt-15"
    :data="goodsList"
    border
    style="width: 100%">
        <el-table-column
      type="index">
    </el-table-column>

    <el-table-column
      prop="username"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="email"
      label="商品价格">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="商品状态">
    </el-table-column>
    <el-table-column
      prop="email"
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <!-- scope.row可以获取所在行的信息 -->
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top-start">
         <el-button type="primary" plain size="small"  icon="el-icon-edit" ></el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top-start">
         <el-button type="danger" plain size="small"  icon="el-icon-delete" ></el-button>
          </el-tooltip>
           <el-tooltip content="分配" placement="top-start">
         <el-button type="info" plain size="small"  icon="el-icon-check" ></el-button>
         </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { goodsList } from '@/api'
export default {
  data () {
    return {
      seekVal: '',
      loading: false,
      goodsList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 16.商品列表
      goodsList()
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
    .input {
    width: 300px;
  }
  .add {
    margin-left: 5px;
  }
</style>
