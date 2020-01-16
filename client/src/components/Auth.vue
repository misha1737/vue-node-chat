<template>
  <div class="auth">
    <div class="container">
                    <div class="regAutMenu">
                         
                        <form id="authorization" v-if='reg' v-on:keyup.enter="authorization()">
                            <h2 class="title">Authorization</h2>
                             <p class='errorMsg'>{{errorMsg}}</p>
                            <div class="form-group">
                            <label for="login">Login</label>
                            <input v-model='login' type="text" class="form-control" id="login" aria-describedby="messageHelp" placeholder="Enter Login">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="text" v-model='password' class="form-control" id="password" aria-describedby="messageHelp" placeholder="Enter Password">
                            </div>
                            <button @click="authorization()" type="button" class="btn">Sing in</button>
                        </form>
                        <form v-else id="registration" v-on:keyup.enter="registration()">
                            <h2 class="title">Registration</h2>
                            <p class='errorMsg'>{{errorMsg}}</p>
                            <div class="form-group">
                            <label for="reg-login">Login</label>
                            <input type="text" v-model='regLogin' class="form-control" id="reg-login" aria-describedby="messageHelp" placeholder="Enter login">
                            </div>
                            <div class="form-group">
                                <label for="reg-password">Password</label>
                                <input type="text" v-model='regPass' class="form-control" id="reg-password" aria-describedby="messageHelp" placeholder="Enter pasword">
                            </div>
                            <div class="form-group">
                                <label for="reg-rep-password">Repeat password</label>
                                <input type="text" v-model='repPass' class="form-control" id="reg-rep-password" aria-describedby="messageHelp" placeholder="repeat passworde">
                            </div>
                            <button @click="registration()" type="button" class="btn">Sing up</button>
                        </form>
                        <span class="tougle" @click="regTougle(true)" :class='{active:reg}'>Login</span><span class="tougle" @click="regTougle(false)" :class='{active:!reg}'>Create Account</span>
                    </div>
                </div>       
  </div>
</template>

<script>
import axios from 'axios'
export default {
    
  name: 'Home',
  data(){
            return{
                reg:true , 
                login:'',
                password:'',
                regLogin:'',
                regPass:'',
                repPass:'',
                errorMsg: ''
            }
            
        },
         components: {
          
        },
          methods: {
            regTougle(status){
                 this.reg=status;
                 this.errorMsg='';
            },
            authorization(){
                console.log('authorization');
                axios.defaults.withCredentials = true;
                axios({
                    method: 'post',
                    url: 'http://kmuauto.ru:5000/authorization',
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://kmuauto.ru/',
                        'Access-Control-Allow-Methods': 'GET, POST'
                        
                    },
                    data: {
                        login: this.login,
                        password: this.password 

                    }
                    }).then(response => {
                    console.log(response);
                    this.$emit('login', this.login);
                })
                .catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                this.errorMsg='The login or password is incorrect';
                })
            },
            registration(){
                if(this.repPass==this.regPass){
                console.log('registration');
                axios.defaults.withCredentials = true;
                axios({
                    method: 'post',
                    url: 'http://kmuauto.ru:5000/registration',
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://kmuauto.ru',
                        'Access-Control-Allow-Methods': 'GET, POST'
                        
                    },
                    data: {
                        login: this.regLogin,
                        password: this.regPass  
                    }
                    })

                    .then(response => {
                        console.log(response);
                       this.$emit('login', this.regLogin )
                    })
                    .catch(error => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    switch(error.response.data) {
                        case 'name is already taken':  
                         this.errorMsg='Name is already taken'
                            break;
                        case 'errorPassword':  
                         this.errorMsg='Your password must be between 5 and 30 characters'
                            break;
                        case 'errorLogin':  
                         this.errorMsg='Your login must be between 5 and 30 characters'
                            break;
                        case 'errorSymbol':  
                         this.errorMsg='Your login must be only letters and numbers'
                            break;
                        default:
                            break;
                        }
                    })
                }else{
                    this.errorMsg='Passwords do not match';
                }
            }
        },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "./../scss/_variables.scss";
    @import "./../scss/_base.scss";
    .regAutMenu{
        background-color: #27766155;
        margin-top: 10vh;
        width:300px;
        padding:20px;
        border-radius:5px;
        .tougle{
            color:black;
            padding:5px;
            margin: 5px 0;
            display: inline-block;
            cursor:pointer;
            &.active{
                color:$green;
            }
        }
    }
    @media screen and (max-width: 1100px) {
        .regAutMenu{
            margin-top: 20px;
            max-width: 320px;
            margin:auto;
            width:80%;
        }
    }
</style>
