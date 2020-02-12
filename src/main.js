// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Axios from 'axios'
import './config/rem'
import { Button, Swipe, SwipeItem, Tabbar, TabbarItem, Row, Col, Grid, GridItem, Divider, Lazyload, List, Cell, CellGroup, Image, ImagePreview, Sidebar, SidebarItem, IndexBar, IndexAnchor, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Stepper, Sku, SubmitBar, Popup, Dialog, Checkbox, CheckboxGroup } from 'vant'
/* 引入移动端手势库 */
import directives from './directives/touch'
directives(Vue)

Vue.use(Button).use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem).use(Row).use(Col).use(Grid).use(GridItem).use(Divider).use(Lazyload).use(List)
  .use(Cell).use(CellGroup).use(Image).use(ImagePreview).use(Sidebar).use(SidebarItem).use(IndexBar).use(IndexAnchor).use(Icon)
  .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Stepper).use(Sku).use(SubmitBar).use(Popup).use(Dialog).use(Checkbox)
  .use(CheckboxGroup)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.prototype.$http = Axios
Vue.config.productionTip = false

// simple history management
const history = window.sessionStorage
let historyCount = history.getItem('count') * 1
router.beforeEach(function (to, from, next) {
  if (to.meta.title) { // 页面跳转更改标题
    document.title = to.meta.title
  }
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
