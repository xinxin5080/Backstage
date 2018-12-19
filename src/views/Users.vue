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
   <el-button type="primary" plain class="add" @click="addatr">添加用户</el-button>
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
      <!-- scope.row可以获取所在行的信息 -->
      <template slot-scope="scope">
         <el-button type="primary" plain size="small"  icon="el-icon-edit"></el-button>
         <el-button type="danger" plain size="small"  icon="el-icon-delete" @click="headDelete(scope.row.id)"></el-button>
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
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :before-close="handleClose" :visible.sync="addDialogFormVisible">
  <el-form :model="Userform" :rules="rules" ref="addstr">
    <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
      <el-input v-model="Userform.username"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
      <el-input v-model="Userform.password"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
      <el-input v-model="Userform.email"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
      <el-input v-model="Userform.mobile" prop="mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <el-button type="primary" @click="add('addstr')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { getUser, AddUsers, getDelete } from '@/api'
export default {
  data () {
    // 自定义效验
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('邮箱不能为空'))
      } else {
        // 正则
        let eamailRef = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (eamailRef.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }
    }

    return {
      tableData: [],
      Userform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        // rules名字和用户/密码名一样才有效果
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          // 自定义效验规则
          { required: true, validator: checkEmail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      formLabelWidth: '90px',
      value3: true,
      switchVal: '',
      seekVal: '', // 搜索框的绑定的内容
      addDialogFormVisible: false, // 添加用户显示
      pagesize: 10, // 每页显示几条
      currentpage: 1, // 当前页数
      total: 0 // 总数
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
    // 2.0请求列表数据，定义的函数不要写在mounted
    init () {
      getUser({
        query: this.seekVal,
        pagenum: this.currentpage,
        pagesize: this.pagesize
      }).then(res => {
        if (res.data.meta.status === 200) {
          // console.log(res.data)
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
    },
    // 3.0点击添加用户
    addatr () {
      this.addDialogFormVisible = true
    },
    // 3.0点击确定
    add (aa) {
      this.addDialogFormVisible = false
      // 效验正确再发请求
      this.$refs[aa].validate(isPass => {
        if (isPass) {
          //  3.0添加用户
          AddUsers(this.Userform)
            .then(res => {
              console.log(res)
              // 刷新
              this.init()
              // 清空
              this.Userform = {}
            })
        }
      })
    },
    // 3.0优化取消添加
    quxiao () {
      this.addDialogFormVisible = false
      // 点击取消.执行一个方法来清除错误信息
      this.$refs.addstr.clearValidate()
    },
    // 3.0关闭对话框时清除错误信息
    handleClose (dome) {
      this.$refs.addstr.clearValidate()
      this.addDialogFormVisible = false
    },
    // 4.0点击删除,id是点击时传递的row.id
    headDelete (id) {
      // 4.0弹框
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 4.0删除请求
        getDelete(id)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
