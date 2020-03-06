<template>
    <div id="addAddress">
        <div>
            <van-address-edit
                    :area-list="areaList"
                    show-postal
                    show-set-default
                    show-search-result
                    :search-result="searchResult"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @change-detail="onChangeDetail"
                    class="add-address"
            />
        </div>
    </div>
</template>

<script>
import areaList from '../../area/area'
export default {
  name: 'addAddress',
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    onSave (content) {
      this.$http.post('api/XYport/addAddress.php', {
        user: JSON.parse(sessionStorage.getItem('userInfo')).user_tel,
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
    #addAddress{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        text-align: center;
    }
</style>
<style lang="less">
    .add-address .van-button--danger {
        background-color: #1989fa!important;
        border: 0.0625rem solid #1989fa!important;
    }
</style>
