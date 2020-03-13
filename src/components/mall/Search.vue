<template>
    <div id="Search">
       <div class="search-input">
           <form action="/">
               <van-search
                       v-model="searchValue"
                       show-action
                       placeholder="请输入关键词搜索"
                       @search="onSearch"
                       @cancel="onCancel"
               />
           </form>
           <van-divider :style="{  borderColor: '#c9c9c9', margin: '0' }"/>
       </div>
        <div class="search-terms">
            <div  class="clear_fix" v-show="showSearchHistory">
                <p>历史搜索 <span style="float: right;position: relative" @click="delSearchHistory"><van-icon name="delete" style="position: absolute; right: 0;top: .2rem" /></span></p>
                <ul v-for="(hots, index ) in searchHistory" :key="index">
                    <li @click="_search(hots)">{{hots}}</li>
                </ul>
            </div>
            <div class="clear_fix">
                <p>热门搜索</p>
                <ul v-for="(hots, index ) in hotSearch" :key="index">
                    <li @click="_search(hots)">{{hots}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchValue: '',
      searchHistory: [],
      showSearchHistory: false,
      hotSearch: ['GDS', 'LKL', 'POLO', '新款卫衣', '冲锋衣', '维方斯', 'XBHD', 'JD', '76000', '63000', 'GTCH']
    }
  },
  components: {},
  computed: {},
  watch: {
  },
  created () {
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('searchHistory')) === null) {
      console.log(JSON.parse(localStorage.getItem('searchHistory')))
    } else {
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
      this.showSearchHistory = true
    }
  },
  methods: {
    onSearch (val) {
      if (val !== '' && val !== ' ') {
        let Array = this.searchHistory
        if (JSON.parse(localStorage.getItem('searchHistory')) === null) {
          Array.push(val)
          localStorage.setItem('searchHistory', JSON.stringify(Array))
          this.showSearchHistory = true
        } else {
          //  如果存在相同的值返回-1
          if (Array.indexOf(val) === -1) {
            Array.push(val)
            localStorage.setItem('searchHistory', JSON.stringify(Array))
          }
        }
        this._search(val)
        this.searchValue = ''
      }
    },
    _search (keyword) {
      this.$router.push({
        path: '/SearchResult',
        query: {
          keyword: keyword
        }})
      console.log(keyword)
    },
    onCancel () {
      this.$router.push({
        path: '/',
        query: {
        }})
    },
    delSearchHistory () {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除搜索记录吗？',
        confirmButtonText: '确定'
      }).then(() => {
        localStorage.removeItem('searchHistory')
        this.searchHistory = []
        this.showSearchHistory = false
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style scoped>
#Search{
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
    .search-input{
        width: auto;
    }
    .search-terms{
        color: #666666;
        background-color: #f9f9f9;
    }
    .search-terms >div{
        background-color: white;
        padding: 0 1rem;
        margin-bottom: .5rem;
    }
    .search-terms >div > p{
        padding: .8rem .3rem;
    }
    .search-terms ul li{
        float: left;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: .2rem .5rem;
        margin: 0 1rem .5rem 0;
        text-align: center;
        border: 1px solid #c9c9c9;
        border-radius: 0.3rem;
        font-size: 0.68rem;
    }
</style>
