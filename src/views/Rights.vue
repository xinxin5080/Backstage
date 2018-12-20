<template>
  <div>
     <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/rights' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/rights' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
     <!-- 管理列表 -->
     <el-table
      v-loading="loading"
     class="mt-15"
    :data="rightsList"
    border
    style="width: 100%">
        <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <!-- 使用过滤器数据,使用插值作用域的形式获取数据 -->
    <el-table-column
      label="层级">
      <template slot-scope="scoped">
        <!-- 根据不同的层级赋值不同的属性，实现不同的颜色 -->
        <el-tag :type="getType(scoped.row.level)"> {{scoped.row.level | filtersLevel}}</el-tag>

      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { rolesList } from '@/api'
export default {
  data () {
    return {
      rightsList: [],
      loading: false
    }
  },
  // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，dom还未生成，$el 属性目前不可见。
  // 也可以写在mouther上
  created () {
    this.init2()
  },
  // 过滤器
  filters: {
    filtersLevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  methods: {
    init2 () {
      // 9.0获取所有的权限列表
      rolesList('list')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rightsList = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    // 实现不同层级不同颜色
    getType (level) {
      if (level === '0') {
        return 'success'
      } else if (level === '1') {
        return 'info'
      } else {
        return 'warning'
      }
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
