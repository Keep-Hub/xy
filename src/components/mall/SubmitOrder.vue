<template>
    <div id="SubmitOrder">
        <div v-show="selectAddress" class="select-address clear_fix">
            <van-icon class="address-icon" name="location-o" size="2.6rem" color="#61b5fb" />
            <div style="float: left; width: 100%">
                <van-row style="display: flex; font-size: 0.88rem; color: #666666" @click="_addressee">
                    <van-col span="5">
                        <p>收货人:</p>
                        <p style="margin-top: .42rem">收货地址:</p>
                    </van-col>
                    <van-col span="17" style="color: #000000;position: relative">
                        <div v-if="showAddress">
                            <p class="consignee">{{name}}({{phone}})</p>
                            <p>{{address}}</p>
                        </div>
                        <van-icon v-else name="plus" size="1.8rem" color="#cccccc" style="position: absolute;left: 42%; top: .5rem" />
                    </van-col>
                    <van-col span="2" style="align-self: center;">
                        <van-icon name="arrow" size="1rem" color="#cccccc"/>
                    </van-col>
                </van-row>
                <van-divider :style="{ color: '#cccccc', borderColor: '#cccccc', margin: '.5rem 0' }"></van-divider>
                <div style="font-size: 0.82rem">不设寄件人</div>
            </div>
        </div>
        <div style="margin-bottom: 3rem">
            <div class="purchase-info">
                <p class="warehouse-text">新百佳仓库</p>
                <div>
                    <div v-for="(pro, index) in purchasedGoods" :key="index">
                        <van-divider :style="{ color: '#cccccc', borderColor: '#cccccc', margin: '0' }"></van-divider>
                        <van-row style="display: flex; padding: .6rem 0">
                            <van-col span="5" style="align-self: center">
                                <img :src="pro.goodsSrc" width="100%" alt="">
                            </van-col>
                            <van-col span="19" style="position: relative;padding-left: .5rem; font-size: 0.88rem;">
                                <p style="margin: 0.5rem 0;" class="clear_fix">{{pro.styleId}}# {{pro.styleName}} <span style="float: right">x10件</span> </p>
                                <van-row style="display: flex">
                                    <van-col span="19">
                                        <div style="font-size: 0.76rem;display: flex;margin-bottom: 0.3rem; color: #4c4c4c" v-for="(item, index) in pro.colour" :key="index">
                                            <p style="float: left;align-self: center">{{item.colorName}}:</p>
                                            <p style="float: left; width: 80%; padding-left: 0.2rem;align-self: center; margin-top: .1rem;">
                                                <span v-for="(size, index) in item.selectedSize" :key="index">
                                                     <span style="margin-right: .3rem">{{size.sizeName}}-{{size.amount}}</span>
                                                </span>
                                            </p>
                                        </div>
                                    </van-col>
                                    <van-col span="5" style="align-self: center;">
                                        <p style="float: right;">￥2800.00</p>
                                    </van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </div>
                    <van-divider :style="{ color: '#cccccc', borderColor: '#cccccc', margin: '.5rem 0 0 0' }"></van-divider>
                    <van-cell title="提货方式">
                        <span style="color: #000000" @click="_takeDelivery">{{takeDelivery}}</span>
                        <van-icon name="arrow" size=".7rem" color="#000000"/>
                    </van-cell>
                    <van-cell :title="gainPathway" @click="_expressDelivery">
                        <span style="color: #000000">{{expressDelivery}}</span>
                        <van-icon name="arrow" size=".7rem" color="#000000"/>
                    </van-cell>
                    <van-cell title="商品合计">
                        <p style="color: #000000;position: relative">
                            <span>x12件&nbsp;</span>
                            <span style=" margin-right: 1rem">合计: <span style="color: #ff3334; font-weight: bolder; font-size: 1rem">68.00</span>&nbsp;</span>
                            <van-icon name="question-o" color="#69b3f0" size="1rem" style="position: absolute; top: .2rem; right: 0;" @click="_tips"/>
                        </p>
                    </van-cell>
                    <van-field v-model="remarks" label="备注信息" type="textarea" autosize placeholder="请输入备注信息" input-align="right" maxlength="50" show-word-limit />
                </div>
            </div>
        </div>
        <div>
            <van-popup v-model="showPicker" position="bottom" round >
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                />
            </van-popup>
            <van-popup v-model="showExpress" position="bottom" round >
                <van-picker
                        show-toolbar
                        :columns="middleware"
                        @confirm="onExpress"
                        @cancel="showExpress = false"
                        :default-index="0"
                />
            </van-popup>
            <van-popup v-model="showDetailedPrice" style="background-color: transparent ">
                <div style="width: 14rem; height: 14rem; border-radius: 1rem; background-color: white; padding: 2rem">
                    <p style="text-align: center;margin-bottom: 1rem">价格详细</p>
                    <p style="margin: .5rem 0;color: #666666">成衣总件数 <span style="float: right; color: red">x2件</span></p>
                    <p style="margin: .5rem 0;color: #666666">成衣总价格 <span style="float: right; color: red">￥56.00</span></p>
                    <p style="margin: .5rem 0;color: #666666">推广活动优惠 <span style="float: right; color: red">￥0.00</span></p>
                    <p style="margin: .5rem 0;color: #666666">运费 <span style="float: right; color: red">￥8.00</span></p>
                    <van-button color="#61b5fb" style="width:100%;margin: 1rem 0;border-radius: .5rem; padding: 0 2rem" @click="_iKnow">我知道了</van-button>
                </div>
            </van-popup>
        </div>
        <div style="position: fixed;bottom: 0; width: 100%; background-color: white">
            <van-divider :style="{ color: '#cccccc', borderColor: '#cccccc', margin: '0' }"></van-divider>
            <van-row>
                <van-col span="18">
                    <p style="float: right; margin-right: 1rem; position: relative; margin-top: .5rem">
                        <span>合计:<span style="color: #f80302;margin-right: 1.5rem; font-size: 1.12rem; font-weight: bolder">￥56.00</span><van-icon name="question-o" color="#69b3f0" size="1rem" style="position: absolute; top: .3rem; right: 0;" @click="_tips"/></span>
                    </p>
                </van-col>
                <van-col span="6"><van-button style="width: 100%; height: 100%" color="#61b5fb" :square="true">去付款</van-button></van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SubmitOrder',
  data () {
    return {
      selectAddress: false,
      showAddress: false,
      name: '',
      phone: '',
      address: '',
      purchasedGoods: [
        {
          styleId: 'HL 6880',
          styleName: '陶瓷桑蚕丝POLO',
          goodsSrc: '../../../static/ClassifyImg/HL6880/彩兰.jpg',
          colour: [
            {
              colorName: '彩兰',
              selectedSize: [
                {
                  id: 1,
                  sizeName: 'S',
                  price: 28.00,
                  amount: 2
                }, {
                  id: 2,
                  sizeName: 'M',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 3,
                  sizeName: 'L',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 4,
                  sizeName: 'XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 5,
                  sizeName: '2XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 6,
                  sizeName: '3XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 7,
                  sizeName: '4XL',
                  price: 28.00,
                  amount: 3
                }
              ]
            },
            {
              colorName: '彩色',
              selectedSize: [
                {
                  id: 1,
                  sizeName: 'S',
                  price: 28.00,
                  amount: 2
                }, {
                  id: 2,
                  sizeName: 'M',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 3,
                  sizeName: 'L',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 4,
                  sizeName: 'XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 5,
                  sizeName: '2XL',
                  price: 28.00,
                  amount: 3
                }
              ]
            }
          ]
        },
        {
          styleId: 'SGC 9955',
          styleName: '陶瓷桑蚕丝翻领',
          goodsSrc: '../../../static/ClassifyImg/HL6880/浅蓝色.jpg',
          colour: [
            {
              colorName: '红色',
              selectedSize: [
                {
                  id: 1,
                  sizeName: 'S',
                  price: 28.00,
                  amount: 2
                }, {
                  id: 2,
                  sizeName: 'M',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 3,
                  sizeName: 'L',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 4,
                  sizeName: 'XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 5,
                  sizeName: '2XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 6,
                  sizeName: '3XL',
                  price: 28.00,
                  amount: 3
                }, {
                  id: 7,
                  sizeName: '4XL',
                  price: 28.00,
                  amount: 3
                }
              ]
            }
          ]
        }
      ],
      remarks: '',
      takeDelivery: '自提',
      gainPathway: '自提方式',
      expressDelivery: '广州新百佳A21043',
      columns: ['自提', '快递现付', '快递到付'],
      Express: ['顺丰速运', '圆通快递', '申通快递', '德邦物流', '中通快递', '韵达快递', 'EMS快递'],
      Express1: ['圆通快递', '申通快递', '韵达快递', 'EMS快递'],
      warehouse: ['广州新百佳A21043'],
      middleware: [], // 中间件 用来切换不同的数组
      showPicker: false,
      showExpress: false,
      showDetailedPrice: false
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (from.path === '/Address') {
        if (localStorage.getItem('addressCode') === null) {
          this.init(0)
        } else {
          this.init(localStorage.getItem('addressCode'))
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.middleware = this.warehouse // 加载赋值默认的
    this.init(0)
  },
  methods: {
    init (addressCode) {
      this.$http.post('api/XYport/getAddress.php', {
        user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel
      }).then(response => {
        console.log(response.data.msg)
        if (response.data.msg === 1) {
          this.showAddress = true
          let allAddress = response.data.data
          this.name = allAddress[addressCode].name
          this.phone = allAddress[addressCode].tel
          this.address = allAddress[addressCode].province + ' ' + allAddress[addressCode].city + ' ' + allAddress[addressCode].county + ' ' + allAddress[addressCode].address_detail
        } else if (response.data.msg === 0) {
          this.showAddress = false
        }
      })
    },
    _takeDelivery () {
      this.showPicker = !this.showPicker
    },
    onConfirm (value) {
      this.takeDelivery = value
      if (this.takeDelivery === '自提') {
        this.middleware = this.warehouse
        this.selectAddress = false
        this.expressDelivery = this.middleware[0]
        this.gainPathway = '自提方式'
      } else if (value === '快递现付' || value === '快递到付') {
        this.selectAddress = true
        this.gainPathway = '快递公司'
        if (this.takeDelivery === '快递现付') {
          this.middleware = this.Express
          this.expressDelivery = this.middleware[0]
        } else if (this.takeDelivery === '快递到付') {
          this.middleware = this.Express1
          this.expressDelivery = this.middleware[0]
        }
      }
      this.showPicker = false
    },
    onExpress (value) {
      this.expressDelivery = value
      this.showExpress = false
    },
    _expressDelivery () {
      this.showExpress = !this.showExpress
    },
    _tips () {
      this.showDetailedPrice = !this.showDetailedPrice
      console.log(this.takeDelivery, this.expressDelivery)
    },
    _iKnow () {
      this.showDetailedPrice = !this.showDetailedPrice
    },
    _addressee () {
      this.$router.push({
        path: '/Address',
        query: {
          code: '1'
        }})
    }
  }
}
</script>

<style scoped>
#SubmitOrder{
    background: #F7F7F7;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
    position: absolute;
}
.van-cell:not(:last-child)::after {
    border-bottom: 0.0625rem solid #cccccc;
    left: 0;
}
.van-cell {
    padding: 0.625rem 0;
    color: #4c4c4c;
    font-size: 0.85rem
}
</style>
<style lang="less">
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
    .select-address{
        width: auto;
        background-color: white;
        margin-top: .6rem;
        padding: .6rem 0.5rem;
        display: flex
    }
    .address-icon{
        align-self: center;
        float: left;
        margin-right: .5rem
    }
    .consignee{
        margin-bottom: 0.42rem;
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 1;
    }
    .purchase-info{
        width: auto;
        margin-top: .6rem;
        background-color: white;
        padding: 0 .8rem;
    }
    .warehouse-text{
        width: 6rem;
        height: 1.8rem;
        background-color: #61b5fb;
        color: white;
        text-align: center;
        line-height: 1.8rem;
        font-size: 0.82rem
    }
</style>
