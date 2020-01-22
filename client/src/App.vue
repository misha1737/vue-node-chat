<template>
  <div id="app" >
    <div>
    <Header :auth='auth' :user='user' @logout='logout'></Header>
    <authorization class="pageContent" @login='Login' :user='user' v-if='!auth'></authorization>  
    <router-view class="pageContent" :user='user'  @login='Login'  v-if='auth'></router-view>
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
              user:{},
              auth:false
            }
        },
  components: {
    Header,
    authorization
  },
  methods:{
    Login(user){
      this.auth=true;
      this.user=user;
    },
    logout(){
      this.auth=false;
      this.user=null;
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
                       this.user.login=response.data.login;
                       this.auth=true;
                       if(response.data.logoUrl){
                      this.user.logoUrl='http://localhost:5000/'+response.data.logoUrl;
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
