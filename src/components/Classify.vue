<template>
    <div id="Classify">
        <div class="classify_left_sidebar">
            <van-sidebar v-model="activeKey" @change="scrollTo" style="width: 100%">
                <van-sidebar-item v-for="(i, index) in allClothes" :key="index" :title="i.sortName" />
            </van-sidebar>
        </div>
        <div class="classify_right">
            <div class="classify_right_main" @scroll="handleScroll()" ref="content" >
                <div class="info_main" v-for="(item, index) in allClothes" :key="index">
                    <img :src="item.sortImg" alt="">
                    <div style="margin-bottom: .6rem" v-for="(sort, index) in item.sortClothes" :key="index">
                        <p style="width: auto; font-size: .96rem; margin: 0.3rem 0 .5rem 0; font-weight: bolder; border-bottom: .01rem solid #f8f8f8; padding-bottom: .3rem">
                            {{sort.title}}
                            <span style="float: right; font-size: 0.8rem; color: #7f7f7f; font-weight: lighter" @click="moreClothes()">更多</span>
                        </p>
                        <van-grid :border="false" :column-num="3">
                            <van-grid-item v-for="(i, index) in sort.clothes" :key="index" @click="commodityDetails(i.id, i.categoryId)">
                                <div style="margin: 0 auto">
                                    <img width="100%" :src="i.img" alt="">
                                </div>
                                <p style="font-size: 0.8rem;color: #515151; margin: 0.3rem 0;text-align: center">{{i.categoryId}}</p>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Classify',
  data () {
    return {
      activeKey: this.$route.query.id,
      activeIndex: 0,
      indexList: [],
      scrollTop: 0,
      allClothes: []
    }
  },
  components: {},
  computed: {},
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path === '/Classify') {
        this.activeKey = this.$route.query.id
        this.timer = setTimeout(() => {
          this.scrollTo((+this.$route.query.id))
        }, 300)
      }
    }
  },
  created () {
  },
  methods: {
    onChange (index) {
      console.log(index)
      this.activeIndex = index
    },
    handleScroll () {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.classify_right_main .info_main')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(document.documentElement.scrollTop || document.body.scrollTop)
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop + 100 >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      // 把下标赋值给 vue 的 data
      if (navIndex <= offsetTopArr.length) {
        this.activeKey = navIndex
      }
    },
    scrollTo (index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.querySelector(`.classify_right_main .info_main:nth-child(${index + 1})`).offsetTop
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义一次跳 30 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        console.log(targetOffsetTop)
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown () {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      function smoothUp () {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          requestAnimationFrame(smoothUp)
        }
      }
    },
    moreClothes () {
      this.$router.push({
        path: '/MoreClothes',
        query: {
        }})
    },
    commodityDetails (Id, proId) {
      this.$router.push({
        path: '/Commodity',
        query: {
          id: Id,
          proId: proId
        }})
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.handleScroll)
    this.timer = setTimeout(() => {
      if ((+this.$route.query.id) > 0) {
        this.scrollTo((+this.$route.query.id))
      } else {
        this.scrollTo(0)
      }
    }, 300)
    this.$http.get('../../static/database/classify.json').then(response => {
      this.allClothes = response.data.result.allClothes
      console.log(this.allClothes[0].sortName)
    })
  },
  destroy () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
    #Classify{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
    }
    .van-sidebar-item--select {
        color: #323233;
        border-color: #22b8ea;
    }
    .van-sidebar-item {
        padding: 1rem 0.75rem 1rem 0.5rem;
        overflow: hidden;
        color: #323233;
        font-size: 0.875rem;
        line-height: 1rem;
        text-align: left;
        background-color: white;
    }
    .classify_left_sidebar{
        width: 28%;
        position: fixed
    }
    .classify_right{
        width: 71%;
        float: right;
        border-left: 1px solid #b6a482;
        padding-bottom: 18rem;
    }
    .classify_right_main{
        overflow-y: visible;
    }
    .classify_right_main::-webkit-scrollbar {
        display: none;
    }
    .info_main{
        padding: 0 0.6rem
    }
    .info_main > img{
        width: 100%;
    }
</style>
<style lang="less">
    *{
        padding: 0;
        margin: 0;
    }
    .van-grid-item__content{
        padding: 0.5rem .6rem .6rem 0;
    }
</style>
