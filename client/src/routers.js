import VueRouter from 'vue-router'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import ToDo from './pages/ToDo'
// import Cart from './pages/Cart'
// import Catalog from './pages/Catalog'
// import Registration from './pages/Registration'




export default new VueRouter({
    routes:[
        {
            path: '/', //home page
            component: Home
        },
        {
            path: '/chat', //home page
            component: ChatPage
        },
         {
             path: '/todo', //home page
             component: ToDo
         },
        // {
        //     path: '/catalog', //home page
        //     component: Catalog
        // },
        // {
        //     path: '/catalog/:id',
        //     component: Catalog
        // },
        // {
        //     path: '/registration', //home page
        //     component: Registration
        // },
        // {
        //     path: '*',
        //     component: ErrorCmp
        // }

    ],
    mode: 'history'

})