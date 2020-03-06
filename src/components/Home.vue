<template>
    <div id="Home">
        <div id="Home_title">
            <van-sticky>
            <van-row type="flex" style="background-color: white">
                <van-col span="6" class="logo">
                    <img src="./../assets/xylogo.png" alt="">
                </van-col>
                <van-col span="18">
                    <div class="search" @click="search">
                        面料 / 款式 / 商品名称
                        <img @click.stop="searchCamera" class="search-img" src="./../assets/camera.png" alt="">
                    </div>
                </van-col>
            </van-row>
            </van-sticky>
            <div id="banner">
                <van-swipe :autoplay="3000" :duration="1000" @change="onChange2">
                    <van-swipe-item v-for="(image, index) in list" :key="index">
                        <van-image  style="width: 100%;" :src="image.imgSrc" alt=""></van-image>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div id="clothes">
                <van-grid :border="false" :column-num="4">
                    <van-grid-item v-for="(i, index) in clothes" :key="index" @click="toClassify(index)">
                        <div style="width: 3.2rem; height: 3.2rem; margin: 0 auto">
                            <img width="100%" :src="i.img" alt="">
                        </div>
                        <p style="font-size: 0.8rem;color: #515151; margin: 0.3rem 0">{{i.msg}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div id="Class_clothes">
            <h4>班服系列</h4>
            <van-grid :border="false" :column-num="3" :gutter="15">
                <van-grid-item v-for="(i, index) in classClothes" :key="index">
                    <div @click="commodityDetails(i.Id, i.Category_ID)">
                        <div class="pro-img">
                            <img width="100%" :src="i.Img" alt="">
                        </div>
                        <div>
                            <p class="optional-col"><span style="align-self: center">{{i.Optional_Color}}色可选</span></p>
                            <p class="ov-hid">{{i.Title}}</p>
                            <p class="price">￥{{i.Price}}</p>
                        </div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <div id="Work_clothes">
            <h4>工作服系列</h4>
            <van-grid :border="false" :column-num="3" :gutter="15">
                <van-grid-item v-for="(i, index) in WorkClothes" :key="index">
                    <div @click="commodityDetails(i.Id, i.Category_ID)">
                        <div class="pro-img">
                            <img width="100%" :src="i.Img" alt="">
                        </div>
                        <div>
                            <p class="optional-col">{{i.Optional_Color}}色可选</p>
                            <p class="ov-hid">{{i.Title}}</p>
                            <p class="price">￥{{i.Price}}</p>
                        </div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <div id="Home_footer">
            <van-divider :style="{ borderColor: '#D4D4D4', padding: '0 1rem' }">
                <img src="../assets/xylogo-min.png" alt=""  style="width: 6.25rem; " >
            </van-divider>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 1,
      current: 0,
      list: '',
      clothes: '',
      classClothes: '',
      WorkClothes: ''
      // SportsSeries: '',
      // ActivitySeries: '',
      // OutdoorSeries: ''
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    this.$http.get('../../static/database/package.json').then(response => {
      for (let i = 0; i < response.data.result.banner.length; i++) {
        this.list = response.data.result.banner
        this.clothes = response.data.result.clothes
        this.classClothes = response.data.result.classClothes
        this.WorkClothes = response.data.result.WorkClothes
        // this.SportsSeries = response.data.result.SportsSeries
        // this.ActivitySeries = response.data.result.ActivitySeries
        // this.OutdoorSeries = response.data.result.OutdoorSeries
      }
    })
  },
  methods: {
    search () {
      this.$router.push({path: '/Search'})
    },
    searchCamera () {
      alert('searchCamera')
    },
    onChange2 (index) {
      this.current = index
    },
    toClassify (Id) {
      this.$router.push({
        path: '/Classify',
        query: {
          id: Id
        }})
    },
    commodityDetails (Id, proId) {
      this.$router.push({
        path: '/Commodity',
        query: {
          id: Id,
          proId: proId
        }})
    }
  }
}
</script>

<style lang="less">
    @import './style/home_less';
    *{
        margin: 0;
        padding: 0;
    }
    #Home{
        background: #f9f9f9;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        text-align: center;
    }
    #Home_title{
        background-color: white;
        padding-bottom: 0.95rem;
    }
    .logo{
        height: 2.2rem;
    }
    .logo img{
        height: 2.2rem;
        margin: 0.125rem 0 0 0.315rem;
    }
    .search{
        width: auto;
        height: 1.56rem;
        margin: 0.315rem 0.5rem 0 0.75rem;
        border: 1px solid #22b8ea;
        position: relative;
        text-align: left;
        text-indent: 1em;
        font-size: 0.875rem;
        line-height: 1.56rem;
        color: #7b7b7b;
    }
    .search > img{
        position: absolute;
        width: 1.25rem;
        height: 1rem;
        top: 0.25rem;
        right: 0.75rem;
    }
    #banner{
        margin: .8rem 0;
    }
    // 轮播图修改的样式
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
    .van-grid-item__content{
        padding: 0;
    }
    #Class_clothes,#Work_clothes,#Sports_series,#Activity_series,#Outdoor_series{
        margin-top: .5rem;
        padding: .5rem 0;
        background-color: white;
    }
    h4{
        padding: .5rem .8rem;
        text-align: left;
    }
    .pro-img{
        width: 4.8rem;
        height: 4.8rem;
        margin: 0.5rem auto;
    }
    .optional-col{
        height: 0.8rem;
        font-size: 0.58rem;
        position: absolute;
        top: 0;
        right: .5rem;
        color: #b6a482;
        border: 1px solid #b6a482;
        border-radius: .26rem;
        padding: 0  .2rem;
        background-color: white;
        display: flex;
    }
    .ov-hid{
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 2;
        margin: 0 auto;
        padding: 0 0.3rem;
        font-size: 0.78rem;
        color: #5a5a5a
    }
    .price{
        font-size: 0.78rem;
        text-align: left;
        color: red;
        padding: 0 0.3rem;
        margin: .5rem 0 0 0;
    }
    #Home_footer{
        width: 100%;
        height: 6.375rem;
    }
</style>
