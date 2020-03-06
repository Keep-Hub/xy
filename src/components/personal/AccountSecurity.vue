<template>
    <div id="AccountSecurity">
        <div class="pwd-tab">
            <van-tabs v-model="active" swipeable :swipe-threshold="6" color="#22b8ea" line-height="2px" sticky >
                <van-tab title="修改登录密码">
                    <div style="padding: 2rem 1rem">
                        <van-field
                                v-model="tel"
                                label="手机号码:"
                                readonly
                                :border="false"
                                style="margin-bottom: 1rem"
                        />
                        <van-field
                                v-model="oldPwd"
                                placeholder="请输入原密码"
                                :border="false"
                                style="margin-bottom: 1rem"
                                @blur="_oldPwd()"
                        />
                        <van-field
                                v-model="newPwd"
                                placeholder="请输入新密码"
                                :border="false"
                                style="margin-bottom: 1rem"
                                @blur="_newPwd()"
                        />
                        <van-field
                                v-model="newPwd1"
                                placeholder="请再次输入新密码"
                                :border="false"
                                style="margin-bottom: 1rem"
                                @blur="_confirmNewPwd()"
                        />
                        <van-button color="#61b5fb" style="width: 100%; margin: 1rem 0; border-radius: .28rem; font-size: 1.09rem" @click="confirmRevise()">确认修改</van-button>
                    </div>
                </van-tab>
                <van-tab title="修改支付密码">
                    <div style="padding: 2rem 0">
                        <van-password-input
                                :value="payPwd"
                                :error-info="errorInfo"
                                :focused="showKeyboard === 'payPwd'"
                                @focus="showKeyboard = 'payPwd'"
                                info="请输入 6 位数字的密码"
                        />
                        <van-password-input
                                :value="payPwd1"
                                :error-info="errorInfo1"
                                :focused="showKeyboard === 'payPwd1'"
                                @focus="showKeyboard = 'payPwd1'"
                                info="请再次输入 6 位数字的密码"
                        />
                        <!-- 数字键盘 -->
                        <van-number-keyboard
                                :show="!!showKeyboard"
                                @input="onInput"
                                @delete="onDelete"
                                @blur="showKeyboard = ''"
                        />
                        <div style="padding: 0 1rem">
                            <van-button color="#61b5fb" style="width: 100%; margin: 1rem 0; border-radius: .28rem; font-size: 1.09rem" @click="setPayPwd()">设置</van-button>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AccountSecurity',
  data () {
    return {
      active: 0,
      tel: '13800138000',
      oldPwd: '',
      newPwd: '',
      newPwd1: '',
      payPwd: '',
      payPwd1: '',
      showKeyboard: false,
      errorInfo: '',
      errorInfo1: ''
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    _oldPwd () {},
    _newPwd () {},
    _confirmNewPwd () {},
    confirmRevise () {},
    setPayPwd () {},
    onInput (key) {
      const { showKeyboard } = this
      this[showKeyboard] = (this[showKeyboard] + key).slice(0, 6)
    },
    onDelete () {
      const { showKeyboard } = this
      this[showKeyboard] = this[showKeyboard].slice(0, this[showKeyboard].length - 1)
    }
  }
}
</script>

<style scoped>
    #AccountSecurity{
        background: #f7f7f7;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        position: absolute;
        text-align: center;
    }
</style>
<style lang="less">
   .van-tab--active {
        color: #22b8ea;
        font-weight: 500;
        font-size: 0.94rem;
    }
    .van-password-input__info{
        margin: 1rem 0;
    }
</style>
