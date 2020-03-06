<template>
    <div id="Address">
        <div style="padding-bottom: 3.5rem">
            <van-swipe-cell v-for="(item, index) in allAddress" :key="index">
                <div style="margin:  .8rem .8rem 0 .8rem ; background-color: white; border-radius: .5rem;padding: .5rem;color: #323233">
                    <div style="font-size: 1.12rem">
                        <span>{{item.name}}</span>
                        <span style="margin: 0 .5rem">{{item.tel}}</span>
                        <span v-if="item.is_default === 'true'" style="display: inline-block; background-color: #ee0a24;font-size: 0.8rem;color: white;padding: .1rem .3rem;border-radius: .5rem;">默认</span>
                    </div>
                    <div style="font-size: 0.86rem;color: #323233; margin-top: 0.5rem">{{item.province}} {{item.city}} {{item.county}} {{item.address_detail}}</div>
                </div>
                <van-button
                        slot="right"
                        square
                        text="编辑"
                        type="info"
                        @click="editAddress(index)"
                        style="height: 100%;border-radius: .2rem"
                />
                <van-button
                        slot="right"
                        square
                        text="删除"
                        @click="delAddress(index)"
                        type="danger"
                        style="height: 100%;border-radius: .2rem"
                />
            </van-swipe-cell>
        </div>
        <div style="width: 100%; font-size: 1.09rem;position: fixed;bottom: 0">
            <van-button type="info" style="width: 100%;" @click="newAddress()">新增收货地址</van-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Address',
  data () {
    return {
      allAddress: {}
    }
  },
  components: {},
  inject: ['reload'],
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path === '/Address') {
        this.init()
        this.reload()
      }
    },
    allAddress: {
      handler (n, o) {
        console.log(n)
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http.post('api/XYport/getAddress.php', {
        user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel
      }).then(response => {
        this.allAddress = response.data
      })
    },
    editAddress (index) {
      this.$router.push({
        path: '/addressEdit',
        query: {
          addressId: index
        }})
    },
    delAddress (index) {
      this.$dialog.confirm({
        title: '提示',
        message: '是否删除该地址',
        confirmButtonText: '删除',
        confirmButtonColor: 'red'
      }).then(() => {
        this.$http.post('api/XYport/editAddress.php', {
          user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel,
          id: this.allAddress[index].id,
          statusCode: 3
        }).then(response => {
        })
        this.init()
      }).catch(() => {
        // on cancel
      })
    },
    newAddress () {
      this.$router.push('/addAddress')
    }
  }
}
</script>

<style scoped>
    #Address{
        background: #f7f7f7;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        position: absolute;
    }
</style>
