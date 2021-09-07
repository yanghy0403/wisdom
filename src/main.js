import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import permisson from './utils/permisson'
console.log(permisson)
let persion = permisson.persion;
// import Backtop from './unti/backtop'
// Vue.use(Backtop);
Vue.prototype.$height = 600;//滚动高度超出这个数显示返回顶部


window.Bus = new Vue();
Vue.prototype.Bus = new Vue();
import echarts from "echarts"
Vue.prototype.echarts = echarts;

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引用swiper插件
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
var url= `http://159.226.186.86/api/user/login`;
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
 
  const role = JSON.parse(sessionStorage.getItem('user'));
    
  if ( !to.meta.requireAuth && to.path == '/') {
      next();
  }else {
    if(to.meta.requireAuth && role != null && role.code){
        // next()
        if(to.path == '/systemmanage' || to.path == '/securityaudit'){
              let account = role.account;
              if(persion.indexOf(account)>-1){
                  next()
              }else{
                  next({
                     path:'/'
                  })
              }
        }else{
           next()
        }
    }else{
       
        window.location.href = url;
    }
  }
});



import axios from 'axios'
Vue.prototype.axios = axios;

//请求拦截
axios.interceptors.request.use(
	config => {
    let user =JSON.parse(sessionStorage.getItem('user'));
    if(user){
        config.headers.email = user.account;
        config.headers.userToken = user.code;
      }
		return config  // 对config处理完后返回，下一步将向后端发送请求
	},
	error => {  // 当发生错误时，执行该部分代码
	    console.log(error); //调试用
	    return Promise.reject(error)
	}
)
//请求响应
axios.interceptors.response.use(
	response => {  // 该处为后端返回整个内容
		const res = response.data;  // 该处可将后端数据取出，提前做一个处理
		if (res.code === 200 || res.code ==='200') {
			return response  // 该处将结果返回，下一步可用于前端页面渲染用
		} else {
		
			return Promise.reject('error')
		}
	},
	error => {
	
		return Promise.reject(error)
	}
)


axios.defaults.baseURL = process.env.VUE_APP_URL;
import qs from 'qs'
Vue.prototype.qs = qs;

import './assets/style/style.scss';
// import './assets/style/Rem.scss';

import './utils/flexible.js'



Vue.config.productionTip = false;


// import vueConfig from "../vue.config";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
