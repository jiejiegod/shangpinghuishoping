import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router  from '@/router';

// 引入vuex仓库
import store from '@/store'; 

// 三级联动组件-全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui';

Vue.component('TypeNav', TypeNav);
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)


Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.devtools = true; // 开启devtools
import '@/mock/mockServer'; // 引入mockServer

import 'swiper/css/swiper.css'; // 引入swiper的css

import * as API from '@/api'; // 引入api接口函数

import VueLazyload from 'vue-lazyload'; // 引入图片懒加载插件

import atm from '@/assets/images/atm.gif'; // 引入图片懒加载的默认图片
Vue.use(VueLazyload,{
  loading:atm
})

import '@/plugins/validate'; // 引入表单验证插件
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线
    Vue.prototype.$API = API; // 安装全局api接口函数
  }
}).$mount('#app')
