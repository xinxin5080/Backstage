<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/role' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="primary" plain>添加角色</el-button>
     <!-- 管理列表 -->
     <el-table
      v-loading="loading"
     class="mt-15"
    :data="roleList"
    border
    style="width: 100%">
        <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述">
    </el-table-column>
    <el-table-column
      prop="path"
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
         <el-button type="info" plain size="small"  icon="el-icon-check"></el-button>
         </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { roleList, rolesList } from '@/api'
export default {
  data () {
    return {
      roleList: [],
      loading: false
    }
  },
  methods: {
    init3 () {
      // 7.0获取角色列表
      roleList('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    }
  },
  created () {
    this.init3()
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
