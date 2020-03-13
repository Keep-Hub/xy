import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../components/Home.vue')
const Classify = () => import('../components/Classify.vue')
const ShoppingCart = () => import('../components/ShoppingCart.vue')
const Mines = () => import('../components/Mines.vue')
const Commodity = () => import('../components/mall/Commodity.vue')
const Search = () => import('../components/mall/Search.vue')
const SearchResult = () => import('../components/mall/SearchResult.vue')
const BuyNow = () => import('../components/mall/BuyNow.vue')
const Order = () => import('../components/mall/Order.vue')
const OrderDetails = () => import('../components/mall/OrderDetails.vue')
const SubmitOrder = () => import('../components/mall/SubmitOrder.vue')
const MoreClothes = () => import('../components/mall/MoreClothes.vue')
const Logon = () => import('../components/personal/Logon.vue')
const Register = () => import('../components/personal/Register.vue')
const forgetPwd = () => import('../components/personal/ForgetPwd.vue')
const AccountInfo = () => import('../components/personal/AccountInfo.vue')
const AccountSecurity = () => import('../components/personal/AccountSecurity.vue')
const Address = () => import('../components/personal/Address.vue')
const CapitalFlow = () => import('../components/personal/CapitalFlow.vue')
const PostSale = () => import('../components/personal/PostSale.vue')
const MyCollection = () => import('../components/personal/MyCollection.vue')
const addAddress = () => import('../components/personal/AddAddress.vue')
const addressEdit = () => import('../components/personal/AddressEdit.vue')
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
      name: 'Home',
      path: '/Home',
      component: Home,
      meta: { keepAlive: true, title: '广州服装批发网站-服装货源加盟-风衣-卫衣-T恤-POLO文化衫-工作服装厂-广州迅印科技有限公司' }
    }, {
      name: 'Classify',
      path: '/Classify',
      component: Classify,
      meta: { keepAlive: true, title: '分类' }
    }, {
      name: 'ShoppingCart',
      path: '/ShoppingCart',
      component: ShoppingCart,
      meta: { keepAlive: true, title: '购物车', requireAuth: true }
    }, {
      name: 'Mines',
      path: '/Mines',
      component: Mines,
      meta: { keepAlive: true, title: '个人中心' }
    }, {
      name: 'Commodity',
      path: '/Commodity',
      component: Commodity,
      meta: { keepAlive: true, title: '商品详情' }
    }, {
      name: 'Search',
      path: '/Search',
      component: Search,
      meta: { keepAlive: true, title: '搜索' }
    }, {
      name: 'SearchResult',
      path: '/SearchResult',
      component: SearchResult,
      meta: { keepAlive: true, title: '搜索' }
    }, {
      name: 'BuyNow',
      path: '/BuyNow',
      component: BuyNow,
      meta: { keepAlive: true, title: '商品详情', requireAuth: true }
    }, {
      name: 'Order',
      path: '/Order',
      component: Order,
      meta: { keepAlive: true, title: '订单', requireAuth: true }
    }, {
      name: 'OrderDetails',
      path: '/OrderDetails',
      component: OrderDetails,
      meta: { keepAlive: true, title: '订单详细', requireAuth: true }
    }, {
      name: 'SubmitOrder',
      path: '/SubmitOrder',
      component: SubmitOrder,
      meta: { keepAlive: true, title: '提交订单', requireAuth: true }
    }, {
      name: 'Logon',
      path: '/Logon',
      component: Logon,
      meta: { keepAlive: true, title: '登录' }
    }, {
      name: 'Register',
      path: '/Register',
      component: Register,
      meta: { keepAlive: true, title: '注册' }
    }, {
      name: 'forgetPwd',
      path: '/forgetPwd',
      component: forgetPwd,
      meta: { keepAlive: true, title: '忘记密码' }
    }, {
      name: 'AccountInfo',
      path: '/AccountInfo',
      component: AccountInfo,
      meta: { keepAlive: true, title: '账号信息', requireAuth: true }
    }, {
      name: 'AccountSecurity',
      path: '/AccountSecurity',
      component: AccountSecurity,
      meta: { keepAlive: true, title: '账号安全', requireAuth: true }
    }, {
      name: 'Address',
      path: '/Address',
      component: Address,
      meta: { keepAlive: true, title: '地址管理', requireAuth: true }
    }, {
      name: 'CapitalFlow',
      path: '/CapitalFlow',
      component: CapitalFlow,
      meta: { keepAlive: true, title: '资金流水', requireAuth: true }
    }, {
      name: 'PostSale',
      path: '/PostSale',
      component: PostSale,
      meta: { keepAlive: true, title: '售后记录', requireAuth: true }
    }, {
      name: 'MyCollection',
      path: '/MyCollection',
      component: MyCollection,
      meta: { keepAlive: true, title: '我的收藏', requireAuth: true }
    }, {
      name: 'addAddress',
      path: '/addAddress',
      component: addAddress,
      meta: { keepAlive: true, title: '添加地址', requireAuth: true }
    }, {
      name: 'addressEdit',
      path: '/addressEdit',
      component: addressEdit,
      meta: { keepAlive: true, title: '修改地址', requireAuth: true }
    }, {
      name: 'MoreClothes',
      path: '/MoreClothes',
      component: MoreClothes,
      meta: { keepAlive: true, title: '更多分类' }
    }, {
      name: 'Test',
      path: '/Test',
      component: Test,
      meta: { keepAlive: true, title: '测试' }
    }
  ]
})
