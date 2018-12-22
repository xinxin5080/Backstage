<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/role' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="primary" plain @click="addBtn">添加角色</el-button>
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
                <el-col :span="18"><el-tag  v-for="arrItem in strItem.children" :key="arrItem.id" type="danger" closable @close="DelBtn(scope.row,arrItem.id)">{{arrItem.authName}}>{{arrItem.authName}}</el-tag></el-col>
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
         <el-button type="primary" plain size="small"  icon="el-icon-edit" @click="editRole(scope.row)"></el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top-start">
         <el-button type="danger" plain size="small"  icon="el-icon-delete" @click="Delclick(scope.row.id)"></el-button>
          </el-tooltip>
           <el-tooltip content="授权角色" placement="top-start">
         <el-button type="info" plain size="small"  @click="getRole(scope.row)" icon="el-icon-check"></el-button>
         </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加角色对话框 -->
      <el-dialog title="添加角色" :before-close="handleClose" :visible.sync="addRoleDialogFormVisible">
  <el-form :model="addUser" :rules="rules" ref="addstr">
    <el-form-item label="角色名称" prop="username" :label-width="formLabelWidth">
      <el-input v-model="addUser.username"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="miaoshu" :label-width="formLabelWidth">
      <el-input v-model="addUser.miaoshu"  auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <el-button type="primary" @click="yesbtn('addstr')">确 定</el-button>
  </div>
</el-dialog>
 <!-- 添加角色对话框 -->
  <!-- 编辑角色对话框 -->
      <el-dialog title="编辑角色" :before-close="handleClose1" :visible.sync="editRoleDialogFormVisible">
  <el-form :model="editUser" :rules="rules" ref="addstr">
    <el-form-item label="角色名称" prop="username" :label-width="formLabelWidth">
      <el-input v-model="editUser.username"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="miaoshu" :label-width="formLabelWidth">
      <el-input v-model="editUser.miaoshu"  auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao1">取 消</el-button>
    <el-button type="primary" @click="editdata('addstr')">确 定</el-button>
  </div>
</el-dialog>
 <!-- 编辑角色对话框 -->
  <!-- 授权角色对话框 -->
      <el-dialog title="授权角色" :visible.sync="getRoleDialogFormVisible">
        <!-- 树结构 -->
        <div class="tree-box">
        <el-tree
          :data="getRolisList"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="checkedId"
          :default-expand-all=true
          :props="defaultProps">
        </el-tree>
        </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao3">取 消</el-button>
    <el-button type="primary" @click="rolebtn">确 定</el-button>
  </div>
</el-dialog>
 <!-- 授权角色对话框 -->
  </div>
</template>
<script>
import { roleList, delRole, addsole, delroleId, editrole, rolesList, getroledata } from '@/api'
export default {
  data () {
    return {
      roleList: [],
      loading: false,
      addRoleDialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        // rules名字和用户/密码名一样才有效果
        username: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        miaoshu: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      // 添加用户
      addUser: {
        username: '',
        miaoshu: ''
      },
      // 编辑角色
      editRoleDialogFormVisible: false,
      editUser: {
        username: '',
        miaoshu: '',
        id: ''
      },
      // 授权角色
      getRoleDialogFormVisible: false,
      getRolisList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'// 展示汉字
      },
      checkedId: [], // 默认展示的子节点
      atID: ''// 当前行的id
    }
  },
  methods: {
    init3 () {
      // 7.0获取角色列表
      roleList()
        .then(res => {
          if (res.data.meta.status === 200) {
            // console.log(res)
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
          if (res.data.meta.status === 200) {
            this.$message(res.data.meta.msg)
            // 将返回剩下的所有权限赋值，避免刷新
            row.children = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    // 11点击添加角色
    addBtn () {
      this.addRoleDialogFormVisible = true
    },
    // 11点击确定
    yesbtn (aa) {
      this.addRoleDialogFormVisible = false
      // 11进行效应
      this.$refs[aa].validate(isOk => {
        // 11.添加角色
        addsole({ roleName: this.addUser.username, roleDesc: this.addUser.miaoshu })
        // 清空
          .then(res => {
            if (res.data.meta.status === 201) {
              this.$message(res.data.meta.msg)
              this.addUser = {}
              // 11刷新
              this.init3()
            } else {
              this.error(res.data.meta.msg)
            }
          })
      })
    },
    // 11点击取消
    quxiao () {
      this.addUser = {}
      this.addRoleDialogFormVisible = false
    },
    // 11点击x和外部取消
    handleClose () {
      this.addUser = {}
      this.addRoleDialogFormVisible = false
    },
    // 12.点击删除按钮
    Delclick (id) {
      // 12.弹框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 12.删除请求
        delroleId(id)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.init3()
              this.$message(res.data.meta.msg)
            } else {
              this.error(res.data.meta.msg)
            }
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 13点击编辑角色
    editRole (row) {
      // 赋值填充
      this.editUser.username = row.roleName
      this.editUser.miaoshu = row.roleDesc
      this.editUser.id = row.id
      this.editRoleDialogFormVisible = true
    },
    // 13点击确定按钮发请求
    editdata (aa) {
      this.editRoleDialogFormVisible = false
      this.$refs[aa].validate(isEdit => {
        // 发请求
        editrole(this.editUser.id, { roleName: this.editUser.username, roleDesc: this.editUser.miaoshu })
          .then(res => {
            if (res.data.meta.status === 200) {
              this.init3()
              this.$message(res.data.meta.msg)
            } else {
              this.error(res.data.meta.msg)
            }
          })
      })
    },
    // 13.点击删除按钮
    handleClose1 () {
      this.editRoleDialogFormVisible = false
    },
    // 13点击取消
    quxiao1 () {
      this.addUser = {}
      this.addRoleDialogFormVisible = false
      this.editRoleDialogFormVisible = false
    },
    // 14.点击授权
    getRole (row) {
      this.getRoleDialogFormVisible = true
      console.log(row)
      // 15.将角色id存储起来,给下面的请求使用
      this.atID = row.id
      // 14先清空数组
      this.checkedId.length = 0
      // 14.通过row获取当前行的默认节点,用来展示展示页面
      // 14通过三层遍历获取到最后的节点
      row.children.forEach(firItem => {
        if (firItem.children && firItem.children.length > 0) {
          firItem.children.forEach(strItem => {
            if (strItem.children && strItem.children.length > 0) {
              strItem.children.forEach(arrItem => {
                // 获取到最后的节点,最佳到数组
                this.checkedId.push(arrItem.id)
              })
            }
          })
        }
      })
      // 14.点击授权,发请求
      rolesList('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.getRolisList = res.data.data
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    // 15.点击确定
    rolebtn () {
      this.getRoleDialogFormVisible = false
      // 通过这个获取到权限id
      let qID = this.$refs.tree.getCheckedKeys()
      // 转成字符串
      let tID = qID.join(',')
      // 15.请求授权,需要角色id(通过上面的row)和权限id
      getroledata(this.atID, { rids: tID })
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message(res.data.meta.msg)
            this.init3()
          } else {
            this.error(res.data.meta.msg)
          }
        })
    },
    quxiao3 () {
      this.getRoleDialogFormVisible = false
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
  .tree-box{
    height: 300px;
    overflow: auto;
  }
</style>
