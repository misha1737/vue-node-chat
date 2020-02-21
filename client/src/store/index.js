import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import toDoList from './toDoList.js'
Vue.use(Vuex)

export default new Vuex.Store({
      
        modules:{
            toDoList 
        },
        plugins: [createPersistedState()]
})