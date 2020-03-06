<template>
    <div id="Mines">
        <div class="personal-title">
            <div v-if="logonBtn" style="height: 4rem; display: flex">
                <div style="margin-left: 2.6rem;align-self: center" class="user-data">
                    <p class="user-name">您好！</p>
                    <p class="signature">请先登录讯印网账号</p>
                </div>
                <router-link to='/Logon' style="width: 3.5rem;height:2rem;border: 1px solid #ffffff;line-height: 2rem; text-align: center;align-self: center; margin-left: 6rem; color: white; font-size: 0.94rem">
                    登录
                </router-link>
            </div>
            <van-row v-else style="display: flex">
                <van-col span="16" class="clear_fix" style="align-self: center; display: flex">
                    <img class="user-img" src="../assets/timg.jpg" alt="">
                    <div style="" class="user-data">
                        <p class="user-name">{{userInfo1.user_nickname}}</p>
                        <p class="signature">祝你开心每一天</p>
                    </div>
                </van-col>
                <van-col span="8" style="align-self: center;">
                    <p style="color: #c6e4fe; margin-bottom: .2rem">余额</p>
                    <p style="color: #dff1ff">￥800000000</p>
                </van-col>
            </van-row>
        </div>
        <div>
            <van-cell title="全部订单" is-link value="查看全部订单" @click="orderStatus()" />
            <van-row type="flex" justify="center" class="order-status">
                <van-col v-for="(icon, index) in this.icons" :key="index"  span="5" style="padding: 0.8rem 0" @click="orderStatus(index + 1)">
                    <van-icon :name="icon.iconImg" color="#61b5fb" size="1.8rem" />
                    <p>{{icon.title}}</p>
                </van-col>
            </van-row>
        </div>
        <div class="user-info">
            <van-grid :column-num="3" :border="false">
                <van-grid-item
                        v-for="(icon2, index) in orderIcons"
                        :key="index"
                        class="users"
                        @click="userInfo(index)"
                >
                    <div style="display: flex; font-size: 0.9rem">
                        <van-icon style="align-self: center" :name="icon2.iconImg" color="#61b5fb" size="1.4rem" />
                        <span style="align-self: center" >&nbsp;{{icon2.title}}</span>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <div style="width: 100%;background-color: white">
            <div class="clear_fix" style="height: 1.3rem;width: 6rem;margin: 0 auto; padding: 1rem 0">
                <img style="width: 1.3rem; height: 1.3rem; float: left" src="./../assets/zan.png" alt="">
                <span style="float: left;font-size: 0.94rem; line-height: 1.3rem; margin-left: .3rem" >为您推荐</span>
            </div>
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="(i, index) in recommend.slice(2, 8)" :key="index">
                    <div style="margin-bottom: .3rem">
                        <div class="pro-img">
                            <img width="100%" :src="i.Img" alt="">
                        </div>
                        <div>
                            <p class="ov-hid">{{i.Title}}</p>
                            <p class="price">￥{{i.Price}}</p>
                        </div>
                    </div>
                </van-grid-item>
            </van-grid>
            <!--<van-uploader
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    v-model="fileList"
                    multiple
                    :max-count="1"
            />-->
        </div>
        <div class="footer">
            <van-divider :style="{ borderColor: '#D4D4D4', padding: '0 1rem' }">
                <img src="../assets/xylogo-min.png" alt=""  style="width: 6.25rem; " >
            </van-divider>
        </div>
    </div>
</template>

<script>
import upLoaderImg from '../globalmethod/upLoaderImg'
export default {
  name: 'Mines',
  data () {
    return {
      loop: 0,
      icons: [
        {
          title: '已接单',
          iconImg: 'paid'
        },
        {
          title: '配货中',
          iconImg: 'balance-list-o'
        },
        {
          title: '待发货',
          iconImg: 'logistics'
        },
        {
          title: '待收货',
          iconImg: 'todo-list-o'
        },
        {
          title: '已收货',
          iconImg: 'records'
        }
      ],
      orderIcons: [
        {
          title: '账号信息',
          iconImg: 'user-circle-o'
        },
        {
          title: '账号安全',
          iconImg: 'completed'
        },
        {
          title: '地址管理',
          iconImg: 'location-o'
        },
        {
          title: '资金流水',
          iconImg: 'balance-o'
        },
        {
          title: '售后记录',
          iconImg: 'refund-o'
        },
        {
          title: '我的收藏',
          iconImg: 'like-o'
        }
      ],
      fileList: [],
      recommend: [],
      logonBtn: false,
      userInfo1: []
    }
  },
  components: {},
  inject: ['reload'],
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.init()
    }
  },
  created () {
  },
  mounted () {
    this.$http.get('../../static/database/package.json').then(response => {
      this.recommend = response.data.result.classClothes
    })
    this.init()
  },
  methods: {
    init () {
      !sessionStorage.getItem('userInfo') ? this.logonBtn = true : this.logonBtn = false
      this.userInfo1 = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    start () {
      clearTimeout(this.loop)// 再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        alert('长按了')
      }, 1000)
    },
    end () {
      clearTimeout(this.loop) // 清空定时器，防止重复注册定时器
      alert('end' + this.loop)
    },
    orderStatus (index) {
      if (!sessionStorage.getItem('token')) {
        this.$dialog.confirm({
          title: '提示',
          message: '请先登录'
        }).then(() => {
          this.$router.push({
            path: '/Order',
            query: {
              id: index
            }})
        }).catch(() => {
          // on cancel
        })
      } else {
        this.$router.push({
          path: '/Order',
          query: {
            id: index
          }})
      }
    },
    userInfo (index) {
      if (!sessionStorage.getItem('token')) {
        this.$dialog.confirm({
          title: '提示',
          message: '请先登录'
        }).then(() => {
          if (index === 0) {
            this.$router.push('/AccountInfo')
          } else if (index === 1) {
            this.$router.push('/AccountSecurity')
          } else if (index === 2) {
            this.$router.push('/Address')
          } else if (index === 3) {
            this.$router.push('/CapitalFlow')
          } else if (index === 4) {
            this.$router.push('/PostSale')
          } else if (index === 5) {
            this.$router.push('/MyCollection')
          }
        }).catch(() => {
          // on cancel
        })
      } else {
        if (index === 0) {
          this.$router.push('/AccountInfo')
        } else if (index === 1) {
          this.$router.push('/AccountSecurity')
        } else if (index === 2) {
          this.$router.push('/Address')
        } else if (index === 3) {
          this.$router.push('/CapitalFlow')
        } else if (index === 4) {
          this.$router.push('/PostSale')
        } else if (index === 5) {
          this.$router.push('/MyCollection')
        }
      }
    },
    beforeRead (file) { // 上传之前校验
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.Toast('只允许上传jpg/png格式的图片！')
        return false
      }
      return true
    },
    async afterRead (file) { // 文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(file.file)// 使用上传的方法。file.file
      console.log(uploadImg)
    }
  }
}
</script>

<style scoped>
#Mines{
    background: #f7f7f7;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
}
.pro-img{
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
}
.ov-hid{
    width: 80%;
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
    margin: 0 auto;
}
.price{
    width: 80%;
    text-align: left;
    color: red;
    margin: .3rem auto;
}
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .personal-title{
        width: 100%;
        padding: 1rem 0;
        background-color: #61b5fb;
    }
    .user-img{
        width: 4rem;
        height: 4rem;
        float: left;
        margin-left: 1.5rem;
        border-radius: 1rem
    }
    .user-data{
        float: left;
        width: 8rem;
        align-self: center;
        margin-left: 1rem
    }
    .user-name{
        font-size: 1.0rem;
        color: white;
        margin-bottom: 0.3rem
    }
    .signature{
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 2;
        font-size: 0.8rem; color: #d3f1ff
    }
    .user-info{
        margin: 0.5rem 0; background-color: white;padding: .3rem 1rem
    }
    .users{
        margin: 0;
    }
    .users > .van-grid-item__content{
        padding: 0.5rem .5rem;
    }
    .order-status{
        text-align: center;
        background-color: white;
        font-size: 0.86rem
    }
    .footer{
        width: 100%;
        height: 6.375rem;
    }
</style>
