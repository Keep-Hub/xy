<template>
    <div id="AccountInfo">
       <div style="width: 100%; height: 8rem; background-color: white"></div>
       <div style="height: 8rem; background-color: white; margin-top: .5rem;padding-right: 1rem">
           <van-field
                   v-model="tel"
                   label="手机号码"
                   input-align="right"
                   readonly
                   label-align
           />
           <van-field
                   v-model="realName"
                   label="真实姓名"
                   placeholder="请输入您的真实姓名"
                   input-align="right"
                   @blur="_realName()"
           />
           <van-field
               v-model="nickName"
               label="昵称"
               readonly
               input-align="right"
       />
           <van-field
               v-model="mailbox"
               label="邮箱"
               placeholder="请输入您的邮箱"
               input-align="right"
               @blur="_email()"
       />
           <div style="width: auto; padding: 0 1rem">
               <van-button color="#61b5fb" style="width: 100%; margin-top: 2rem; border-radius: 1.5rem;" @click="confirmRevision()">确认修改</van-button>
               <van-button color="#61b5fb" style="width: 100%; margin: 1rem 0; border-radius: 1.5rem;" @click="Logout()">退出登录</van-button>
           </div>
       </div>
    </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data () {
    return {
      userInfo1: '',
      tel: '',
      realName: '',
      nickName: '',
      mailbox: ''
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path === '/AccountInfo') {
        this.init()
      }
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tel = JSON.parse(sessionStorage.getItem('userInfo')).user_tel
      this.nickName = JSON.parse(sessionStorage.getItem('userInfo')).user_nickname
    },
    _realName () {
      console.log(this.$common.realNameReg(this.realName))
      if (this.$common.realNameReg(this.realName) !== true && this.realName !== '') {
        this.$dialog.alert({
          title: '提示',
          message: '名字输入有误'
        }).then(() => {
        })
      }
    },
    _email () {
      console.log(this.$common.emailReg(this.mailbox))
      if (this.$common.emailReg(this.mailbox) !== true && this.mailbox !== '') {
        this.$dialog.alert({
          title: '提示',
          message: '邮箱格式不正确'
        }).then(() => {
        })
      }
    },
    confirmRevision () {
      if (this.$common.realNameReg(this.realName) === true && this.$common.emailReg(this.mailbox) === true) {
        this.$dialog.alert({
          title: '提示',
          message: '修改成功'
        }).then(() => {
          this.$router.push('/Mines')
        })
      } else if (this.realName === '') {
        this.$dialog.alert({
          title: '提示',
          message: '请输入名字'
        }).then(() => {
        })
      } else if (this.mailbox === '') {
        this.$dialog.alert({
          title: '提示',
          message: '请输入邮箱'
        }).then(() => {
        })
      } else {
        this.$dialog.alert({
          title: '提示',
          message: '请确认输入的名字和邮箱是否正确！'
        }).then(() => {
        })
      }
    },
    Logout () {
      sessionStorage.clear()
      this.$dialog.alert({
        title: '提示',
        message: '退出成功'
      }).then(() => {
        this.$router.push('/Mines')
      })
    }
  }
}
</script>

<style scoped>
    #AccountInfo{
        background: #f7f7f7;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        text-align: center;
    }
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .van-field__label {
        text-align: left;
    }
</style>
