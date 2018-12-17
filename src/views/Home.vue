<template>
  <div>
    222
    <div class="mt-15">1111</div>
  </div>
</template>
<script>
import { getUser } from '@/api'
// 注意export default是一定要是使用
export default {
  mounted () {
    getUser({ query: '', pagenum: 1, pagesize: 1 })
      .then(res => {
        console.log(res)
      })
  }
}
</script>
