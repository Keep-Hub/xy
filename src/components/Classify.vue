<template>
    <div id="Classify">
        <div class="classify_left_sidebar">
            <van-sidebar v-model="activeKey" @change="scrollTo" style="width: 100%">
                <van-sidebar-item title="T恤" />
                <van-sidebar-item title="POLO" />
                <van-sidebar-item title="卫衣卫裤" />
                <van-sidebar-item title="风衣马甲" />
                <van-sidebar-item title="职业装" />
                <van-sidebar-item title="运动系列" />
                <van-sidebar-item title="劳保服" />
                <van-sidebar-item title="冲锋衣套装" />
                <van-sidebar-item title="其他" />
                <van-sidebar-item title="裤子" />
            </van-sidebar>
        </div>
        <div class="classify_right">
            <div class="classify_right_main" @scroll="handleScroll()" ref="content">
                <div class="info_main">T恤</div>
                <div class="info_main">POLO</div>
                <div class="info_main">卫衣卫裤</div>
                <div class="info_main">风衣马甲</div>
                <div class="info_main">职业装</div>
                <div class="info_main">运动系列</div>
                <div class="info_main">劳保服</div>
                <div class="info_main">冲锋衣套装</div>
                <div class="info_main">其他</div>
                <div style="height: 750px" class="info_main">裤子</div>
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
      scrollTop: 0
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
      const navContents = document.querySelectorAll('.classify_right_main div')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      console.log(document.documentElement.scrollTop || document.body.scrollTop)
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
      const targetOffsetTop = document.querySelector(`.classify_right_main div:nth-child(${index + 1})`).offsetTop
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 30
      // 判断是往下滑还是往上滑
      console.log('targetOffsetTop=' + targetOffsetTop)
      console.log('scrollTop=' + scrollTop)
      console.log(scrollTop > targetOffsetTop)
      if (scrollTop > targetOffsetTop) {
        // 往上滑
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
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.handleScroll)
    this.timer = setTimeout(() => {
      this.scrollTo((+this.$route.query.id))
    }, 300)
  },
  destroy () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
#Classify{
    background: transparent;
    background-size: 100% 100%;
    width: 100%;
    height:100%;
    text-align: center;
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
    height: 100%;
}
.classify_right_main{
    overflow-y: visible;
}
.classify_right_main::-webkit-scrollbar {
    display: none;
}
.info_main{
    min-height: 300px;
}
</style>
