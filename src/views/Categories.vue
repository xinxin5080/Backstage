<template>
  <div>
       <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="primary" plain @click="goodsBtn">添加分类</el-button>
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
    <!-- 添加分类对话框 -->
      <!-- 添加角色对话框 -->
      <el-dialog title="添加分类" :visible.sync="addRoleDialogFormVisible">
  <el-form :model="addUser" :rules="rules" ref="addstr">
    <el-form-item label="角色名称" prop="username" :label-width="formLabelWidth">
      <el-input v-model="addUser.cat_name"  auto-complete="off"></el-input>
    </el-form-item>
    <!-- 级联 -->
    <el-form-item label="父级名称" :label-width="formLabelWidth">
      <!-- options表示数据 -->
      <!-- selectedOptions保存着选中节点的id数组 -->
      <!-- defaultProps 展示字段 -->
    <el-cascader
    :options="options"
    :props="defaultProps"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible">取 消</el-button>
    <el-button type="primary" @click="addlistBtn('addstr')">确 定</el-button>
  </div>
</el-dialog>
 <!--  -->
  </div>
</template>
<script>
// 引进第三方组件
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import { goodsList, addgoods } from '@/api'
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
      }],
      addRoleDialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        // rules名字和用户/密码名一样才有效果
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addUser: {
        cat_pid: 0, // 父id
        cat_name: '', // 分类名称
        cat_level: 0// 分类层级
      },
      options: [],
      selectedOptions: [],
      defaultProps: {
        value: 'cat_id', // 选中的商品的id
        label: 'cat_name', // 选中的商品展示的名
        children: 'children'// 下一级
      },
      obj: {
        cat_pid: 0, // 父id
        cat_name: '', // 分类名称
        cat_level: 0// 分类层级
      }
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
          this.options = res.data.data.result
          console.log(res.data)
          // 获取总数
          this.total = res.data.data.total
        })
    },
    handleChange (value) {
      // console.log(value)
      // 如果value的length的值为0,这是一级cat_level=0 cat_pid=0
      // 如果value的length值为1,这是一级cat_level=1 cat_pid=value[0]
      // 如果value的length值为2,这是一级cat_level=2 cat_pid=value[1]
      if (value.length === 1) {
        this.addUser.cat_level = 1
        this.addUser.cat_pid = value[0]
      } else if (value.length === 2) {
        this.addUser.cat_level = 2
        this.addUser.cat_pid = value[1]
      }
    },
    // 点击添加分类按钮
    goodsBtn () {
      this.addRoleDialogFormVisible = true
    },
    // 取消
    dialogVisible () {
      this.addRoleDialogFormVisible = false
    },
    // 点击确定
    addlistBtn (addstr) {
      this.$refs[addstr].validate(isOK => {
        if (isOK) {
          this.addRoleDialogFormVisible = false
          // console.log(this.addUser.cat_level)
          // console.log(this.addUser.cat_pid)
          // // console.log(this.addUser.cat_name)
          // 发请求要求cat_pid,cat_name,cat_level
          addgoods(this.addUser)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message(res.data.meta.msg)
                // 将表单数据初始化
                this.addUser.cat_level = 0
                this.addUser.cat_pid = 0
                this.addUser.cat_name = ''
                // 清空
                this.selectedOptions = []
                this.init()
              } else {
                this.selectedOptions = []
                this.init()
                this.error(res.data.meta.msg)
              }
            })
        } else {
          this.$message.error('请输入完整的信息')
        }
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
