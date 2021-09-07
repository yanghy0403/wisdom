import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      user:null,
  },
  mutations: {
     login(state,user){
         state.user = user;
         sessionStorage.setItem('user',JSON.stringify(user))
     },
     //退出登录
     loginout(state){
        state.user = null;
        sessionStorage.removeItem('user');
     }
  },
  actions: {
      login({commit},user){
       
        commit('login',user);
      },
      loginout({commit}){
         commit('loginout');
      }
  },
  modules: {}
});
