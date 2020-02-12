<template>
    <div id="ShoppingCart">
        <!-- v-for="(m, index) in this.allWareHouse" :key="index" -->
        <div style="width: 94%; margin: 1rem 3%" >
            <van-checkbox v-model="checked" @click="checkAbc">
                <p class="store-house" style="">新百佳仓库</p>
            </van-checkbox>
            <van-checkbox-group
                    v-model="result"
                    @change="changeCheck()"
                    ref="checkboxGroup"
                    class="check-group"
            >
                <van-row style="margin: 1.2rem 0;display: flex" v-for="(i, index) in this.newBaiJiaWareHouse" :key="index">
                    <van-col span="2"  style="align-self: center"><van-checkbox :name="i.checkValue"></van-checkbox></van-col>
                    <van-col span="22">
                        <div class="check-product">
                            <div class="clear_fix" style="padding: 0.46rem 0;">
                                <img :src="i.productImg" alt="">
                                <p class="product_name" style="">{{i.productName}}</p>
                            </div>
                            <div v-for="(item, index) in i.product" :key="index">
                                <hr size="1px" color="#dfdfdf">
                                <div class="product_info clear_fix">
                                    <p class="product_color">{{item.colorName}}</p>
                                    <div style="float: left;">
                                        <ul class="product_size-detail" v-for="(item1, index) in item.selectedSize" :key="index">
                                            <li>{{item1.sizeName}}</li>
                                            <li>5000</li>
                                            <li>
                                                <van-stepper
                                                        v-model="item1.amount"
                                                        min="0"
                                                        :max="500"
                                                        input-width="2.3rem"
                                                        button-size="1rem"
                                                        integer
                                                />
                                            </li>
                                            <li>￥{{item1.price}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-checkbox-group>
        </div>
        <div class="shopping-cart-bottom">
            <van-row type="flex" justify="space-between" style="width: 100%">
                <van-col span="6" style="display: flex;padding-left: 1rem">
                    <van-checkbox v-model="checkedAll" @click="checkAll">全选</van-checkbox>
                </van-col>
                <van-col span="8"  style="display: flex;">
                    <span style="align-self: center">合计:</span>
                    <span style="color: #f80302; font-size: 1.3rem; line-height: 3.2rem">￥0</span>
                </van-col>
                <van-col span="6"><van-button style="width: 100%; height: 100%" color="#61b5fb" :square="true">下单(0)件</van-button></van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data () {
    return {
      result: [],
      addValue: [],
      checked: false,
      checkWareHouse: false,
      checkedAll: false,
      newBaiJiaWareHouse: [
        {
          id: 1,
          productImg: './../../static/ClassifyImg/HL6880/浅蓝色.jpg',
          productName: 'HL 6880#陶瓷桑蚕丝POLO蚕丝POLO',
          productId: 'HL6880',
          checkValue: 'A',
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
          checkValue: 'B',
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
          productImg: './../../static/ClassifyImg/SGC9955/花灰.jpg',
          productName: 'SGC 9955#陶瓷桑蚕丝翻领',
          productId: 'SGC9955',
          checkValue: 'C',
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
      /* allWareHouse: [
        {
          id: 1,
          wareHouseName: '新百佳仓库',
          checkWareHouse: false,
          wareHouse: [
            {
              id: 1,
              productImg: './../../static/ClassifyImg/HL6880/浅蓝色.jpg',
              productName: 'HL 6880#陶瓷桑蚕丝POLO',
              productId: 'HL6880',
              checkValue: 'A',
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
              checkValue: 'B',
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
          checkWareHouse: false,
          wareHouse: [
            {
              id: 1,
              productImg: './../../static/ClassifyImg/HL6880/藏蓝.jpg',
              productName: 'HL 6880#陶瓷桑蚕丝POLO蚕丝POLO',
              productId: 'HL6880',
              checkValue: 'C',
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
              checkValue: 'D',
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
      ] */
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
    }
  },
  created () {
  },
  methods: {
    init () {},
    changeCheck () {
      let checkLenght = this.newBaiJiaWareHouse.length
      if (this.result.length === checkLenght) {
        this.checked = true
        this.checkedAll = true
      } else if (this.result.length <= checkLenght) {
        this.checked = false
        this.checkedAll = false
      }
    },
    checkAbc () {
      if (this.checked === true) {
        this.$refs.checkboxGroup.toggleAll()
      } else {
        this.checked = true
        this.$refs.checkboxGroup.toggleAll(true)
      }
    },
    checkAll () {
      if (this.checkedAll === false) {
        this.checked = true
        if (this.checked === true) {
          this.$refs.checkboxGroup.toggleAll(true)
        }
        console.log(this.checked)
      } else {
        this.checked = false
        if (this.checked === false) {
          this.$refs.checkboxGroup.toggleAll()
        }
      }
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
        margin-bottom: 7rem;
    }
    *{
        margin: 0;
        padding: 0;
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
    .van-stepper__minus, .van-stepper__plus{
        display: none;
    }
    .store-house{
        height: 1.8rem;
        background-color: #22b8ea;
        color: white;
        padding: 0 1.2rem;
        line-height: 1.8rem;
        border-radius: 1.8rem;
        font-size: 0.8rem
    }
    .check-group{
        width: 96%;
        margin-left: 4%;
    }
    .check-product{
        padding: 0 0.86rem;
        margin-left:0.3rem;
        box-shadow: 0 0 5px 5px rgba(237, 237, 237, 0.2);
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
