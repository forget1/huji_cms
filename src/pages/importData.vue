<template>
  <div>
    <head-top></head-top>
    <div class="uploadPage">
      <el-upload
        drag
        accept=".csv"
        :limit=limitNum
        :auto-upload="false"
        :action="UploadUrl()"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-remove="removeFile"
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
        <div class="el-upload__tip" slot="tip">只能上传csv文件，且不超过10M</div>
      </el-upload>
      <br/>
      <el-button type="primary" @click="uploadFile">立即上传</el-button>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      limitNum: 1,
      fileList: []
    }
  },
  components: {
    headTop
  },
  methods: {
    exceedFile (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },
    fileChange (file, fileList) {
      console.log(file.raw)
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      console.log(extension)
      console.log(size)
      if (extension !== 'csv') {
        this.$message({
          type: 'warning',
          message: '只能上传后缀是.csv的文件'
        })
        return false
      }
      if (size > 10) {
        this.$message({
          type: 'warning',
          message: '文件大小不得超过10M'
        })
        return false
      }
      this.fileList.push(file.raw)
      console.log(this.fileList)
    },
    removeFile (file, fileList) {
      this.fileList = []
    },
    handleSuccess (res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    handleError (err, file, fileList) {
      if (err) {
        this.$message.error('文件上传失败')
      }
    },
    UploadUrl: function () {
      return ''
    },
    uploadFile () {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        let form = new FormData()
        form.append('file', this.fileList)
        console.log(this.fileList[0])
        this.$message.success('文件上传成功')
      }
    }
  }
}
</script>

<style scoped>
  .uploadPage {
    margin-top: 50px;
    margin-left: 50px;
  }
</style>
