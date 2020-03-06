<template>
    <div id="PostSale">
        <van-search
                v-model="searchValue"
                placeholder="请搜索订单编号"
                input-align="center"
                left-icon=""
                @search="onSearch"
                @cancel="onCancel"
                @input="onInput"
        />
        <van-tabs v-model="orderActive" swipeable :swipe-threshold="5" color="#22b8ea" line-height="2px" sticky >
            <van-tab v-for="(item, index) in allOrder" :key="index" :title="item.orderTitle">
                <van-pull-refresh
                        v-model="isLoading"
                        success-text="刷新成功"
                        @refresh="onRefresh(false)"
                >
                    <div style="height: 60rem">{{item.orderTitle}}{{inputValue}}</div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
  name: 'PostSale',
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
          order: []
        }, {
          id: 2,
          orderTitle: '待审核',
          order: []
        }, {
          id: 3,
          orderTitle: '审核通过',
          order: []
        }, {
          id: 4,
          orderTitle: '寄回中',
          order: []
        }, {
          id: 5,
          orderTitle: '已完成',
          order: []
        }
      ]
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
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
    #PostSale{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        text-align: center;
    }
</style>
