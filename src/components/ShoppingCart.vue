<template>
    <div id="ShoppingCart">
        <div style="margin-bottom: 6rem">
            <div style="width: 94%; margin: 1rem 3%" v-for="(item, index) in this.allWareHouse" :key="index">
                <van-checkbox v-if="!item.wareHouse.length == 0" v-model="item.checked" checked-color="#61b5fb" @click="checkWareHouse(item)">
                    <p class="store-house">{{item.wareHouseName}}</p>
                </van-checkbox>
                <van-row class="goods-cart" v-for="(pros, index) in item.wareHouse" :key="index">
                    <van-col span="2"  style="align-self: center" @click="checkGoods(item, pros)">
                        <van-checkbox v-model="pros.isChecked" checked-color="#61b5fb"></van-checkbox>
                    </van-col>
                    <van-col span="22" >
                        <div class="check-product" @touchstart="starts(item, pros, index)" @touchend="end">
                            <div class="clear_fix" style="padding: 0.46rem 0;">
                                <img :src="pros.productImg" alt="">
                                <p class="product_name" style="">{{pros.productName}}</p>
                            </div>
                            <div v-for="(color, index) in pros.product" :key="index">
                                <hr size="1px" color="#dfdfdf">
                                <div class="product_info clear_fix">
                                    <p class="product_color">{{color.colorName}}</p>
                                    <div style="float: left;">
                                        <ul class="product_size-detail" v-for="(size, index) in color.selectedSize" :key="index">
                                            <li>{{size.sizeName}}</li>
                                            <li>5000</li>
                                            <li>
                                                <van-stepper
                                                        v-model="size.amount"
                                                        min="0"
                                                        :max="500"
                                                        input-width="2.3rem"
                                                        button-size="1rem"
                                                        integer
                                                        class="btn-none"
                                                />
                                            </li>
                                            <li>￥{{size.price}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="shopping-cart-bottom">
            <van-row type="flex" justify="space-between" style="width: 100%">
                <van-col span="6" style="display: flex;padding-left: 1rem">
                    <van-checkbox v-model="checkedAll" @click="checkAll" checked-color="#61b5fb">全选</van-checkbox>
                </van-col>
                <van-col span="8"  style="display: flex;">
                    <span style="align-self: center">合计:</span>
                    <span style="color: #f80302; font-size: 1.2rem; line-height: 3.2rem">￥{{allPrice}}</span>
                </van-col>
                <van-col span="6"><van-button style="width: 100%; height: 100%" color="#61b5fb" :square="true">下单({{allCount}})件</van-button></van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data () {
    return {
      loop: null,
      checkedAll: false,
      allPrice: 0, // 所有价格
      allShops: 0, // 被选中的商店数量
      allCount: 0, // 被选中的产品数量
      allWareHouse: [
        {
          id: 1,
          wareHouseName: '新百佳仓库',
          checked: false,
          checkedCount: 0,
          wareHouse: [
            {
              id: 1,
              productImg: './../../static/ClassifyImg/HL6880/浅蓝色.jpg',
              productName: 'HL 6880#陶瓷桑蚕丝POLO',
              productId: 'HL6880',
              isChecked: false,
              product: [
                {
                  colorName: '浅蓝',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: '185',
                      price: 56,
                      amount: 1
                    }, {
                      id: 2,
                      sizeName: 'M',
                      price: 28,
                      amount: 2
                    }
                  ]
                }, {
                  colorName: '彩兰',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: 'S',
                      price: 28,
                      amount: 5
                    }, {
                      id: 3,
                      sizeName: 'L',
                      price: 288,
                      amount: 2
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              productImg: './../../static/ClassifyImg/SGC9955/花灰.jpg',
              productName: 'SGC 9955#陶瓷桑蚕丝翻领',
              productId: 'SGC9955',
              isChecked: false,
              product: [
                {
                  colorName: '花灰',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: '185',
                      price: 56,
                      amount: 8
                    }, {
                      id: 2,
                      sizeName: 'M',
                      price: 65,
                      amount: 2
                    }
                  ]
                }, {
                  colorName: '桔色',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: 'S',
                      price: 28,
                      amount: 6
                    }, {
                      id: 3,
                      sizeName: 'L',
                      price: 288,
                      amount: 2
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          wareHouseName: '深圳仓库',
          checked: false,
          checkedCount: 0,
          wareHouse: [
            {
              id: 1,
              productImg: './../../static/ClassifyImg/HL6880/藏蓝.jpg',
              productName: 'HL 6880#陶瓷桑蚕丝POLO蚕丝POLO',
              productId: 'HL6880',
              isChecked: false,
              product: [
                {
                  colorName: '浅蓝',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: '185',
                      price: 56,
                      amount: 1
                    }, {
                      id: 2,
                      sizeName: 'M',
                      price: 28,
                      amount: 2
                    }
                  ]
                }, {
                  colorName: '彩兰',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: 'S',
                      price: 28,
                      amount: 5
                    }, {
                      id: 3,
                      sizeName: 'L',
                      price: 288,
                      amount: 2
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              productImg: './../../static/ClassifyImg/SGC9955/桔色.jpg',
              productName: 'SGC 9955#陶瓷桑蚕丝翻领',
              productId: 'SGC9955',
              isChecked: false,
              product: [
                {
                  colorName: '花灰',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: '185',
                      price: 56,
                      amount: 8
                    }, {
                      id: 2,
                      sizeName: 'M',
                      price: 65,
                      amount: 2
                    }
                  ]
                }, {
                  colorName: '桔色',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: 'S',
                      price: 28,
                      amount: 6
                    }, {
                      id: 3,
                      sizeName: 'L',
                      price: 288,
                      amount: 2
                    }
                  ]
                }
              ]
            },
            {
              id: 3,
              productImg: './../../static/ClassifyImg/SGC9955/桔色.jpg',
              productName: 'SGC 9955#陶瓷桑蚕丝翻领',
              productId: 'SGC9955',
              isChecked: false,
              product: [
                {
                  colorName: '花灰',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: '185',
                      price: 56,
                      amount: 8
                    }, {
                      id: 2,
                      sizeName: 'M',
                      price: 65,
                      amount: 2
                    }
                  ]
                }, {
                  colorName: '桔色',
                  selectedSize: [
                    {
                      id: 1,
                      sizeName: 'S',
                      price: 28,
                      amount: 6
                    }, {
                      id: 3,
                      sizeName: 'L',
                      price: 288,
                      amount: 2
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {},
  computed: {},
  watch: {
    // 深度监听所有数据，每次改变重新计算总价和总数
    allWareHouse: {
      deep: true,
      handler (val, oldval) {
        this._totalPrice()
        this._totalCount()
      }
    },
    '$route' (to, from) { // 监听路由是否变化
    }
  },
  created () {
  },
  methods: {
    init () {},
    checkGoods (item, pro) {
      // 为未选中的时候改变为false，反之为true
      !pro.isChecked ? this._checkTrue(item, pro) : this._checkFalse(item, pro)
    },
    _checkTrue (item, pro) {
      pro.isChecked = true // 将商品选中状态改为true
      // 这里执行了两步，选中商品数量先+1，再与该店铺商品数量比较，如果相等就更改店铺选中状态为true
      if (++item.checkedCount === item.wareHouse.length) {
        item.checked = true
      } else {
        return ''
      }
      // 当商店全选状态，每全选一个商店，被选中商店数加一，数值等于所有商店数，全选状态为true
      if (item.checked) {
        if (++this.allShops === this.allWareHouse.length) {
          this.checkedAll = true
        } else {
          this.checkedAll = false
        }
      } else {
        return ''
      }
    },
    _checkFalse (item, pro) {
      pro.isChecked = false // 将商品选中状态改为false
      --item.checkedCount // 被选中的商品数减一
      if (item.checked) {
        // 如果店铺是被选中的，更改店铺选中状态
        item.checked = false // 当商店状态为选中时改变false
        --this.allShops // 商店数减一
      }
      this.checkedAll = false // 全选状态为false
    },
    checkWareHouse (item) {
      !item.checked ? this._shopTrue(item) : this._shopFalse(item)
    },
    _shopTrue (item) {
      item.wareHouse.forEach(pro => {
        if (pro.isChecked === false) {
          this._checkTrue(item, pro)
        } else {
          return ''
        }
      })
    },
    _shopFalse (item) {
      item.wareHouse.forEach(pro => {
        // 同上
        if (pro.isChecked === true) {
          this._checkFalse(item, pro)
        } else {
          return ''
        }
      })
    },
    checkAll () {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll === true) {
        this.allWareHouse.forEach(item => {
          this._shopTrue(item)
        })
      } else {
        this.allWareHouse.forEach(item => {
          this._shopFalse(item)
        })
      }
    },
    _totalPrice () {
      // 每次调用此方法，将初始值为0，遍历价格并累加
      this.allPrice = 0
      this.allWareHouse.forEach(item => {
        let products = item.wareHouse
        products.forEach(pros => {
          let color = pros.product
          color.forEach(size => {
            let s = size.selectedSize
            s.forEach(i => {
              if (pros.isChecked) {
                this.allPrice += i.price * i.amount
              }
            })
          })
        })
      })
    },
    _totalCount () {
      // 同上
      this.allCount = 0
      this.allWareHouse.forEach(item => {
        let products = item.wareHouse
        products.forEach(pros => {
          let color = pros.product
          color.forEach(size => {
            let s = size.selectedSize
            s.forEach(i => {
              if (pros.isChecked) {
                this.allCount += i.amount
              }
            })
          })
        })
      })
    },
    starts (item, pro, index) { // 长按触发
      clearTimeout(this.loop)// 再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        this.$dialog.confirm({
          title: '提示',
          message: '是否删除： ' + pro.productName,
          confirmButtonText: '删除',
          confirmButtonColor: 'red'
        }).then(() => {
          item.wareHouse.splice(index, 1)
          this.$notify(
            {
              message: '删除了 ' + pro.productName,
              color: '#ffffff',
              background: '#61b5fb',
              duration: 1500
            }
          )
        }).catch(() => {
          // on cancel
        })
      }, 1200)
    },
    end () {
      clearTimeout(this.loop) // 清空定时器，防止重复注册定时器
    },
    move () {
      alert(1)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
    #ShoppingCart{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        position: absolute;
    }
    *{
        margin: 0;
        padding: 0;
        -webkit-touch-callout:none; /*系统默认菜单被禁用*/
        -webkit-user-select:none; /*webkit浏览器*/
        -khtml-user-select:none; /*早期浏览器*/
        -moz-user-select:none;/*火狐*/
        -ms-user-select:none; /*IE10*/
        user-select:none;
    }
    .clear_fix{
        zoom: 1
    }
    .clear_fix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
</style>
<style lang="less">
    .van-checkbox__icon .van-icon{
        border: 0.0625rem solid #22b8ea;
    }
    .van-stepper__input{
        color: #666666;
        font-size: 0.76rem
    }
    .btn-none>.van-stepper__minus, .btn-none>.van-stepper__plus{
        display: none;
    }
    .store-house{
        height: 1.8rem;
        background-color: #61b5fb;
        color: white;
        padding: 0 1.2rem;
        line-height: 1.8rem;
        border-radius: 1.8rem;
        font-size: 0.8rem
    }
    .goods-cart{
        width: 96%;
        margin-left: 4%;
        display: flex; padding: 1.2rem 0;
    }
    .check-product{
        padding: 0 0.86rem;
        margin-left:0.3rem;
        box-shadow: 0 0 6px 6px rgba(243, 243, 243, 0.6);
    }
    .check-product  img{
        float: left;
        width: 3rem;
        height: 3rem;
        margin-left: 1rem
    }
    .product_name{
        float: left;
        line-height: 3rem;
        margin-left: 1.5rem;
        font-size: 0.82rem;
        width: 11rem;
        text-align: center;
        color: #4d4d4d;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .product_info{
        padding: 0.46rem 0;
        display: flex;
    }
    .product_color{
        float: left;
        width: 3rem;
        margin: 0 .6rem;
        font-size: 0.8rem;
        align-self: center;
        text-align: center;
        color: #949494
    }
    .product_size-detail > li{
        width: 3rem;
        text-align: center;
        font-size: 0.76rem;
        color: #666666;
        float: left;
        height: 1.6rem;
        line-height: 1.6rem;
    }
    .shopping-cart-bottom{
        width: 100%;
        height: 3rem;
        border-top: 1px solid #efefef;
        background-color: white;
        position: fixed;
        bottom: 3rem;
        display: flex;
    }
</style>
