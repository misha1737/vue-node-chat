


<template>
  <div>
      <header>
          
            <div class="container" v-if="user">
                <div class="hamburger" :class="{active: openMenu}" @click="openMenu=!openMenu"><img src="../assets/menu.svg" alt=""></div>
                    <ul class="topMenu" :class="{active: openMenu}">
                        <router-link tag="li" class="nav-item" exact to="/home" active-class="active" >
                        <a class="nav-link"  @click="menu()">Home</a>
                        </router-link>
                        <router-link tag="li"  class="nav-item" exact to="/chat"  >
                            <a class="nav-link" @click="menu()">Chat</a>
                        </router-link>
                        <router-link tag="li"  class="nav-item" exact to="/"  >
                            <a class="nav-link" @click="menu()">ToDoList</a>
                        </router-link>
                        <router-link tag="li"  class="nav-item" exact to="/"  >
                            <a class="nav-link" @click="menu()">Game</a>
                        </router-link>   
                         <div class="userHeaderBlock">  
                            <p class="signOut" @click='signOut(), menu()'>Sign out</p>
                            <p class="loginName">{{login}}</p>
                            <div class="loginImg"><img  src="../assets/user.svg" alt=""></div>
                            
                         </div>    
                    </ul>
                   
            </div>
        
      </header>
            
  </div>
</template>
<!--<script src="../assets/old/all.js"></script>-->
<script>

import axios from 'axios'


    export default {
        name: "Header.vue",
          data(){
            return{
               openMenu:false
            }
        },
        props:{
            login:String,
            user:Boolean,
            logoUrl:String
        },
        methods: {
            signOut(){
                 axios({
                    method: 'get',
                    url: 'http://localhost:5000/logout',
                    crossDomain: true,
                    withCredentials: true
                    }).then(response => {
                       
                        if(response.status==200){
                            this.$emit('logout', this.regLogin )    
                        }
                      
                    })
            },
            menu(){
                this.openMenu=false;
            }
        },
        components:{
       
        },
         
    }





</script>

<style lang="scss">
@import "./../scss/variables.scss";
@import "./../scss/base.scss";
@import "./../scss/_header.scss";
</style>