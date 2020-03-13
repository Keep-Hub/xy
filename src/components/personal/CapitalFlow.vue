<template>
    <div id="CapitalFlow">
       <div class="balance">
           <van-row>
               <van-col span="8">
                   <p>总余额</p>
                   <p style="margin-top: .3rem; font-size: 1rem">0</p>
               </van-col>
               <van-col span="8">
                   <p>账户余额</p>
                   <p style="margin-top: .3rem; font-size: 1rem">0</p>
               </van-col>
               <van-col span="8">
                   <p>赠送余额</p>
                   <p style="margin-top: .3rem; font-size: 1rem">0</p>
               </van-col>
           </van-row>
       </div>
       <div class="" style="padding: 1rem 0">
           <van-row style="text-align: center">
               <van-col span="8">
                   <div @click="arrowFunction" style="">
                       <van-row>
                           <van-col  style="text-align: center; font-size: 0.82rem; padding-left: 2rem">{{orderText}}</van-col>
                           <van-col  style="text-align: left;position: relative">
                               <p style="position: absolute;top: .1rem;left: .2rem">
                                   <van-icon v-if="arrow" name="arrow-down" color="#cbcbcb"/>
                                   <van-icon v-else name="arrow-up" color="#cbcbcb" />
                               </p>
                           </van-col>
                       </van-row>
                   </div>
               </van-col>
               <van-col span="16" style="font-size: 0.82rem;">
                   <van-row>
                       <van-col span="10" style="text-align: right;height: 1.2rem;line-height: 1.2rem" @click="showPopup"><span>{{startTime}}</span></van-col>
                       <van-col span="4" style="position: relative">
                           <van-icon  name="notes-o" size="1.2rem" color="#c0c0c0" style="position: absolute;right: .68rem"/>
                           <!--<img src="../../assets/calendar.png" alt="" style="width: 1.2rem;height: 1.2rem; position: absolute; right: .6rem">-->
                       </van-col>
                       <van-col span="10" style="text-align: left;height: 1.2rem;line-height: 1.2rem" @click="showPopup1"><span>{{endTime}}</span></van-col>
                   </van-row>
                   <van-popup
                           v-model="showStart"
                           position="bottom"
                           round
                           :style="{ height: 'auto' }"
                   >
                       <van-datetime-picker
                               v-model="currentDate"
                               type="date"
                               :min-date="minDate"
                               :max-date="maxDate"
                               @confirm="confirmDate"
                               @cancel="cancelDate"
                       />
                   </van-popup>
                   <van-popup
                           v-model="showEnd"
                           position="bottom"
                           round
                           :style="{ height: 'auto' }"
                   >
                       <van-datetime-picker
                               v-model="currentDate"
                               type="date"
                               :min-date="minDate"
                               :max-date="maxDate"
                               @confirm="confirmDate1"
                               @cancel="cancelDate"
                       />
                   </van-popup>
               </van-col>
           </van-row>
           <van-divider style="margin-bottom: 0rem" />
           <div v-show="showDropDown" style="width: auto; position: absolute">
               <van-grid :border="false" :column-num="4" class="order-type" style="padding: 0 1rem; font-size: .82rem">
                   <van-grid-item v-for="(i, index) in orderType" :key="index" @click="orderTextFu(i)">
                       {{i}}
                   </van-grid-item>
               </van-grid>
               <van-divider style="margin-bottom: 0rem" />
           </div>
       </div>
    </div>
</template>

<script>
export default {
  name: 'CapitalFlow',
  data () {
    return {
      arrow: true,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      showStart: false,
      showEnd: false,
      startTime: '开始时间',
      endTime: '结束时间',
      showDropDown: false,
      orderText: '类型',
      orderType: ['订单消费', '在线充值', '订单撤销', '订单售后', '客户入账', '客户欠账', '推广佣金']
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    arrowFunction () {
      this.arrow = !this.arrow
      if (this.arrow === false) {
        this.showDropDown = true
      } else {
        this.showDropDown = false
      }
    },
    orderTextFu (text) {
      console.log(text)
      this.orderText = text
      this.arrowFunction()
    },
    showPopup () {
      this.showStart = true
    },
    showPopup1 () {
      this.showEnd = true
    },
    confirmDate (value) {
      this.startTime = this.timeFormat(value)
      console.log(this.timeFormat(value))
      this.showStart = false
    },
    confirmDate1 (value) {
      this.endTime = this.timeFormat(value)
      console.log(this.timeFormat(value))
      this.showEnd = false
    },
    cancelDate () {
      this.showStart = false
    },
    timeFormat (time) { // 时间格式化 2020-01-01
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    }
  }
}
</script>

<style scoped>
    #CapitalFlow{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
    }
</style>
<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .balance{
        width: 100%;
        padding: 1rem 0;
        background-color: #61b5fb;
        color: white;
        font-size: 0.88rem;
        text-align: center;
    }
    .order-type  .van-grid-item__content{
        padding: 0.8rem 0 0 0;
    }
</style>
