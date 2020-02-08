import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../components/Home.vue')
const Classify = () => import('../components/Classify.vue')
const ShoppingCart = () => import('../components/ShoppingCart.vue')
const Mines = () => import('../components/Mines.vue')
const Commodity = () => import('../components/mall/Commodity.vue')
const Search = () => import('../components/mall/Search.vue')
const BuyNow = () => import('../components/mall/BuyNow.vue')
const Test = () => import('../components/Test.vue')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) { // 路由跳转时记录上个路由的滚动的位置
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/Home'
    }, {
      path: '/Home',
      component: Home,
      meta: { keepAlive: true, title: '广州服装批发网站-服装货源加盟-风衣-卫衣-T恤-POLO文化衫-工作服装厂-广州迅印科技有限公司' }
    }, {
      path: '/Classify',
      component: Classify,
      meta: { keepAlive: true, title: '分类' }
    }, {
      path: '/ShoppingCart',
      component: ShoppingCart,
      meta: { keepAlive: true, title: '购物车' }
    }, {
      path: '/Mines',
      component: Mines,
      meta: { keepAlive: true, title: '我的' }
    }, {
      path: '/Commodity',
      component: Commodity,
      meta: { keepAlive: true, title: '商品详情' }
    }, {
      path: '/Search',
      component: Search,
      meta: { keepAlive: true, title: '搜索' }
    }, {
      path: '/BuyNow',
      component: BuyNow,
      meta: { keepAlive: true, title: '商品详情' }
    }, {
      path: '/Test',
      component: Test
    }
  ]
})
