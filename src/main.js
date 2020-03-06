// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Axios from 'axios'
import './config/rem'
// 挂载全局方法
import globalMethod from './globalmethod/globalFunction'
import { Button, Swipe, SwipeItem, Tabbar, TabbarItem, Row, Col, Grid, GridItem, Divider, Lazyload, List, Cell, CellGroup, Image, ImagePreview, Sidebar, SidebarItem, IndexBar, IndexAnchor, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Stepper, Sku, SubmitBar, Popup, Dialog, Checkbox, CheckboxGroup, SwipeCell, Sticky, Notify, Uploader, Toast, Tab, Tabs, Search, Field, PasswordInput, NumberKeyboard, AddressList, AddressEdit, Area, PullRefresh } from 'vant'
/* 引入移动端手势库 */
import directives from './directives/touch'
// 使用md5加密
import md5 from 'js-md5'
directives(Vue)

Vue.use(Button).use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem).use(Row).use(Col).use(Grid).use(GridItem).use(Divider).use(Lazyload).use(List)
  .use(Cell).use(CellGroup).use(Image).use(ImagePreview).use(Sidebar).use(SidebarItem).use(IndexBar).use(IndexAnchor).use(Icon)
  .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Stepper).use(Sku).use(SubmitBar).use(Popup).use(Dialog).use(Checkbox)
  .use(CheckboxGroup).use(SwipeCell).use(Sticky).use(Notify).use(Uploader).use(Toast).use(Tab).use(Tabs).use(Search).use(Field).use(PasswordInput).use(NumberKeyboard)
  .use(AddressList).use(AddressEdit).use(Area).use(PullRefresh)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.prototype.$http = Axios
Vue.prototype.$common = globalMethod
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

// simple history management
const history = window.sessionStorage
let historyCount = history.getItem('count') * 1
router.beforeEach(function (to, from, next) {
  if (to.meta.title) { // 页面跳转更改标题
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
      next({
        path: '/Logon',
        query: {redirect: to.fullPath}//  将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  } else {
    next()
  }
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) { // 路由切换过渡动画
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})
//  处理数据提交到后端传递的参数的类型
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.transformRequest = [function (data) {
  let src = ''
  for (let item in data) {
    src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
  }
  return src
}]
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
