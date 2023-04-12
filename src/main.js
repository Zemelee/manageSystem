import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios'
import router from './router/router.js'
import service from './service.js'
import echarts from 'echarts';
// import * as echarts from 'echarts';



Vue.prototype.service = service
Vue.prototype.$echarts = echarts

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')==undefined) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  } else next()
})

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
