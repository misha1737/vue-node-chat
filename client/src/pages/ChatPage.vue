
<template>
      <div class="container">
        <h1>Chat</h1>
        <p style="display:none">
        {{usersLogo}}
        </p>
      
        <div class="chat">
          <ul id="all_messages" class="chatContent scroll"  ref="chat" @scroll="onScroll">
            <li :class="{ownMessage: message.user==user.login}" v-for="message in chatHistory" :key="message.id">
                <div class="loginImgBlock">
                <div class="loginImg" v-if="!message.logoUrl"><img  src="../assets/user.svg" alt=""></div>
                <div class="userImg" v-else-if="message.user==user.login"><img  :src="user.logoUrl" alt=""></div>
                <div class="userImg" v-else><img  :src="'http://localhost:5000/'+message.logoUrl" alt=""></div>
                </div>
               <div class="chatMessage" >
                <p class='messageUser' >{{message.user}}</p> <span class="message">{{message.msg}} </span> <span class="messageTime"> {{message.time}}</span>
                </div>
            </li>
          </ul>
          <div id="messForm" class="messageForm" v-on:keyup.enter="clickButton()">
                  <textarea  type="text" v-model="textMessage" class="form-control scroll" id="message" aria-describedby="messageHelp" placeholder="Enter Message" resize: none required></textarea>
                <button type="button" @click="clickButton()" class="btn sendMessage">Send</button>   
          </div>
            <div class="userOnline">
              <h2>online</h2>
                  <li v-for="login in userOnline" :key="login.id">
                    {{login}}
                  </li>
           </div>  
         </div> 
          
    </div>
</template>


<script>
import Vue from 'vue'

import io from "socket.io-client"

export default {
  name: 'ChatPage',
  props: {
    msg: String,
    user: Object,
  },
  data(){
      return{
            data: 'text data message', 
            socket: io("http://localhost:5000"),
            textMessage: '',
            chatHistory: [],
            userData: '',
            historyPage: 0,
            pauseToLoad: false,
            chatHeight: 0,
            userOnline: [],
            usersLogo: [],
            Tstart:0,
            Tend:0
            }
    },
    sockets: {
        connect: function () {
            console.log('socket connected');   
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
   
        clickButton() {
            this.socket.emit('send mess', this.textMessage)
            this.textMessage='';
        },
          getHistory(){
            this.Tstart=Date.now();
                this.socket.emit('getHistory', this.historyPage)
                    this.historyPage++;
   
        },
        getUsersLogo(name,url){
            if(this.usersLogo.find(el => el.name === name)){
              return
            }else{
              this.usersLogo.push({name:name});
            }
        },
        listen(){
          this.socket.on('add mess', data=>{            
            data.time=this.timedecode(data.time );
            data.logoUrl=this.user.logoUrl;
            this.chatHistory.push(data);
            this.$nextTick(() => {
            this.$refs.chat.scrollTop= this.$refs.chat.scrollHeight+20000;
            });
          });
          this.socket.on('loadHistory', data=>{
              if (data.login==this.user.login){
            if (data.history.length>0){

              for(var i=0; i<data.history.length; i++) {
                  var message={};
                  message.time= this.timedecode(data.history[i].time);
                  message.user= data.history[i].login;
                  message.msg= data.history[i].message;
                  this.chatHistory.unshift(message);
                  this.getUsersLogo(message.user,'someurl'); //собрать масив с логинами истории чата
               }
               this.socket.emit('getLoginUrl', this.usersLogo);
                
                this.$nextTick(() => {
                        if(this.chatHeight==0){
                         this.chatHeight=this.$refs.chat.scrollHeight;
                         this.$refs.chat.scrollTop= 50000;
                        }else{
                        this.$refs.chat.scrollTop= 600;
                        }
                   
                      })
            }
              }
          });
           this.socket.on('loadUsers', data=>{
              this.userOnline = data.filter(function(item, pos) {
              return data.indexOf(item) == pos;
              })
              
           });

           this.socket.on('loadLogoUrl', data=>{
              // this.userOnline = data.filter(function(item, pos) {
              // return data.indexOf(item) == pos;
              // })
             
              this.usersLogo=[];
              for(let i=0;i<data.length;i++){
               this.usersLogo.push({
                 name: data[i].name,
                 logoUrl:data[i].logoUrl,
                 })
                //добавления в сообщения логотипов
               
              }
              //console.log("+");
                for(let i in this.usersLogo){
                    console.log(this.usersLogo[i].name)
                    for(let j in this.chatHistory){
                        if (this.chatHistory[j].user==this.usersLogo[i].name){
                            this.chatHistory[j].logoUrl=this.usersLogo[i].logoUrl;
                        }

                    }

                }
              this.Tend=Date.now();
              console.log(this.Tstart);
              console.log(this.Tend);

              console.log(this.Tend-this.Tstart+'ms')

           })

            this.socket.on('error', data=>{
              console.log(data)
            });
        },
        onScroll(){
          
        if(this.$refs.chat.scrollTop<50 && !this.pauseToLoad){
         this.pauseToLoad=true;
            this.getHistory();
            setTimeout( () => {
              this.pauseToLoad=false
              
              }, 10);
        }

        },
        timedecode(time){
          time= +time;
            var date = new Date( time );
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (minutes<10){
              minutes="0"+minutes;
            }
            if (seconds<10){
              seconds="0"+seconds;
            }
            return hours+':'+minutes+':'+seconds
        }
        
    },
    async created(){
      this.listen();    
      this.socket.emit('user', this.user.login);
      this.getHistory();
    },
    mounted(){
      
    }
   
}

</script>

<style lang="scss">
@import "./../scss/variables.scss";
@import "./../scss/base.scss";
@import "./../scss/_chat.scss";
</style>
