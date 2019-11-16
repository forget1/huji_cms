<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">户籍管理系统</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="{ path: $route.path }">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img :src="adminPic" class="avator">
      <span>{{adminName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">户籍管理系统</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adminPic: require('../assets/admin.png'),
      adminName: ''
    }
  },
  created () {
    this.adminName = sessionStorage.getItem('user')
  },
  methods: {
    handleCommand (command) {
      if (command === 'home') {
        this.$router.push('/main')
      } else if (command === 'signout') {
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }
    }
  }
}
</script>

<style scoped>
  .header_container {
    background-color: #eff2f7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }
  .avator {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
  .el-dropdown{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 37px;
  }
</style>
