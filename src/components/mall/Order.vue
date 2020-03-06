<template>
    <div id="Order">
        <van-search
                v-model="searchValue"
                placeholder="请搜索 商品名称 / 订单编号"
                input-align="center"
                left-icon=""
                @search="onSearch"
                @cancel="onCancel"
                @input="onInput"
        />
        <div class="order-tab">
            <van-tabs v-model="orderActive" swipeable :swipe-threshold="6" color="#22b8ea" line-height="2px" sticky >
                <van-tab v-for="(item, index) in allOrder" :key="index" :title="item.orderTitle">
                    <van-pull-refresh
                        v-model="isLoading"
                        success-text="刷新成功"
                        @refresh="onRefresh(false)"
                >
                        <div>
                            <div v-for="(i, index) in item.order" :key="index" style="padding: 0 .8rem; font-size: 0.875rem; margin-bottom: .5rem">
                                <p style="padding: 1rem 0" class="clear_fix"> <span style="float: left">{{i.orderId}}</span> <span style="color: #ed071e; float: right">未付款</span> </p>
                                <div v-for="(pro, index) in i.orderGoods" :key="index">
                                    <van-row>
                                        <van-col span="5">
                                            <img :src="pro.goodsSrc" width="100%" alt="">
                                        </van-col>
                                        <van-col span="15" style="position: relative;padding-left: .5rem; ">
                                            <p style="margin: 0.5rem 0" class="clear_fix">{{pro.styleId}}# {{pro.styleName}}</p>
                                            <div style="font-size: 0.72rem;padding-right: 0.35rem; display: flex">
                                                <p style="float: left;align-self: center">{{pro.colorName}}:</p>
                                                <p style="float: left; width: 80%; padding-left: 0.2rem;align-self: center; margin-top: .08rem">
                                                    <span v-for="(size, index) in pro.selectedSize" :key="index">
                                                         <span style="margin-right: .3rem ">{{size.sizeName}}-{{size.amount}}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </van-col>
                                        <van-col span="4" style="padding: .5rem 0">
                                            <p style="float: right">x10件</p>
                                            <p style="float: right; margin-top: 0.4rem">￥2800.00</p>
                                        </van-col>
                                    </van-row>
                                    <van-divider />
                                </div>
                                <p>
                                    <van-row>
                                        <van-col span="7">共18888件商品</van-col>
                                        <van-col span="9">合计: <span style="color: #ed071e">560000.06</span></van-col>
                                        <van-col span="4" style="color: #22b8ea">去付款</van-col>
                                        <van-col span="4" style="text-align: right;color: #22b8ea">查看详情</van-col>
                                    </van-row>
                                </p>
                            </div>
                        </div>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      searchValue: '',
      orderActive: 0,
      inputValue: '',
      isLoading: false,
      allOrder: [
        {
          id: 1,
          orderTitle: '全部',
          order: [
            {
              orderId: '00120020413275806457',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/彩兰.jpg',
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
                  styleId: 'SGC 9955',
                  styleName: '陶瓷桑蚕丝翻领',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/浅蓝色.jpg',
                  colorName: '浅蓝色',
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
                    }
                  ]
                }
              ]
            }, {
              orderId: '00120020413275856569',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/桔红.jpg',
                  colorName: '桔红',
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
                    }
                  ]
                },
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/宝蓝.jpg',
                  colorName: '宝蓝',
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
                    }
                  ]
                }
              ]
            }
          ]
        }, {
          id: 2,
          orderTitle: '已接单',
          order: [
            {
              orderId: '00120020413275',
              orderGoods: [
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/宝蓝.jpg',
                  colorName: '宝蓝',
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
                    }
                  ]
                },
                {
                  styleId: 'SGC 9955',
                  styleName: '陶瓷桑蚕丝翻领',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/藏蓝.jpg',
                  colorName: '藏蓝',
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
                    }
                  ]
                }
              ]
            }, {
              orderId: '00120020413666',
              orderGoods: [
                {
                  styleId: 'SGC 9955',
                  styleName: '陶瓷桑蚕丝翻领',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/桔红.jpg',
                  colorName: '桔红',
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
                    }
                  ]
                },
                {
                  styleId: 'HL 6880',
                  styleName: '陶瓷桑蚕丝POLO',
                  goodsSrc: '../../../static/ClassifyImg/HL6880/大红.jpg',
                  colorName: '大红',
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
                    }
                  ]
                }
              ]
            }
          ]
        }, {
          id: 3,
          orderTitle: '配货中',
          order: []
        }, {
          id: 4,
          orderTitle: '待发货',
          order: []
        }, {
          id: 5,
          orderTitle: '待收货',
          order: []
        }, {
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
      this.orderActive = this.$route.query.id
    }
  },
  created () {
  },
  mounted () {
    this.orderActive = this.$route.query.id
  },
  methods: {
    onSearch (val) {
      alert(val)
    },
    onInput (val) {
      this.inputValue = val
      console.log(val)
    },
    onCancel () {
      alert('取消')
    },
    onRefresh (showToast) {
      setTimeout(() => {
        if (showToast) {
          this.$toast(this.$t('success'))
        }

        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>

<style scoped>
    #Order{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
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
    *{
        margin: 0;
        padding: 0;
    }
    .order-tab.van-tab--active {
        color: #22b8ea;
        font-weight: 500;
        font-size: 0.94rem;
    }
</style>
