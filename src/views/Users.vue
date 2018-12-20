<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="seekVal" class="input">
    <el-button slot="append" icon="el-icon-search" @click='seek'></el-button>
  </el-input>
   <el-button type="primary" plain class="add" @click="addatr">添加用户</el-button>
   <!-- 用户列表 -->
   <!-- 把宽度去掉就自适应 -->
    <!-- v-loading="loading"加载框 -->
     <el-table
      v-loading="loading"
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
      <!-- 将状态与其绑定 v-model="scope.row.mg_state"-->
       <template slot-scope="scope">
       <el-switch
       @change="amendUser(scope.row)"
       :disabled="scope.row.username==='admin'"
        v-model="scope.row.mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <!-- scope.row可以获取所在行的信息 -->
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top-start">
         <el-button type="primary" plain size="small"  icon="el-icon-edit" @click="headEdit(scope.row)"></el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top-start">
         <el-button type="danger" plain size="small"  icon="el-icon-delete" @click="headDelete(scope.row.id)"></el-button>
          </el-tooltip>
           <el-tooltip content="分配" placement="top-start">
         <el-button type="info" plain size="small"  icon="el-icon-check" @click="headrole(scope.row)"></el-button>
         </el-tooltip>
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
    <!-- 编辑对话用户弹框 -->
    <el-dialog title="编辑用户" :before-close="handleClose2" :visible.sync="editDialogFormVisible">
  <el-form :model="edit" :rules="rules" ref="addstr">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="edit.username"  :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱"  :label-width="formLabelWidth">
      <el-input v-model="edit.email"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="edit.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editquxiao">取 消</el-button>
    <el-button type="primary" @click="editbtn('addstr')">确 定</el-button>
  </div>
</el-dialog>
 <!-- 分配角色对话框 -->
     <el-dialog title="分配角色" :visible.sync="RoleDialogFormVisible">
  <el-form :model="role" :rules="rules" ref="addstr">
    <el-form-item label="当前的用户名" :label-width="formLabelWidth">
      <el-input v-model="role.username"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="请选择角色"  :label-width="formLabelWidth">
      <el-select v-model="roleID" placeholder="请选择">
    <el-option
      v-for="item in roleData"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editquxiao">取 消</el-button>
    <el-button type="primary" @click="roleBtn">授 权</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { getUser, AddUsers, getDelete, amendState, editUser, roleList, accredit } from '@/api'
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
      roleData: [], // 角色列表
      RoleDialogFormVisible: false, // 分配对话框
      // 用户名和id
      role: {
        username: '',
        id: ''
      },
      roleID: '', // 角色id
      loading: true, // 加载动画
      tableData: [],
      Userform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      edit: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      editDialogFormVisible: false,
      rules: {
        // rules名字和用户/密码名一样才有效果
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          // 自定义效验规则
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      formLabelWidth: '100px',
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
      // console.log(`每页 ${val} 条`)
      // 点击时重新将pagesize参数赋值
      this.pagesize = val
      // 刷新列表
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 点击时重新将currentpage参数赋值
      this.currentpage = val
      // 刷新列表
      this.init()
    },
    // 2.0请求列表数据，定义的函数不要写在mounted
    init () {
      // 加载
      this.loading = true
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
          // 加载
          this.loading = false
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
          AddUsers(this.Userform).then(res => {
            // console.log(res)
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
      })
        .then(() => {
          // 4.0删除请求
          getDelete(id).then(res => {
            if (res.data.meta.status === 200) {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 5.0点击切换状态
    amendUser (row) {
      // 5.0发切换状态请求
      amendState(row.id, row.mg_state).then(res => {
        if (res.data.meta.status === 200) {
          this.$message(res.data.meta.msg)
        } else {
          this.error(res.data.meta.msg)
        }
      })
    },
    // 6.0点击编辑按钮
    headEdit (row) {
      this.editDialogFormVisible = true
      // 获取要编辑的信息
      this.edit.username = row.username
      this.edit.email = row.email
      this.edit.mobile = row.mobile
      this.edit.id = row.id
    },
    // 6.0点击确定
    editbtn () {
      this.editDialogFormVisible = false
      // 6.0发编辑请求
      editUser(this.edit.id, {
        email: this.edit.email,
        mobile: this.edit.mobile
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message(res.data.meta.msg)
          this.init()
        } else {
          this.error(res.data.meta.msg)
        }
      })
    },
    // 6.0点击取消
    editquxiao () {
      this.editDialogFormVisible = false
    },
    // 点击x和外部取消
    handleClose2 () {
      this.editDialogFormVisible = false
    },
    // 7.0点击分配角色
    headrole (row) {
      this.RoleDialogFormVisible = true
      // 赋值
      this.role.username = row.username// 用户名
      this.role.id = row.id// 用户id
      // 7.1解决显示问题
      this.roleID = row.role_name
      // 7.0获取角色泪飚
      roleList()
        .then(res => {
          if (res.data.meta.status === 200) {
            this.roleData = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    // 8.0点击授权
    roleBtn () {
      // 角色id选择的时候会自动获取，和model绑定即可
      console.log(this.roleID)
      accredit(this.role.id, { rid: this.roleID })
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message(res.data.meta.msg)
          } else {
            this.error(res.data.meta.msg)
          }
        })
      this.RoleDialogFormVisible = false
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
