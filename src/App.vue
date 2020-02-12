<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
    </transition>
    <van-tabbar v-model="active" v-if="tabShow" class="tabbar-img" @change="onChange">
      <van-tabbar-item to="/Home">
        <span>首页</span>
        <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.home1 : icon.home"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/Classify">
        <span>分类</span>
        <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.classify1 : icon.classify"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/ShoppingCart">
      <span>购物车</span>
      <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon.cart1 : icon.cart"
      >
    </van-tabbar-item>
      <van-tabbar-item to="Mines">
      <span>我的</span>
      <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon.me1 : icon.me"
      >
    </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      tabShow: true,
      active: 0,
      icon: {
        home1: '../static/TabbarImg/home1.png',
        home: '../static/TabbarImg/home.png',
        classify1: '../static/TabbarImg/classify1.png',
        classify: '../static/TabbarImg/classify.png',
        cart1: '../static/TabbarImg/cart1.png',
        cart: '../static/TabbarImg/cart.png',
        me1: '../static/TabbarImg/me1.png',
        me: '../static/TabbarImg/me.png'
      }
    }
  },
  components: {
  },
  methods: {
    onChange (index) {
      this.active = index
    },
    reload () {
      console.log('刷新页面')
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  mounted () {
    // 判断当前页面是否为home，Classify，ShoppingCart，Mines等页面（页面返回时active选中上个页面，页面刷新时active不会）
    const CURRENTTABBAR = window.location.hash.split('/')[1]
    if (CURRENTTABBAR === 'Home') {
      this.active = 0
    } else if (CURRENTTABBAR === 'Classify') {
      this.active = 1
    } else if (CURRENTTABBAR === 'ShoppingCart') {
      this.active = 2
    } else if (CURRENTTABBAR === 'Mines') {
      this.active = 3
    }
  },
  computed: {
    ...mapState({
      direction: state => state.mutations.direction
    })
  },
  watch: {
    $route (to, from) {
      if (to.path === '/Home' || to.path === '/Classify' || to.path === '/ShoppingCart' || to.path === '/Mines') {
        this.tabShow = true
        if (to.path === '/Home') { // 解决页面刷新 active无法选中
          this.active = 0
        } else if (to.path === '/Classify') {
          this.active = 1
        } else if (to.path === '/ShoppingCart') {
          this.active = 2
        } else if (to.path === '/Mines') {
          this.active = 3
        }
      } else {
        this.tabShow = false
      }
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 组件切换左右滑动动画样式 */
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000px;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
<style lang="less">
  .tabbar-img img{
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
