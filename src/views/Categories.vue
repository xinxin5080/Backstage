<template>
  <div>
       <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="primary" plain >添加分类</el-button>
    <!-- 表格 -->
     <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="goodsData"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
      <!-- 分页 -->
  <el-pagination
      class="getpage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1,2, 4, 6, 8, 10, 15, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
// 引进第三方组件
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import { goodsList } from '@/api'
export default {
  // 1.2 注入组件
  components: {
    TreeGrid
  },
  data () {
    return {
      pagesize: 8, // 每页显示几条
      pagenum: 1, // 当前页数
      total: 10, // 总数
      goodsData: [], // 列表数据
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  methods: {
    // 每页显示几条
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 点击时重新将pagesize参数赋值
      this.pagesize = val
      // 刷新列表
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 点击时重新将currentpage参数赋值
      this.pagenum = val
      // 刷新列表
      this.init()
    },
    // 删除商品分类,回调分类id
    deleteCategory () {

    },
    // 编辑商品分类,回调分类id
    editCategory () {

    },
    init () {
      // 16.请求商品列表数据
      goodsList(3, this.pagenum, this.pagesize)
        .then(res => {
          this.goodsData = res.data.data.result
          // 获取总数
          this.total = res.data.data.total
        })
    }
  },
  created () {
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
  .el-button{
      margin-bottom: 15px;
  }
   .getpage {
    margin-top: 15px;
    background-color: #f5f5f5;
  }
</style>
