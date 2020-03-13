<template>
    <div id="forgetPwd">
        <div>
            <h2 style="padding: 0 1rem; margin-bottom: 2rem">忘记密码</h2>
        </div>
        <div style="padding-right: 1rem">
            <!-- 手机号码 -->
            <van-field v-model="tel" type="tel" placeholder="请输入手机号码" maxlength="11" clearable/>
            <!-- 请输入验证码 -->
            <van-field v-model="code" placeholder="请输入验证码" clearable>
                <van-button style="border-radius: .28rem; " slot="button" size="small" color="#37a4ff">获取验证码</van-button>
            </van-field>
            <!-- 输入密码 -->
            <van-field v-model="password" type="password" placeholder="请输入密码" clearable/>
            <!-- 确认密码 -->
            <van-field v-model="confirmPwd" type="password" placeholder="再次确认密码" clearable/>
        </div>
        <div style="width: auto; padding: 0 1rem">
            <van-button color="#37a4ff" style="width: 100%; margin: 1rem 0; border-radius: .28rem; font-size: 1.09rem">重置密码</van-button>
            <van-button to="/Logon" plain  style="width: 100%;border-radius: .28rem; color: #37a4ff">知道密码，返回登录</van-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'forgetPwd',
  data () {
    return {
      tel: '',
      password: '',
      confirmPwd: '',
      code: ''
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
    #forgetPwd{
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
