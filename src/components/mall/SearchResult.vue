<template>
    <div id="SearchResult">
        <van-sticky>
            <div style="padding: .5rem; background-color: white">
                <p class="keyword" @click="changeKeyword">{{keyword}}</p>
            </div>
            <div>
                <van-row style="display: flex; background-color: white">
                    <van-col span="12" style="align-self: center">
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="value" :options="option"/>
                        </van-dropdown-menu>
                    </van-col>
                    <van-col span="12" @click="_showPopup" style="align-self: center; font-size: 0.92rem;text-align: center">筛选</van-col>
                </van-row>
            </div>
        </van-sticky>
        <div>
            <van-grid :border="false" :column-num="2" :gutter="20">
                <van-grid-item v-for="(i, index) in searchResult.slice(0,8)" :key="index">
                    <div @click="commodityDetails(i.Id, i.Category_ID)" class="search-result">
                        <div>
                            <img width="100%" :src="i.Img" alt="">
                            <p class="optional-col"><span style="align-self: center">{{i.Optional_Color}}色可选</span></p>
                            <p class="ov-hid">{{i.Title}}</p>
                            <p class="price">￥{{i.Price}}</p>
                        </div>
                    </div>
                </van-grid-item>
            </van-grid>
            <van-divider :style="{ color: '#cccccc', borderColor: '#cccccc', padding: '0 1rem' }">
                没有更多了
            </van-divider>
        </div>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '80%', height: '100%' }"
                style="background-color: #f9f9f9;"
        >
            <div>
                <div style="padding-bottom: 4rem">
                    <div class="screening clear_fix">
                        <p class="screening-title">价格区间</p>
                        <div class="price-range-input">
                            <p style="width: 48%;"><van-field v-model="minimumPrice" placeholder="最高价"  input-align="center" class="price-range-value"/></p>
                            <p style="width: 4%;">-</p>
                            <p style="width: 48%;"><van-field v-model="maximumPrice" placeholder="最低价"  input-align="center" class="price-range-value"/></p>
                        </div>
                    </div>
                    <div class="screening clear_fix">
                        <p class="screening-title" >选择面料</p>
                        <div class="price-range-input">
                            <van-grid :column-num="3" :border="false" style="width: 100%">
                                <van-grid-item
                                        v-for="(i, index) in fabric"
                                        :key="index"
                                        class="screening-item"
                                        @click="_activeFabric(index)"
                                >
                                    <p :class="{active: activeFabric === index}">{{i}}</p>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </div>
                    <div class="screening clear_fix">
                        <p class="screening-title" >选择颜色</p>
                        <div class="price-range-input">
                            <van-grid :column-num="3" :border="false" style="width: 100%">
                                <van-grid-item
                                        v-for="(i, index) in color"
                                        :key="index"
                                        class="screening-item"
                                        @click="_activeColor(index)"
                                >
                                    <p :class="{active: activeColor === index}">{{i}}</p>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </div>
                    <div class="screening clear_fix">
                        <p class="screening-title" >选择性别</p>
                        <div class="price-range-input">
                            <van-grid :column-num="3" :border="false" style="width: 100%">
                                <van-grid-item
                                        v-for="(i, index) in sex"
                                        :key="index"
                                        class="screening-item"
                                        @click="_activeSex(index)"
                                >
                                    <p :class="{active: activeSex === index}">{{i}}</p>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </div>
                    <div class="screening clear_fix">
                        <p class="screening-title" >选择性别</p>
                        <div class="price-range-input">
                            <van-grid :column-num="3" :border="false" style="width: 100%">
                                <van-grid-item
                                        v-for="(i, index) in sex"
                                        :key="index"
                                        class="screening-item"
                                        @click="_activeSex(index)"
                                >
                                    <p :class="{active: activeSex === index}">{{i}}</p>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <div v-show="showBottom" class="bottom-btn">
            <van-button style="float: left; width: 40%;margin-left: 5%" plain round size="small" color="#fe4543" @click="onReset">重置</van-button>
            <van-button style="float: left; width: 40%;margin-left: 10%" round size="small" color="#fe4543" @click="onConfirm">完成</van-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      keyword: this.$route.query.keyword,
      searchResult: '',
      value: 0,
      minimumPrice: '',
      maximumPrice: '',
      show: false,
      showBottom: false,
      activeFabric: '',
      activeColor: '',
      activeSex: '',
      option: [
        { text: '综合', value: 0 },
        { text: '价格降序', value: 1 },
        { text: '价格升序', value: 2 }
      ],
      fabric: ['全部', '莫代尔', '纯棉', '丝光棉', '莱卡棉', '牛奶丝', '速干'],
      color: ['全部', '橙色', '黑色', '灰色', '黄色', '绿色', '紫色', '棕色', '白色', '青色', '蓝色', '红色', '粉色'],
      sex: ['全部', '女', '男', '童装', '男女通用']
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.query.keyword !== from.query.keyword) {
        this.keyword = to.query.keyword
        // this.$router.go(0)
      }
    },
    show (val, oldVal) {
      console.log('val = ' + val + ' , oldValue = ' + oldVal)
      this.showBottom = !this.showBottom
    }
  },
  created () {
    if (this.$route.query) {
      this.keyword = this.$route.query.keyword
      // this.init()
    }
  },
  mounted () {
    this.$http.get('../../static/database/package.json').then(response => {
      this.searchResult = response.data.result.classClothes
    })
  },
  methods: {
    changeKeyword () {
      this.$router.go(-1)
    },
    onConfirm () {
      this.show = false
    },
    onReset () {
    },
    _showPopup () {
      this.show = !this.show
    },
    _activeFabric (index) {
      if (this.activeFabric !== index) {
        this.activeFabric = index
      } else {
        this.activeFabric = ''
      }
    },
    _activeColor (index) {
      if (this.activeColor !== index) {
        this.activeColor = index
      } else {
        this.activeColor = ''
      }
    },
    _activeSex (index) {
      if (this.activeSex !== index) {
        this.activeSex = index
      } else {
        this.activeSex = ''
      }
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

<style scoped>
#SearchResult{
    background: transparent;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
    position: relative;
}
[class*=van-hairline]::after {
    border: 0 !important;
}
.field__control {
    background-color: #7b7b7b!important;
}
.van-cell {
    padding: 0;
    background-color: #f3f3f3;
    border-radius: 1rem;
    font-size: .78rem;
}
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .keyword{
        width: auto;
        background-color: #f5f5f5;
        font-size: 0.88rem;
        padding: .5rem;
        border-radius: .3rem;
        text-align: center
    }
    .screening{
        padding: 0.8rem 1rem .5rem 1rem;
        background-color: white;
        margin-bottom: .5rem
    }
    .screening-title{
        margin-bottom: .8rem;
        font-weight: bolder
    }
    .price-range-input{
        display: flex;
    }
    .screening-item{
        margin: 0 0 0.6rem 0;
    }
    .screening-item > .van-grid-item__content{
        padding: 0.35rem 0;
        background-color: #f3f3f3;
        border-radius: 1rem;
        margin: 0  0.6rem 0 0;
        font-size: 0.65rem;
    }
    .price-range-input > p{
        float: left;
        align-self: center;
        text-align: center
    }
    .price-range-input > p >.price-range-value{
        width: 8rem;
        margin: 0 auto;
        padding: .2rem .5rem;
    }
    .van-grid-item__content{
        padding: 0;
    }
    .bottom-btn{
        width: 80%;
        padding: 1rem 0;
        background-color: white;
        position: fixed;
        right: -80%;
        bottom: 0;
        z-index: 9999;
        animation: myfirst 0.4s;
        animation-fill-mode: forwards
    }
    @keyframes myfirst
    {
        from {
        }
        to {
            right: 0;
        }
    }
    .active{
        color: #fa0022;
    }
    .search-result{
        position: relative;
        padding-top: 1rem ;
    }
    .search-result .pro-img{
        width: auto;
        margin: 0.5rem auto;
    }
    .search-result .optional-col{
        height: 0.82rem;
        font-size: 0.68rem;
        position: absolute;
        top: 0;
        right: 0;
        color: #b6a482;
        border: 1px solid #b6a482;
        border-radius: .26rem;
        padding: 0  .2rem;
        background-color: white;
        display: flex;
    }
    .search-result .ov-hid{
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 2;
        margin: 0 auto;
        padding: 0 0.5rem;
        font-size: 0.92rem;
        color: #5a5a5a
    }
    .search-result .price{
        font-size: 0.92rem;
        text-align: left;
        color: red;
        padding: 0 0.5rem;
        margin: .5rem 0 0 0;
    }
</style>
