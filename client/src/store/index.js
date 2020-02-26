import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import toDoList from './toDoList.js'
import chat from './chat.js'
import app from './app.js'
Vue.use(Vuex)

export default new Vuex.Store({
      
        modules:{
            toDoList,
            chat,
            app
        },
        plugins: [createPersistedState()]
})