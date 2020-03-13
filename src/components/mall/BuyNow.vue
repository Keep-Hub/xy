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
                <div style="float: left;padding: 0 0 0 1rem" v-for="(item, index) in this.goodsInfo.slice(0, 1)" :key="index">
                    <p style="margin-top: 1rem">{{item.styleId}}#{{item.styleName}}</p>
                    <p style="margin-top: 0.3rem; font-size: 0.88rem">{{item.styleId}}</p>
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
            <div class="buy-now-bottom clear_fix">
            <div class="total-pieces">
                <p style="width: 36%;font-size: 0.9rem; text-align: center">
                    <span>{{total}}</span>
                    <span>件</span>
                </p>
                <p style="width: 64%; font-size: 1.2rem;color: #f80302;">
                    <span>￥{{allPrice}}</span>
                </p>
            </div>
            <van-popup
                    v-model="show"
                    closeable
                    round
                    position="bottom"
                    :overlay="false"
                    :style="{ height: 'auto', width: '100%', background: '#f9f9f9',marginBottom: '3rem',padding: '0.5rem'}"
            >
                <p v-if="this.allArr.length === 0" style="margin: 10px; font-size: 0.9rem;color: #666">您的清单中未有商品，请您添加商品至清单中！~~</p>
                <div v-else v-for="(item, index) in this.allArr" :key="index" style="width:90%;margin: 0 10px">
                    <span v-if="!item.selectedSize.length == 0">{{item.colorName}}</span>
                    <span style="margin-left: 10px;font-size: 0.92rem" v-for="(i, index) in item.selectedSize" :key="index">
                            <span>{{i.sizeName}} -</span>
                            <span>{{i.amount}}</span>
                        </span>
                </div>
            </van-popup>
            <div class="bottom-button">
                <van-button type="default" class="btn" @click="showPopup()">已选清单</van-button>
                <van-button v-if="showType" type="info" class="btn" @click="buyNow()">立即购买</van-button>
                <van-button v-else type="info" class="btn" @click="addCart()">加入购物车</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BuyNow',
  data () {
    return {
      goodsInfo: [],
      active: 0,
      styleId: this.$route.query.proId,
      onClickGoods: '',
      sizeStock: [],
      allPrice: 0,
      total: 0,
      colorId: '',
      allArr: [],
      show: false,
      showType: false

    }
  },
  computed: {
  },
  components: {
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path === '/Commodity') {
        if (to.query.proId !== from.query.proId) {
          this.styleId = this.$route.query.proId
          this.init(this.$route.query.proId)
        }
      }
      if (from.path === '/Commodity') {
        this.init(this.$route.query.proId) // 有点小bug
      }
    },
    showType (val, oldVal) {
      console.log(val, oldVal)
    }
  },
  created () {
    if (this.$route.query) {
      this.styleId = this.$route.query.proId
      this.init(this.$route.query.proId)
    }
  },
  methods: {
    onclick (index) {
      this.active = index // 初始选中颜色设定为第一个
      this.colorId = this.goodsInfo[index].colorId
      this.sizeStock = this.goodsInfo[index].sizeStock
      this.onClickGoods = this.goodsInfo[index].img
    },
    init (proCode) {
      this.$http.get('../../static/database/tsconfig.json').then(response => {
        let code = proCode.replace(/\s*/g, '')
        this.goodsInfo = response.data.result[code]
        this.onClickGoods = response.data.result[code][0].img
        this.sizeStock = response.data.result[code][0].sizeStock
        this.colorId = this.goodsInfo[0].colorId
        this.onClickGoods = this.goodsInfo[0].img
      })
      if (this.$route.query.type === '1') { // 初始化购物类型 1 = 加入购物车 0 = 立即购买
        this.showType = true
      } else if (this.$route.query.type === '0') {
        this.showType = false
      }
    },
    valueChange (item, index) { // 数量输入框的值改变执行的方法
      // console.log('row=' + index + ',valueChange=' + item.addValue)
      this.inspectArray(index, item.size, item.price, item.addValue, item.id)
      this.sizeSort()
      this.totalPrice()
      this.delNullArr()
    },
    totalPrice () { // 计算总价 和 总件数
      let totalArr = this.allArr
      let price = 0
      let total = 0
      if (totalArr.length > 0) {
        for (let i = 0; i < totalArr.length; i++) {
          if (totalArr[i].selectedSize !== undefined || totalArr[i].selectedSize.length > 0) {
            let sizeArr = totalArr[i].selectedSize
            for (let j = 0; j < sizeArr.length; j++) {
              price += sizeArr[j].price * sizeArr[j].amount
              total += sizeArr[j].amount
              this.allPrice = price
              this.total = total
            }
          }
        }
      }
      // console.log(this.allPrice)
    },
    inspectArray (rowIndex, size, price, amount, sizeId) { // 添加购物清单
      // console.log(rowIndex, size, price, amount, sizeId)
      let addColor = {
        colorName: this.colorId,
        selectedSize: [
          {
            id: sizeId,
            sizeName: size,
            price: price,
            amount: amount
          }
        ]
      }
      let newSize = {
        id: sizeId,
        sizeName: size,
        price: price,
        amount: amount
      }
      if (this.allArr.length > 0) { // 当数组长度不为0时执行
        let colorIndex = this.checkColor(this.colorId) // 传入颜色 检查是否存在该颜色
        if (colorIndex > 0) {
          let sizeObject = this.allArr[colorIndex - 1].selectedSize // 传入尺码的数组入checkSize进行检查是否存在该码数
          let sizeIndex = this.checkSize(size, sizeObject)
          if (sizeIndex > 0) {
            // console.log(this.colorId + '改变' + size + '数量为' + amount)
            this.allArr[colorIndex - 1].selectedSize[sizeIndex - 1].amount = amount // 修改存在的尺码的数量
          } else {
            // console.log(this.colorId + '添加新尺码' + size)
            this.allArr[colorIndex - 1].selectedSize.push(newSize) // 尺码不存在 添加新的尺码
          }
        } else {
          if (amount > 0) { // 数量大于零时再添加新颜色
            this.allArr.push(addColor)
          }
        }
      } else { // 数组为0时直接添加一个新的颜色
        this.allArr.push(addColor)
      }
    },
    checkColor (color) { // 检查颜色方法
      let result = false
      for (let i = 0; i < this.allArr.length; i++) {
        if (this.allArr[i].colorName === color) {
          result = i + 1
        }
      }
      return result
    },
    checkSize (size, object) { // 检查尺码方法
      let result = false
      for (let j = 0; j < object.length; j++) {
        if (object[j].sizeName === size) {
          result = j + 1
        }
      }
      return result
    },
    delNullArr () { // 删除空数组
      for (let i = 0; i < this.allArr.length; i++) {
        if (this.allArr[i].selectedSize.length === 0) {
          this.allArr.splice(i, 1)
        } else {
          for (let j = 0; j < this.allArr[i].selectedSize.length; j++) {
            if (this.allArr[i].selectedSize[j].amount === 0) {
              this.allArr[i].selectedSize.splice(j, 1)
            }
          }
        }
      }
    },
    sortKey (array, key) { // 排序规则方法
      return array.sort(function (a, b) {
        let x = a[key]
        let y = b[key]
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
      })
    },
    sizeSort () { // 排序方法
      let a
      for (let i = 0; i < this.allArr.length; i++) {
        a = i
      }
      return this.sortKey(this.allArr[a].selectedSize, 'id')
    },
    showPopup () {
      this.delNullArr()
      this.show = !this.show
    },
    addCart () {
      // console.log(this.allArr)
      this.delNullArr()
      if (this.allArr.length > 0) {
        let code = this.styleId.replace(/\s*/g, '')
        localStorage.setItem(code, JSON.stringify(this.allArr))
        this.$dialog.confirm({
          title: '提示',
          message: '已加入购物车，是否前往结算！'
        }).then(() => {
          this.$router.push('/ShoppingCart')
        }).catch(() => {
          // on cancel
        })
      } else {
        this.$dialog.alert({
          message: '请先添加商品！'
        }).then(() => {
          // on close
        })
      }
    },
    buyNow () {
      this.delNullArr()
      if (this.allArr.length > 0) {
        let code = this.styleId.replace(/\s*/g, '')
        localStorage.setItem(code, JSON.stringify(this.allArr))
        this.$router.push('/SubmitOrder')
      } else {
        this.$dialog.alert({
          message: '请先添加商品！'
        }).then(() => {
          // on close
        })
      }
    }
  },
  mounted () {
    this.init(this.$route.query.proId)
  }
}
</script>
<style scoped>
    .van-button--normal {
        padding: 0;
    }
</style>
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
    // min-height: 29rem;
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
        margin-bottom: 3rem;
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
    .buy-now-bottom{
        width: 100%;
        height: 3rem;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 2002!important;
    }
    .buy-now-bottom > div{
        width: 50%;
        height: 3rem;
        float: left;
    }
    .bottom-button{
        background: #22b8ea;
    }
    .bottom-button > .btn{
        height: 100%;
        width: 50%;
        float: left
    }
    .total-pieces{
        border-top: 1px solid #efefef;
    }
    .total-pieces p{
        float: left;
        line-height: 3rem;
    }
</style>
