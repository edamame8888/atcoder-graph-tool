import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
// プラグインを登録
Vue.use(Vuex)
 
// ストアを作成
const store = new Vuex.Store({
  state: {
    userID : "",
    contestsData: null,
  },
  getters: {
    
  },
  mutations: {
    setUserID(state, payload) {
      state.userID = payload
    },
    setContestsData(state, payload) {
      state.contestsData = payload
    },
  }
})
 
export default store