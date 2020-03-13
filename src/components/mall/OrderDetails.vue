<template>
    <div id="OrderDetails">
        <div class="order-details-top" style="background-color: white">
            <p style="background-color: #61b5fb; padding: 1rem 2rem;color: white; text-align: left ">
                <span> {{selectedOrder.orderStatus}}</span>
            </p>
            <p style="padding: 1rem; font-size: 0.78rem; color: #666666;">
                <span>订单编号: {{selectedOrder.orderId}}</span>
                <span style="margin-left: 1.2rem">2020-01-01 13:50:50</span>
            </p>
        </div>
        <div style="background-color: white; margin-top: .5rem; font-size: .88rem;color: #666666;">
            <div style="padding: .5rem 1rem" class="clear_fix">
                <p style="float: left;">收件人:</p>
                <p style="float: right;width: 70%;text-align: right">昵称短短的才好看(13800138000)</p>
            </div>
            <div style="padding: 0 1rem .5rem 1rem" class="clear_fix">
                <p style="float: left">收货地址:</p>
                <p style="float: right;width: 70%;text-align: right">河北省 石家庄市 长安区 杭州市西湖区 黄龙万科中心一栋1308号</p>
            </div>
        </div>
        <div style="background-color: white;margin-top: .5rem">
            <van-row style="display: flex; padding: .6rem 1rem" v-for="(pro, index) in selectedOrder.orderGoods" :key="index">
                <van-col span="5" style="align-self: center">
                    <img :src="pro.goodsSrc" width="100%" alt="">
                </van-col>
                <van-col span="19" style="position: relative;padding-left: .5rem; font-size: 0.88rem;">
                    <p style="margin: 0.5rem 0;" class="clear_fix">{{pro.styleId}}# {{pro.styleName}}<span style="float: right">x10件</span> </p>
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
        <div style="background-color: white;margin-top: .5rem">
            <div style="padding: .6rem 1rem; color: #666666;font-size: .88rem">
                <p style="margin: .5rem 0">成衣总件数 <span style="float: right;">x2件</span></p>
                <p style="margin: .5rem 0">商品合计 <span style="float: right;">￥56.00</span></p>
                <p style="margin: .5rem 0">推广活动优惠 <span style="float: right;">￥0.00</span></p>
                <p style="margin: .5rem 0">运费<span style="float: right;">￥8.00</span></p>
                <p style="margin: .5rem 0">订单总价 <span style="float: right; color: red">￥88.00</span></p>
            </div>
        </div>
        <div style="background-color: white;margin-top: .5rem">
            <div style="padding: .6rem 1rem; color: #666666;font-size: .88rem">
                <p style="margin: .5rem 0">订单号 <span style="float: right; color: #000000">{{selectedOrder.orderId}}</span></p>
                <p style="margin: .5rem 0">提货类型 <span style="float: right; color: #000000">快递现付</span></p>
                <p style="margin: .5rem 0">快递公司 <span style="float: right; color: #000000">顺丰速运</span></p>
                <p style="margin: .5rem 0">快递单号<span style="float: right; color: #000000">74659523989146</span></p>
            </div>
        </div>
        <div style="background-color: white;margin-top: .5rem;">
            <van-cell title="订单物流跟踪" icon="logistics" title-style="color: #666666">
                <van-icon name="arrow" />
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  data () {
    return {
      selectedOrder: [],
      allOrder: [
        {
          id: 1,
          orderTitle: '全部',
          order: [
            {
              id: 1,
              orderId: '00120020413275806457',
              orderStatus: '未付款',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/彩兰.jpg',
                  colour: [
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
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              orderId: '00120020413275856569',
              orderStatus: '已完成',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/桔红.jpg',
                  colour: [
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
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/宝蓝.jpg',
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
                }
              ]
            },
            {
              id: 3,
              orderId: '00120020413275856588',
              orderStatus: '订单关闭',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/宝蓝.jpg',
                  colour: [
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
                }
              ]
            }
          ]
        },
        {
          id: 2,
          orderTitle: '已接单',
          order: [
            {
              id: 1,
              orderId: '00120020413275',
              orderStatus: '已接单',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/宝蓝.jpg',
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
                  goodsSrc: '../../../static/ClassifyImg/HL6880/藏蓝.jpg',
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
                }
              ]
            }
          ]
        },
        {
          id: 3,
          orderTitle: '配货中',
          order: []
        },
        {
          id: 4,
          orderTitle: '待发货',
          order: []
        },
        {
          id: 5,
          orderTitle: '待收货',
          order: []
        },
        {
          id: 6,
          orderTitle: '已收货',
          order: []
        }
      ]
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.selectedOrder = JSON.parse(localStorage.getItem('aaa'))
    }
  },
  created () {
  },
  mounted () {
    this.selectedOrder = JSON.parse(localStorage.getItem('aaa'))
    console.log(this.selectedOrder)
  },
  methods: {}
}
</script>

<style scoped>
#OrderDetails{
    background: #f9f9f9;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
    /*position: absolute;*/
}
.van-icon-logistics::before {
    transform: scale(-1,1);
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
    .order-details-top{
    }
</style>
