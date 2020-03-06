<template>
    <div id="addressEdit">
        <van-address-edit
                :area-list="areaList"
                :address-info="addressInfo"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
                class="add-address"
        />
    </div>
</template>

<script>
import areaList from '../../area/area'
export default {
  name: 'addressEdit',
  data () {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
      selectId: ''
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path === '/addressEdit') {
        this.init()
      }
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
        let selectAddress = response.data[+this.$route.query.addressId]
        this.selectId = response.data[+this.$route.query.addressId].id
        this.addressInfo = {
          name: selectAddress.name,
          tel: selectAddress.tel,
          areaCode: selectAddress.area_code,
          addressDetail: selectAddress.address_detail,
          postalCode: selectAddress.postal_code,
          isDefault: JSON.parse(selectAddress.is_default)
        }
      })
    },
    onSave (content) {
      this.$http.post('api/XYport/editAddress.php', {
        user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel,
        id: this.selectId,
        statusCode: 2,
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        postalCode: content.postalCode,
        isDefault: content.isDefault,
        areaCode: content.areaCode,
        address: content.province + content.city + content.county + content.addressDetail
      }).then(response => {
        this.$router.push('/Address')
      })
    },
    onDelete () {
      this.$http.post('api/XYport/editAddress.php', {
        user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel,
        id: this.selectId,
        statusCode: 3
      }).then(response => {
      })
      this.$router.push('/Address')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style scoped>
    #addressEdit{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
    }
</style>
<style lang="less">
    .add-address .van-button--danger {
        background-color: #1989fa!important;
        border: 0.0625rem solid #1989fa!important;
    }
</style>
