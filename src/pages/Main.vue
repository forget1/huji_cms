<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%;background-color: #324057">
        <el-menu style="min-height: 100%;" :default-active="defaultActive" background-color="#324057" text-color="#bfcbd9" active-text-color="#20a0ff" router>
          <el-menu-item index="hujiList"><i class="el-icon-document"></i>户籍列表</el-menu-item>
          <el-menu-item index="importData"><i class="el-icon-plus"></i>数据导入</el-menu-item>
          <el-menu-item index="dataExport"><i class="el-icon-printer"></i>数据导出</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPath: ''
    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>

</style>
