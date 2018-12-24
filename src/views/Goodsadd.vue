<template>
  <div>
         <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!--  -->
    <template>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
      <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="third1">
      <!-- 上传图片 -->
      <!-- 内部封装了ajax,请求时没有被拦截器设置请求头,需要自己设置 -->
      <!-- headers 是设置请求头的对象属性 -->
      <el-upload
        action="http://localhost:8888/api/private/v1/upload"
        :headers="headers"
        :before-upload="headleUpload"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
        </el-tab-pane>
      <el-tab-pane label="商品内容" name="fourth">
        <!--  -->
         <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
    </el-tabs>
</template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first',
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      headers: {
        Authorization: localStorage.getItem('mytoken')
      },
      content: null,
      editorOption: {}

    }
  },
  methods: {
    handleClick (tab, event) {
      this.active = parseInt(tab.index)
    },
    // 文件中已上传函数
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    // 文件移除的函数
    handlePreview (file) {
      // console.log(file)
    },
    // 上传成功之前的函数
    headleUpload (file) {
      // console.log('file: ', file.size)
      // 判断图片大小
      if (file.size > 60000) {
        this.$message('图片不得大于58k')
        return false
      } else {
      }
    },
    // 文件上传成功的函数
    handleSuccess (response, file, fileList) {
      // console.log('response: ', response)
      if (response.meta.status === 200) {
        this.$message(response.meta.msg)
      } else {
        this.$message(response.meta.msg)
      }
    },
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
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
  .add-goods {
  .el-tabs {
    height: 400px;
  }
}
.quill-editor {
  height: 400px;
  .ql-container {
    height: 300px;
  }
}
</style>
