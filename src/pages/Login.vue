<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_container" v-show="loginAni">
        <div class="manage_tip">
          <p>后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')" :loading="loading_submit">{{submit_text}}</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loginAni: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading_submit: false,
      submit_text: '登录'
    }
  },
  mounted () {
    this.loginAni = true
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        this.loading_submit = true
        this.submit_text = '登录中'
        setTimeout(() => {
          this.loading_submit = false
          this.submit_text = '登录'
          if (valid) {
            if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin') {
              console.log('登录成功')
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              sessionStorage.setItem('user', this.loginForm.username)
              this.$router.push({ path: '/main' })
            } else {
              this.$message({
                type: 'error',
                message: '请输入正确的用户名密码'
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '登录失败'
            })
            return false
          }
        }, 2000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_page {
    background-color: #324057;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
  }
  .manage_tip p {
    font-size: 32px;
    color: #fff;
  }
  .form_container {
    width: 320px;
    height: 210px;
    position: absolute;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
  }
  .form_container .submit_btn {
    width: 100%;
    font-size: 16px;
  }
  /* 加载动画 */
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
