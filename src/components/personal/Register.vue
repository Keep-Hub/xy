<template>
    <div id="Register">
        <div>
            <h2 style="padding: 0 1rem; margin-bottom: 2rem">注册</h2>
        </div>
        <div style="padding-right: 1rem">
            <!-- 手机号码 -->
            <van-field v-model="tel" type="tel" placeholder="手机号码" maxlength="11" clearable :error-message="error.errorTel" @blur="telPhone()"/>
            <!-- 昵称 -->
            <van-field v-model="nickName" placeholder="昵称" :error-message="error.errorNick" maxlength="8" clearable/>
            <!-- QQ -->
            <van-field v-model="QQ" type="digit" placeholder="QQ" maxlength="11" clearable :error-message="error.errorQQ" @blur="qqNub()"/>
            <!-- 推荐人手机号码 -->
            <van-field v-model="referrerTel" placeholder="推荐人手机号码（选填）" :error-message="error.errorReferrer" maxlength="11" clearable @blur="refPhone()"/>
            <!-- 输入密码 -->
            <van-field v-model="password" type="password" placeholder="请输入6-16位的密码" :error-message="error.errorPwd" maxlength="16" clearable @blur="pwd()"/>
            <!-- 确认密码 -->
            <van-field v-model="confirmPwd" type="password" placeholder="确认密码" :error-message="error.errorPwd1" maxlength="16" clearable @blur="pwd1()"/>
            <!-- 请输入验证码 -->
            <van-field v-model="code" placeholder="请输入验证码" clearable :error-message="error.errorCode">
                <van-button style="border-radius: .28rem; " slot="button" size="small" color="#37a4ff">获取验证码</van-button>
            </van-field>
            <van-row style="padding: .6rem 0">
                <van-col span="3"> <van-checkbox checked-color="#61b5fb" shape="square" v-model="checkedPact" style="margin-left: 1rem"></van-checkbox></van-col>
                <van-col span="21"><span style="font-size: 0.86rem; color: #323232">已阅读并同意注册条约和退货条约</span></van-col>
            </van-row>
        </div>
       <div style="width: auto; padding: 0 1rem">
           <van-button color="#37a4ff" style="width: 100%; margin: 1rem 0; border-radius: .28rem; font-size: 1.09rem" @click="submitRegister()">注册</van-button>
           <van-button to="/Logon" plain  style="width: 100%;border-radius: .28rem; color: #666666">已有账号？</van-button>
       </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      tel: '',
      nickName: '',
      QQ: '',
      referrerTel: '',
      password: '',
      confirmPwd: '',
      code: '',
      checkedPact: false,
      error: {
        errorTel: '',
        errorNick: '',
        errorQQ: '',
        errorReferrer: '',
        errorPwd: '',
        errorPwd1: '',
        errorCode: ''
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
    qqNub () {
      if (this.QQ.length >= 5 && this.$common.qqReg(this.QQ) === true) {
        this.error.errorQQ = ''
      } else {
        if (this.QQ === '') {
          this.error.errorQQ = ''
        } else {
          this.error.errorQQ = '请输入正确的QQ号码'
        }
      }
    },
    refPhone () {
      if (this.referrerTel.length === 11 && this.$common.telReg(this.referrerTel) === true) {
        this.error.errorReferrer = ''
      } else {
        if (this.referrerTel === '') {
          this.error.errorReferrer = ''
        } else {
          this.error.errorReferrer = '请输入正确的手机号码'
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
    pwd1 () {
      if (this.confirmPwd.length >= 6 && this.$common.pwdReg(this.confirmPwd) === true) {
        this.error.errorPwd1 = ''
      } else {
        if (this.confirmPwd === '') {
          this.error.errorPwd1 = ''
        } else {
          this.error.errorPwd1 = '请输入6-16位的密码'
        }
      }
    },
    submitRegister () {
      if (this.password === this.confirmPwd && this.$common.telReg(this.tel) && this.nickName !== '' && this.$common.pwdReg(this.password) && this.$common.pwdReg(this.confirmPwd)) {
        this.$http.post('api/XYport/register.php', {
          tel: this.tel,
          nickname: this.nickName,
          qq: this.QQ,
          referrer: this.referrerTel,
          // pwd: this.$md5(this.password + '@**cszacf')
          pwd: this.password
        }).then(response => {
          if (response.data.msg === 1) {
            this.$notify(
              {
                message: '注册成功!',
                type: 'primary',
                duration: 1500
              }
            )
            this.$router.push('/Logon')
          } else {
            this.$notify(
              {
                message: '注册失败！账号已存在',
                type: 'danger',
                duration: 1500
              }
            )
          }
        })
      } else if (this.tel === '') {
        this.error.errorTel = '请输入手机号码'
      } else if (this.nickName === '') {
        this.error.errorNick = '请输入昵称'
      } else if (this.password === '') {
        this.error.errorPwd = '请输入密码'
      } else if (this.confirmPwd === '') {
        this.error.errorPwd1 = '请输入密码'
      } else if (this.confirmPwd !== this.password) {
        // this.error.errorPwd1 = '两次输入的密码不一致'
        this.$dialog.alert({
          title: '提示',
          message: '两次输入的密码不一致'
        }).then(() => {
        })
      }
    }
  }
}
</script>

<style scoped>
    #Register{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        padding: 1.5rem 0 ;
    }
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
</style>
