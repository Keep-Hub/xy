<template>
    <div id="Logon">
        <div style="padding: 0 1rem; margin-bottom: 2rem">
            <h2>登录</h2>
            <span style="font-size: 0.7rem; color: #666666">请使用讯印网账号进行登录，如果您还没有账号，请先注册。</span>
        </div>
        <div style="padding-right: 1rem">
            <!-- 手机号码 -->
            <van-field v-model="tel" type="tel" placeholder="请输入手机号码" maxlength="11" clearable :error-message="error.errorTel" @blur="telPhone()"/>
            <!-- 输入密码 -->
            <van-field v-model="password" type="password" placeholder="请输入密码" maxlength="16" clearable :error-message="error.errorPwd" @blur="pwd()"/>
            <van-checkbox checked-color="#61b5fb" shape="square" v-model="checkedPact" style="margin: 1rem 0 0 1rem"><span style="font-size: 0.9rem">是否记住密码，下次可自动登录</span></van-checkbox>
            <router-link to="forgetPwd"><p style="float: right; color: #37a4ff; font-size: 0.95rem; margin-top: 1rem;width: 5rem">忘记密码？</p></router-link>
        </div>
        <div style="width: auto; padding: 0 1rem">
            <van-button color="#37a4ff" style="width: 100%; margin: 1rem 0; border-radius: .28rem; font-size: 1.09rem" @click="nowLogon()">立即登录</van-button>
            <van-button to="/Register" plain  style="width: 100%;border-radius: .28rem; color: #666666">注册账号</van-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Logon',
  data () {
    return {
      tel: '',
      password: '',
      checkedPact: false,
      error: {
        errorTel: '',
        errorPwd: ''
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    telPhone () {
      if (this.tel.length === 11 && this.$common.telReg(this.tel) === true) {
        this.error.errorTel = ''
      } else {
        if (this.tel === '') {
          this.error.errorTel = ''
        } else {
          this.error.errorTel = '请输入正确的手机号码'
        }
      }
    },
    pwd () {
      if (this.password.length >= 6 && this.$common.pwdReg(this.password) === true) {
        this.error.errorPwd = ''
      } else {
        if (this.password === '') {
          this.error.errorPwd = ''
        } else {
          this.error.errorPwd = '请输入6-16位的密码'
        }
      }
    },
    nowLogon () {
      if (this.$common.telReg(this.tel) && this.$common.pwdReg(this.password)) {
        this.$http.post('api/XYport/logon.php', {
          tel: this.tel,
          // pwd: this.$md5(this.password + '@**cszacf')
          pwd: this.password
        }).then(response => {
          let code = response.data.code
          if (code === 1) {
            this.$notify(
              {
                message: '登录成功!',
                type: 'primary',
                duration: 1500
              }
            )
            console.log('成功')
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('userInfo', JSON.stringify(response.data.user_id))
            if (this.$route.query.redirect) {
              if (this.$route.query.redirect === '/Logon') {
                this.$router.push('/Mines')
              } else {
                this.$router.push(this.$route.query.redirect)
              }
            } else {
              this.$router.push('/Mines')
            }
          } else {
            console.log('失败')
            this.$notify(
              {
                message: '登录失败!请检查账号和密码是否正确',
                type: 'danger',
                duration: 1800
              }
            )
          }
        }, response => {
        })
      } else if (this.tel === '') {
        this.error.errorTel = '请输入手机号码'
      } else if (this.password === '') {
        this.error.errorPwd = '请输入密码'
      }
    }
  }
}
</script>

<style scoped>
    #Logon{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        padding: 1.5rem 0;
    }
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
</style>
