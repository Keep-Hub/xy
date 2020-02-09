<template>
    <div id="BuyNow">
            <div class="selection-goods clear_fix">
                <div style="float: left; width: 5rem; height: 5rem">
                    <van-image
                            width="100%"
                            height="100%"
                            :src="onClickGoods"
                    />
                </div>
                <div style="float: left;padding: 0 0 0 1rem">
                    <p style="margin-top: 1rem">HL 6880#陶瓷桑蚕丝POLO</p>
                    <p style="margin-top: 0.3rem; font-size: 0.88rem">HL 6880</p>
                </div>
            </div>
            <div class="selective-color">
                <van-grid :gutter="20" :border=false>
                    <van-grid-item v-for="(i, index) in goodsInfo"
                                   :key="index"
                                   class="selective-color-item"
                                   @click="onclick(index)"
                    >
                        <div class="active-color" v-bind:class="{activeColor : index === active}">
                            <p class="bg-color" :style={background:i.colorNumber}></p>
                            <p class="bg-color-text" style="">{{i.colorId}}</p>
                        </div>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="yardage-inventory">
                <p class="yardage-inventory-title">
                    <span style="text-align: left">尺码</span>
                    <span>库存</span>
                    <span>单价</span>
                    <span style="float: right;width: 36%">购买数量</span>
                </p>
                <ul v-for="(item, index) in sizeStock" :key="index">
                    <li class="yardage-inventory-info clear_fix">
                        <span style="text-align: left">{{item.size}}</span>
                        <span>{{item.stock}}</span>
                        <span>{{item.price}}</span>
                        <span style="float: right;width: 36%">
                            <van-stepper
                                    v-model="item.addValue"
                                    min="0"
                                    :max="item.stock"
                                    input-width="3rem"
                                    button-size="1.6rem"
                                    integer
                                    @change="valueChange(item, index)"
                            />
                        </span>
                    </li>
                </ul>
            </div>
        <div>{{allPrice}}</div>
        <div @click="inspectArray()">计算总价</div>
        <!--<div>
            <van-submit-bar
                    :price="3050"
                    button-text="立即购买"
                    @submit="onSubmit"
            >
                <span style="margin: 0 1rem"><span>2000</span>件</span>
                <van-button plain type="danger" size="mini">已选清单</van-button>
            </van-submit-bar>
        </div>-->
    </div>
</template>

<script>
export default {
  name: 'BuyNow',
  data () {
    return {
      goodsInfo: [],
      active: 0,
      styleId: this.$route.query.categoryid,
      onClickGoods: this.$route.query.activeimg,
      sizeStock: [],
      allPrice: 0,
      colorId: '',
      colorBoole: false,
      allArr: []
    }
  },
  created () {
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
    }
  },
  methods: {
    onclick (index) {
      this.active = index
      this.colorId = this.goodsInfo[index].colorId
      this.sizeStock = this.goodsInfo[index].sizeStock
      this.onClickGoods = this.goodsInfo[index].img
      // console.log(this.goodsInfo[index].colorId)
    },
    init (proCode) {
      this.$http.get('../../static/database/tsconfig.json').then(response => {
        let code = proCode.replace(/\s*/g, '')
        this.goodsInfo = response.data.result[code]
        this.onClickGoods = response.data.result[code][0].img
        this.sizeStock = response.data.result[code][0].sizeStock
        this.colorId = this.goodsInfo[0].colorId
      })
    },
    valueChange (item, index) {
      console.log('row=' + index + ',valueChange=' + item.addValue)
      this.inspectArray(index, item.size, item.price, item.addValue)
      this.totalPrice()
    },
    totalPrice () {
      const totalArr = this.allArr
      let result = 0
      if (totalArr.length > 0) {
        for (let i = 0; i < totalArr.length; i++) {
          let b = totalArr[i].selectedSize
          if (b !== undefined || b.length > 0) {
            for (let j = 0; j < b.length; j++) {
              result += totalArr[i].selectedSize[j].price * totalArr[i].selectedSize[j].amount
              this.allPrice = result
            }
          }
        }
      }
      // console.log(this.allPrice)
    },
    inspectArray (rowIndex, size, price, amount) {
      console.log(rowIndex, size, price, amount)
      let addColor = {
        colorName: this.colorId,
        selectedSize: [
          {
            sizeName: size,
            price: price,
            amount: amount
          }
        ]
      }
      let newSize = {
        sizeName: size,
        price: price,
        amount: amount
      }
      if (this.allArr.length > 0) {
        let colorIndex = this.checkColor(this.colorId)
        let sizeIndex = this.checkSize(size)
        if (colorIndex > 0) {
          if (sizeIndex > 0) {
            console.log('改变数量')
            // this.allArr[colorIndex - 1].selectedSize[sizeIndex - 1].amount = amount
          } else {
            console.log(this.colorId + '添加新尺码')
            this.allArr[colorIndex - 1].selectedSize.push(newSize)
          }
          console.log('颜色存在了' + this.colorId)
        } else {
          console.log('添加新颜色')
          this.allArr.push(addColor)
        }
      } else {
        this.allArr.push(addColor)
      }
      console.log(this.allArr)
    },
    checkColor (color) {
      let result = false
      for (let i = 0; i < this.allArr.length; i++) {
        if (this.allArr[i].colorName === color) {
          result = i + 1
        }
      }
      return result
    },
    checkSize (size) {
      let result = false
      for (let i = 0; i < this.allArr.length; i++) {
        for (let j = 0; j < this.allArr[i].selectedSize.length; j++) {
          if (this.allArr[i].selectedSize[j].sizeName === size) {
            result = j + 1
          }
        }
      }
      return result
    }
  },
  mounted () {
    this.init(this.$route.query.categoryid)
  }
}
</script>

<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
#BuyNow{
    background: transparent;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
}
    .selection-goods{
        padding: 15px;
    }
    .selective-color{
        width: 100%;
    }
    .selective-color-item{
        height: 1.6rem;
        margin: 0 0 10px 0!important;
    }
    .active-color{
        width: 100%;
        height: 100%;
        border: 1px solid #efefef
    }
    .activeColor{
        border: 1px solid #ff8800
    }
    .bg-color{
        width: 45%;
        height: 100%;
        float: left
    }
    .bg-color-text{
        width: 55%;
        height: 100%;
        float: right;
        font-size: 0.76rem;
        line-height: 1.4rem;
        text-align: center
    }
    .van-grid-item__content{
        padding: 0;
    }
    .yardage-inventory{
        padding: 0 15px;
    }
    .yardage-inventory-title span{
        display: inline-block;
        float: left;
        width: 20%;
        text-align: center;
        padding: 10px 0
    }
    .yardage-inventory-info{
        border-top: 1px solid #efefef;
        padding: 10px 0
    }
    .yardage-inventory-info span{
        display: inline-block;
        width: 20%;
        float: left;
        text-align: center;
    }
</style>
