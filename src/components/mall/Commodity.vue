<template>
    <div id="Commodity">
        <div class="good_info">
            <van-swipe :autoplay="3000" :duration="1000" ref="swiper">
                <van-swipe-item v-for="(image, index) in goodsInfo" :key="index">
                    <van-image width="100%" @click="showImagePreview(index)"  :src="image.img" alt=""></van-image>
                </van-swipe-item>
            </van-swipe>
            <div v-for="(c , index) in goodsInfo.slice(0, 1)" :key="index" style="text-align: left;">
                <div style="padding: 0 20px">
                    <p>{{c.styleId}}#{{c.styleName}}</p>
                    <p style="font-size: 0.88rem; margin: 10px 0">{{c.styleId}}</p>
                </div>
                <van-row class="price_info">
                    <van-col span="12" class="price">￥{{c.price}}</van-col>
                    <van-col span="12">
                        <van-row  style="text-align: center;">
                            <van-col span="9">
                                <van-icon name="newspaper-o" size="1.6rem"/>
                                <p>生成海报</p>
                            </van-col>
                            <van-col span="9">
                                <van-icon name="photo-o" size="1.6rem"/>
                                <p>下载图片</p>
                            </van-col>
                            <van-col span="6" @click="clickIcon()">
                                <van-icon v-if="iconLike" name="like-o" size="1.6rem"/>
                                <van-icon v-else name="like" size="1.6rem"  color="red"/>
                                <p>收藏</p>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <div class="warehouse">
                    <p>仓库:{{c.wareHouse}}</p>
                    <p style="color: red;">截止时间:{{c.deadline}}</p>
                </div>
            </div>
        </div>
        <div class="parameter">
            <ul>
                <li style="font-size: 1rem;">商品参数</li>
                <li>
                    <span>面料</span>
                    <span>陶瓷桑蚕丝</span>
                </li>
                <li>
                    <span>成分</span>
                    <span>80%棉 20%陶瓷桑蚕丝</span>
                </li>
                <li>
                    <span>克重</span>
                    <span>190g</span>
                </li>
            </ul>
        </div>
        <div class="product_details">
            <p>商品详情</p>
            <img width="100%" v-for="(img, index) in goodsDetails" :key="index" v-lazy="img.detailsImg" >
        </div>
        <div class="add-goods">
            <van-goods-action>
                <van-goods-action-icon icon="wap-home-o" to="/Home" text="首页"/>
                <van-goods-action-icon icon="cart-o" to="/ShoppingCart" text="购物车" info="5"/>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-button type="warning" to="/ShoppingCart" text="加入购物车" />
                <van-goods-action-button color="#15a0ff" text="立即购买" @click="buyNow()"/>
            </van-goods-action>
        </div>
    </div>
</template>

<script>
import {ImagePreview} from 'vant'
const images = []
export default {
  name: 'Commodity',
  inject: ['reload'],
  data () {
    return {
      goodsInfo: [],
      images,
      newValue: this.$route.query.categoryid,
      iconLike: true,
      goodsDetails: []
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.reload()
      if (to.path === '/Commodity') {
        this.$router.go(0)
        this.newValue = this.$route.query.categoryid
        this.init(this.newValue)
      } else {
      }
    }
  },
  created () {
    this.init(this.newValue)
  },
  mounted () {
  },
  updated () {
    this.update()
  },
  methods: {
    init (e) {
      this.$http.get('../../static/database/tsconfig.json').then(response => {
        let info = e.replace(/\s*/g, '')
        this.goodsInfo = response.data.result[info]
        this.goodsDetails = response.data.result[info + 'Details']
      })
    },
    showImagePreview (position, timer) { // 图片展示方法
      const instance = ImagePreview({
        images,
        lazyLoad: true,
        swipeDuration: 300,
        asyncClose: !!timer,
        closeOnPopstate: true,
        startPosition: typeof position === 'number' ? position : 0
      })
      if (timer) {
        setTimeout(() => {
          instance.close()
        }, timer)
      }
    },
    update () {
      for (let i = 0; i < this.goodsInfo.length; i++) {
        if (this.images.length + 1 <= this.goodsInfo.length) {
          this.images.push(this.goodsInfo[i].img)
        }
      }
    },
    clickIcon () { // 点击改变收藏状态
      this.iconLike = !this.iconLike
    },
    buyNow () {
      this.$router.push({
        path: '/BuyNow',
        query: {
          id: 1,
          categoryid: this.goodsInfo[0].styleId,
          activeimg: this.goodsInfo[0].img
        }})
    }
  },
  destroy () {
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  beforeRouteEnter (to, from, next) {
    next()
  }
}
</script>
<style lang="less">
    .van-swipe__indicator {
        width: 0.45rem;
        height: 0.48rem;
        background-color: #d0cdd1;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        opacity: .5;
        -webkit-transition: opacity .2s;
        transition: opacity .2s;
    }
    .van-swipe__indicator--active {
        background-color: #000100!important;
        opacity: 0.6;
    }
</style>
<style lang="less" scoped>
*{
    padding: 0;
    margin: 0;
}
#Commodity{
    background: #f8f8f8;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
}
.good_info{
    background-color: white;
}
.price_info{
    padding: 5px 20px;
    font-size: 1.2rem
}
.price_info p{
    font-size: 0.68rem;
}
.price{
    border-right: 1px solid #eaeaea;
    color: red;
    line-height: 50px;
    font-size: 1.4rem;
}
.warehouse > p{
    border-top: 1px solid #eaeaea;
    padding: 15px 20px;
    font-size: 12px;
}
.parameter{
    background-color: white;
    margin-top: 10px;
    padding: 0 20px;
}
.parameter > ul > li{
     padding: 10px 0;
     font-size: 14px;
     border-bottom: 1px dashed #eaeaea;
}
.parameter > ul > li >span:first-child{
    color: #5c5c5c;
    padding-right: 60px;
}
.product_details{
    background-color: white;
    padding-bottom: 50px;
}
    .product_details p{
        font-size: 1rem;
        padding: 20px 0 50px 15px;
    }
</style>
