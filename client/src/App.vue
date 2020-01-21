<template>
  <div id="app">
    <div >
    <Header :login='login' :logoUrl='logoUrl'  :user='user' @logout='logout'></Header>
    <authorization class="pageContent" @login='Login'  v-if='!user'></authorization>  
    <router-view class="pageContent" :login='login' :logoUrl='logoUrl' v-if='user'></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import authorization from './components/Auth.vue'


export default {
  name: 'app',
   data(){
            return{
              login:'',
              user:false,
              logoUrl:''
            }
        },
  components: {
    Header,
    authorization
  },
  methods:{
    Login(login){
      this.login=login;
      this.user=true;
    },
    logout(){
      this.login='';
      this.user=false;
    }
  },
   beforeCreate(){
             axios({
                    method: 'get',
                    url: 'http://localhost:5000/',
                    crossDomain: true,
                    withCredentials: true
                    }).then(response => {
                       console.log(response.data.login);
                       this.login=response.data.login;
                       this.user=true;
                       if(response.data.logoUrl){
                      this.logoUrl='http://localhost:5000/'+response.data.logoUrl;
                       }
                    })    
        } 
        
}
</script>

<style lang="scss">
@import "scss/variables.scss";
@import "scss/base.scss";
  .pageContent{
    margin-top:40px;
  }

</style>
