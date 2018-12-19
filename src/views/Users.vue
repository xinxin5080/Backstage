<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="seekVal" class="input">
    <el-button slot="append" icon="el-icon-search" @click='seek'></el-button>
  </el-input>
   <el-button type="primary" plain class="add">添加用户</el-button>
   <!-- 用户列表 -->
   <!-- 把宽度去掉就自适应 -->
     <el-table
     class="mt-15"
    :data="tableData"
    border
    style="width: 100%">
        <el-table-column
      type="index">
    </el-table-column>

    <el-table-column
      prop="username"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      label="切换状态">
      <!-- 在里面放标签/组件要加插槽 -->
       <template slot-scope="scope">
       <el-switch
        v-model="switchVal"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
         <el-button type="primary" plain size="small"  icon="el-icon-edit"></el-button>
         <el-button type="danger" plain size="small"  icon="el-icon-delete"></el-button>
         <el-button type="info" plain size="small"  icon="el-icon-check"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      class="getpage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getUser } from '@/api'
export default {
  data () {
    return {
      tableData: [],
      value3: true,
      switchVal: '',
      seekVal: '', // 搜索框的绑定的内容
      pagesize: 2, // 每页显示几条
      currentpage: 1, // 当前页数
      total: 0// 总数
    }
  },
  methods: {
    // 每页显示几条
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 点击时重新将pagesize参数赋值
      this.pagesize = val
      // 刷新列表
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 点击时重新将currentpage参数赋值
      this.currentpage = val
      // 刷新列表
      this.init()
    },
    // 请求列表数据，定义的函数不要写在mounted
    init () {
      getUser({ query: this.seekVal, pagenum: this.currentpage, pagesize: this.pagesize })
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res.data)
            this.tableData = res.data.data.users
            // 获取总页数
            this.total = res.data.data.total
          }
        })
    },
    // 搜索
    seek () {
    // 因为init在vue的实例中，所以需要用this
    // 将query定义成搜索框双向绑定的值，刚开始时时空的，
    // 点击搜索时将搜索框的值作为参数传递过去
      this.init()
      // 清空
      this.seekVal = ''
    }
  },
  mounted () {
    // 初始化
    this.init()
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
  .getpage {
    margin-top: 15px;
    background-color: #f5f5f5;
  }
</style>
