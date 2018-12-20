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
 <!-- 展开行 -->
  <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- 内容,使用分栏,通过插值slot-scope取的里面的值 -->
          <el-row v-for="fitItem in scope.row.children" :key="fitItem.id">
            <!-- 第一列 -->
            <el-col :span="6">
              <el-tag type="success" closable @close="DelBtn(scope.row,fitItem.id)">{{fitItem.authName}}</el-tag>
             <i v-if="scope.row.children.length>0" class="el-icon-arrow-right"></i>
              </el-col>
            <el-col :span="18">
              <!-- 嵌套内容 -->
              <el-row  v-for="strItem in fitItem.children" :key="strItem.id">
                <!-- 2 -->
                <el-col :span="6">
                  <el-tag type="info" closable  @close="DelBtn(scope.row,strItem.id)">{{strItem.authName}}</el-tag>
                    <i v-if="strItem.authName.length>0" class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 3 -->
                <el-col :span="18"><el-tag  v-for="arrItem in strItem.children" :key="arrItem.id" type="danger" closable @close="DelBtn(scope.row,strItem.id)">{{arrItem.authName}}>{{arrItem.authName}}</el-tag></el-col>
              </el-row>
              <!-- 嵌套内容 -->
            </el-col>
          </el-row>
        <!-- 内容,使用分栏,通过插值slot-scope取的里面的值 -->
        <div v-if="scope.row.children.length==0">没有数据</div>
      </template>
    </el-table-column>
    <!-- 展开行 -->
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
import { roleList, delRole } from '@/api'
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
      roleList()
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.roleList = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    // 点击删除按钮,获取角色id和权限id
    // 角色id：通过插值取scope.row.id
    // 权限id：通过请求回来的数据取
    DelBtn (row, rightId) {
      // 10.删除权限
      delRole(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message(res.data.meta.msg)
            // 将返回剩下的所有权限赋值，避免刷新
            row.children = res.data.data
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
  .el-tag{
    margin: 5px;
  }
</style>
