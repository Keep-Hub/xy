<template>
    <div id="Home">
        <div id="Home_title">
            <van-row type="flex">
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
                        <div style="width: 3.75rem; height: 3.75rem; margin: 0 auto">
                            <img width="100%" :src="i.img" alt="">
                        </div>
                        <p style="font-size: 12px;color: #7b7b7b">{{i.msg}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div id="Class_clothes">
            <h4>班服系列</h4>
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(i, index) in classclothes" :key="index">
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
        <div id="Work_clothes">
            <h4>工作服系列</h4>
            <van-grid :border="false" :column-num="3">
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
        <div id="Sports_series">
            <h4>运动系列</h4>
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(i, index) in SportsSeries" :key="index">
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
        <div id="Activity_series">
            <h4>活动系列</h4>
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(i, index) in ActivitySeries" :key="index">
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
        <div id="Outdoor_series">
            <h4>户外系列</h4>
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(i, index) in OutdoorSeries" :key="index">
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
            <van-divider :style="{ borderColor: '#D4D4D4', padding: '0 16px' }">
                <img src="../assets/xylogo-min.png" alt="" width="100" height="35" >
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
      classclothes: '',
      WorkClothes: '',
      SportsSeries: '',
      ActivitySeries: '',
      OutdoorSeries: ''
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
        this.classclothes = response.data.result.classclothes
        this.WorkClothes = response.data.result.WorkClothes
        this.SportsSeries = response.data.result.SportsSeries
        this.ActivitySeries = response.data.result.ActivitySeries
        this.OutdoorSeries = response.data.result.OutdoorSeries
      }
      console.log(this.clothes)
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
        padding-bottom: 15px;
    }
    .logo{
        height: 35px;
    }
    .logo img{
        height: 35px;
        margin: 2px 0 0 5px;
    }
    .search{
        width: auto;
        height: 25px;
        margin: 5px 8px 0 12px;
        border: 1px solid #22b8ea;
        position: relative;
        text-align: left;
        text-indent: 1em;
        font-size: 14px;
        line-height: 25px;
        color: #7b7b7b;
    }
    .search > img{
        position: absolute;
        width: 20px;
        height: 17px;
        top: 4px;
        right: 12px;
    }
    #banner{
        margin: 12px 0;
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
    #clothes{
    }
    .van-grid-item{
        margin-bottom: 1rem;
    }
    .van-grid-item__content{
        padding: 0.3rem .5rem;
    }
    #Class_clothes,#Work_clothes,#Sports_series,#Activity_series,#Outdoor_series{
        margin-top: 8px;
        padding: 5px 8px 10px 8px;
        background-color: white;
    }
    h4{
        padding: 8px 8px;
        text-align: left;
    }
    .pro-img{
        width: 5.375rem;
        height: 5.375rem;
        margin: 0 auto;
    }
    .optional-col{
        height: 12px;
        font-size: 8px;
        position: absolute;
        top: 0;
        right: 3px;
        color: #b6a482;
        border: 1px solid #b6a482;
        border-radius: 5px;
        padding: 0  2px;
        background-color: white;
    }
    .ov-hid{
        width: 95%;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 2;
        margin-bottom: 3px;
        font-size: 13px;
    }
    .price{
        font-size: 13px;
        text-align: left;
        color: red;
    }
    #Home_footer{
        width: 100%;
        height: 102px;
    }
</style>
