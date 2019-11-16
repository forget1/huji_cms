<template>
  <div>
    <head-top></head-top>
    <el-button type="primary" class="download-btn" @click="download" :loading="download_loading" icon="el-icon-printer">{{download_txt}}</el-button>
  </div>
</template>

<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      download_loading: false,
      download_txt: '点击下载'
    }
  },
  components: {
    headTop
  },
  methods: {
    download () {
      this.download_loading = true
      this.download_txt = '下载中...'
      setTimeout(() => {
        this.download_loading = false
        this.download_txt = '点击下载'
        this.$message({
          type: 'success',
          message: '下载成功'
        })
      }, 3000)
    }
  }
}
</script>

<style scoped>
  .download-btn {
    margin-top: 30px;
    margin-left: 30px;
  }
</style>
