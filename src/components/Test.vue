<template>
    <div id="Test">
        <!--<van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div v-for="(i, index) in abc" :key="index">
                <p>{{i.color_id}}</p>
                <img style="width: 100%" :src="i.img" alt="">
            </div>
        </van-list>-->
        <van-swipe-cell>
            <template slot="left">
                <van-button square type="primary" text="选择" />
            </template>
            <van-cell :border="false" title="单元格" value="内容" />
            <template slot="right">
                <van-button square type="danger" text="删除" />
                <van-button square type="primary" text="收藏"/>
            </template>
        </van-swipe-cell>
    </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      abc: [],
      currentPage: 0
    }
  },
  components: {},
  computed: {
    students1: function () {
      return this.sortKey(this.students, 'age')
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.$http.get('../../static/database/tsconfig.json').then(response => {
      this.list = response.data.result.HL6880
      console.log(this.list)
    })
  },
  methods: {
    onLoad () {
      let a = this.currentPage += 1
      // 异步更新数据
      setTimeout(() => {
        this.abc = this.abc.concat(this.getPageData(a, 3, this.list))
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.abc.length >= this.list.length) {
          this.finished = true
        }
      }, 800)
      console.log(this.abc)
    },
    getPageData (currentPage, pageSize, objData) {
      let totalPage = Math.ceil(objData.length / pageSize) // 先算出一共多少页
      // console.log(currentPage > 0 && currentPage <= totalPage)
      if (currentPage > 0 && currentPage <= totalPage) {
        return objData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      } else {
        return ['您输入的页码超出范围！']
      }
    }
  }
}
</script>

<style scoped>
    #Test{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
        text-align: center;
    }
</style>
