import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
import md5 from 'js-md5'
// mock开关
const mock = false;
if(mock){
  require('./mock/api');
}
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
// 接口带token
axios.interceptors.request.use(function(config){
    const access_token = localStorage.getItem('adsasfsfas');
    const wid = localStorage.getItem('text');
    const timestamp = localStorage.getItem(Math.round(new Date() / 1000));
    const token =localStorage.getItem(this.$md5(wid+ access_token + timestamp));
    if(config.headers['Content-Type'] == 'multipart/form-data'){
      config.data.set('timestamp',timestamp)
      config.data.set('wid',wid)
      config.data.set('token',token)
    }
})
//接口信息
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    // window.location.href = '/#/login';
    return Promise.reject(res);
  }else{
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$md5 = md5;
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
